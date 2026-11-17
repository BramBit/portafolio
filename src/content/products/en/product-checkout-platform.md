---
title: "Product Checkout Platform"
slug: "product-checkout-platform"
tagline: "Checkout and payments platform featuring hexagonal architecture, Railway-Oriented Programming, and native PostgreSQL."
status: "sandbox-demo"
capabilities: ["React + NestJS", "Sandbox payments", "PostgreSQL"]
problem: "A checkout needs to connect product selection, card tokenization, payment status, and inventory updates across the interface, API, and payment gateway."
solution: "A demonstration checkout built with React and NestJS, PostgreSQL persistence, sandbox payments, ports and adapters, and typed Result values."
website: "https://product-checkout-platform-web.vercel.app"
repository: "https://github.com/BramBit/product-checkout-platform"
demo: "https://product-checkout-platform-web.vercel.app"
docs: "https://product-checkout-platform.onrender.com/docs"
featured: true
---

## Problem and scope

This demonstration project connects a React checkout to a NestJS API and an external payment gateway in sandbox mode. It covers product selection, delivery information, browser-side card tokenization, transaction creation, and payment status consultation.

The demo uses sandbox payments. It is a technical project with automated tests, rather than a commercially validated payment platform.

## Architecture and decisions

The code is organized around domain entities, application use cases, ports, and adapters. NestJS provides dependency injection and HTTP controllers; the use cases integrate with NestJS and its configuration service. PostgreSQL persistence uses the native `pg` driver and parameterized queries.

```text
React checkout / Browser tokenization
                  │
                  ▼
        NestJS HTTP controllers
                  │
                  ▼
     Use cases / Result / Domain rules
                  │
        ┌─────────┴──────────┐
        ▼                    ▼
PostgreSQL adapter    Sandbox gateway adapter
(native pg driver)    (HTTP requests)
```

Use cases return `Result` values for modeled business errors, including insufficient stock and payment gateway failures. This makes those outcomes explicit to their callers.

## Payment and inventory flow

The API checks the product and available stock, creates a pending transaction, and sends the tokenized payment request to the sandbox gateway. A separate use case consults payment status when a gateway reference is available and updates inventory when a pending payment becomes approved.

These reads and writes are separate operations. Coordinating inventory and payment state under concurrent requests, and recovering an uncertain gateway outcome after a timeout, remain areas for further work.

Schema changes use versioned migrations with `node-pg-migrate`.

## Frontend

React, TypeScript, and Vite provide the interface. Redux Toolkit and Redux Persist manage checkout state across page reloads. The forms provide feedback for card and delivery fields, and card tokenization runs from the browser before transaction creation.

## Automated tests

Jest tests cover domain rules and application use cases. Vitest and React Testing Library cover frontend components and user flows. These tests exercise specific behaviors; they do not establish production payment guarantees.

## Demo and source

- [Sandbox demo](https://product-checkout-platform-web.vercel.app)
- [Source repository](https://github.com/BramBit/product-checkout-platform)
- [API documentation](https://product-checkout-platform.onrender.com/docs)
