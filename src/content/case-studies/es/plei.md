---
title: "PLEI — Plataforma E-Learning e Infraestructura de IA"
slug: "plei"
impactSummary: "Reemplacé Algolia por un motor de búsqueda híbrido construido a la medida y desarrollé capacidades reutilizables de RAG y soporte con IA para la plataforma."
summary: "Participación en la evolución de una plataforma e-learning mediante infraestructura de IA, procesamiento documental, RAG y un motor de búsqueda híbrido."
technologies:
  - "React"
  - "TypeScript"
  - "Laravel"
  - "PostgreSQL"
  - "pgvector"
company: "Belvi Digital"
role: "Frontend → Full Stack"
timeframe: "dic. 2023 – may. 2026"
publishedAt: 2026-08-04
---

## Problema

PLEI es una plataforma e-learning multipropósito construida para apoyar el ecosistema de clientes de Belvi Digital: distribuye contenido educativo, recursos multimedia y herramientas orientadas al crecimiento comercial de clínicas estéticas. Debía dar soporte a cursos, videos y material de capacitación para el uso de dispositivos médicos, junto con recursos de marketing y posicionamiento para los negocios afiliados — y su buscador existente, construido sobre Algolia, no alcanzaba para esa mezcla de tipos de contenido, mientras el soporte consumía tiempo de desarrollo en preguntas repetitivas y triage de errores.

## Solución

Entré al equipo frontend de PLEI durante su migración de React 16 a Vite (cerca del 40% de la migración), luego construí su primera suite de pruebas automatizadas con Vitest, y pasé a trabajo full stack enfocado en IA, automatización e integración entre plataformas. Lo central fue una plataforma de IA reutilizable para PLEI: un sistema RAG personalizado, un motor de búsqueda híbrido que reemplazó completamente a Algolia, un chatbot de soporte inteligente y automatización del análisis de errores — todo detrás de una sola fachada de acceso para que distintas partes del producto reutilizaran las mismas capacidades de IA en vez de construir cada una la suya.

## Arquitectura

El backend en Laravel/PHP usa Eloquent ORM, jobs y traits para su dominio principal, con una base PostgreSQL separada dedicada a las funcionalidades de IA, usando pgvector, tsvector y pg_trgm como base para la búsqueda semántica e híbrida. La plataforma de IA en sí está detrás de una fachada centralizada que desacopla cada funcionalidad de IA del resto de la aplicación, para que una capacidad construida para un módulo —búsqueda, chat, análisis de errores— pueda reutilizarse en otro sin duplicar lógica.

## Implementación

Smart Search corre pgvector para búsqueda vectorial, tsvector para búsqueda de texto completo, pg_trgm para coincidencia difusa, y coincidencia exacta de títulos, orquestados como un pipeline híbrido de varias etapas que adapta su estrategia según el tipo de recurso consultado —documentos, videos, imágenes y otros medios—. El sistema RAG maneja procesamiento documental, chunking, embeddings, recuperación semántica y construcción dinámica de contexto, construido sin frameworks externos para encajar en la arquitectura existente de PLEI. El chatbot de soporte va más allá de una FAQ: acepta capturas de pantalla, genera un diagnóstico preliminar con IA cuando un usuario reporta un problema, y notifica al equipo de desarrollo mediante webhooks a Microsoft Teams. Un pipeline separado procesa los eventos de error de Sentry, corre un análisis asistido por IA, y distribuye reportes enriquecidos al equipo automáticamente.

## Retos

Reemplazar Algolia significaba igualar o superar un producto de búsqueda maduro y especializado con un sistema construido internamente — eso exigió combinar varias estrategias de recuperación en vez de depender de una sola, porque ningún método individual cubría bien todos los tipos de contenido. Mantener las funcionalidades de IA reutilizables en un producto que no fue diseñado originalmente para eso implicó invertir primero en una capa de fachada, antes de que esa reutilización realmente rindiera.

## Resultado

PLEI corre hoy sobre Vite en vez del setup heredado en React 16, tiene una suite de pruebas automatizadas donde antes no existía ninguna, ya no depende de Algolia, y su RAG, su búsqueda y sus herramientas de soporte se usan como una plataforma de IA compartida en todo el producto en vez de funcionalidades aisladas. La automatización del análisis de errores redujo de forma medible el tiempo necesario para entender y priorizar incidentes en producción.
