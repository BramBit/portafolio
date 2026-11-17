---
title: "Pliegos"
slug: "pliegos"
tagline: "Public procurement intelligence for SECOP II featuring incremental synchronization, hybrid search, and explainable recommendations."
status: "backend-development"
capabilities: ["SECOP II synchronization", "Hybrid search", "Explainable recommendations"]
problem: "Manually monitoring thousands of public tender opportunities on SECOP II is repetitive and error-prone: non-standardized descriptions, missing fields, and constant risk of missing key deadlines or amendments."
solution: "An intelligent system acting as a background procurement analyst: incrementally syncing SECOP II notices, filtering non-biddable contracts, combining semantic and full-text search, and scoring opportunities with transparent factors."
repository: "https://github.com/BramBit/Pliegos"
featured: true
---

## 1. What is Pliegos?

Every day in Colombia, hundreds of public tender notices are published across the government's **SECOP II** open data portal. For contractors and suppliers, discovering which opportunities genuinely match their technical capability and financial capacity requires hours of daily manual review, sifting through inconsistently formatted documents, and constant vigilance against amended deadlines or budgets.

**Pliegos** is not just a keyword search tool; it is an intelligence platform that works in the background to discover, normalize, rank, and track high-relevance opportunities with clear, explainable reasoning.

---

## 2. Project Status (Implemented vs. Pending)

The backend implements the capabilities below. The full MVP still requires the frontend, integration, and deployment.

### Implemented backend capabilities
- **Incremental synchronization every 4 hours:** Connects with SECOP II open data API endpoints, identifying newly published notices and modified terms.
- **Automated filtering & normalization:** Rules out non-competitive contract types (direct contracting, special regimes, awarded, or canceled proceedings).
- **Asynchronous processing via BullMQ:** Distributed queue workers handle text extraction, embedding generation, and summary extraction without blocking API endpoints.
- **Hybrid retrieval on PostgreSQL:** Multi-stage retrieval combining dense vector similarity (`pgvector`), PostgreSQL full-text search (`ts_rank_cd`), and unified ranking through *Reciprocal Rank Fusion* (RRF).
- **Explainable scoring & honesty with incomplete data:** Every recommendation outputs a composite score breakdown with distinct factors (categorized across tiers 1, 2, and 3). When SECOP records contain missing metadata, Pliegos does not discard them silently—it flags them transparently in an alert tier.
- **Automated tracking and alerts:** Background workers detect altered closing dates, budget shifts, or updated tender specifications, triggering notifications.

### Remaining product work
- **Integration and deployment:** Complete the frontend–backend integration and deployment of the full MVP.
- **User-facing web application (Frontend):** Currently in design, UX research, and UI prototyping phase.
- **Contractor self-service portal:** Web interface for interactive profile tuning, custom scoring thresholds, and alert preferences.

---

## 3. Architecture & Processing Pipeline

```text
SECOP II (Open Data API)
           │
           ▼
[ Incremental Sync (Every 4h) ]
           │
           ▼
[ Normalization & Change Detection ]
           │
     ┌─────┴────────────────────────┐
     ▼                              ▼
Relational PostgreSQL      BullMQ Worker Queue
(Metadata & States)        (Embeddings & Summaries)
     │                              │
     └──────────────┬───────────────┘
                    ▼
        [ PostgreSQL + pgvector ]
                    │
                    ▼
        [ Hybrid Search: Vector + Full-Text + RRF ]
                    │
                    ▼
        [ Explainable Scoring (Tiers 1, 2 & 3) ]
                    │
                    ▼
        [ Saved Opportunity Alerts & Notifications ]
```

---

## 4. Verified Tech Stack

- **Runtime & Language:** Node.js 24 with TypeScript in strict mode.
- **Backend Framework:** NestJS 12 (dependency injection, modular structure, REST controllers).
- **Database & Retrieval:** PostgreSQL 16 with the `pgvector` extension for combined relational and vector storage.
- **Queues & Background Jobs:** BullMQ backed by Redis.
- **Local infrastructure:** Docker Compose for PostgreSQL/pgvector and Redis.
- **Continuous Integration:** GitHub Actions automating build validation, linting, and tests.

---

## 5. Official Repository

- **Backend Source Code:** [github.com/BramBit/Pliegos](https://github.com/BramBit/Pliegos)
