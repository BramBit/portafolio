---
title: "PLEI — E-Learning Platform and AI Infrastructure"
slug: "plei"
impactSummary: "Replaced Algolia with a custom hybrid search engine and built RAG and automation capabilities for the platform."
summary: "Frontend and Full Stack engineering on an e-learning platform: Vite migration, custom hybrid search on PostgreSQL, and AI-assisted error triage."
technologies:
  - "PHP"
  - "Laravel"
  - "React"
  - "TypeScript"
  - "PostgreSQL"
  - "pgvector"
  - "RAG"
  - "MySQL"
  - "Redis"
  - "Vite"
company: "Belvi Digital"
role: "Frontend → Full Stack Developer"
timeframe: "Dec 2023 – May 2026"
publishedAt: 2026-08-04
---

## Product Context and Problem

PLEI is an e-learning and business development platform built to support Belvi Digital's client network of aesthetic medical clinics. It distributes video courses, technical equipment training, and practice management resources.

The platform faced two critical engineering bottlenecks:
1. **Costly and Inflexible Search:** The original Algolia integration imposed growing SaaS subscription fees and struggled with heterogeneous content (courses, PDF protocols, and lesson videos), lacking true semantic understanding.
2. **Frontend Technical Debt & Support Triage:** The client interface ran on an outdated React 16 setup with sluggish compilation times and zero test coverage, while developers spent recurring hours manually triaging production error reports.

## Role and Individual Contribution

I originally joined the frontend team during the migration from React 16 to Vite (personally completing approximately 40% of the migration and implementing the platform's first automated test suite with Vitest). I then transitioned to full-stack engineering on the PHP/Laravel backend:
- Architecture and implementation of the *Smart Search* hybrid engine that completely replaced Algolia.
- Design of an asynchronous embedding synchronization pipeline across a dual-database architecture (MySQL + PostgreSQL/pgvector).
- Optimization of multimedia assets and automated archival policies in AWS S3.
- Automated error triage pipeline integrating Sentry incident streams with LLM analysis and Microsoft Teams webhooks.

## Key Features Engineered

1. **Multi-Signal Hybrid Smart Search:** Retrieval pipeline orchestrating four complementary signals:
   - *Dense Vector Search:* Capturing semantic intent using embeddings stored in `pgvector`.
   - *Full-Text Search:* Lexical keyword matching via PostgreSQL `tsvector` and `websearch_to_tsquery`.
   - *Fuzzy Matching:* Typo tolerance and spelling variations powered by `pg_trgm`.
   - *Exact Title Matching:* Prioritizing direct course and lesson title lookups.
2. **Unified Ranking with Reciprocal Rank Fusion (RRF):** Merging distinct retrieval signals based strictly on relative ordinal rank, resolving the challenge of comparing fundamentally incompatible score distributions.
3. **Asynchronous Embedding Pipeline:** Dual-database structure maintaining transactional data in MySQL while syncing vector representations into PostgreSQL via Eloquent Observers, worker queues, and scheduled Artisan commands.
4. **AWS S3 Media Optimization:** Automated conversion pipeline converting uploaded images to WebP, compressing video and audio streams, and executing lifecycle archival on unused media assets.
5. **AI-Assisted Error Triage:** Service capturing Sentry exceptions, analyzing stack traces and environmental context with an LLM, and generating root-cause summaries dispatched directly to Microsoft Teams developer channels via webhooks.

## Technical Challenges & Architecture Decisions

- **Full In-House Algolia Replacement:** Matching the performance of a mature search SaaS with internal infrastructure required rigorous SQL query tuning, ensuring that running four concurrent retrieval passes still met strict latency targets.
- **Authorization Filters Enforced at Data Layer:** Relevant semantic results must never be surfaced to unauthorized users. Membership and role-based visibility filters were executed directly within SQL query boundaries before rank fusion.
- **Unified AI Access Facade:** To avoid duplicate integrations across different modules, a centralized service facade was engineered in Laravel, exposing reusable AI capabilities for search, support, and error diagnostics.

## Verifiable Results

- Successfully eliminated third-party SaaS dependency by replacing Algolia entirely, removing recurring subscription costs.
- Modernized client build tooling with Vite and established the project's first Vitest automated test suite.
- Custom hybrid search engine running continuously in production across the entire catalog.
- Production error triage automated in Teams, measurably accelerating initial incident diagnosis and prioritization.
