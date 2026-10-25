---
title: "VeciApp — Backend & Platform for a Local Marketplace"
slug: "veciapp"
impactSummary: "Designed and built the backend and admin dashboard for a multi-role marketplace serving approximately 300 local merchants."
summary: "Design and implementation of a multi-role marketplace backend, including authentication, PostGIS geolocation, payments, and external integrations."
technologies:
  - "Node.js"
  - "TypeScript"
  - "Express"
  - "PostgreSQL"
  - "PostGIS"
  - "Redis"
  - "React"
  - "Render"
company: "Alaska Tech"
role: "Co-Founder / Backend & Full Stack"
timeframe: "Jan 2023 – Present"
storeLink: "https://play.google.com/store/apps/details?id=com.alaskatech.veciapp"
publishedAt: 2026-08-02
---

## Product Context and Problem

VeciApp is a multi-role local commerce marketplace built in the context of **Alaska Tech** for Fundación Maleua, conceived to help small neighborhood merchants in the Santa Marta region digitize their product catalogs and connect with nearby consumers.

According to platform operational records, the service caters to approximately 300 merchants who required a dependable tool to list products, manage live inventory, and fulfill customer orders without paying steep commission cuts to major delivery apps.

## Role and Individual Contribution

As co-founder and lead backend engineer at Alaska Tech:
- Designed and engineered the entire REST API and relational/geospatial database models.
- Implemented multi-role authentication security and external payment gateway processing.
- Built the administrative web dashboard in React for store onboarding and operational reporting.
- Configured cloud database infrastructure and CI/CD pipelines on Render.

## Key Features Engineered

1. **Multi-Role Authentication & Security:** Registration and login flows powered by JWT, session management, account verification codes, and strict role-based access control (merchant, consumer, administrator).
2. **Geospatial Discovery with PostGIS:** Real-time location-based queries calculating Euclidean/spherical distances to surface nearby stores within active delivery polygons.
3. **Checkout Integration with Wompi:** Embedded official Wompi payment widget with verified webhooks for cryptographic transaction confirmation and atomic order state updates.
4. **Media Processing & Notification Pipelines:** Cloudinary asset management for catalog images and automated transactional email dispatch via Resend.
5. **Administrative Web Dashboard:** React-based control panel for merchant verification, store catalog audits, and financial performance visualization.

## Technical Challenges & Architecture Decisions

- **Business Object Pattern vs. Overengineering:** The *Business Object Pattern* was deliberately chosen over heavier architectural patterns. For a local marketplace maintained by a lean team, this approach delivered high development velocity while keeping domain business logic clean and isolated.
- **Addressing in Non-Standardized Urban Zones:** Given irregular street naming in certain informal neighborhoods, delivery radiuses were computed directly against spatial coordinates using GiST indexes in PostGIS, bypassing the inaccuracies of textual geocoding services.

## Verifiable Results

- Core backend running continuously on Render, powering day-to-day operations for affiliated merchants.
- Serves roughly 300 local merchants according to internal platform records.
- Official client mobile application live and available on the app store: [View VeciApp on Google Play Store](https://play.google.com/store/apps/details?id=com.alaskatech.veciapp).
