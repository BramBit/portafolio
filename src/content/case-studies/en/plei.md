---
title: "PLEI — E-Learning Platform and AI Infrastructure"
slug: "plei"
impactSummary: "Replaced Algolia with a custom hybrid search engine and built reusable RAG and AI support capabilities for the platform."
summary: "Participation in the evolution of an e-learning platform through AI infrastructure, document processing, RAG, and a custom hybrid search engine."
technologies:
  - "React"
  - "TypeScript"
  - "Laravel"
  - "PostgreSQL"
  - "pgvector"
company: "Belvi Digital"
role: "Frontend → Full Stack"
timeframe: "Dec 2023 – May 2026"
publishedAt: 2026-08-04
---

## Problem

PLEI is a multi-purpose e-learning platform built to support Belvi Digital's client ecosystem: distributing educational content, media resources, and tools aimed at helping aesthetic clinics grow commercially. It needed to serve courses, videos, and training material for using medical devices, alongside marketing and positioning resources for affiliated businesses — and its existing search, built on Algolia, wasn't good enough for that mix of content types, while support was eating up developer time on repetitive questions and error triage.

## Solution

I joined PLEI's frontend team during its migration from React 16 to Vite (roughly 40% of the migration), then built its first automated test suite with Vitest, and moved into full-stack work focused on AI, automation, and platform integration. The centerpiece was a reusable AI platform for PLEI: a custom RAG system, a hybrid search engine that fully replaced Algolia, an intelligent support chatbot, and automated error-analysis tooling — all behind a single access facade so different parts of the product could reuse the same AI capabilities instead of each building its own.

## Architecture

The Laravel/PHP backend uses Eloquent ORM, jobs, and traits for its core domain, with a separate PostgreSQL database dedicated to AI features, using pgvector, tsvector, and pg_trgm as the foundation for semantic and hybrid search. The AI platform itself sits behind a centralized facade that decouples every AI-powered feature from the rest of the application, so a capability built for one module — search, chat, error analysis — can be reused by another without duplicating logic.

## Implementation

Smart Search runs pgvector for vector search, tsvector for full-text search, pg_trgm for fuzzy matching, and exact title matching, orchestrated as a multi-stage hybrid pipeline that adapts its strategy to the type of resource being searched — documents, videos, images, and other media. The RAG system handles document processing, chunking, embeddings, semantic retrieval, and dynamic context construction, built without external RAG frameworks to fit PLEI's existing architecture. The support chatbot goes beyond FAQ lookup: it accepts screenshots, generates a preliminary AI diagnosis when a user reports a problem, and notifies the development team through Microsoft Teams webhooks. A separate pipeline processes Sentry error events, runs an AI-assisted analysis, and distributes enriched reports to the team automatically.

## Challenges

Replacing Algolia meant matching or beating a mature, purpose-built search product with a system built in-house — that required combining several retrieval strategies rather than relying on any single one, since no individual method handled every content type well. Keeping AI features reusable across a product that wasn't originally designed for it meant investing in a facade layer up front, before the reuse actually paid off.

## Results

PLEI runs on Vite instead of the legacy React 16 setup, has an automated test suite where none existed before, no longer depends on Algolia, and its RAG, search, and support tooling are used as a shared AI platform across the product rather than isolated features. The error-analysis automation measurably cut the time needed to understand and prioritize production issues.
