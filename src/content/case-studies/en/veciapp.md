---
title: "VeciApp — Backend for a Local Marketplace"
slug: "veciapp"
impactSummary: "Designed and built the backend for a multi-role marketplace connecting local merchants with their customers."
summary: "Design and implementation of the backend for a multi-role marketplace, including authentication, geolocation, payments, and external integrations."
technologies:
  - "Node.js"
  - "TypeScript"
  - "PostgreSQL"
  - "PostGIS"
  - "Redis"
company: "Alaska Tech"
role: "Co-Founder / Backend"
timeframe: "Jan 2023 – Present"
publishedAt: 2026-08-02
---

## Problem

VeciApp is a multi-role marketplace built for Fundación Maleua to help small local merchants in the Santa Marta region digitize their businesses — merchants who typically don't have the resources to build their own technology. It needed to let merchants manage their business, list products, and receive orders, while giving consumers a single marketplace to shop from, and it needed to be built and shipped by a small team from the ground up.

## Solution

I designed and built the entire backend of VeciApp, plus specific modules of the administrative frontend. That included the full data model for users, merchants, products, orders, and the relationships between them, a complete JWT-based authentication system with account verification, geospatial features for location-based merchant discovery, media management through Cloudinary, payment processing through the Wompi widget, transactional email through Resend, and deployment on Render. On the frontend, I built the store, customer, and product administration modules and the main dashboard with financial indicators.

## Architecture

The backend uses Node.js, TypeScript, Express, PostgreSQL with PostGIS, TypeORM, and Redis, following the Business Object Pattern — a lightweight architecture chosen deliberately for a project of this size, prioritizing simplicity and ease of maintenance over the heavier patterns used on larger platforms.

## Implementation

Authentication covers JWT-based login, user registration, account verification via codes, session management, and route protection. PostGIS powers geographic queries over registered merchants, supporting location and coverage-based features. Cloudinary handles image upload, organization, and reference persistence, consumed from both the admin frontend and the team's mobile app. Payments run through Wompi's official widget, and Resend handles transactional emails across the application's lifecycle.

## Challenges

Building a marketplace end-to-end for a small team meant choosing an architecture that matched the project's actual size instead of over-engineering it — the Business Object Pattern was a deliberate trade-off toward maintainability and speed over the more elaborate patterns used on larger Belvi projects. Geospatial features and multi-role access (merchants, consumers, admins) had to work correctly from day one, since the marketplace's core value depends on merchants being findable by location.

## Results

VeciApp's backend runs the platform's full commercial operation today — user and merchant management, product catalogs, orders, payments, and location-based discovery — with an administrative frontend the Fundación Maleua team uses to manage stores, customers, and financial performance.
