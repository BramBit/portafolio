---
title: "PLEI — Plataforma E-Learning e Infraestructura de IA"
slug: "plei"
impactSummary: "Reemplacé Algolia por un motor de búsqueda híbrido a la medida y desarrollé capacidades de RAG y automatización para la plataforma."
summary: "Ingeniería Frontend y Full Stack sobre una plataforma e-learning: migración a Vite, motor de búsqueda híbrido en PostgreSQL y triage asistido por IA."
technologies:
  - "PHP"
  - "Laravel"
  - "React"
  - "TypeScript"
  - "PostgreSQL"
  - "pgvector"
  - "RAG"
  - "MySQL"
  - "Redis"
  - "Vite"
company: "Belvi Digital"
role: "Frontend → Full Stack Developer"
timeframe: "dic. 2023 – may. 2026"
publishedAt: 2026-08-04
---

## Contexto del Producto y Problema

PLEI es una plataforma e-learning y de recursos comerciales construida para apoyar el ecosistema de clientes de Belvi Digital (clínicas estéticas y profesionales médicos). Su catálogo distribuye cursos en video, capacitaciones para el uso de equipos médicos y materiales de marketing.

La plataforma enfrentaba dos problemas críticos de ingeniería:
1. **Búsqueda limitada y costosa:** El motor original sobre Algolia implicaba un costo de suscripción externo creciente y no comprendía la naturaleza heterogénea del contenido (lecciones, documentos técnicos y videos), limitándose a coincidencias de texto plano sin comprensión semántica.
2. **Deuda técnica en frontend y triage de soporte:** La interfaz arrastraba un setup heredado en React 16 con tiempos de compilación lentos y sin pruebas automatizadas, mientras que el triage de errores en producción consumía tiempo recurrente de ingeniería.

## Rol y Responsabilidad Individual

Me incorporé al equipo frontend durante la migración de React 16 a Vite (asumiendo de forma directa cerca del 40% del proceso de migración y construyendo su primera suite de pruebas automatizadas con Vitest). Posteriormente pasé a responsabilidades full stack en el backend Laravel/PHP:
- Diseño y desarrollo completo del motor de búsqueda híbrido *Smart Search* que sustituyó a Algolia.
- Implementación del pipeline de embeddings asíncrono con base de datos dual (MySQL + PostgreSQL/pgvector).
- Optimización de activos multimedia y archivado automático en AWS S3.
- Automatización del análisis de incidentes de Sentry asistido por IA y notificación a Microsoft Teams.

## Funcionalidades Implementadas

1. **Smart Search Híbrido Multiseñal:** Pipeline de recuperación que orquesta cuatro señales complementarias:
   - *Búsqueda vectorial:* Similitud semántica de intenciones con embeddings en `pgvector`.
   - *Búsqueda de texto completo:* Coincidencia léxica mediante `tsvector` y `websearch_to_tsquery`.
   - *Búsqueda difusa:* Tolerancia a errores tipográficos y variaciones ortográficas con `pg_trgm`.
   - *Concordancia exacta:* Priorización de títulos directos de cursos y lecciones.
2. **Ranking Unificado con Reciprocal Rank Fusion (RRF):** Algoritmo que combina las cuatro señales en función de la posición ordinal relativa de cada resultado, eliminando el problema de comparar puntuaciones con escalas incompatibles.
3. **Pipeline Asíncrono de Embeddings:** Arquitectura dual que mantiene la lógica relacional en MySQL y sincroniza los vectores en PostgreSQL mediante Observers de Eloquent, colas de trabajo y comandos Artisan programados.
4. **Optimización Multimedia en AWS S3:** Pipeline para la conversión automática de imágenes a formato WebP, compresión de video/audio de lecciones y políticas de archivado automático de recursos sin uso.
5. **Triage de Errores Asistido por IA:** Servicio que captura eventos de error en Sentry, analiza la traza de ejecución y el contexto con un LLM, y genera diagnósticos preliminares distribuidos a canales de Microsoft Teams mediante webhooks.

## Retos Técnicos y Decisiones de Arquitectura

- **Reemplazo integral de Algolia sin degradación de velocidad:** Sustituir un producto especializado por un desarrollo propio exigió optimizar consultas SQL complejas para que la combinación de cuatro señales respondiera dentro de los márgenes de latencia requeridos por la experiencia de usuario.
- **Autorización y Visibilidad en la Capa de Datos:** Un recurso relevante semánticamente no debe exponerse si el usuario no cuenta con la membresía adecuada. Las políticas de control de acceso se integraron directamente en las sentencias de base de datos antes de calcular el ranking final.
- **Capa de Fachada Unificada:** Para evitar que cada módulo del producto construyera su propia integración de IA, se diseñó una fachada centralizada en Laravel que desacopló los proveedores de modelos y permitió reutilizar la infraestructura en búsqueda, soporte y análisis de errores.

## Resultados Verificables

- Reemplazo total y definitivo de Algolia, eliminando la dependencia externa y los costos mensuales de suscripción.
- Modernización de la arquitectura frontend sobre Vite y establecimiento de la primera suite de pruebas con Vitest.
- Motor de búsqueda híbrido operando en producción sobre el catálogo de cursos y recursos de la plataforma.
- Triage automatizado de incidentes operando en Teams, reduciendo el tiempo de análisis inicial de errores en producción.
