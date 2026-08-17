---
title: "Building a RAG System From Scratch"
slug: "rag-from-scratch"
excerpt: "How a Retrieval-Augmented Generation pipeline is built without a framework and kept swappable at the LLM-provider level."
readingTime: "9 min"
tags:
  - "RAG"
  - "Embeddings"
  - "pgvector"
  - "LLM"
  - "Architecture"
tldr: "Two production RAG pipelines, built without a framework, with the LLM provider kept interchangeable and token costs controlled through caching."
publishedAt: 2026-08-01
---

The difference appeared in the implementation. Zeus allowed the RAG pipeline to be integrated directly into a Backend based on DDD and Hexagonal Architecture. PLEI pushed the problem further: document processing, OCR, hash-based deduplication, multiple document types, and reusable AI infrastructure.

---

# 1. The real problem behind a RAG

A language model can generate an answer without knowing an application's private data.

That is precisely the problem.

If a platform needs to answer questions using product-specific documentation or knowledge, sending only the question to the model does not guarantee that the required information is available.

The solution was to introduce a **retrieval** stage before generation:

```text
Question
   ↓
Query embedding
   ↓
Retrieval
   ↓
Relevant context
   ↓
LLM
   ↓
Response
```

The model stops being the primary source of knowledge. Its role becomes interpreting the query and generating a response using context retrieved by the system.

---

# 2. Why build the pipeline directly?

Zeus already had a Backend architecture based on **Domain-Driven Design and Hexagonal Architecture**.

The decision was not to introduce a RAG framework that would impose its own conventions on the existing architecture.

Instead, the pipeline was built as a capability integrated into the system:

```text
Application
    │
    ▼
RAG
 ┌──┼───────────────┐
 ▼  ▼               ▼
Ingestion  Retrieval  Inference
 │          │          │
 ▼          ▼          ▼
Docs     pgvector     LLM
```

The decision was not about avoiding frameworks on principle. It was about keeping control over the pieces that actually belonged to the product architecture.

---

# 3. The common architecture

Although Zeus and PLEI were different products, both systems share the same conceptual flow.

## Indexing

```text
Document
    ↓
Processing
    ↓
Chunking
    ↓
Embeddings
    ↓
PostgreSQL + pgvector
```

## Query

```text
Question
    ↓
Embedding
    ↓
Retrieval
    ↓
Relevant chunks
    ↓
Context construction
    ↓
LLM
    ↓
Response
```

The separation matters: indexing happens before the query. When a question arrives, the system does not need to process every document again.

---

# 4. First implementation: Zeus

## Context

Zeus is an IoT platform focused on managing aesthetic medical devices.

Its Backend uses Node.js, TypeScript, Express, and PostgreSQL within an architecture that incorporates DDD, Hexagonal Architecture, and asynchronous processing.

## Problem

The platform needed to provide answers using its own product information.

Sending only the question to the LLM did not guarantee that the model knew the internal documentation.

The solution required a retrieval layer before generating the response.

## Implementation

I designed and implemented a RAG architecture integrated into the Zeus Backend.

```text
Document
   ↓
Ingestion
   ↓
Processing
   ↓
Chunking
   ↓
Embeddings
   ↓
PostgreSQL + pgvector
   ↓
User query
   ↓
Query embedding
   ↓
Semantic retrieval
   ↓
Context construction
   ↓
LLM
   ↓
Response
```

## Document processing

The solution covers document processing, text extraction, segmentation, embedding generation, vector storage, and semantic retrieval.

PostgreSQL with `pgvector` is used to store the vectors.

## Why pgvector?

PostgreSQL was already part of Zeus's infrastructure. Using `pgvector` made it possible to add vector storage and retrieval without creating a separate persistence infrastructure exclusively for the RAG system.

The decision kept the system close to the existing abstractions.

## Result

### Before

The platform needed a way to provide product-specific knowledge to the model before generating an answer.

### After

Zeus gained a knowledge-retrieval infrastructure that allows internal documentation to be used as context for language models.

---

# 5. Second implementation: PLEI

PLEI is an e-learning platform used to distribute educational content and resources aimed at the development of Belvi's clients.

Here, the goal was again to introduce AI over information owned by the platform.

The difference was that the problem was no longer only about "retrieving context".

The system also needed infrastructure capable of producing that context.

---

# 6. Reusable AI infrastructure

PLEI did not need the RAG system to exist only for one chatbot.

The infrastructure had to be reusable across different capabilities:

```text
                 AI Facade
                     │
          ┌──────────┼──────────┐
          ▼          ▼          ▼
      Embeddings  Retrieval  Inference
          │          │          │
          └──────────┼──────────┘
                     ▼
                 AI features
```

The Backend provides abstractions for:

- embedding generation;
- inference;
- provider selection;
- document processing;
- retrieval;
- search;
- analysis.

The reason was to prevent each feature from implementing its own direct integration with the provider.

---

# 7. Keeping the AI provider interchangeable

The integration was designed around a strategy-based abstraction.

```text
Application
    │
    ▼
AI Facade
    │
    ▼
Strategy / Provider
    ├── OpenAI
    └── Ollama
```

The strategy encapsulates provider-specific details such as the model, embedding dimensions, and inference parameters.

The application consumes AI capabilities through the abstraction.

This makes it possible to change the concrete implementation without propagating provider dependencies throughout the rest of the system.

---

# 8. The real bottleneck: documents

A RAG system does not start with the LLM.

It starts with the data.

A complete document is not an appropriate unit to send directly to a model. It first needs to be converted into retrievable units.

PLEI implemented a document pipeline:

```text
Document
    ↓
Record
    ↓
SHA-256 hash
    ↓
S3
    ↓
Text extraction
    ↓
OCR when needed
    ↓
Cleaning
    ↓
Type detection
    ↓
Chunking
    ↓
Embeddings
    ↓
PostgreSQL + pgvector
```

Each stage solves a specific problem.

---

# 9. Avoiding unnecessary reprocessing

Before running the entire pipeline, the document is identified using a SHA-256 hash.

```text
Document
    ↓
SHA-256
    ↓
Already exists?
 ┌──┴──────────────┐
 │                 │
Yes                No
 │                 │
Stop             Process
```

If the document has already been processed, there is no need to repeat extraction, chunking, and embedding generation.

This makes the pipeline idempotent with respect to already indexed documents.

---

# 10. When a PDF contains no text

Not every PDF contains actual text.

Some are essentially scanned images.

That is why the pipeline checks the amount of extractable text:

```text
PDF
 │
 ▼
Extraction
 │
 ├── Enough text ──────► continue
 │
 └── Not enough text ──► OCR
                              │
                              ▼
                          Tesseract
                              │
                              ▼
                          continue
```

OCR makes it possible to incorporate scanned documents into the same knowledge pipeline.

It is not an isolated feature: it is a normalization stage before semantic indexing.

---

# 11. Chunking: turning documents into retrievable units

Once the text has been extracted, it needs to be split.

For normal documents, the implementation uses approximately:

- **800 characters per chunk**
- **100 characters of overlap**

The implementation also attempts to split at reasonable boundaries such as spaces and periods.

```text
Document
──────────────────────────────────────────

[ Chunk 01 ......................... ]
                    overlap
             [ Chunk 02 ......................... ]
                                    overlap
                             [ Chunk 03 ......................... ]
```

The overlap preserves part of the context between consecutive fragments.

The goal is to avoid splitting relevant information in a way that leaves none of the fragments with enough context to be retrieved correctly.

---

# 12. FAQs need a different strategy

An FAQ has a different semantic structure from a normal document:

```text
Question
   +
Answer
```

For that reason, the pipeline attempts to identify this type of document and segment it around question-and-answer pairs instead of applying only a size-based split.

The important decision is that chunking depends on the structure of the content.

There is no single fragmentation strategy that is appropriate for every document.

---

# 13. Embeddings and pgvector

Each chunk is transformed into a vector representation.

```text
"How do I configure a device?"
                │
                ▼
          Embedding Model
                │
                ▼
       [0.021, -0.184, ...]
                │
                ▼
             pgvector
```

When a query arrives, the question is also transformed into a vector.

The system can retrieve chunks that are semantically close to that query.

```text
Query
   ↓
Embedding
   ↓
pgvector
   ↓
Relevant chunks
```

PostgreSQL once again acts as a central part of the infrastructure: it stores both product data and its vector representations.

---

# 14. From chunks to response

Once the knowledge has been indexed, a query can follow a compact flow:

```text
Question
   ↓
Embedding
   ↓
Retrieval
   ↓
Retrieved context
   ↓
Prompt
   ↓
LLM
   ↓
Response
```

The system does not process the documents again for every question.

Indexing is a previous phase. The query uses representations that have already been generated.

---

# 15. Keeping the response grounded in context

The chatbots built on these capabilities use a `System Prompt` strategy that guides the response toward the retrieved context.

```text
Question ─────────────┐
                      ▼
              System Prompt
                      ▲
                      │
             Retrieved context
                      │
                      ▼
                     LLM
                      │
                      ▼
                   Response
```

The goal is not to claim that an LLM can never make mistakes.

The goal is to reduce the response space and make generation rely on the information the application retrieved from its own document base.

---

# 16. Controlling pipeline cost

A RAG system can involve expensive operations: embedding generation, retrieval, and inference.

The architecture therefore also needs to avoid repeated work whenever possible.

PLEI uses Redis as part of a caching strategy:

```text
Query
   ↓
Cache?
 ┌─┴─────────────┐
 │               │
Hit             Miss
 │               │
 ▼               ▼
Reused result  Retrieval
                  │
                  ▼
                 LLM
                  │
                  ▼
                Cache
```

The cache does not replace retrieval.

It is a layer for reusing results when the scenario allows it.

---

# 17. Zeus and PLEI: two implementations, one idea

| | Zeus | PLEI |
|---|---|---|
| Product | IoT platform | E-learning platform |
| Goal | Product-specific knowledge | Platform-specific knowledge |
| Backend | Node.js / TypeScript / Express | Laravel |
| Vector store | PostgreSQL + pgvector | PostgreSQL + pgvector |
| Document processing | Yes | Yes |
| Embeddings | Yes | Yes |
| Retrieval | Semantic | Document knowledge |
| Providers | OpenAI / Ollama | OpenAI / Ollama |
| Highlighted architecture | DDD + Hexagonal | Reusable AI infrastructure |
| Main challenge | Architectural integration | Processing and reuse |

The conceptual infrastructure is similar.

The implementation is not.

And that difference is precisely what makes the comparison useful.

---

# 18. Which parts of the system are actually reusable

After building the pattern twice, it becomes possible to separate the RAG core from product-specific decisions.

## Core

```text
Document
   ↓
Processing
   ↓
Chunking
   ↓
Embeddings
   ↓
Vector Store
   ↓
Retrieval
   ↓
Context
   ↓
LLM
```

## Product-specific decisions

```text
RAG
 │
 ├── Chunking
 │     ├── normal document
 │     └── FAQ
 │
 ├── Provider
 │     ├── OpenAI
 │     └── Ollama
 │
 └── Processing
       ├── Zeus
       └── PLEI
```

The pattern remains.

The implementation decisions change according to the domain, the data, and the existing architecture.

---

# 19. What changed between the first and second implementation

The first implementation mainly answered:

> How do I retrieve product-specific knowledge before generating a response?

The second implementation forced additional questions:

> How do I turn heterogeneous documents into indexable knowledge?

> How do I avoid processing the same document again?

> What do I do when a PDF is essentially an image?

> How do I handle an FAQ differently from a normal document?

> How do I reuse the AI infrastructure for more than one feature?

The important lesson was that integrating a language model and building infrastructure around language models are different engineering problems.

---

# 20. Before and after

## Zeus

**Before**

The platform needed to use product-specific information to generate answers, but that information had to be made available through a retrieval layer.

**After**

A RAG pipeline was integrated into the Backend:

```text
Documentation
    ↓
Processing
    ↓
Embeddings
    ↓
pgvector
    ↓
Retrieval
    ↓
Context
    ↓
LLM
```

Product-specific knowledge became part of the generation flow.

## PLEI

**Before**

The platform needed to introduce AI over its own information, but a direct integration from each feature to the provider did not solve document processing or provide a common infrastructure.

**After**

A reusable infrastructure was built with:

```text
AI Facade
   ↓
Provider Strategy
   ├── OpenAI
   └── Ollama

Document Pipeline
   ├── SHA-256
   ├── S3
   ├── extraction
   ├── OCR
   ├── cleaning
   ├── classification
   ├── chunking
   ├── embeddings
   └── pgvector
```

The platform gained a common foundation for AI features that use its own knowledge.

---

# 21. The hard part was not calling the LLM

A RAG system can look like a short sequence:

```text
Embedding
   ↓
Vector DB
   ↓
LLM
```

In a real product, the engineering work appears around those three pieces.

You need to decide:

- which documents enter the system;
- how their content is extracted;
- when OCR should be used;
- how duplicate documents are detected;
- how content is split;
- how each fragment is represented;
- where vectors are stored;
- how context is retrieved;
- how the prompt is constructed;
- how the provider is decoupled;
- how repeated work is avoided;
- how everything fits into the existing architecture.

The LLM is only one piece.

The engineering lies in building everything that happens before it and around it.

---

# Conclusion

Building a RAG system once helps explain the mechanism.

Building it again for another product makes it possible to distinguish what belongs to the pattern from what depends on the context.

In Zeus, the main challenge was integrating knowledge retrieval into a Backend with an architecture that was already defined.

In PLEI, the problem expanded into reusable document and AI infrastructure: deduplication, extraction, OCR, classification, chunking, embeddings, vector storage, and provider abstraction.

The conclusion is simple:

> **A RAG system is not an LLM connected to a vector database. It is a knowledge-retrieval system integrated into a software architecture.**

The model generates the response.

The application decides which knowledge can reach it.
