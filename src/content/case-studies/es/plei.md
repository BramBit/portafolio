---
title: "PLEI — Plataforma de formación y búsqueda híbrida"
slug: "plei"
impactSummary: "Desarrollé la mayor parte de Smart Search, con tres vías de recuperación y RRF ponderado, y contribuí al frontend, multimedia y soporte."
summary: "Contribuciones frontend y backend a una plataforma de formación y recursos para profesionales de estética."
technologies:
  - "PHP"
  - "Laravel"
  - "React"
  - "PostgreSQL"
  - "pgvector"
  - "MySQL"
  - "Redis"
  - "Vite"
  - "Vitest"
  - "Playwright"
company: "Belvi Digital SAS"
role: "Frontend → Full Stack Developer"
timeframe: "dic. 2023 – may. 2026"
publishedAt: 2026-08-04
---

## Contexto y problema

PLEI es una plataforma e-learning y biblioteca de recursos para profesionales de estética. La búsqueda anterior dependía de Algolia y debía recuperar cursos, lecciones y otros materiales con reglas de acceso distintas. También se trabajó en organización del panel administrativo, procesamiento multimedia y soporte a incidentes.

## Mi contribución

Desarrollé la mayor parte de `Services/SmartSearch/` y participé en frontend y backend. La fachada Laravel `Facades/Ai.php` y parte de las factorías y estrategias fueron desarrolladas por otro integrante.

## Smart Search: tres vías y fusión de rankings

El motor combina: búsqueda vectorial con embeddings en PostgreSQL/pgvector e índice HNSW; búsqueda full-text con `tsvector`, `websearch_to_tsquery` y `ts_rank`; y coincidencias por título mediante `ILIKE`. Las clasificaciones se fusionan con Reciprocal Rank Fusion ponderado. Un índice `pg_trgm` acelera consultas `ILIKE`.

La visibilidad del contenido depende de rol, jerarquía, marca, línea y otras reglas de acceso. El sistema aplica estas restricciones en el flujo de resultados.

## Embeddings, caché y multimedia

Los cambios de entidades pueden pasar por Eloquent Model Events, Observer/`HasEmbedding`, `GenerateEmbeddingJob`, `EmbeddingGenerationService` y un procesador según la entidad, hasta PostgreSQL/pgvector. También se utilizaron comandos Artisan para reconstrucción e indexación. Redis participa en la caché de búsqueda mediante `Cache::tags()->remember()`.

Contribuí a conversión de imágenes a WebP, procesamiento de video con FFmpeg, optimización de audio, reprocesamiento de archivos y detección de recursos sin referencias. Estos recursos se archivaban en AWS S3 Glacier Instant Retrieval.

## Soporte y frontend

Un webhook de Sentry validado con HMAC-SHA256 inicia un job asíncrono. El análisis asistido por LLM utiliza descripción y stacktrace, y envía información a Microsoft Teams. Un flujo separado recupera contexto para responder consultas de soporte; bugs y sugerencias pueden originar tickets.

Contribuí a reorganizar el frontend React por contextos y desarrollé módulos del panel para cursos, lecciones, seminarios, favoritos, autenticación y help center. Escribí pruebas unitarias con Vitest y parte de las pruebas E2E con Playwright. Otro integrante completó la migración de configuración a Vite.

## Implementación y resultados

Smart Search sustituyó la integración previa con Algolia. Mi trabajo también abarcó generación de embeddings, procesamiento multimedia, análisis de incidentes, interfaces administrativas y pruebas junto al equipo.
