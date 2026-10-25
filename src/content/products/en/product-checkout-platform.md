---
title: "Product Checkout Platform"
slug: "product-checkout-platform"
tagline: "Checkout and payments platform featuring hexagonal architecture, Railway-Oriented Programming, and native PostgreSQL."
status: "coming-soon"
problem: "Integrating payment gateways and processing credit card charges demands absolute reliability: preventing duplicate charges, ensuring live inventory consistency, and handling network timeouts without uncaught exceptions."
solution: "Full-stack application built with NestJS and React implementing a complete checkout flow, designed with Hexagonal Architecture, native ACID transactions, and Railway-Oriented Programming (ROP)."
website: "https://product-checkout-platform-web.vercel.app"
repository: "https://github.com/BramBit/product-checkout-platform"
demo: "https://product-checkout-platform-web.vercel.app"
docs: "https://product-checkout-platform.onrender.com/docs"
featured: true
---

## 1. Problem and Context

Payment processing in e-commerce is one of the most critical challenges in software engineering. A network hiccup or timeout mid-transaction cannot result in ghost charges or desynchronized stock counts.

This project was built to demonstrate an end-to-end checkout flow engineered to production standards:
- Catalog with live, verified inventory.
- Secure capture of credit card details and shipping information.
- Purchase summary and asynchronous processing via an external payment gateway in a sandbox environment.
- Atomic stock deduction and transactional receipt generation.

---

## 2. Architecture Decisions

### Hexagonal Architecture (Ports and Adapters)
The application core is completely decoupled from frameworks and infrastructure providers:
- **Domain:** Defines pure business entities (`Order`, `Product`, `Transaction`) and domain invariants.
- **Ports:** Strongly typed interfaces for persistence and payment gateway interactions.
- **Adapters:** Interchangeable implementations connecting the core domain to NestJS HTTP controllers, the native PostgreSQL client, and the sandbox gateway client.

```text
HTTP Request (NestJS Controller)
           │
           ▼
[ Inbound Port: Use Case ]
           │
           ▼
[ Domain Core (Entities & Business Rules) ]
           │
           ▼
[ Outbound Port: Database / Payment Gateway ]
           │
     ┌─────┴────────────────┐
     ▼                      ▼
PostgreSQL Adapter      Sandbox Gateway Adapter
(Native pg driver)      (HTTP Client with retries)
```

### Railway-Oriented Programming (ROP)
Rather than relying on exceptions for business flow control, use cases return explicit `Result<T, E>` types. This ensures predictable error modeling (insufficient funds, out of stock, card declined, or upstream gateway failure) handled as typed railway branches at compile time.

---

## 3. Implementation and Payment Resilience

### Native PostgreSQL Without an ORM
To maintain total control over query optimization, connection pooling, and transactional boundaries, persistence is handled directly via the native `pg` driver:
- **Explicit ACID Transactions:** Critical operations (`BEGIN`, `COMMIT`, `ROLLBACK`) wrap stock verification and order creation.
- **Overselling Prevention:** Row-level locks (`SELECT ... FOR UPDATE`) prevent race conditions when multiple users attempt to purchase the last available item simultaneously.
- **Versioned Migrations:** Managed reliably with `node-pg-migrate`.

### Asynchronous State Machine and Reconciliation
Transactions follow a deterministic state machine (`PENDING`, `APPROVED`, `DECLINED`, `ERROR`). When an external gateway call times out, the platform supports idempotent status reconciliation without re-submitting duplicate payment requests.

---

## 4. Frontend & User Experience

- **React with TypeScript and Vite:** High-performance, lean client interface built without heavy component libraries.
- **Redux Toolkit and Redux Persist:** Predictable state management for cart contents and shipping steps, persisting session data across accidental browser refreshes.
- **Instant Validation:** Real-time feedback for credit card number formatting, expiration, and delivery fields.

---

## 5. Testing Strategy

- **Backend:** Unit test suite covering core domain rules and use case orchestration using **Jest**.
- **Frontend:** Component integration tests and user checkout interaction flows with **Vitest** and **React Testing Library**.

---

## 6. Verified Links & Resources

- **Deployed Application (Live Demo):** [product-checkout-platform-web.vercel.app](https://product-checkout-platform-web.vercel.app)
- **Source Code Repository:** [github.com/BramBit/product-checkout-platform](https://github.com/BramBit/product-checkout-platform)
- **Interactive API Documentation:** [product-checkout-platform.onrender.com/docs](https://product-checkout-platform.onrender.com/docs) *(Swagger UI automatically generated from controller schemas)*
