---
title: "Zeus — Plataforma IoT para Dispositivos Médicos"
slug: "zeus"
impactSummary: "Desarrollé la arquitectura RAG, reportería financiera automatizada y módulos backend y frontend para una plataforma IoT médica."
summary: "Ingeniería Backend y Full Stack sobre una plataforma IoT médica con telemetría en tiempo real, sistema RAG integrado a Hexagonal/DDD y reportería mensual automatizada."
technologies:
  - "TypeScript"
  - "Node.js"
  - "Express"
  - "PostgreSQL"
  - "pgvector"
  - "RAG"
  - "Redis"
  - "RabbitMQ"
  - "Next.js"
  - "React"
company: "Belvi Digital"
role: "Backend Developer (alcance Full Stack)"
timeframe: "dic. 2023 – may. 2026"
publishedAt: 2026-08-03
---

## Contexto del Producto y Problema

Zeus es una plataforma IoT orientada a la administración, telemetría y facturación de dispositivos médicos estéticos en producción (equipos para tratamientos dermatológicos y depilación por pulsos lumínicos), utilizada por cerca de 1.000 usuarios activos.

El modelo comercial opera bajo esquema *Pay-Per-Shot*: cada clínica adquiere disparos para sus equipos y la plataforma factura según el consumo real registrado por los sensores de telemetría. Belvi Digital requería centralizar este consumo masivo, liquidar estados financieros mensuales sin errores de conciliación, monitorear la ubicación geográfica de los dispositivos y reducir la carga de soporte técnico mediante inteligencia artificial anclada estrictamente a la documentación interna de los equipos.

## Rol y Responsabilidad Individual

Ingresé al equipo trabajando en interfaces administrativas en Next.js y asumí progresivamente la responsabilidad técnica de servicios críticos en el Backend en TypeScript/Node.js bajo Arquitectura Hexagonal y Domain-Driven Design (DDD):
- Diseño e implementación completa del sistema RAG y del asistente de soporte técnico.
- Arquitectura de la capa de IA con patrón Strategy y fallback automático de proveedores.
- Módulo de análisis y mantenimiento predictivo de desgaste de equipos.
- Motor de reportería financiera mensual automatizada con generación de extractos y enlaces seguros.
- Módulo de geolocalización cartográfica de clínicas y tests automatizados (Jest, Cucumber, Vitest, Playwright).

## Funcionalidades Implementadas

1. **Sistema RAG Propio:** Pipeline de ingesta documental para manuales de usuario y protocolos técnicos (PDF y Markdown), división en fragmentos (*chunking*), generación de embeddings y almacenamiento vectorial en PostgreSQL mediante la extensión `pgvector`.
2. **Capa de IA Resiliente (Strategy Pattern):** Abstracción sobre proveedores de LLM que permite alternar entre OpenAI y modelos locales en Ollama/Llama según el entorno de ejecución, con conmutación automática (*fallback*) en caso de indisponibilidad o latencia excesiva.
3. **Mantenimiento Predictivo:** Algoritmo que procesa la serie temporal de disparos acumulados por cada cabezal, estima el desgaste restante mediante regresión lineal y genera un diagnóstico preventivo en lenguaje natural asistido por LLM.
4. **Liquidación Financiera Pay-Per-Shot:** Procesos programados que consolidan los eventos de consumo transmitidos por los equipos, generan extractos dinámicos en HTML/PDF/Excel y envían correos mensuales automáticos con enlaces de acceso seguro firmados mediante JWT.
5. **Geolocalización de Dispositivos:** Mapa interactivo en frontend para ubicar clínicas y estados operativos de equipos Belvi, conectado a la plataforma PLEI para recomendar cursos de capacitación técnica según el uso del dispositivo.

## Retos Técnicos y Decisiones de Arquitectura

- **Integración limpia en Arquitectura Hexagonal y DDD:** El sistema RAG debía integrarse a un Backend estructurado previamente con límites de contexto claros (*Bounded Contexts*). Se descartaron frameworks externos genéricos (como LangChain) para evitar acoplamientos innecesarios; en su lugar, el pipeline RAG se implementó como un puerto de dominio con adaptadores de infraestructura intercambiables.
- **Tolerancia a fallos en telemetría y facturación:** El volumen continuo de eventos emitidos por los equipos IoT se desacopló del motor transaccional mediante colas de mensajería asíncrona en RabbitMQ y caché de lecturas en Redis, absorbiendo picos de actividad sin sobrecargar PostgreSQL.
- **Restricción estricta de alucinaciones en soporte:** El chatbot de asistencia médica/técnica utiliza una directiva de sistema que prohíbe responder fuera del contexto documental recuperado de `pgvector`, garantizando que ninguna clínica reciba instrucciones que no correspondan al manual oficial del equipo.

## Resultados Verificables

- Plataforma operando de manera continua para cerca de 1.000 usuarios activos en el sector de estética médica.
- Automatización del 100% del ciclo de generación y envío de reportes mensuales Pay-Per-Shot, eliminando la intervención manual en conciliaciones.
- Asistente de IA operando con respuestas sustentadas en documentación verificada, reduciendo la entrada de tickets de soporte técnico rutinarios.
- Suite de pruebas automatizadas con pruebas unitarias en Jest, pruebas de comportamiento BDD con Cucumber y pruebas E2E con Playwright sobre flujos financieros críticos.
