# Diz Toba

Astro site for [diztoba.com](https://diztoba.com).

## Stack

- [Astro](https://astro.build) 7
- [Tailwind CSS](https://tailwindcss.com) 4 (with the forms and typography plugins)
- [Alpine.js](https://alpinejs.dev) (focus, persist and ui plugins)
- [astro-icon](https://github.com/natemoo-re/astro-icon) with Iconify icon sets
- [astro-seo](https://github.com/jonasmerlin/astro-seo)
- Axiforma, self-hosted from `src/fonts`
- [Vite+](https://viteplus.dev) (`vp`) toolchain with pnpm

## Requirements

- Node 22 (see `.node-version`)
- Vite+ CLI (`vp`)

## Getting started

```sh
vp install
vp run dev
```

## Environment

Create a `.env` file in the project root with:

| Variable | Description                                                                          |
| -------- | ------------------------------------------------------------------------------------ |
| `SITE`   | Site URL. Public client variable, defined in the `env` schema in `astro.config.mjs`. |

## Scripts

Run with `vp run <name>`.

| Script         | Description                              |
| -------------- | ---------------------------------------- |
| `dev`          | Start the Astro dev server               |
| `build`        | Build the site to `dist/`                |
| `preview`      | Preview the production build             |
| `check`        | Run `astro check`                        |
| `sync`         | Generate Astro types (`astro sync`)      |
| `clean`        | Remove `.astro` and `dist`               |
| `format`       | Format files with `vp fmt`               |
| `format:check` | Check formatting without writing changes |
| `lint`         | Lint with `vp lint`                      |

`vp check` formats, lints and type-checks in one go. It also runs on staged files through the pre-commit hook in `.vite-hooks`.

## Project structure

```text
public/              Static files served as-is (images, documents, favicon)
src/
├── components/      Shared components
├── constants/       Site-wide constants
├── content/nav/     Nav links as Markdown
├── features/home/   Home page feature
├── fonts/           Axiforma font files
├── icons/           Local SVG icons for astro-icon
├── images/          Images processed by Astro
├── layouts/         Page layouts
├── pages/           Routes
├── scripts/main.ts  Alpine.js entrypoint
├── styles/          Global CSS (Tailwind)
└── utils/           Helpers
```

## Path alias

`@` resolves to `src`, for example `import { cn } from '@/utils'`.
