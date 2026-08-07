# 00 — ESTRATEGIA Y COPY MAESTRO
### Fuente única de verdad para TODO el texto del sitio. Nada de copy se decide en el CLI.

Este documento existe porque el problema de la primera ejecución no fue el plan
en fases — fue que varios pasos le pedían a Flash que "redactara" contenido
(el About, partes del Hero, el tono de los case studies) sin dárselo resuelto.
Flash no decide tono ni mensaje: aquí ya está resuelto, palabra por palabra,
en los dos idiomas. Los documentos de fase (1 a 4) solo referencian bloques
de este archivo — Flash copia, no redacta.

---

## 1. Decisión de posicionamiento

**No eres "Full Stack genérico".** Eres un Full Stack que construyó sistemas
de IA (RAG, búsqueda híbrida, chatbots) **desde cero, sin frameworks**,
integrados a arquitectura hexagonal, en producción real — reemplazando un
motor de búsqueda de pago (Algolia) y con el consumo de tokens optimizado
mediante caché. Eso es raro. La mayoría de freelancers fullstack ofrecen
Node + React sin diferenciación. Tu diferenciación real es: **sé meter IA
en un producto existente sin que se vuelva una demo cara e inmantenible.**

**Ángulo del sitio:** Full Stack Engineer especializado en IA aplicada a
producto, con base sólida de arquitectura y backend. La IA es el gancho,
la arquitectura es la garantía de que no se cae en producción.

## 2. Perfil de cliente ideal (ICP)

1. **Primario:** empresas con un producto ya en marcha que quieren agregar
   IA (búsqueda semántica, RAG, chatbots) sin depender 100% de un vendor ni
   sufrir facturas de tokens impredecibles.
2. **Secundario:** startups/founders construyendo un producto desde cero
   que necesitan arquitectura sólida desde el día uno para no reescribir
   todo en 12 meses.

Toda la copy de Servicios y Home está escrita pensando en el cliente #1
primero, sin excluir al #2.

## 3. Arquitectura de idioma (bilingüe EN/ES)

- Astro 6 con `i18n` nativo. Locales: `en` (default) y `es`.
- Routing: `en` vive en la raíz (`/`, `/services`, etc. — sin prefijo),
  `es` vive bajo `/es/` (`/es/`, `/es/servicios`, etc.).
  Razón: el tráfico de plataformas freelance internacionales entra en
  inglés por defecto; el switch a español es una decisión explícita del
  visitante, no al revés.
- Selector de idioma visible en Navbar y MobileMenu (ver sección 5).
- Slugs de páginas SÍ cambian entre idiomas (`/services` vs `/servicios`,
  `/case-studies` vs `/casos-de-exito`, `/about` vs `/sobre-mi`). Ambos
  slugs quedan fijados abajo — Flash no decide ninguno.
- Content collections (case-studies, engineering, products): una carpeta
  por idioma dentro de cada colección (`content/case-studies/en/`,
  `content/case-studies/es/`), mismo slug de archivo en ambas carpetas
  (ej. `zeus.md` en ambas) para poder cruzarlas.
- Strings de UI (nav, botones, labels genéricos) van en un diccionario
  simple: `src/i18n/en.ts` y `src/i18n/es.ts`. Ver sección 5.

## 4. Reglas de voz y tono (para que Flash nunca tenga que "decidir" tono)

- El Hero y los Servicios se escriben de **afuera hacia adentro**: primero
  el problema/resultado del cliente, después la prueba técnica. Nunca
  empezar una sección con "Soy Brayan, ingeniero con X años...".
- Las Case Studies sí pueden ser técnicamente densas — ahí el lector ya
  decidió leer con atención. Pero cada una lleva un titular de impacto de
  una línea arriba (sección 8) para que se entienda el valor sin leer todo.
- Cero superlativos vacíos ("el mejor", "de clase mundial", "revolucionario").
  La prueba es el hecho concreto (reemplacé Algolia, construí RAG sin
  frameworks), no el adjetivo.
- Nunca mencionar NDA, código protegido, ni usar el nombre de la empresa
  cliente como protagonista de un título.

---

## 5. Copy Maestro — Navegación

| Item | EN (slug) | ES (slug) |
|---|---|---|
| Home | Home (`/`) | Inicio (`/es/`) |
| Services | Services (`/services`) | Servicios (`/es/servicios`) |
| Case Studies | Case Studies (`/case-studies`) | Casos de Éxito (`/es/casos-de-exito`) |
| Engineering | Engineering (`/engineering`) | Ingeniería (`/es/ingenieria`) |
| Products | Products (`/products`) | Productos (`/es/productos`) |
| About | About (`/about`) | Sobre mí (`/es/sobre-mi`) |
| Contact | Contact (`/contact`) | Contacto (`/es/contacto`) |

Selector de idioma: dos letras, `EN` / `ES`, el que NO está activo es el
link (clic en "ES" desde inglés te manda a la versión en español de la
página actual, no siempre al home).

Diccionario UI mínimo (`src/i18n/{en,es}.ts`), botones que se repiten en
varias páginas:

| Key | EN | ES |
|---|---|---|
| `cta.seeWork` | See the work | Ver el trabajo |
| `cta.talk` | Let's talk about your project | Hablemos de tu proyecto |
| `cta.viewProduct` | View Product | Ver Producto |
| `badge.comingSoon` | Coming Soon | Próximamente |
| `badge.live` | Live | En operación |
| `nav.readMore` | Read more | Leer más |

---

## 6. Copy Maestro — Hero (Home)

**EN**
- H1: `Full-stack engineer who makes AI features actually work in production.`
- Subtítulo: `I design and build backend systems, RAG pipelines, and search engines that ship — without the vendor lock-in or unpredictable token bills most "AI integrations" come with.`
- Botón primary: `See the work` → `/case-studies`
- Botón secondary: `Let's talk about your project` → `/contact`

**ES**
- H1: `Ingeniero Full Stack que hace que la IA funcione de verdad en producción.`
- Subtítulo: `Diseño y construyo sistemas backend, pipelines RAG y motores de búsqueda que sí llegan a producción — sin depender de un proveedor externo ni facturas de tokens fuera de control.`
- Botón primary: `Ver el trabajo` → `/es/casos-de-exito`
- Botón secondary: `Hablemos de tu proyecto` → `/es/contacto`

---

## 7. Copy Maestro — Servicios (6 cards, en este orden exacto)

El orden importa: IA primero porque es el diferenciador, Consultoría al
final porque es la oferta de menor compromiso.

### 1 — AI Integration / Integración de IA

**EN** — Título: `AI That Ships, Not Demos`
Body: `RAG systems, hybrid semantic search, and specialized chatbots built to survive production — not just a proof of concept. I've replaced paid search vendors and built AI pipelines from scratch, integrated into real architectures, with token costs under control.`
Tech: `RAG, Embeddings, pgvector, OpenAI`

**ES** — Título: `IA que llega a producción, no solo a la demo`
Body: `Sistemas RAG, búsqueda semántica híbrida y chatbots especializados construidos para sobrevivir en producción, no solo para una prueba de concepto. He reemplazado motores de búsqueda de pago y construido pipelines de IA desde cero, integrados a arquitecturas reales, con el costo de tokens bajo control.`
Tech: `RAG, Embeddings, pgvector, OpenAI`

### 2 — Backend Development / Desarrollo Backend

**EN** — Título: `Backend That Scales With Your Business`
Body: `Backend systems designed to handle growth without costly rewrites — API design, data modeling, and infrastructure decisions made for where your product is going, not just where it is today.`
Tech: `Node.js, TypeScript, Laravel`

**ES** — Título: `Backend que escala con tu negocio`
Body: `Sistemas backend diseñados para soportar crecimiento sin reescrituras costosas — diseño de APIs, modelado de datos y decisiones de infraestructura pensadas para hacia dónde va tu producto, no solo para dónde está hoy.`
Tech: `Node.js, TypeScript, Laravel`

### 3 — Full Stack Development / Desarrollo Full Stack

**EN** — Título: `One Person, Full Ownership, End to End`
Body: `From database to interface with a single architectural vision — no hand-off gaps between backend and frontend, no lost context between teams.`
Tech: `Astro, Node.js, TypeScript`

**ES** — Título: `Una sola persona, responsabilidad completa, de punta a punta`
Body: `De la base de datos a la interfaz con una sola visión de arquitectura — sin huecos de traspaso entre backend y frontend, sin contexto perdido entre equipos.`
Tech: `Astro, Node.js, TypeScript`

### 4 — API Development / Desarrollo de APIs

**EN** — Título: `APIs Other Teams Actually Want to Integrate`
Body: `Clear, documented REST APIs designed for frictionless integration — built so other teams and applications can plug in without guesswork.`
Tech: `REST, Node.js`

**ES** — Título: `APIs que otros equipos sí quieren integrar`
Body: `APIs REST claras y documentadas, diseñadas para integrarse sin fricción — construidas para que otros equipos o aplicaciones se conecten sin adivinar nada.`
Tech: `REST, Node.js`

### 5 — Software Architecture / Arquitectura de Software

**EN** — Título: `Architecture Decisions That Age Well`
Body: `Structural decisions made so your system stays maintainable as the team and the product grow — Domain-Driven Design, Hexagonal Architecture, and Event-Driven patterns applied where they actually solve a problem, not for their own sake.`
Tech: `DDD, Hexagonal Architecture, CQRS, Event-Driven`

**ES** — Título: `Decisiones de arquitectura que envejecen bien`
Body: `Decisiones estructurales pensadas para que el sistema siga siendo mantenible cuando el equipo y el producto crezcan — DDD, Arquitectura Hexagonal y Event-Driven aplicados donde de verdad resuelven un problema, no por moda.`
Tech: `DDD, Arquitectura Hexagonal, CQRS, Event-Driven`

### 6 — Technical Consulting / Consultoría Técnica

**EN** — Título: `The Right Call, Before the First Line of Code`
Body: `A second set of senior eyes on critical technical decisions — so the right architecture gets chosen before you've built on top of the wrong one.`
(sin tech tags)

**ES** — Título: `La decisión correcta, antes de la primera línea de código`
Body: `Una segunda mirada senior sobre decisiones técnicas críticas — para que la arquitectura correcta se elija antes de construir encima de la equivocada.`
(sin tech tags)

---

## 8. Copy Maestro — Titulares de impacto para Case Studies (una línea, para CaseStudyCard)

Grounded en hechos reales del Documento Maestro — no se puede alterar el hecho, solo la redacción.

| Caso | EN | ES |
|---|---|---|
| Zeus | `Built the AI and financial-reporting backbone for an IoT platform managing medical aesthetic devices under a pay-per-use model.` | `Construí el motor de IA y reportes financieros de una plataforma IoT que administra dispositivos médicos estéticos bajo un modelo pay-per-use.` |
| PLEI | `Replaced a paid search vendor with a custom hybrid search engine, and built a RAG-powered support system from scratch.` | `Reemplacé un motor de búsqueda de pago por uno híbrido construido a la medida, y un sistema de soporte basado en RAG desde cero.` |
| VeciApp | `Designed and built the entire backend for a multi-role marketplace connecting local merchants with their community.` | `Diseñé y construí todo el backend de un marketplace multirrol que conecta comerciantes locales con su comunidad.` |
| Maleua | `Built a fast, low-maintenance institutional site with content fully decoupled from the presentation layer.` | `Construí un sitio institucional rápido y de bajo mantenimiento, con el contenido totalmente desacoplado de la presentación.` |

---

## 9. Copy Maestro — About (prosa completa, lista para pegar)

> Fuente: Documento Maestro secciones 2, 4, 10, 11. No se agregó ningún
> dato que no esté en el documento fuente.

**EN**

> I didn't start out writing backend code. I started as a food engineer,
> learning to model processes, control quality, and solve problems with
> structure and analysis — long before I touched a line of TypeScript.
>
> That changed when I moved into software: first building interfaces,
> then backend systems, and eventually taking on architecture decisions
> end to end. At Belvi Digital I helped build Zeus, an IoT platform for
> medical aesthetic devices, and PLEI, an e-learning platform — starting
> on the frontend and growing into full ownership of backend systems,
> including RAG pipelines and search engines I built from scratch. At
> Alaska Tech, the company I co-founded, I designed the entire backend of
> VeciApp, a marketplace connecting local merchants with their community.
>
> Along the way I kept running into the same pattern: teams wanting to
> add AI to their product and ending up with something that worked in a
> demo but fell apart in production — token costs spiraling, no real
> ownership of the pipeline, no way to swap providers without rewriting
> everything. So I stopped treating AI as a plugin and started treating it
> as a system: designed with the same rigor as any other piece of
> architecture — domain-driven, decoupled, testable, and yours.
>
> That's the lens I bring to every project now: understand the business
> problem first, then decide the architecture — never the other way
> around.

**ES**

> No empecé escribiendo backend. Empecé como ingeniero de alimentos,
> aprendiendo a modelar procesos, controlar calidad y resolver problemas
> con análisis y estructura — mucho antes de tocar una línea de
> TypeScript.
>
> Eso cambió cuando entré al desarrollo de software: primero construyendo
> interfaces, después sistemas backend, y con el tiempo asumiendo
> decisiones de arquitectura de punta a punta. En Belvi Digital participé
> en la construcción de Zeus, una plataforma IoT para dispositivos médicos
> estéticos, y de PLEI, una plataforma e-learning — empecé en frontend y
> terminé con responsabilidad completa sobre sistemas backend, incluyendo
> pipelines RAG y motores de búsqueda que construí desde cero. En Alaska
> Tech, la empresa que cofundé, diseñé todo el backend de VeciApp, un
> marketplace que conecta comerciantes locales con su comunidad.
>
> En el camino me encontré una y otra vez con el mismo patrón: equipos que
> querían meter IA en su producto y terminaban con algo que funcionaba en
> la demo pero se caía en producción — costos de tokens fuera de control,
> cero control sobre el pipeline, sin forma de cambiar de proveedor sin
> reescribirlo todo. Por eso dejé de tratar la IA como un plugin y empecé
> a tratarla como un sistema: diseñado con el mismo rigor que cualquier
> otra pieza de arquitectura — orientado al dominio, desacoplado,
> testeable, y tuyo.
>
> Esa es la mirada que le pongo a cada proyecto: entender primero el
> problema de negocio, y solo después decidir la arquitectura — nunca al
> revés.

---

## 10. Copy Maestro — CTA genérico (CTASection, se repite en varias páginas)

**EN** — Título: `Have a project that needs to actually ship?`
Botón: `Let's talk`

**ES** — Título: `¿Tienes un proyecto que necesita llegar a producción de verdad?`
Botón: `Hablemos`

## 11. Copy Maestro — Contacto (ContactSection + página Contact)

**EN**
- Título: `Let's build something that ships.`
- Texto: `Tell me about the problem you're trying to solve — not the tech stack you think you need. We'll figure out the second part together.`
- Botón principal: `Start the conversation` (mailto)
- Links secundarios: `LinkedIn`, `GitHub`, `Download CV`

**ES**
- Título: `Construyamos algo que sí llegue a producción.`
- Texto: `Cuéntame el problema que quieres resolver, no el stack que crees que necesitas. Eso lo definimos juntos.`
- Botón principal: `Empecemos a hablar` (mailto)
- Links secundarios: `LinkedIn`, `GitHub`, `Descargar CV`

---

## 12. Datos de contacto reales

Ya confirmados y viven en **AGENTS.md sección 10** — los pasos de fase
(2.3 Footer, 3.10/3.10b Contact) leen de ahí, no de este documento. Se
repiten aquí solo como referencia:

- Email de contacto: `brayan.msanmartin@gmail.com`
- URL de LinkedIn: `https://www.linkedin.com/in/brayan-mercado-sanmartin/`
- URL de GitHub: `https://github.com/BramBit`

"2 años y 6 meses" de experiencia: **confirmado por Brayan, se mantiene
tal cual en el About** (sección 9 de este documento). No requiere ajuste.
