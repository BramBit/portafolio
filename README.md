# Brayan Mercado — Portfolio

Bilingual personal portfolio presenting software products, professional experience and engineering services.

Live site: [brayanmercado.com](https://brayanmercado.com)

## Stack and visual system

- Astro 7 with TypeScript and static output.
- CSS Modules for components, with shared design tokens in `src/styles/tokens/`.
- Space Grotesk, served locally through `@fontsource/space-grotesk`.
- Markdown content collections for products, case studies and technical articles.
- SVG diagrams with responsive layouts, contextual typography and reduced-motion support.
- Sitemap generation through `@astrojs/sitemap`.

The design uses a dark background (`#0A0B10`), violet accent (`#8587FF`), fine borders and restrained motion. Use the existing tokens when changing colors, typography, spacing or animation.

## Local development

Use Node.js 22.12.0 or later, as required by the installed Astro version, and pnpm.

```bash
pnpm install
pnpm dev
```

The development server starts at `http://localhost:4321` by default.

```bash
pnpm build    # Generate the static site in dist/
pnpm preview  # Preview the production build locally
```

## Site structure

English is the default language. Spanish pages use the `/es/` prefix and translated route names.

| Section | English | Spanish |
| --- | --- | --- |
| Home | `/` | `/es/` |
| Products | `/products/` | `/es/productos/` |
| Experience | `/case-studies/` | `/es/casos-de-exito/` |
| Services | `/services/` | `/es/servicios/` |
| About | `/about/` | `/es/sobre-mi/` |
| Contact | `/contact/` | `/es/contacto/` |

The homepage presents Products, Experience, Services, Tech Stack, About and Contact after the hero. Engineering indexes and articles remain available under `/engineering/` and `/es/ingenieria/`, outside the homepage and primary navigation.

Experience is grouped by company: Zeus and PLEI at Belvi Digital; VeciApp and Fundación Maleua at Alaska Tech. Summaries identify the systems, problems and individual contributions; the Experience index adds technical decisions, while individual cases provide the detailed narrative.

Services uses four stable identifiers shared by both languages: `custom-software`, `automation`, `applied-ai` and `modernization`. Homepage cards link to matching anchors on the Services pages.

## Project structure

```text
src/
├── components/       # Astro components and CSS Modules
├── content/
│   ├── case-studies/ # Professional cases, organized into en/ and es/
│   ├── engineering/  # Technical articles, organized into en/ and es/
│   └── products/     # Product descriptions, organized into en/ and es/
├── content.config.ts # Collection schemas and stable content IDs
├── data/             # Experience summaries, services, stack, statuses and site data
├── i18n/             # Shared translations, navigation and language routing
├── layouts/          # Shared document layout and metadata
├── pages/            # English routes and translated Spanish routes
└── styles/
    ├── global.css    # Fonts, reset, focus styles and shared utilities
    └── tokens/      # Colors, typography, spacing and motion

public/               # Brand assets, profile images and public CV
```

## Editing content and components

| Area | Main files |
| --- | --- |
| Hero and homepage composition | `src/components/Hero.astro`, `src/pages/index.astro`, `src/pages/es/index.astro` |
| Experience grouping and summaries | `src/data/experience.ts`, `src/components/ExperienceGroups.astro` |
| Experience index and individual cases | `src/components/ExperienceIndex.astro`, `src/components/CaseStudyLayout.astro`, `src/content/case-studies/` |
| Services data and presentation | `src/data/services.ts`, `src/components/ServiceCard.astro`, `src/components/ServicesPage.astro` |
| Technical diagrams | `src/components/ServiceDiagram.astro`, `src/components/SystemDiagram.astro`, `src/components/DiagramCompact.astro` |
| Shared diagram labels and scaling | `src/components/DiagramLabel.astro`, `src/components/DiagramFrame.astro` |
| Products and status labels | `src/content/products/`, `src/data/productStatus.ts`, `src/components/ProductCard.astro`, `src/components/ProjectFeature.astro` |
| Product Markdown presentation | `src/components/ProductProse.astro` |
| Tech Stack inventory and provenance | `src/data/stack.ts`, `src/components/StackGroups.astro` |
| Navigation and translations | `src/i18n/index.ts`, `src/components/Navbar.astro`, `src/components/MobileMenu.astro` |
| Shared contact details | `src/data/site.ts` |
| About and Contact pages | `src/pages/about.astro`, `src/pages/contact.astro` and their Spanish counterparts |
| Downloadable CV | `public/cv-brayan-mercado.pdf` |

Keep English and Spanish content semantically aligned. Preserve service IDs, route slugs and language equivalents when editing navigation or content. Product status labels distinguish a sandbox demo from an implemented backend whose full MVP is still in development.

Tech Stack has five explicitly ordered categories with deduplicated technologies and source references. It does not use proficiency scores or project counts. Add technologies only when documented by the corresponding content.

## Validation

```bash
pnpm build
git diff --check
```

There are no dedicated lint or test scripts in `package.json`. For visual changes, inspect both languages on desktop, tablet and mobile, including 320 px. Check keyboard navigation, language switching, internal links, service anchors, diagram labels and `prefers-reduced-motion`.

## Deployment

Deploy the generated `dist/` directory to a static hosting provider. Use `pnpm build` as the build command and a compatible Node.js version. The canonical site URL and locale configuration are defined in `astro.config.mjs`.
