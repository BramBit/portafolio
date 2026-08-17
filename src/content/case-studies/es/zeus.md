---
title: "Zeus — Plataforma IoT para Dispositivos Médicos"
slug: "zeus"
impactSummary: "Desarrollé capacidades Full Stack y Backend para una plataforma IoT que cubre uso de dispositivos, reportes financieros, soporte e IA aplicada."
summary: "Desarrollo Full Stack sobre una plataforma IoT para dispositivos médicos, incluyendo reporting, geolocalización y funcionalidades de soporte con IA."
technologies:
  - "Next.js"
  - "React"
  - "Node.js"
  - "PostgreSQL"
  - "Redis"
  - "RabbitMQ"
company: "Belvi Digital"
role: "Frontend → Full Stack / Backend"
timeframe: "dic. 2023 – may. 2026"
publishedAt: 2026-08-03
---

## Problema

Zeus administra dispositivos IoT que usan clínicas estéticas para tratamientos dermatológicos y depilación por pulsos lumínicos, bajo un modelo de facturación pay-per-shot: cada tratamiento se factura según la cantidad de disparos que realiza el dispositivo. Belvi Digital necesitaba una plataforma capaz de centralizar el uso de los dispositivos, generar reportes financieros, dar soporte a distintos roles administrativos y, cada vez más, usar IA para reducir trabajo manual: responder preguntas repetitivas de los usuarios, generar información a partir de documentación técnica y simplificar el soporte.

## Solución

Trabajé en Zeus primero como desarrollador frontend, y fui asumiendo responsabilidades backend y full stack a medida que la plataforma crecía. En frontend construí el módulo de geolocalización que ubica las clínicas que operan dispositivos Belvi, toda la capa de internacionalización de la plataforma (español e inglés) desde cero, los dashboards administrativos usados por clientes, managers y administradores, y la suite de pruebas end-to-end. En backend diseñé y construí un sistema RAG personalizado integrado directamente a la Arquitectura Hexagonal existente, sin frameworks externos, además de chatbots especializados para soporte y preguntas frecuentes, un sistema automático de reportes financieros para el modelo Pay-Per-Shot, y la integración entre la billetera digital de la plataforma y su información financiera.

## Arquitectura

El backend sigue Arquitectura Hexagonal con Domain-Driven Design, manteniendo la lógica de negocio desacoplada de la persistencia y la infraestructura. RabbitMQ funciona como event bus entre componentes del dominio, y Redis provee caché para mantener la plataforma con buen rendimiento. El pipeline de RAG —ingesta documental, chunking, embeddings, almacenamiento vectorial en pgvector, recuperación semántica y construcción dinámica de contexto— se construyó como un módulo propio dentro de esa arquitectura, con una abstracción basada en Strategy Pattern que desacopla el proveedor de LLM del resto del sistema, para poder cambiar de proveedor por entorno sin tocar la lógica de negocio.

## Implementación

El sistema de reportes financieros consolida el consumo Pay-Per-Shot mediante procesos programados y eventos de RabbitMQ, construye reportes HTML de forma dinámica y los envía automáticamente por correo a clientes y managers cada mes. Los chatbots usan una estrategia de system prompt que restringe las respuestas al contexto recuperado desde la base documental, para que las respuestas se mantengan ancladas a lo que la plataforma realmente sabe. El pipeline de procesamiento documental maneja fuentes PDF y Markdown, haciéndoles chunking y embeddings para su recuperación.

## Retos

Dos restricciones definieron la mayoría de las decisiones técnicas: el sistema RAG tenía que encajar dentro de una Arquitectura Hexagonal existente sin traer frameworks externos que comprometieran esa estructura, y el proveedor de LLM no podía quedar fijo en el código — la plataforma necesitaba poder cambiar de proveedor según el entorno sin tocar la lógica de negocio que dependía de ellos. Ambos se resolvieron con la misma disciplina: separación estricta entre lógica de dominio e infraestructura, y un Strategy Pattern que trata al proveedor de IA como una dependencia intercambiable más.

## Resultado

Hoy Zeus corre reportes financieros automatizados para toda su base de clientes Pay-Per-Shot, tiene un sistema RAG funcionando junto con chatbots especializados atendiendo flujos reales de soporte, soporte bilingüe completo, y dashboards administrativos usados a diario por clientes, managers y administradores.
