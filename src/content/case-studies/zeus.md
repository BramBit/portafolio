---
title: "IoT Platform & RAG Systems for Medical Equipment Management"
slug: "zeus"
summary: "Scalable IoT telemetry platform processing Pay-Per-Shot commercial models, custom RAG architecture, vector search, and automated financial report generation."
problem: "Managing dermatological medical devices under a Pay-Per-Shot business model required real-time tracking, reliable operational/financial telemetry consolidation, automated reporting, and intelligent support systems for clinical staff without relying on external SaaS overhead."
solution: "Built a domain-driven, event-driven platform integrating IoT device consumption tracking, automated financial reporting via RabbitMQ event bus, digital wallet management, and a custom embedded RAG infrastructure with AI assistants."
architecture: "Hexagonal Architecture with Domain-Driven Design (DDD) for clear boundary separation. Event-Driven Architecture utilizing RabbitMQ as an event bus, Redis for caching, PostgreSQL + pgvector for vector search, and a Strategy Pattern abstraction for LLM providers."
implementation: "Full-stack implementation featuring Next.js, Redux Toolkit, RTK Query, Material UI v5, Leaflet geolocation, i18n, and E2E testing with Playwright on Frontend; Node.js, Express, TypeScript, TypeORM, RabbitMQ, Redis, pgvector, and automated PDF/Markdown chunking pipelines on Backend."
challenges: "Decoupling AI LLM providers to avoid vendor lock-in across environments, maintaining event consistency during high-volume shot consumption telemetry, and generating asynchronous monthly financial statements."
results: "Unified device management, automated end-to-end financial reporting and wallet reconciliation, reduced AI token overhead via strategic caching, and provided instant contextual support to medical equipment operators."
technologies:
  - "Node.js"
  - "TypeScript"
  - "Express"
  - "PostgreSQL"
  - "pgvector"
  - "RabbitMQ"
  - "Redis"
  - "Next.js"
  - "React"
  - "Redux Toolkit"
  - "RTK Query"
  - "Playwright"
publishedAt: 2024-05-08
---

## Problema

La administración de dispositivos médicos utilizados en tratamientos dermatológicos y estéticos requería soportar un modelo de negocio basado en **Pay-Per-Shot**, donde cada procedimiento genera un consumo medido por la cantidad de disparos lumínicos ejecutados por los equipos.

El reto principal residía en centralizar la operación, telemetría y facturación comercial de múltiples clínicas y usuarios (clientes, managers y administradores), consolidando métricas operativas y financieras precisas. Además, la plataforma demandaba soporte técnico asistido e inteligibilidad documental sin depender de marcos o servicios externos inflexibles.

## Solución

Se diseñó e implementó una solución integral que centraliza el monitoreo de dispositivos, la consolidación financiera y la asistencia técnica inteligente:

- **Plataforma IoT y Telemetría:** Procesamiento de métricas de consumo Pay-Per-Shot y unificación de estadísticas operativas.
- **Sistema RAG Personalizado:** Infraestructura nativa de recuperación aumentada por generación para ingesta documental y soporte en tiempo real.
- **Asistentes Conversacionales Especializados:** Asistentes basados en System Prompts restringidos al conocimiento documental interno para atención de preguntas frecuentes y gestión de PQRS.
- **Automatización de Reportes Financieros:** Consolidación mensual automatizada de consumo enviada por correo electrónico a clientes y managers.
- **Integración de Billetera Digital (Wallet):** Unificación de recargas, consumos y movimientos financieros dentro del ecosistema.

## Arquitectura

La arquitectura Backend fue construida sobre principios de **Arquitectura Hexagonal (Ports & Adapters)** y **Domain-Driven Design (DDD)**, desacoplando la lógica de dominio de los mecanismos de infraestructura y persistencia.

- **Event Bus:** RabbitMQ para comunicación asincrónica y desacoplada entre eventos de dominio (consumos, facturación).
- **Caché & Performance:** Redis para optimización de consultas recurrentes e indicadores en tiempo real.
- **Búsqueda Vectorial:** PostgreSQL con la extensión `pgvector` para el almacenamiento y recuperación de embeddings del sistema RAG.
- **Desacoplamiento de IA:** Implementación del **Strategy Pattern** para abstraer proveedores de modelos LLM (OpenAI y alternativos), permitiendo cambiar de proveedor según el entorno sin alterar la lógica de negocio.

## Implementación

La solución abarcó implementaciones de extremo a extremo en ambas capas de la aplicación:

### Backend
- **Pipeline RAG:** Ingesta de documentos PDF y Markdown, segmentación (*chunking*), generación de embeddings y persistencia vectorial en PostgreSQL (`pgvector`).
- **Reportes Financieros:** Procesos programados (Cron Jobs) y consumidores de eventos en RabbitMQ para consolidación mensual y generación dinámica de reportes HTML transaccionales.
- **APIs RESTful:** Modelado de entidades y endpoints bajo TypeScript strict y TypeORM.

### Frontend
- **Arquitectura:** Desarrollada en Next.js, React y TypeScript con estado global centralizado en Redux Toolkit y RTK Query.
- **Geolocalización:** Módulo interactivo con Leaflet para mapeo y análisis de cobertura de clínicas.
- **Internacionalización (i18n):** Infraestructura nativa desde cero con soporte dinámico para Español e Inglés.
- **Pruebas End-to-End:** Suite automatizada con Playwright para validación de flujos críticos previa a despliegues.

## Retos

- **Abstracción de Proveedores LLM:** Diseñar una capa de abstracción basada en Strategy Pattern que encapsulara diferencias entre modelos de embeddings y motores de inferencia sin impactar el dominio.
- **Consistencia en Mensajería Asíncrona:** Garantizar el procesamiento confiable de eventos de facturación y consumo Pay-Per-Shot mediante RabbitMQ sin pérdida de datos.
- **Aislamiento de Respuestas de IA:** Diseñar estrategias de System Prompting rigurosas que limitaran las respuestas de los chatbots exclusivamente al contexto extraído de la base documental procesada.

## Resultado

- Consolidadas las operaciones de dispositivos estéticos bajo un esquema Pay-Per-Shot automatizado y auditable.
- Automatizada la generación y distribución de reportes financieros mensuales reduciendo la carga operativa manual.
- Infraestructura RAG e inteligencia artificial integrada nativamente en la arquitectura Hexagonal existente sin dependencias de servicios de terceros costosos.
- Suite de pruebas E2E y sistema i18n desplegados asegurando alta mantenibilidad y calidad en producción.
