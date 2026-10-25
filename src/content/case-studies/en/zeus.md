---
title: "Zeus — IoT Platform for Medical Devices"
slug: "zeus"
impactSummary: "Engineered the RAG architecture, automated financial reporting, and backend/frontend capabilities for a medical IoT platform."
summary: "Backend and Full Stack engineering on a medical IoT platform featuring real-time telemetry, embedded RAG on Hexagonal/DDD architecture, and automated monthly reporting."
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
role: "Backend Developer (Full Stack Scope)"
timeframe: "Dec 2023 – May 2026"
publishedAt: 2026-08-03
---

## Product Context and Problem

Zeus is a production IoT platform managing telemetry, operational status, and automated billing for medical aesthetic devices (pulsed light and dermatological therapy equipment), serving approximately 1,000 active users.

The business model operates on a *Pay-Per-Shot* basis: clinics purchase treatment shot packages, and the platform audits and bills based on real consumption recorded by IoT hardware sensors. Belvi Digital needed to consolidate high-frequency usage events, reconcile monthly billing statements without manual ledger accounting, map clinic equipment geographic distribution, and streamline technical support using AI strictly anchored to internal machine manuals.

## Role and Individual Contribution

I joined the engineering team developing administrative web modules in Next.js and progressively took ownership of mission-critical services on the TypeScript/Node.js backend under Hexagonal Architecture and Domain-Driven Design (DDD):
- Architecture and implementation of the in-house RAG pipeline and support chatbot.
- Design of a provider-agnostic AI layer utilizing the Strategy Pattern with automated fallback.
- Engineering of the predictive maintenance and hardware wear-analysis module.
- Automated monthly financial billing engine with dynamic statement generation and secure JWT token links.
- Clinic geolocation mapping module and test automation suite (Jest, Cucumber, Vitest, Playwright).

## Key Features Engineered

1. **Custom In-House RAG Pipeline:** Document ingestion pipeline for machine user manuals and clinical protocols (PDF and Markdown), semantic chunking, embedding generation, and vector indexing in PostgreSQL using the `pgvector` extension.
2. **Resilient AI Layer (Strategy Pattern):** LLM provider abstraction that dynamically routes inferences between OpenAI and local models hosted on Ollama/Llama depending on the deployment environment, executing automated fallbacks during upstream provider downtime or rate limits.
3. **Predictive Hardware Maintenance:** Analytics service processing cumulative shot time-series per handpiece, calculating remaining lifespan via linear regression, and generating preventative maintenance diagnostics in natural language using an LLM.
4. **Pay-Per-Shot Financial Billing Engine:** Scheduled background workflows that aggregate device consumption events, generate dynamic HTML/PDF/Excel statements, and dispatch monthly emails with secure, time-limited JWT authentication links.
5. **Equipment Geolocation & Integration:** Interactive clinic map visualizing operational machine statuses, integrated with PLEI to recommend contextual staff training modules based on specific device usage.

## Technical Challenges & Architecture Decisions

- **Clean Integration with Hexagonal Architecture & DDD:** The RAG system needed to integrate cleanly into an established backend with strict bounded contexts. Heavy external frameworks (like LangChain) were rejected to avoid unwanted coupling; instead, RAG operations were modeled as pure domain ports with swappable infrastructure adapters.
- **Fault-Tolerant Telemetry Ingestion:** The steady stream of incoming IoT hardware signals was decoupled from the transactional core using RabbitMQ message queues and Redis read caches, absorbing sudden bursts of telemetry without degrading primary PostgreSQL database performance.
- **Strict Hallucination Prevention in Support:** The support chatbot operates under strict system constraints forbidding answers outside the retrieved `pgvector` context, ensuring clinical staff never receive unauthorized instructions conflicting with official equipment specifications.

## Verifiable Results

- Maintained continuous platform operation serving roughly 1,000 active clinical users.
- Automated 100% of the monthly Pay-Per-Shot statement generation and delivery cycle, eliminating manual reconciliation overhead.
- AI support assistant operating exclusively on validated technical documentation, measurably reducing repetitive support tickets routed to engineering.
- Automated test coverage implemented using unit tests in Jest, BDD behavior tests with Cucumber, and E2E tests with Playwright across core billing and telemetry flows.
