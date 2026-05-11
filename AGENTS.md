# AGENTS.md — tasty-telescope (NordVital IPS)

## Stack
- **Framework**: Astro v5 + React v19 (islands via `@astrojs/react`)
- **Styling**: Tailwind CSS v4 via `@tailwindcss/vite` Vite plugin + custom CSS vars in `src/styles/variables.css`
- **UI Library**: shadcn/ui (new-york style, `rsc: false`, `@/components/ui`)
- **Package manager**: pnpm (lockfile: `pnpm-lock.yaml`; CI uses `pnpm install --frozen-lockfile`)
- **TypeScript**: strict mode (`astro/tsconfigs/strict`), path alias `@/*` → `src/*`

## Commands (all from root)
```
pnpm dev          # dev server at localhost:4321
pnpm build        # production build to dist/
pnpm preview      # preview production build
pnpm astro        # Astro CLI (add, check, etc.)
```
No lint, typecheck, or test scripts exist in `package.json`.

## Existing reference
`.github/copilot-instructions.md` — extensive code conventions (Spanish content, component naming, form patterns, accessibility, image rules, known todos). Read this first for style rules.

## Key architecture facts
- **File-based routing** in `src/pages/`; every page uses `src/layouts/Layout.astro`
- **React components** in `src/components/react_components/` (interactive forms, maps). Use `client:idle` or `client:visible` over `client:load` for below-fold islands.
- **Astro components** in `src/components/` (presentational, `<slot>`-based)
- **Data** in `src/content/` (typed TS arrays, PascalCase interfaces)
- **Active branch**: `develop`; CI deploys to Cpanel FTP from `main`

## Environment variables
All prefixed `PUBLIC_` (Astro convention). See `.env.example` for full list. Real values committed in `.env` (EmailJS keys, target emails, backend URL).

## Typography system (Tailwind classes)
- **`font-quicksand`**: Body text, paragraphs, descriptions (default for `p`, labels, form text)
- **`font-gnuolane`**: Headings, titles, section headers (h1-h6, hero titles)
- **`font-signature`**: Decorative signatures, special effects (only for artistic elements)

CSS variables ya definidas en `global.css` líneas 93-95.

## Dependencies worth noting
- **Formik + Yup** for form validation + **EmailJS** for sending (`@emailjs/browser`)
- **MapLibre GL** (`maplibre-gl`) for maps
- **jQuery + Owl Carousel** loaded from CDN in Layout.astro (`astro.config.mjs` SSR-externalizes jquery)
- **`cn()` util** at `@/lib/utils` (clsx + tailwind-merge) for class merging
- **Astro `<Image>`** component preferred for images; prefer `.webp` format

## Known issues (from copilot-instructions)
- `Layout.astro` has `lang="en"` — should be `"es"`
- Some forms use `alert()` instead of proper UI error states
- `client:load` used where `client:idle`/`client:visible` would suffice
- Component typos: `Corousel` → `Carousel`, `CorouselInfiity` → `CarouselInfinity`, `TapsContent` → `TabsContent`, `TapsServices` → `TabsServices`

## Skills available
12 agent skills installed in `.agents/skills/` covering accessibility, astro, composition-patterns, frontend-design, nodejs patterns, react-best-practices, seo, shadcn, tailwind-css-patterns, tailwind-v4-shadcn, typescript-advanced-types.
