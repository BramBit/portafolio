---
title: "Construyendo un Sistema RAG Personalizado desde Cero en Ecosistemas TypeScript"
slug: "rag-desde-cero"
excerpt: "Análisis profundo sobre cómo diseñar una arquitectura RAG nativa integrada a Hexagonal Architecture con pgvector, Strategy Pattern para LLMs y caché vectorial en Redis."
readingTime: "8 min read"
tags:
  - "Applied AI"
  - "RAG"
  - "TypeScript"
  - "pgvector"
  - "Architecture"
  - "Design Patterns"
publishedAt: 2024-06-20
---

La integración de capacidades conversacionales sobre bases documentales suele abordarse utilizando frameworks de alto nivel como LangChain o LlamaIndex. Si bien estas soluciones aceleran prototipos iniciales, introducen capas de abstracción opacas, dependencias voluminosas y acoplamiento directo entre la infraestructura de IA y el modelo de negocio.

En esta entrega técnica exploramos cómo diseñar e implementar una arquitectura de **Retrieval-Augmented Generation (RAG)** completamente personalizada e integrada de forma limpia en una **Arquitectura Hexagonal (Ports & Adapters)** bajo TypeScript y Node.js.

---

## 1. El Pipeline de Ingesta y Procesamiento Documental

Un sistema RAG eficiente depende críticamente del tratamiento de los documentos antes de su almacenamiento vectorial. El pipeline implementado consta de 5 etapas consecutivas:

1. **Ingesta Multi-Formato:** Soporte nativo para lectura y parsing de archivos PDF y Markdown.
2. **Normalización de Texto:** Limpieza de marcas de agua, caracteres especiales irrelevantes y estandarización del conjunto de caracteres.
3. **Chunking Adaptativo:** Segmentación del contenido por tamaño de bloque y solapamiento (*overlap*), preservando la coherencia semántica entre bordes de párrafos.
4. **Generación de Embeddings:** Conversión de cada segmento en un vector numérico denso a través de modelos de incrustación semántica.
5. **Persistencia Vectorial:** Almacenamiento indexado de los fragmentos y sus vectores correspondientes.

```
Documento (PDF/MD) ➔ Parsing ➔ Chunking Adaptativo ➔ Generación Vectorial ➔ Persistencia en pgvector
```

---

## 2. Persistencia Vectorial con PostgreSQL y `pgvector`

En lugar de incorporar una base de datos vectorial dedicada e independiente (como Pinecone o Qdrant), la solución aprovecho la extensión **`pgvector`** sobre PostgreSQL. Esto permitió mantener los datos relacionales de la aplicación y las representaciones vectoriales dentro del mismo motor transaccional.

### Estructura de la Tabla Vectorial

```sql
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE document_embeddings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    embedding vector(1536), -- Dimensión adaptada al modelo de embeddings
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Índice HNSW para búsqueda por distancia coseno eficiente
CREATE INDEX idx_document_embeddings_vector 
ON document_embeddings 
USING hnsw (embedding vector_cosine_ops);
```

---

## 3. Abstracción de Proveedores LLM mediante Strategy Pattern

Para evitar el acoplamiento estricto con un único proveedor de Inteligencia Artificial (OpenAI, Anthropic o modelos alojados localmente), se implementó un patrón **Strategy** desacoplado mediante Interfaces (Puertos) de dominio.

### Definición del Puerto de Dominio (TypeScript)

```typescript
export interface EmbeddingProvider {
  generateEmbedding(text: string): Promise<number[]>;
  generateBatchEmbeddings(texts: string[]): Promise<number[][]>;
}

export interface LLMCompletionProvider {
  generateCompletion(prompt: string, context: string[]): Promise<string>;
}
```

### Implementación Concreta de Estrategias

Con este diseño, la lógica de negocio depende exclusivamente de los puertos `EmbeddingProvider` y `LLMCompletionProvider`. El cambio de proveedor (por ejemplo, entre OpenAI API y un modelo interno) se resuelve por inyección de dependencias en el arranque de la aplicación según las variables de entorno.

---

## 4. Recuperación Semántica y Construcción Dinámica del Contexto

Cuando el usuario realiza una consulta, la búsqueda del contexto relevante sigue un flujo de tres fases:

1. **Vectorización de la Consulta:** La pregunta del usuario se convierte a un vector utilizando la misma estrategia de embedding.
2. **Consulta por Distancia Coseno:** Se ejecuta una consulta en PostgreSQL para recuperar los $K$ fragmentos documentales con menor distancia coseno respecto al vector de la pregunta.

```sql
SELECT content, metadata, 1 - (embedding <=> $1) AS similarity
FROM document_embeddings
WHERE 1 - (embedding <=> $1) > $2 -- Umbral mínimo de similitud semántica
ORDER BY embedding <=> $1 ASC
LIMIT $3;
```

3. **Inyección en System Prompt (Context Assembly):** Los bloques de texto recuperados se ensamblan dinámicamente dentro del System Prompt, aplicando reglas estrictas para restringir las alucinaciones del modelo.

```typescript
const systemPrompt = `
Eres un asistente especializado. Responde a la pregunta del usuario utilizando
ÚNICAMENTE la información proporcionada en el siguiente CONTEXTO DOCUMENTAL.
Si la respuesta no se encuentra en el contexto, indica explícitamente que no
dispones de información suficiente.

CONTEXTO DOCUMENTAL:
${retrievedChunks.join('\n---\n')}
`;
```

---

## 5. Optimización de Rendimiento y Caché con Redis

Para reducir la latencia de respuesta y minimizar los costos de llamadas a APIs de LLM en preguntas frecuentes:

- **Caché de Embeddings y Contexto:** Redis almacena el resultado de búsquedas vectoriales frecuentes mapeando hashes de consultas similares.
- **Tiempos de Respuesta:** Las respuestas basadas en contexto precheadas reducen el tiempo de latencia de 1.5s a menos de 50ms para consultas idénticas o altamente aproximadas.

---

## Conclusión

Construir un sistema RAG nativo sobre TypeScript y PostgreSQL demuestra que es posible obtener control total sobre la canalización de Inteligencia Artificial sin introducir frameworks externos opacos. Esta arquitectura garantiza **alta mantenibilidad, independencia de proveedores y alineación completa con los patrones de diseño de software empresarial**.
