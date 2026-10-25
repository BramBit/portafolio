---
title: "Fundación Maleua — Institutional Website"
slug: "maleua"
impactSummary: "Designed and built a static institutional website with Astro and decoupled content architecture for non-technical maintainers."
summary: "Development of a static institutional website on Astro and Vercel, with content completely decoupled from presentation to ensure zero-cost autonomous maintenance."
technologies:
  - "Astro"
  - "TypeScript"
  - "Vercel"
company: "Alaska Tech"
role: "Developer"
timeframe: "Jan 2023 – Present"
publishedAt: 2026-08-01
---

## Product Context and Problem

Fundación Maleua is a non-profit organization dedicated to community development and social programs in the Santa Marta region. The foundation needed an institutional web portal to communicate its initiatives, open community calls, and program results to partners and the public.

Project constraints:
- Minimal load times on mobile cellular connections.
- Zero recurring hosting or database operational costs.
- Straightforward maintenance workflow, since the staff updating program announcements would have no coding background.

## Role and Individual Contribution

As a developer at Alaska Tech, I took full technical ownership of the site's architecture, implementation, and deployment pipeline:
- Architectural selection of Static Site Generation (SSG) with Astro.
- Engineering the decoupled content and presentation layer.
- Configuring the automated continuous deployment pipeline on Vercel.

## Key Features Engineered

1. **Static Site Generation (SSG):** Complete pre-rendering of institutional pages, ensuring edge delivery with sub-second response times.
2. **Decoupled Data Architecture:** Copy, program profiles, partner logos, and team details centralized into structured data files, keeping raw Astro UI components completely untouched during content updates.
3. **Asset & Performance Optimization:** Responsive layouts with pure CSS, native system typography eliminating font render blocking, and lazy loading for images.

## Technical Challenges & Architecture Decisions

- **Maintainability Without a Heavy CMS:** Deploying a dynamic CMS (such as WordPress or Strapi) would have created database maintenance overhead, security vulnerability patches, and recurring hosting costs. Decoupling plain data files from presentation provided an intuitive editing experience without risk of breaking interface markup.
- **Frictionless Continuous Deployment:** Configured automated Vercel webhooks so that updates committed to the data repository automatically trigger production builds and edge propagation within seconds.

## Verifiable Results

- Institutional site operating in production with zero recurring server or database hosting costs.
- Top Core Web Vitals scores achieved through lean, static HTML delivery without unnecessary client JavaScript.
- Autonomous editorial updates carried out by foundation staff without requiring developer intervention for routine text or image changes.
