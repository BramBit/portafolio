---
title: "Zeus — IoT Platform for Medical Devices"
slug: "zeus"
impactSummary: "Developed full-stack and backend capabilities for an IoT platform covering device usage, financial reporting, support, and applied AI."
summary: "Full Stack development on an IoT platform for medical devices, including reporting, geolocation, and AI-powered support capabilities."
technologies:
  - "Next.js"
  - "React"
  - "Node.js"
  - "PostgreSQL"
  - "Redis"
  - "RabbitMQ"
company: "Belvi Digital"
role: "Frontend → Full Stack / Backend"
timeframe: "Dec 2023 – May 2026"
publishedAt: 2026-08-03
---

## Problem

Zeus manages IoT devices used by aesthetic clinics for dermatological treatments and hair removal by light pulses, under a pay-per-shot billing model — every treatment is billed by the number of shots a device performs. Belvi Digital needed a platform that could centralize device usage, generate financial reports, support multiple administrative roles, and increasingly, use AI to reduce manual work: answering repetitive questions from users, generating insights from documentation, and simplifying support.

## Solution

I worked on Zeus first as a frontend developer, then progressively took on backend and full-stack responsibilities as the platform grew. On the frontend, I built the geolocation module that maps clinics operating Belvi devices, the platform's full internationalization layer (Spanish and English) from scratch, the administrative dashboards used by clients, managers, and administrators, and the end-to-end test suite. On the backend, I designed and built a custom Retrieval-Augmented Generation system integrated directly into the platform's existing Hexagonal Architecture, without external RAG frameworks, along with specialized chatbots for support and FAQ handling, an automated financial-reporting system for the Pay-Per-Shot model, and the integration between the platform's digital wallet and its financial data.

## Architecture

The backend follows Hexagonal Architecture with Domain-Driven Design, keeping business logic decoupled from persistence and infrastructure. RabbitMQ works as an event bus between domain components, and Redis provides caching to keep the platform responsive. The RAG pipeline — document ingestion, chunking, embeddings, vector storage in pgvector, semantic retrieval, and dynamic context construction — was built as its own module inside that architecture, with a Strategy Pattern abstraction that decouples the LLM provider from the rest of the system, so the AI provider can change per environment without touching business logic.

## Implementation

The financial reporting system consolidates Pay-Per-Shot consumption through scheduled jobs and RabbitMQ events, builds HTML reports dynamically, and emails them automatically to clients and managers every month. The chatbots use a system-prompt strategy that restricts responses to the context retrieved from the document base, so answers stay grounded in what the platform actually knows. The document-processing pipeline handles both PDF and Markdown sources, chunking and embedding them for retrieval.

## Challenges

Two constraints shaped most of the technical decisions: the RAG system had to fit inside an existing Hexagonal Architecture without pulling in external frameworks that would compromise that structure, and the LLM provider couldn't be hardcoded — the platform needed the flexibility to switch providers by environment without touching the business logic that depended on them. Both were solved with the same discipline: strict separation between domain logic and infrastructure, and a Strategy Pattern that treats the AI provider as just another interchangeable dependency.

## Results

Zeus now runs automated financial reporting for its full Pay-Per-Shot customer base, a working RAG system and specialized chatbots handling real support flows, complete bilingual support, and administrative dashboards used daily by clients, managers, and admins.
