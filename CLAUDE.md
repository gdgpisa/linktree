# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A "linktree"-style landing page for GDG Pisa, deployed to Netlify at `links.gdgpisa.it`. Built with Astro 6 + Preact (compat mode) + astro-icon.

## Commands

```sh
npm install       # or bun install
npm run dev       # dev server at http://localhost:4321
npm run build     # production build -> dist/
npm run preview   # preview the production build
```

No test suite and no lint script are configured. Formatting is via Prettier (`.prettierrc.mjs`: 4-space indent, single quotes, no semicolons, `printWidth: 120`; 2-space indent for `.yml`/`.yaml`/`.json`); run `npx prettier --write .` to format.

## Architecture

- **Content is data-driven.** All links and social icons shown on the page come from `src/data.yaml`, consumed via `@rollup/plugin-yaml` and typed by the module declaration in `src/env.d.ts`. To add/remove/reorder links, edit `data.yaml`, not the page markup. Each entry has a `visible` boolean toggle.
- **Single page.** `src/pages/index.astro` reads `data.yaml` and renders the social bar + link sections directly; there's no routing/CMS layer.
- **Time-gated links.** A link section entry can carry optional `dataInizio`/`dataFine` ISO datetime strings. `isDateTimeInRange` in `src/components/DateUtils.tsx` decides visibility by comparing against `new Date()` at build/render time. Note the comment in `env.d.ts`: these datetimes are interpreted in a London-offset context, so times need to be entered one hour behind the intended Europe/Rome time.
- **Scheduled rebuilds drive time-gating.** Since visibility is computed at build time (Astro static output), `.github/workflows/netlify-rebuild.yml` pings the Netlify build hook (`NETLIFY_BUILD_HOOK_URL` secret) on a cron schedule so time-gated links actually appear/disappear without a manual deploy.
- **Latest GDG event.** Fetched client-independently from the GDG Community API (`gdg.community.dev`, chapter id `854`) for both the latest upcoming and latest completed event. `src/components/LatestEventStatic.astro` does this as a server-side fetch at build time and is what `index.astro` actually renders. `src/components/LatestEventLink.tsx` is a Preact/client-side equivalent (fetches in `useEffect`) that currently isn't wired into any page — treat it as an alternate implementation, not dead code to casually delete without checking.
- **Icons.** Referenced by iconify name (e.g. `mdi:telegram`, `material-symbols:rocket`) directly in `data.yaml`/components and rendered via `astro-icon`'s `<Icon>` (or `@iconify/react`'s `<Icon>` in the Preact component). Available icon sets are pinned as devDependencies (`@iconify-json/ic`, `@iconify-json/material-symbols`, `@iconify-json/mdi`); look up names at https://icon-sets.iconify.design.
- **Path alias.** `@/*` maps to `src/*` (see `tsconfig.json`).
