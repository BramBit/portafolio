---
title: "Construyendo un Sistema RAG Desde Cero"
slug: "rag-desde-cero"
excerpt: "Cómo se construye un pipeline de Retrieval-Augmented Generation sin framework y se mantiene intercambiable a nivel de proveedor de LLM."
readingTime: "9 min"
tags:
  - "RAG"
  - "Embeddings"
  - "pgvector"
  - "LLM"
  - "Architecture"
tldr: "Dos pipelines RAG en producción, construidos sin framework, con el proveedor de LLM intercambiable y el costo controlado mediante caché."
publishedAt: 2026-08-01
---

La diferencia apareció en la implementación. Zeus permitió integrar el RAG directamente dentro de un Backend basado en DDD y Arquitectura Hexagonal. PLEI llevó el problema más lejos: procesamiento documental, OCR, deduplicación mediante hash, diferentes tipos de documentos y una infraestructura de IA reutilizable.

---

# 1. El problema real detrás de un RAG

Un modelo de lenguaje puede generar una respuesta sin conocer los datos privados de una aplicación.

Ese es precisamente el problema.

Si una plataforma necesita responder utilizando documentación o conocimiento específico del producto, enviar únicamente la pregunta al modelo no garantiza que la información necesaria esté disponible.

La solución fue introducir una etapa de **retrieval** antes de la generación:

```text
Pregunta
   ↓
Embedding de consulta
   ↓
Recuperación
   ↓
Contexto relevante
   ↓
LLM
   ↓
Respuesta
```

El modelo deja de ser la fuente primaria de conocimiento. Su función pasa a ser interpretar la consulta y generar una respuesta utilizando contexto recuperado por el sistema.

---

# 2. ¿Por qué construir el pipeline directamente?

En Zeus ya existía una arquitectura Backend basada en **Domain-Driven Design y Arquitectura Hexagonal**.

La decisión fue no introducir un framework de RAG que terminara imponiendo sus propias convenciones sobre la arquitectura existente.

En lugar de eso, el pipeline se construyó como una capacidad integrada en el sistema:

```text
Aplicación
    │
    ▼
RAG
 ┌──┼───────────────┐
 ▼  ▼               ▼
Ingesta  Retrieval  Inferencia
 │          │          │
 ▼          ▼          ▼
Docs     pgvector     LLM
```

La decisión no fue evitar frameworks por principio. Fue mantener el control sobre las piezas que realmente formaban parte de la arquitectura del producto.

---

# 3. La arquitectura común

Aunque Zeus y PLEI eran productos diferentes, ambos sistemas comparten el mismo flujo conceptual.

## Indexación

```text
Documento
    ↓
Procesamiento
    ↓
Chunking
    ↓
Embeddings
    ↓
PostgreSQL + pgvector
```

## Consulta

```text
Pregunta
    ↓
Embedding
    ↓
Retrieval
    ↓
Chunks relevantes
    ↓
Construcción de contexto
    ↓
LLM
    ↓
Respuesta
```

La separación es importante: la indexación ocurre antes de la consulta. Cuando llega una pregunta, el sistema no necesita volver a procesar todos los documentos.

---

# 4. Primera implementación: Zeus

## Contexto

Zeus es una plataforma IoT orientada a la administración de dispositivos médicos estéticos.

Su Backend utiliza Node.js, TypeScript, Express y PostgreSQL, dentro de una arquitectura que incorpora DDD, Arquitectura Hexagonal y procesamiento asincrónico.

## Problema

La plataforma necesitaba proporcionar respuestas utilizando información propia del producto.

Enviar solamente la pregunta al LLM no garantizaba que el modelo conociera la documentación interna.

La solución requería construir una capa de recuperación antes de generar la respuesta.

## Implementación

Diseñé e implementé una arquitectura RAG integrada dentro del Backend de Zeus.

```text
Documento
   ↓
Ingesta
   ↓
Procesamiento
   ↓
Chunking
   ↓
Embeddings
   ↓
PostgreSQL + pgvector
   ↓
Consulta del usuario
   ↓
Embedding de consulta
   ↓
Recuperación semántica
   ↓
Construcción de contexto
   ↓
LLM
   ↓
Respuesta
```

## Procesamiento documental

La solución contempla procesamiento de documentos, extracción de texto, segmentación, generación de embeddings, almacenamiento vectorial y recuperación semántica.

PostgreSQL con `pgvector` se utiliza para almacenar los vectores.

## ¿Por qué pgvector?

PostgreSQL ya formaba parte de la infraestructura de Zeus. Utilizar `pgvector` permitió incorporar almacenamiento y recuperación vectorial sin crear una infraestructura de persistencia independiente únicamente para el RAG.

La decisión mantuvo el sistema cerca de las abstracciones existentes.

## Resultado

### Antes

La plataforma necesitaba una forma de proporcionar conocimiento propio del producto al modelo antes de generar una respuesta.

### Después

Zeus incorporó una infraestructura de recuperación de conocimiento que permite utilizar documentación interna como contexto para modelos de lenguaje.

---

# 5. Segunda implementación: PLEI

PLEI es una plataforma e-learning utilizada para distribuir contenido educativo y recursos orientados al desarrollo de los clientes de Belvi.

Aquí el objetivo volvió a ser incorporar IA sobre información propia de la plataforma.

La diferencia fue que el problema dejó de ser únicamente "recuperar contexto".

También había que construir la infraestructura para producir ese contexto.

---

# 6. Una infraestructura de IA reutilizable

PLEI no necesitaba que el RAG existiera solamente para un chatbot.

La infraestructura debía poder reutilizarse para distintas capacidades:

```text
                 AI Facade
                     │
          ┌──────────┼──────────┐
          ▼          ▼          ▼
      Embeddings  Retrieval  Inferencia
          │          │          │
          └──────────┼──────────┘
                     ▼
                 Funciones
                  de IA
```

El Backend dispone de abstracciones para:

- generación de embeddings;
- inferencia;
- selección de proveedor;
- procesamiento documental;
- recuperación;
- búsqueda;
- análisis.

La razón fue evitar que cada funcionalidad implementara directamente su integración con el proveedor.

---

# 7. Mantener el proveedor de IA intercambiable

La integración se diseñó mediante una abstracción basada en estrategias.

```text
Aplicación
    │
    ▼
AI Facade
    │
    ▼
Strategy / Provider
    ├── OpenAI
    └── Ollama
```

La estrategia encapsula detalles específicos del proveedor, como modelo, dimensiones de embedding y parámetros de inferencia.

La aplicación consume la capacidad de IA a través de la abstracción.

Esto permite cambiar la implementación concreta sin propagar dependencias de proveedor por el resto del sistema.

---

# 8. El verdadero cuello de botella: los documentos

Un RAG no comienza con el LLM.

Comienza con los datos.

Un documento completo no es una unidad adecuada para enviarlo directamente a un modelo. Primero debe convertirse en unidades recuperables.

En PLEI se implementó un pipeline documental:

```text
Documento
    ↓
Registro
    ↓
Hash SHA-256
    ↓
S3
    ↓
Extracción de texto
    ↓
OCR cuando corresponde
    ↓
Limpieza
    ↓
Detección de tipo
    ↓
Chunking
    ↓
Embeddings
    ↓
PostgreSQL + pgvector
```

Cada etapa resuelve un problema concreto.

---

# 9. Evitar reprocesamiento innecesario

Antes de ejecutar todo el pipeline, el documento se identifica mediante un hash SHA-256.

```text
Documento
    ↓
SHA-256
    ↓
¿Ya existe?
 ┌──┴──────────────┐
 │                 │
Sí                 No
 │                 │
Detener          Procesar
```

Si el documento ya fue procesado, no es necesario repetir todo el trabajo de extracción, chunking y generación de embeddings.

Esto convierte el pipeline en un proceso idempotente respecto de documentos ya indexados.

---

# 10. Cuando el PDF no contiene texto

No todos los PDFs contienen texto real.

Algunos son esencialmente imágenes escaneadas.

Por eso el pipeline verifica la cantidad de texto extraíble:

```text
PDF
 │
 ▼
Extracción
 │
 ├── Texto suficiente ──────► continuar
 │
 └── Texto insuficiente ───► OCR
                                  │
                                  ▼
                              Tesseract
                                  │
                                  ▼
                              continuar
```

El OCR permite incorporar documentos escaneados al mismo flujo de conocimiento.

No es una característica aislada: es una etapa de normalización previa a la indexación semántica.

---

# 11. Chunking: convertir documentos en unidades recuperables

Una vez obtenido el texto, hay que dividirlo.

Para documentos normales se implementó una segmentación aproximada de:

- **800 caracteres por chunk**
- **100 caracteres de overlap**

Además, se intenta cortar sobre límites razonables como espacios y puntos.

```text
Documento
──────────────────────────────────────────

[ Chunk 01 ......................... ]
                    overlap
             [ Chunk 02 ......................... ]
                                    overlap
                             [ Chunk 03 ......................... ]
```

El overlap conserva parte del contexto entre fragmentos consecutivos.

El objetivo es evitar que una información relevante quede partida de forma que ninguno de los fragmentos tenga suficiente contexto para ser recuperado correctamente.

---

# 12. Las FAQ necesitan otra estrategia

Una FAQ tiene una estructura semántica distinta a un documento normal:

```text
Pregunta
   +
Respuesta
```

Por eso el pipeline intenta identificar este tipo de documento y segmentarlo alrededor de preguntas y respuestas, en lugar de aplicar únicamente una división por tamaño.

La decisión importante es que el chunking depende de la estructura del contenido.

No existe una única estrategia de fragmentación que sea adecuada para cualquier documento.

---

# 13. Embeddings y pgvector

Cada chunk se transforma en una representación vectorial.

```text
"¿Cómo configurar un dispositivo?"
                │
                ▼
          Embedding Model
                │
                ▼
       [0.021, -0.184, ...]
                │
                ▼
             pgvector
```

Cuando llega una consulta, la pregunta también se transforma en un vector.

El sistema puede recuperar los fragmentos semánticamente próximos a esa consulta.

```text
Consulta
   ↓
Embedding
   ↓
pgvector
   ↓
Chunks relevantes
```

PostgreSQL vuelve a actuar como parte central de la infraestructura: almacena los datos del producto y sus representaciones vectoriales.

---

# 14. De los chunks a la respuesta

Una vez indexado el conocimiento, la consulta puede seguir un flujo compacto:

```text
Pregunta
   ↓
Embedding
   ↓
Retrieval
   ↓
Contexto recuperado
   ↓
Prompt
   ↓
LLM
   ↓
Respuesta
```

El sistema no procesa nuevamente los documentos con cada pregunta.

La indexación es una fase previa. La consulta utiliza las representaciones que ya fueron generadas.

---

# 15. Mantener la respuesta anclada al contexto

Para los chatbots construidos sobre estas capacidades se utilizó una estrategia de `System Prompt` que orienta la respuesta hacia el contexto recuperado.

```text
Pregunta ─────────────┐
                      ▼
              System Prompt
                      ▲
                      │
             Contexto recuperado
                      │
                      ▼
                     LLM
                      │
                      ▼
                  Respuesta
```

La finalidad no es afirmar que un LLM jamás puede equivocarse.

La finalidad es reducir el espacio de respuesta y hacer que la generación se base en la información que la aplicación recuperó desde su propia base documental.

---

# 16. Controlar el costo del pipeline

Un sistema RAG puede implicar operaciones costosas: generación de embeddings, retrieval e inferencia.

Por eso la arquitectura también debe evitar trabajo repetido cuando sea posible.

En PLEI se utilizó Redis como parte de una estrategia de caché:

```text
Consulta
   ↓
¿Cache?
 ┌─┴─────────────┐
 │               │
Hit             Miss
 │               │
 ▼               ▼
Resultado      Retrieval
reutilizado        │
                   ▼
                  LLM
                   │
                   ▼
                 Cache
```

La caché no reemplaza al retrieval.

Es una capa para reutilizar resultados cuando el escenario permite hacerlo.

---

# 17. Zeus y PLEI: dos implementaciones, una misma idea

| | Zeus | PLEI |
|---|---|---|
| Producto | Plataforma IoT | Plataforma e-learning |
| Objetivo | Conocimiento propio del producto | Conocimiento propio de la plataforma |
| Backend | Node.js / TypeScript / Express | Laravel |
| Vector store | PostgreSQL + pgvector | PostgreSQL + pgvector |
| Procesamiento documental | Sí | Sí |
| Embeddings | Sí | Sí |
| Retrieval | Semántico | Sobre conocimiento documental |
| Proveedores | OpenAI / Ollama | OpenAI / Ollama |
| Arquitectura destacada | DDD + Hexagonal | Infraestructura de IA reutilizable |
| Reto principal | Integración arquitectónica | Procesamiento y reutilización |

La infraestructura conceptual es similar.

La implementación no.

Y esa diferencia es precisamente lo interesante.

---

# 18. Qué partes del sistema son realmente reutilizables

Después de construir el patrón dos veces, es posible separar el núcleo RAG de las decisiones específicas del producto.

## Núcleo

```text
Documento
   ↓
Procesamiento
   ↓
Chunking
   ↓
Embeddings
   ↓
Vector Store
   ↓
Retrieval
   ↓
Context
   ↓
LLM
```

## Decisiones específicas

```text
RAG
 │
 ├── Chunking
 │     ├── documento normal
 │     └── FAQ
 │
 ├── Provider
 │     ├── OpenAI
 │     └── Ollama
 │
 └── Procesamiento
       ├── Zeus
       └── PLEI
```

El patrón permanece.

Las decisiones de implementación cambian según el dominio, los datos y la arquitectura existente.

---

# 19. Lo que cambió entre la primera y la segunda implementación

La primera implementación respondió principalmente a:

> ¿Cómo recupero conocimiento propio antes de generar una respuesta?

La segunda obligó a responder preguntas adicionales:

> ¿Cómo convierto documentos heterogéneos en conocimiento indexable?

> ¿Cómo evito reprocesar el mismo documento?

> ¿Qué hago cuando un PDF es esencialmente una imagen?

> ¿Cómo trato una FAQ de forma diferente a un documento normal?

> ¿Cómo reutilizo la infraestructura de IA para más de una funcionalidad?

El aprendizaje importante fue que integrar un modelo de lenguaje y construir infraestructura alrededor de modelos de lenguaje son problemas diferentes.

---

# 20. Antes y después

## Zeus

**Antes**

La plataforma necesitaba utilizar información propia del producto para generar respuestas, pero esa información debía estar disponible mediante una capa de recuperación.

**Después**

Se incorporó un pipeline RAG integrado al Backend:

```text
Documentación
    ↓
Procesamiento
    ↓
Embeddings
    ↓
pgvector
    ↓
Retrieval
    ↓
Contexto
    ↓
LLM
```

El conocimiento propio del producto pasó a formar parte del flujo de generación.

## PLEI

**Antes**

La plataforma necesitaba incorporar IA sobre información propia, pero una integración directa de cada funcionalidad con el proveedor no resolvía el procesamiento documental ni ofrecía una infraestructura común.

**Después**

Se construyó una infraestructura reutilizable con:

```text
AI Facade
   ↓
Provider Strategy
   ├── OpenAI
   └── Ollama

Document Pipeline
   ├── SHA-256
   ├── S3
   ├── extracción
   ├── OCR
   ├── limpieza
   ├── clasificación
   ├── chunking
   ├── embeddings
   └── pgvector
```

La plataforma obtuvo una base común para funcionalidades de IA que utilizan conocimiento propio.

---

# 21. La parte difícil no era llamar al LLM

Un RAG puede parecer una secuencia corta:

```text
Embedding
   ↓
Vector DB
   ↓
LLM
```

En un producto real, el trabajo aparece alrededor de esas tres piezas.

Hay que decidir:

- qué documentos entran;
- cómo se extrae su contenido;
- cuándo utilizar OCR;
- cómo detectar documentos repetidos;
- cómo dividir el contenido;
- cómo representar cada fragmento;
- dónde almacenar los vectores;
- cómo recuperar contexto;
- cómo construir el prompt;
- cómo desacoplar el proveedor;
- cómo evitar trabajo repetido;
- cómo integrar todo dentro de la arquitectura existente.

El LLM es solamente una pieza.

La ingeniería está en construir todo lo que ocurre antes y alrededor de él.

---

# Conclusión

Construir un RAG una vez permite entender el mecanismo.

Construirlo nuevamente en otro producto permite distinguir qué pertenece al patrón y qué depende del contexto.

En Zeus, el reto principal fue integrar la recuperación de conocimiento dentro de un Backend con una arquitectura ya definida.

En PLEI, el problema se amplió hacia una infraestructura documental y de IA reutilizable: deduplicación, extracción, OCR, clasificación, chunking, embeddings, almacenamiento vectorial y abstracción de proveedores.

La conclusión es simple:

> **Un RAG no es un LLM conectado a una base vectorial. Es un sistema de recuperación de conocimiento integrado dentro de una arquitectura de software.**

El modelo genera la respuesta.

La aplicación decide qué conocimiento puede llegar hasta él.
