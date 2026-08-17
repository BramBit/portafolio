---
title: "Fundación Maleua — Institutional Website"
slug: "maleua"
impactSummary: "Built a static institutional website with a content structure designed for simple maintenance."
summary: "Development of a static institutional website with Astro, with content separated from the presentation layer to simplify maintenance."
technologies:
  - "Astro"
  - "Vercel"
company: "Alaska Tech"
role: "Developer"
timeframe: "Jan 2023 – Present"
publishedAt: 2026-08-01
---

## Problem

Fundación Maleua needed an institutional landing site to present the organization, its programs, and its services to the community — with fast load times, low maintenance overhead, and a simple deployment process, since the team maintaining it afterward wouldn't be developers.

## Solution

I built the site as a static site with Astro, deployed on Vercel, with content fully decoupled from the presentation layer.

## Architecture

Static Site Generation on Astro, with all copy, images, and configuration centralized in data files rather than embedded in components.

## Implementation

Structuring content this way means updating text, images, or settings doesn't require touching the interface components directly — someone can update a data file without knowing how the site is built.

## Challenges

The main constraint was designing for a team that wouldn't be maintaining the code themselves — the content architecture had to make future updates safe without developer involvement.

## Results

The foundation's landing page runs fast, deploys simply, and can be updated by non-developers without touching the site's components.
