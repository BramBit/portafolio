---
title: "Zeus — Plataforma IoT para dispositivos médicos"
slug: "zeus"
impactSummary: "Desarrollé un sistema RAG documental, un módulo de análisis predictivo y funciones de reportería y frontend dentro de una plataforma IoT existente."
summary: "Contribuciones backend y frontend a una plataforma de operación y facturación Pay-Per-Shot de dispositivos médicos estéticos."
technologies:
  - "TypeScript"
  - "Node.js"
  - "Express"
  - "TypeORM"
  - "PostgreSQL"
  - "pgvector"
  - "RabbitMQ"
  - "Next.js"
  - "React"
  - "Jest"
  - "Vitest"
company: "Belvi Digital SAS"
role: "Backend Developer (alcance Full Stack)"
timeframe: "dic. 2023 – may. 2026"
publishedAt: 2026-08-03
---

## Contexto y problema

Zeus era una plataforma IoT para administrar dispositivos médicos estéticos y facturar su consumo mediante el modelo Pay-Per-Shot. Se necesitaban herramientas para consultar documentación técnica de los equipos, analizar señales de desgaste y generar información financiera para los usuarios. Trabajé sobre un producto y una arquitectura existentes; RabbitMQ formaba parte de la infraestructura existente.

## Mi contribución

Como Backend Developer con alcance Full Stack desarrollé el gestor documental y el pipeline RAG, el módulo de análisis de ciclo de vida de cabezales o mangueras, funciones de generación y consulta de reportes y varias interfaces administrativas. También extendí funciones del backend del monedero: extracto, deuda pendiente y vistas administrativas. El núcleo original del backend de ese monedero fue desarrollado por otro integrante.

## Sistema RAG y decisión de arquitectura

El gestor recibe PDF y Markdown, detecta duplicados con SHA-256 y almacena documentos en S3. Cada documento pasa por estados `pending → processing → completed | failed`. El procesamiento extrae y limpia texto, lo divide en fragmentos con solapamiento, genera embeddings y persiste vectores en PostgreSQL con pgvector. Una consulta recupera fragmentos mediante similitud de coseno, construye contexto y lo entrega al modelo; también se conserva el historial de preguntas y respuestas.

La integración de IA utiliza un puerto de dominio `AiStrategy` y adaptadores para OpenAI y Ollama. La selección del proveedor es configurable, comprueba disponibilidad y puede recurrir a otro proveedor cuando falla el seleccionado. Utilicé `@langchain/openai` y `@langchain/ollama` como clientes de modelos dentro de esos adaptadores; el pipeline de ingesta, persistencia y recuperación se implementó en la arquitectura del producto.

## Análisis predictivo

Un evento del dispositivo activa el recálculo del ciclo de vida. Se procesan métricas deterministas y tendencias mediante regresión lineal; un LLM interpreta esos resultados y la respuesta se valida estructuralmente antes de persistirla. El cálculo estadístico no depende del LLM.

## Reportería, monedero e integración

Implementé generación y consulta de reportes financieros, agregación de movimientos, extractos con acceso mediante enlaces JWT y funciones de notificación por correo. El cron de envío mensual estaba comentado en la rama documentada: el envío mensual programado no estaba activo en esa rama.

En frontend construí principalmente vistas del monedero digital, movimientos, dashboard del extracto, exportaciones PDF y Excel, mapa de dispositivos con Leaflet e historiales administrativos. Implementé además una integración HTTP entre Zeus y PLEI para recomendar cursos según dispositivo y marca, mediante puerto de repositorio, adaptador Axios, API Key, timeout configurable y degradación controlada. No era un motor de recomendaciones por IA.

Otras contribuciones incluyeron un job nocturno para detectar incidencias de usuarios, notificaciones, filtros, paginación, consultas y documentación OpenAPI. Contribuí a pruebas de mis módulos con Jest y Cucumber, pruebas frontend con Vitest y parcialmente a pruebas con Playwright.

## Implementación y resultados

El trabajo integró soporte documental, análisis del ciclo de vida de dispositivos, reportería financiera e interfaces administrativas dentro del producto existente. Mi contribución comprendió módulos nuevos y extensiones de sistemas compartidos.
