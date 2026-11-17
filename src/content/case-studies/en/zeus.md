---
title: "Zeus — IoT platform for medical devices"
slug: "zeus"
impactSummary: "I built a document RAG system, predictive analysis module, and reporting and frontend features within an existing IoT platform."
summary: "Backend and frontend contributions to a Pay-Per-Shot medical aesthetic device operations and billing platform."
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
role: "Backend Developer (Full Stack scope)"
timeframe: "Dec 2023 – May 2026"
publishedAt: 2026-08-03
---

## Context and problem

Zeus was an IoT platform for managing medical aesthetic devices and billing usage through a Pay-Per-Shot model. It needed ways to consult equipment documentation, analyze wear signals, and generate financial information for users. I worked within an existing product and architecture. RabbitMQ was part of the existing infrastructure.

## My contribution

As a Backend Developer with Full Stack scope, I built the document manager and RAG pipeline, the handpiece or hose lifecycle analysis module, financial report generation and consultation features, and several administrative interfaces. I extended wallet backend functions for statements, outstanding debt, and administrative views. Another team member developed the original wallet backend core.

## RAG system and architecture decision

The manager accepts PDF and Markdown, detects duplicates with SHA-256, and stores documents in S3. Documents move through `pending → processing → completed | failed`. Processing extracts and cleans text, creates overlapping chunks, generates embeddings, and stores vectors in PostgreSQL with pgvector. A question retrieves chunks through cosine similarity, builds context for the model, and records question and answer history.

AI integration uses an `AiStrategy` domain port with OpenAI and Ollama adapters. Provider selection is configurable, checks availability, and can fall back when the selected provider fails. I used `@langchain/openai` and `@langchain/ollama` as model clients inside the adapters. Ingestion, storage, and retrieval were implemented in the product architecture.

## Predictive analysis

A device event triggers lifecycle recalculation. Deterministic metrics and linear regression produce trends; an LLM interprets those results, and its output is structurally validated before persistence. The statistical calculation does not depend on the LLM.

## Reporting, wallet, and integration

I implemented financial report generation and consultation, movement aggregation, statements accessed through JWT links, and email notification features. The monthly sending cron was commented out in the documented branch. Scheduled monthly delivery was therefore not active in that branch.

On the frontend, I built wallet views, movement history, a statement dashboard, PDF and Excel exports, a Leaflet device map, and administrative views. I also implemented an HTTP integration from Zeus to PLEI for course suggestions based on device and brand, using a repository port, Axios adapter, API key, configurable timeout, and controlled degradation. It was not an AI recommendation engine.

Other contributions included a nightly user incident detection job, notifications, filters, pagination, queries, and consolidated OpenAPI documentation. I contributed Jest and Cucumber tests for my modules, frontend tests with Vitest, and some Playwright tests.

## Implementation and outcomes

The work connected documentary support, device lifecycle analysis, financial reporting, and administrative interfaces within the existing product. My contribution included new modules and extensions to shared systems.
