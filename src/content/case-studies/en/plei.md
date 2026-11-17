---
title: "PLEI — Learning platform and hybrid search"
slug: "plei"
impactSummary: "I built most of Smart Search, combining three retrieval routes with weighted RRF, and contributed to frontend, media, and support work."
summary: "Frontend and backend contributions to a learning platform and resource library for aesthetic professionals."
technologies:
  - "PHP"
  - "Laravel"
  - "React"
  - "PostgreSQL"
  - "pgvector"
  - "MySQL"
  - "Redis"
  - "Vite"
  - "Vitest"
  - "Playwright"
company: "Belvi Digital SAS"
role: "Frontend → Full Stack Developer"
timeframe: "Dec 2023 – May 2026"
publishedAt: 2026-08-04
---

## Context and problem

PLEI is an e-learning platform and resource library for aesthetic professionals. The earlier search relied on Algolia and needed to retrieve courses, lessons, and other materials under different access rules. The team also worked on the administrative frontend, media processing, and incident support.

## My contribution

I built most of `Services/SmartSearch/` and contributed across frontend and backend. Another team member developed the Laravel `Facades/Ai.php` facade and some factories and strategies.

## Smart Search: three routes and rank fusion

The engine combines vector search with PostgreSQL/pgvector embeddings and an HNSW index; full-text search using `tsvector`, `websearch_to_tsquery`, and `ts_rank`; and title matches using `ILIKE`. Weighted Reciprocal Rank Fusion combines the rankings. A `pg_trgm` index accelerates `ILIKE` queries.

Content visibility depends on role, hierarchy, brand, product line, and other access rules. The system applies these restrictions to its results.

## Embeddings, cache, and media

Entity changes can pass through Eloquent Model Events, Observer/`HasEmbedding`, `GenerateEmbeddingJob`, `EmbeddingGenerationService`, and an entity-specific processor before reaching PostgreSQL/pgvector. Artisan commands support rebuilding and indexing. Redis participates in search caching through `Cache::tags()->remember()`.

I contributed WebP image conversion, FFmpeg video processing, audio optimization, reprocessing of existing media, and detection of unreferenced files. Such files were archived to AWS S3 Glacier Instant Retrieval.

## Support and frontend

A Sentry webhook validated with HMAC-SHA256 starts an asynchronous job. LLM-assisted analysis uses the incident description and stack trace and sends information to Microsoft Teams. A separate support flow retrieves context for user questions; bugs and suggestions can create tickets.

I helped reorganize the React frontend by context and built administrative modules for courses, lessons, seminars, favorites, authentication, and the help center. I wrote Vitest unit tests and some Playwright E2E tests. Another team member completed the Vite configuration migration.

## Implementation and outcomes

Smart Search replaced the previous Algolia integration. My work also covered embedding generation, media processing, incident analysis, administrative interfaces, and tests alongside the team.
