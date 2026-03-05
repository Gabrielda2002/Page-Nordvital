# NordVital IPS — Directrices del Proyecto

## Stack Tecnológico

- **Framework**: Astro v5 con integración React v19
- **Estilos**: Tailwind CSS v4 via `@tailwindcss/vite` + variables CSS custom en `src/styles/variables.css`
- **Formularios**: Formik + Yup (validación) + EmailJS (envío)
- **Mapas**: MapLibre GL
- **Tipado**: TypeScript en modo estricto (`astro/tsconfigs/strict`)
- **Alias de rutas**: `@/*` → `src/*`

## Idioma

- Todo el contenido, comentarios de código y mensajes al usuario deben estar en **español**.
- El atributo `lang` del HTML debe ser `"es"` (no `"en"`).

## Arquitectura

- **Páginas**: Enrutamiento basado en archivos en `src/pages/`. Cada página usa `Layout.astro`.
- **Componentes Astro** (`src/components/`): Presentacionales, usan `<slot>`, props tipadas con `interface Props`.
- **Componentes React** (`src/components/react_components/`): Solo para interactividad compleja (formularios, mapas). Usar `client:idle` o `client:visible` en vez de `client:load` cuando el componente no es above-the-fold.
- **Datos**: Archivos TypeScript en `src/content/` con interfaces exportadas y arrays constantes tipados.
- **Estilos**: Usar utilidades Tailwind. Variables custom en `src/styles/variables.css`. Función `cn()` de `@/lib/utils` para merge de clases.

## Convenciones de Código

### Nombrado de Archivos
- Componentes Astro/React: **PascalCase** (`HeroSection.astro`, `CustomFormContactUs.tsx`)
- Archivos de datos: **kebab-case** (`agreements.data.ts`, `services-md-esp.ts`)
- Páginas: **kebab-case** (`contact-us.astro`, `rights-duties.astro`)

### Componentes Astro
```astro
---
import { Image } from 'astro:assets';
interface Props {
  title: string;
  description?: string;
}
const { title, description = "NordVital IPS" } = Astro.props;
---
<section><!-- markup --></section>
<style>/* scoped styles */</style>
```

### Componentes React (Formularios)
- Usar `useFormik` + `Yup.object()` para validación
- Variables de entorno con prefijo `PUBLIC_` via `import.meta.env`
- Manejo de errores con estados de UI (NO `alert()`)
- Labels con `htmlFor` asociado al `id` del input

### TypeScript
- Siempre tipar props con `interface Props`
- No usar `any` — usar tipos específicos o `unknown` con narrowing
- Importar tipos con `import type { ... }` para tree-shaking
- Tipar arrays de datos: `export const data: MyInterface[] = [...]`

### Estilos
- Colores del tema: `nordvital-primary` (#049ae7), `nordvital-secondary` (#6fbda7)
- Gradiente: `bg-gradient-to-l from-nordvital-secondary to-nordvital-primary`
- Responsive mobile-first: base → `md:` → `lg:`
- Respetar `prefers-reduced-motion: reduce` en animaciones

### Accesibilidad
- HTML semántico: `<nav>`, `<main>`, `<section>`, `<article>`
- Tabs: usar `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`
- Modales: usar `<dialog>` o `role="dialog"` con `aria-modal="true"` y focus trap
- Imágenes: siempre `alt` descriptivo (vacío solo si es decorativa)
- Formularios: `<label htmlFor="id">` en cada campo

### Imágenes
- Usar `<Image>` de `astro:assets` — nunca `<img>` directo
- Above-the-fold: `loading="eager"` + `fetchpriority="high"`
- Resto: `loading="lazy"` (default)
- Formatos: preferir `.webp`

## Comandos

```bash
pnpm dev      # Servidor de desarrollo
pnpm build    # Build de producción
pnpm preview  # Preview del build
```

## Tareas Pendientes del Proyecto

### Prioridad Alta
1. **Corregir `lang="en"` a `lang="es"`** en `src/layouts/Layout.astro`
2. **Completar `AboutUs.astro`** — actualmente solo tiene un placeholder `<div>List</div>`
3. **Eliminar `console.log` de debug** en `src/components/FooterInfo.astro`
4. **Reemplazar `alert()` por UI de error** en formularios React (PqrsdfForm, FormRegisterParticipant)
5. **Agregar labels accesibles** a todos los campos de formularios (`htmlFor` + `id`)

### Prioridad Media
6. **Renombrar componentes con typos**: `Corousel` → `Carousel`, `CorouselInfiity` → `CarouselInfinity`, `TapsContent` → `TabsContent`, `TapsServices` → `TabsServices`
7. **Centralizar datos hardcodeados** — extraer números de teléfono, emails y URLs repetidos a un archivo `src/content/contact-info.data.ts`
8. **Mejorar accesibilidad de tabs** — agregar roles ARIA (`tablist`, `tab`, `tabpanel`) en `TapsContent.astro` y `TapsServices.astro`
9. **Mejorar accesibilidad de modales** — usar `<dialog>` con focus trap en `aboutus.astro`
10. **Cambiar `client:load` a `client:idle`/`client:visible`** en formularios que no están above-the-fold

### Prioridad Baja
11. **Eliminar dependencia de jQuery** — reemplazar Owl Carousel con carousel nativo CSS/Astro
12. **Eliminar tipos `any`** en `PqrsdfForm.tsx` y otros formularios
13. **Agregar manejo de errores/timeout** para fetch externo en PqrsdfForm (API de Colombia)
14. **Agregar paginación** en vistas de lista (blog, PQRSFD) si crecen
15. **Auditar contraste de colores** — verificar WCAG AA en texto blanco sobre fondos teal/primary