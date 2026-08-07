---
title: "Multi-purpose E-Learning Platform & Applied AI Infrastructure"
slug: "plei"
summary: "Educational distribution platform featuring automated multimedia optimization, AI-assisted error triage via Sentry/Teams, and hybrid search integration."
problem: "Distributing educational courses, marketing material, and medical training resources to aesthetic centers required high performance, efficient media asset management, reliable error triage, and automated cross-platform recommendations."
solution: "Delivered a full-stack e-learning architecture incorporating automated asset compression, an integrated AI platform layer, automated error analysis via Sentry and Microsoft Teams webhooks, and backend-to-backend integration."
architecture: "Hybrid architecture leveraging a Laravel (PHP/MySQL) backend coupled with a dedicated PostgreSQL instance (`pgvector`, `tsvector`, `pg_trgm`) for AI functionalities. Frontend transitioned from React 16 to Vite with TypeScript and Redux Saga."
implementation: "Full-stack implementation covering a 40% progressive migration from legacy React to Vite, unit testing setup with Vitest, automated image/video optimization pipelines, AI error diagnosis automation, and B2B API integrations."
challenges: "Modernizing build tooling and testing pipelines without disrupting live users, executing automatic media optimization prior to storage, and orchestration of cross-platform recommendations."
results: "Accelerated frontend build times, established unit testing coverage, automated bug reporting and preliminary AI diagnosis for engineering teams, and unified education with device telemetry."
technologies:
  - "React"
  - "TypeScript"
  - "Vite"
  - "Redux Saga"
  - "Vitest"
  - "Laravel"
  - "PHP"
  - "MySQL"
  - "PostgreSQL"
  - "pgvector"
  - "Redis"
publishedAt: 2024-11-15
---

## Problema

La formación técnica en el uso de dispositivos médicos estéticos y la distribución de recursos comerciales para clínicas afiliadas requerían una plataforma e-learning centralizada.

El sistema debía manejar un volumen considerable de contenido multimedia (cursos, videos, guías de marketing) manteniendo altos estándares de velocidad y optimización de almacenamiento. Asimismo, se requería una vía eficiente para diagnosticar errores reportados en producción por usuarios y coordinar recomendaciones educativas personalizadas según el equipamiento que cada centro estético poseía.

## Solución

Se diseñó e implementó una infraestructura e-learning multipropósito acompañada de herramientas de automatización e inteligencia aplicada:

- **Plataforma E-Learning:** Distribución estructurada de cursos, material educativo y recursos de marketing.
- **Optimización Multimedia Automática:** Pipeline que procesa e inspecciona archivos cargados por administradores, comprimiendo y adaptando formatos automáticamente antes del almacenamiento.
- **Asistencia Inteligente y Triage de Incidencias:** Asistente conversacional capaz de analizar capturas de pantalla y diagnósticos preliminares enviando alertas enriquecidas a los desarrolladores vía Microsoft Teams.
- **Automatización de Errores con Sentry:** Procesamiento de excepciones de producción mediante IA para generar análisis estructurados distribuibles internamente.
- **Capacidades Inteligentes Integradas:** Incorporación de un sistema RAG personalizado y un motor de búsqueda híbrido (Smart Search) para localización de recursos.
- **Integración Backend-to-Backend:** Comunicación con plataformas de telemetría de dispositivos para sugerir contenido educativo contextualizado.

## Arquitectura

La plataforma utiliza una arquitectura híbrida adaptada a sus necesidades operativas:

- **Backend Principal:** Laravel (PHP) con MySQL y ORM Eloquent para la gestión de usuarios, cursos, trabajos asincrónicos (*Jobs*) y ciclo de vida de la aplicación.
- **Capa de IA Dedicada:** Base de datos PostgreSQL independiente (`pgvector`, `tsvector`, `pg_trgm`) para el soporte vectorial, semántico y difuso de las capacidades de inteligencia artificial.
- **Frontend Modernizado:** Interfaz en React y TypeScript utilizando Redux Saga para la orquestación de efectos secundarios y Vite como empaquetador principal.

## Implementación

### Frontend
- **Migración Progresiva:** Liderada en un 40% para actualizar la arquitectura base desde React 16 hacia Vite, mejorando tiempos de empaquetado y rendimiento de desarrollo.
- **Infraestructura de Testing:** Configuración e implementación desde cero de pruebas unitarias automatizadas con Vitest.

### Full Stack e Integraciones
- **Pipeline de Recursos:** Procesamiento automático asincrónico para redimensionamiento y optimización de imágenes y contenidos multimedia.
- **Integración Backend-to-Backend:** Endpoints seguros de comunicación entre servicios para cruzar información de equipos médicos y recomendar programas educativos relevantes.

## Retos

- **Modernización sin Interrupción:** Migrar la pila de compilación del frontend a Vite manteniendo la estabilidad operacional.
- **Optimización Multimedia:** Reducir el consumo de almacenamiento sin degradar la calidad visual de los recursos educativos.
- **Orquestación de Diagnósticos:** Integrar eventos de Sentry y reportes de usuario con modelos LLM para generar diagnósticos concisos y notificar al equipo de desarrollo en tiempo real.

## Resultado

- Reducidos sensiblemente los tiempos de carga y costos de almacenamiento mediante la optimización multimedia automatizada.
- Establecida la primera suite de pruebas unitarias en el frontend con Vitest.
- Automatizada la clasificación y diagnóstico de incidencias de producción, reduciendo el tiempo de atención del equipo de ingeniería.
- Conectado el ecosistema educativo con el uso real de dispositivos mediante integraciones Backend-to-Backend.
