# AGENTS.md — brayanmercado.com

> Lee este archivo completo antes de cualquier tarea. Es la fuente de verdad
> del proyecto. Si una instrucción puntual del usuario contradice algo aquí,
> pregunta antes de asumir cuál prevalece.

---

## 1. Qué es este proyecto

Sitio de marca personal de **Brayan Mercado**, Software Engineer. NO es un
portafolio tradicional. Cumple tres objetivos a la vez:

1. Conseguir oportunidades laborales.
2. Conseguir clientes freelance / consultoría.
3. Posicionar productos propios (Pliegos, Órbita, futuros SaaS).

Test para cualquier decisión de contenido o UI:

> "¿Esto ayuda a posicionar a Brayan Mercado como el ingeniero que
> necesito para construir mi producto?" Si la respuesta es no, no se hace.

El visitante NO debe salir pensando "qué buen programador". Debe salir
pensando "este es el ingeniero que necesito para construir mi producto".

**Sitio bilingüe (EN/ES).** Inglés es el idioma por defecto y vive en la
raíz sin prefijo (`/`, `/services`...); español vive bajo `/es/`
(`/es/`, `/es/servicios`...). Ver `docs/00_ESTRATEGIA_Y_COPY_MAESTRO.md`
para el copy exacto de cada idioma y para el porqué del ángulo de venta.

## 2. Reglas de contenido (no negociables)

- No vender tecnologías como titular. Vender: sistemas escalables,
  automatización, plataformas empresariales, IA aplicada, arquitectura.
  La tecnología va siempre como detalle secundario, nunca como gancho.
- No usar la estructura clásica Home/About/Skills/Projects/Experience.
  Usar: Home / Services / Case Studies / Engineering / Products / About / Contact
  (y sus equivalentes en español: Inicio / Servicios / Casos de Éxito /
  Ingeniería / Productos / Sobre mí / Contacto).
- No presentar a Brayan como "desarrollador apasionado" ni frases genéricas
  de portafolio ("Hola, soy...", "Download CV" como titular).
- Posicionamiento correcto: Software Engineer, Full Stack Engineer, Software
  Architect, Applied AI Engineer. NUNCA: "Backend Developer", "Frontend
  Developer", "React Developer", "Node.js Developer" como titular.
- Case Studies responden siempre, en este orden: Problema → Solución →
  Arquitectura → Implementación → Retos → Resultado (Problem → Solution →
  Architecture → Implementation → Challenges → Results en inglés).
- Todo el copy final (hero, servicios, about, CTAs, contacto) está ya
  redactado en `docs/00_ESTRATEGIA_Y_COPY_MAESTRO.md`. No se redacta copy
  nuevo fuera de ese documento sin pasar antes por decisión explícita.

## 3. Fuente de contenido real

`docs/Documento_Maestro_de_Experiencia.md` es la ÚNICA fuente autorizada
de datos de experiencia, proyectos y stack. Nunca inventar detalles de
experiencia profesional que no estén ahí.

`docs/00_ESTRATEGIA_Y_COPY_MAESTRO.md` es la ÚNICA fuente autorizada del
texto final del sitio (hero, servicios, about, CTAs, titulares de impacto
de case studies, contacto), en inglés y español.

Mapeo confirmado contenido → sección del sitio:

| Fuente en el Documento Maestro | Va en |
| --- | --- |
| Proyecto Zeus (Belvi Digital) | Case Study |
| Proyecto PLEI (Belvi Digital) | Case Study |
| Proyecto VeciApp (Alaska Tech) | Case Study |
| Landing Fundación Maleua | Case Study corto o mención en About (proyecto pequeño) |
| Sistema RAG personalizado (dentro de Zeus/PLEI) | Artículo de Engineering, NO case study aparte |
| Smart Search / búsqueda híbrida (dentro de PLEI) | Artículo de Engineering, NO case study aparte |
| Integración de Wallet (dentro de Zeus) | Mencionar dentro del Case Study de Zeus, no aparte |
| Catálogo de Capacidades de Ingeniería (sección 5) | Insumo ya volcado en Services y About del Copy Maestro |
| Perfil profesional / Evolución (secciones 2 y 10) | Insumo ya volcado en el About del Copy Maestro |

Asegúrate de que Case Studies y Engineering no reciten la misma
información — el Case Study cuenta el proyecto de negocio completo, el
artículo de Engineering profundiza en cómo se resolvió técnicamente esa
pieza específica.

## 4. Identidad de marca

```
Brayan Mercado
Software Engineer
Building scalable products, intelligent systems and AI-powered experiences.
```

Dominio: `brayanmercado.com` (mantener, no cambiar por otra marca).
Logo: "BM" — isotipo geométrico + wordmark horizontal, versión light/dark.
Assets ya existentes y reutilizables (migrar, no regenerar):
`bram-profile.png/webp`, `cv-brayan-mercado.pdf`, `favicon.svg`, `og-image.png`.

## 5. Design system

**Paleta (fuente de verdad: branding.png, no el DESIGN_SYSTEM.md original —
ya se resolvió el conflicto entre ambos):**

```
--color-bg: #0B0D12
--color-surface: #11141A
--color-surface-elevated: #1A1F2B
--color-primary: #6366F1      /* índigo — CTAs, links */
--color-secondary: #8B5CF6    /* púrpura — acentos secundarios */
--color-accent: #22D3EE       /* cian — highlights puntuales */
--color-text-primary: #F7F8FA
--color-text-secondary: #9CA3AF
--color-text-muted: #6B7280
```

**Tipografía:** Space Grotesk (única familia, display + body).
`Hero 72px / H1 56px / H2 40px / H3 32px / H4 24px / Body Lg 20px / Body 18px / Small 16px / Caption 14px`

**Espaciado:** 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128
**Grid:** Desktop 12 · Tablet 8 · Mobile 4 · Max width 1280px
**Breakpoints:** 640 · 768 · 1024 · 1280 · 1536
**Motion:** solo fade / opacity / scale / translateY, 150–350ms. Nada invasivo.
**Iconos:** Lucide, outline, 1.5px stroke.

**Fondos especiales** (Gradiente Primario, Glow Sutil, Grid Técnico, Ruido
Sutil) SOLO en Hero o secciones puntuales, nunca como fondo base del layout.

**Prohibido siempre:** gradientes excesivos, ilustraciones, partículas,
parallax, efectos 3D, glassmorphism, animaciones invasivas.

**Cards:** mucho espacio interno, bordes sutiles (1px, surface-elevated),
sin gradientes, sin glassmorphism, hover discreto.

## 6. Stack técnico

- Astro 6+, TypeScript strict, i18n nativo (locales `en`/`es`, `en` sin
  prefijo, `es` bajo `/es/`)
- CSS Modules (no Tailwind, no CSS-in-JS)
- Content Layer API para collections
- Deploy: Vercel

## 7. Arquitectura del proyecto

```
src/
├── assets/
├── components/       (base: Button, Card, Badge, Heading, Tag, Container, Section
│                       compuestos: Navbar, Footer, MobileMenu, Hero, ServiceCard,
│                       CaseStudyCard, ProductCard, ArticleCard, CTASection, ContactSection)
├── content/
│   ├── case-studies/
│   │   ├── en/
│   │   └── es/
│   ├── engineering/
│   │   ├── en/
│   │   └── es/
│   └── products/
│       ├── en/
│       └── es/
├── data/
├── i18n/              (en.ts, es.ts, index.ts — diccionario de strings de UI)
├── layouts/
├── pages/             (rutas en inglés, sin prefijo)
│   └── es/            (rutas en español)
├── sections/
├── styles/
├── types/
└── utils/
```

Rutas en inglés: `/`, `/services`, `/case-studies`, `/case-studies/[slug]`,
`/engineering`, `/engineering/[slug]`, `/products`, `/products/[slug]`,
`/about`, `/contact`

Rutas en español: `/es/`, `/es/servicios`, `/es/casos-de-exito`,
`/es/casos-de-exito/[slug]`, `/es/ingenieria`, `/es/ingenieria/[slug]`,
`/es/productos`, `/es/productos/[slug]`, `/es/sobre-mi`, `/es/contacto`

Schemas de content collections (aplican igual a las carpetas `en/` y `es/`
de cada colección):

- **case-studies:** title, slug, impactSummary, summary, problem, solution, architecture, implementation, challenges, results, technologies[], publishedAt
- **engineering:** title, slug, excerpt, readingTime, tags[], publishedAt
- **products:** title, slug, tagline, status ("live"|"coming-soon"), problem, solution, website?, featured

## 8. SEO / Performance (objetivos de aceptación)

Lighthouse: Performance 95+, Accessibility 100, Best Practices 100, SEO 100,
en ambos idiomas.
Keywords objetivo (EN): Software Engineer, Full Stack Engineer, AI Engineer,
Applied AI Engineer, Brayan Mercado, Backend Consultant, Software Architect.
Keywords objetivo (ES): Ingeniero de Software, Full Stack Engineer, Ingeniero
de IA, Brayan Mercado, Consultor Backend, Arquitecto de Software.
SSG por defecto, lazy loading, contraste AA, navegación por teclado, focus
visible, alt text, jerarquía de headings correcta, hreflang entre ambas
versiones de cada página.

## 9. Productos propios (sección Products)

- **Pliegos** (live): AI-powered procurement intelligence platform.
  Monitoriza contratación pública y genera reportes automáticos.
- **Órbita** (coming soon): AI platform for food businesses.

Siempre comunicar el problema resuelto antes que la tecnología.

## 10. Contacto

```
Email:     brayan.msanmartin@gmail.com
LinkedIn:  https://www.linkedin.com/in/brayan-mercado-sanmartin/
GitHub:    https://github.com/BramBit
CV:        cv-brayan-mercado.pdf (ya migrado a public/, ver sección 4)
```

Estos son los datos reales que usan Footer (paso 2.3) y Contact (pasos
3.10/3.10b). El botón principal de contacto es siempre `mailto:` al
correo de arriba, nunca un formulario.
