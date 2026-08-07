---
title: "Smart Search: Reemplazando Motores de Búsqueda Tradicionales con Búsqueda Híbrida Multi-Etapa"
slug: "smart-search"
excerpt: "Diseño de un motor de búsqueda híbrido sobre PostgreSQL integrando pgvector, tsvector y pg_trgm para superar las limitaciones de herramientas de búsqueda de texto plano."
readingTime: "7 min read"
tags:
  - "PostgreSQL"
  - "pgvector"
  - "Search Engines"
  - "Hybrid Search"
  - "Database Optimization"
publishedAt: 2024-10-10
---

Los motores de búsqueda tradicionales basados en coincidencia de texto plano (o servicios externos SaaS como Algolia/Elasticsearch) enfrentan limitaciones estructurales cuando los usuarios buscan por intención conceptual en lugar de palabras clave exactas. Si un usuario busca *"técnicas para rejuvenecimiento facial en piel madura"*, la búsqueda léxica tradicional falla si el documento se titula *"Tratamientos con Pulso Lumínico IPL"*.

En este artículo técnico analizamos la arquitectura de un motor **Smart Search híbrido** implementado directamente sobre PostgreSQL, combinando recuperación vectorial, análisis Léxico/Full-Text y coincidencia difusa (*fuzzy matching*).

---

## 1. Las Tres Capas de la Búsqueda Híbrida

Para lograr alta precisión sin los costos operativos de servicios externos, orquestamos tres estrategias complementarias dentro del mismo motor relacional:

```
                          Consulta de Usuario
                                   │
         ┌─────────────────────────┼─────────────────────────┐
         ▼                         ▼                         ▼
  Búsqueda Vectorial       Búsqueda Léxica          Coincidencia Difusa
  (Semántica - pgvector)  (Full-Text - tsvector)      (Fuzzy - pg_trgm)
         │                         │                         │
         └─────────────────────────┼─────────────────────────┘
                                   ▼
                   Reciprocate Rank Fusion (RRF)
                                   │
                                   ▼
                         Resultados Reordenados
```

### 1. Búsqueda Semántica (`pgvector`)
Convierte la consulta a embeddings numéricos para evaluar la similitud del significado, permitiendo encontrar conceptos relevantes sin importar las palabras exactas empleadas.

### 2. Búsqueda de Texto Completo (`tsvector` & `tsquery`)
Efectúa análisis léxico avanzado con derivación de palabras (*stemming*), diccionarios en español e inglés y eliminación de palabras vacías (*stopwords*).

### 3. Coincidencia Difusa (`pg_trgm`)
Calcula la similitud de trigramas para tolerar errores tipográficos o variaciones de ortografía en títulos de recursos multimedia y nombres de cursos.

---

## 2. Definición del Esquema e Índices en PostgreSQL

```sql
CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE TABLE searchable_resources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    content_type VARCHAR(50) NOT NULL, -- 'video', 'document', 'course'
    
    -- Columna vectorial para búsqueda semántica
    embedding vector(1536),
    
    -- Columna tsvector para búsqueda léxica
    search_vector tsvector GENERATED ALWAYS AS (
        setweight(to_tsvector('spanish', coalesce(title, '')), 'A') ||
        setweight(to_tsvector('spanish', coalesce(description, '')), 'B')
    ) STORED,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Índices optimizados para cada estrategia
CREATE INDEX idx_resources_embedding ON searchable_resources USING hnsw (embedding vector_cosine_ops);
CREATE INDEX idx_resources_search_vector ON searchable_resources USING gin (search_vector);
CREATE INDEX idx_resources_title_trgm ON searchable_resources USING gin (title gin_trgm_ops);
```

---

## 3. Orquestación y Reciprocal Rank Fusion (RRF)

Ejecutar las tres búsquedas por separado genera puntuaciones con escalas incompatibles (distancia coseno vs. `ts_rank` vs. similitud trigrama). Para unificar y reordenar los resultados con precisión, empleamos el algoritmo **Reciprocal Rank Fusion (RRF)**.

### Consulta SQL RRF Unificada

```sql
WITH vector_search AS (
    SELECT id, RANK() OVER (ORDER BY embedding <=> $1 ASC) as rank
    FROM searchable_resources
    WHERE 1 - (embedding <=> $1) > 0.65
    LIMIT 20
),
text_search AS (
    SELECT id, RANK() OVER (ORDER BY ts_rank(search_vector, plainto_tsquery('spanish', $2)) DESC) as rank
    FROM searchable_resources
    WHERE search_vector @@ plainto_tsquery('spanish', $2)
    LIMIT 20
),
fuzzy_search AS (
    SELECT id, RANK() OVER (ORDER BY similarity(title, $2) DESC) as rank
    FROM searchable_resources
    WHERE title % $2 AND similarity(title, $2) > 0.3
    LIMIT 20
)
SELECT 
    r.id,
    r.title,
    r.content_type,
    COALESCE(1.0 / (60 + v.rank), 0.0) +
    COALESCE(1.0 / (60 + t.rank), 0.0) +
    COALESCE(1.0 / (60 + f.rank), 0.0) AS rrf_score
FROM searchable_resources r
LEFT JOIN vector_search v ON r.id = v.id
LEFT JOIN text_search t ON r.id = t.id
LEFT JOIN fuzzy_search f ON r.id = f.id
WHERE v.id IS NOT NULL OR t.id IS NOT NULL OR f.id IS NOT NULL
ORDER BY rrf_score DESC
LIMIT 10;
```

---

## 4. Ventajas Técnicas Obtenidas

- **Consistencia Transaccional:** Eliminación de retrasos de sincronización entre la base de datos primaria y un motor de búsqueda externo.
- **Reducción de Costos:** Eliminación de costos por volumen de operaciones en servicios SaaS de terceros.
- **Precisión Superior:** Capacidad de tolerar errores de tipeo en títulos y al mismo tiempo entender búsquedas complejas por intención educativa.
