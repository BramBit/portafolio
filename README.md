# Brayan Mercado — Portfolio

Personal portfolio built with **Astro** and pure **CSS**. Light cold theme, responsive, mobile-friendly with horizontal card sliders.

🌐 **Live:** [tu-dominio](https://portafolio-ten-wine-57.vercel.app/)

---

## Stack

- [Astro 5](https://astro.build) — static site generator
- CSS — no frameworks, no Tailwind
- Google Fonts — Inter + JetBrains Mono

---

## Getting started

```bash
# Install dependencies
pnpm install

# Start dev server → http://localhost:4321
pnpm dev

# Production build → dist/
pnpm build

# Preview production build locally
pnpm preview
```

---

## Project structure

```
src/
├── components/
│   ├── Nav.astro          # Fixed navigation
│   ├── Hero.astro         # Intro + profile card (merged)
│   ├── Skills.astro       # Tech stack grid / mobile slider
│   ├── Experience.astro   # Professional timeline / mobile slider
│   ├── Projects.astro     # Featured projects / mobile slider
│   └── Contact.astro      # Contact links + footer
├── layouts/
│   └── Layout.astro       # HTML shell + global CSS variables
└── pages/
    └── index.astro        # Entry point

public/
└── bram-profile.png       # Profile photo
```

---

## Deploy to Cloudflare Pages

1. Push this repo to GitHub
2. Go to [pages.cloudflare.com](https://pages.cloudflare.com) → **Create a project**
3. Connect your GitHub repo
4. Set build settings:

| Setting | Value |
|---|---|
| Framework preset | Astro |
| Build command | `pnpm build` |
| Output directory | `dist` |
| Node version | `18` |

5. Click **Save and Deploy** — done.

Your site will be live at `your-project.pages.dev`.

---

## Customization

All personal data is hardcoded in the components. To update:

| What | File |
|---|---|
| Name, role, description | `src/components/Hero.astro` |
| Work experience | `src/components/Experience.astro` |
| Projects | `src/components/Projects.astro` |
| Contact links | `src/components/Contact.astro` |
| Color scheme | `src/layouts/Layout.astro` → `:root` variables |
| Profile photo | `public/bram-profile.png` |

---

## Color tokens

```css
--bg-primary:    #f5f6ff   /* page background     */
--bg-secondary:  #eceefa   /* alternate sections  */
--bg-card:       #ffffff   /* cards               */
--accent:        #5558e3   /* indigo              */
--text-primary:  #0d0f28   /* headings            */
--text-secondary:#4c4f78   /* body text           */
```

---

Built with [Astro](https://astro.build)
