# 📖 GDG Pisa · Links — Documentation

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Architecture](#2-architecture)
3. [Project Structure](#3-project-structure)
4. [Configuration — `data.yaml`](#4-configuration--datayaml)
5. [Components](#5-components)
6. [Styling](#6-styling)
7. [Build & Deployment](#7-build--deployment)
8. [Contributing](#8-contributing)

---

## 1. Project Overview

**GDG Pisa · Links** is a link aggregation page used by [GDG Pisa](https://gdgpisa.it) during events such as DevFest to distribute useful resources to participants in a single, easy-to-access URL.

The page is intentionally lightweight: it is a static site with no server-side logic. All content is driven by a single YAML file, so non-technical contributors can update links without touching any code.

**Live site:** https://links.gdgpisa.it  
**Deployment:** Netlify (auto-deploy on push to `main`)

### Key characteristics

| Property | Value |
|---|---|
| Framework | Astro 5.3 |
| UI layer | Preact 10 |
| Language | TypeScript (strict) |
| Content source | `src/data.yaml` |
| Styling | Plain CSS with dark-mode support |
| Icon system | Iconify (`mdi`, `material-symbols`, `ic`) |
| Hosting | Netlify (static) |

---

## 2. Architecture

The project follows a **build-time static generation** pattern. There is no runtime server: Astro renders everything to HTML at build time, and the result is a handful of static files served directly from Netlify's CDN.

```
                ┌─────────────────┐
                │   data.yaml     │  ← content edited by organizers
                └────────┬────────┘
                         │ import
                ┌────────▼────────┐
                │  index.astro    │  ← Astro page (build-time render)
                │                 │
                │  • filters links│  isDateTimeInRange()
                │  • renders HTML │
                └────────┬────────┘
                         │ build output
                ┌────────▼────────┐
                │    dist/        │  ← static HTML + CSS + assets
                └────────┬────────┘
                         │
                ┌────────▼────────┐
                │    Netlify CDN  │  ← served to participants
                └─────────────────┘
```

### Client-side interactivity

By default the page ships **zero JavaScript**. Preact components exist in the codebase but are opt-in via Astro's `client:load` directive. The `LatestEventLink` component (dynamic event fetching from the GDG Community API) is currently commented out; it can be re-enabled when dynamic content is needed.

---

## 3. Project Structure

```
linktree/
├── docs/
│   ├── en.md               ← this file
│   └── it.md               ← Italian documentation
├── public/
│   ├── gdg-pisa-logo.png   ← GDG Pisa logo (PNG, used in OG and header)
│   └── favicon.svg
├── src/
│   ├── pages/
│   │   └── index.astro     ← main and only page
│   ├── components/
│   │   ├── DateUtils.tsx   ← date-range utilities + debug component
│   │   └── LatestEventLink.tsx  ← dynamic event component (disabled)
│   ├── data.yaml           ← ⭐ central content configuration
│   ├── env.d.ts            ← TypeScript types for data.yaml
│   └── style.css           ← global stylesheet
├── astro.config.mjs        ← Astro + Vite configuration
├── tsconfig.json           ← TypeScript configuration
├── .prettierrc.mjs         ← code formatting rules
├── package.json
├── README.md
└── CHANGELOG.md
```

---

## 4. Configuration — `data.yaml`

`src/data.yaml` is the **single source of truth** for all page content. Updating links or sections requires editing only this file.

### 4.1 Top-level structure

```yaml
social:   # list of social media icon links shown in the header
  - ...

sections: # list of link groups shown in the body
  - ...
```

### 4.2 Social links

Displayed as icon-only buttons in the page header.

```yaml
social:
  - title: 'Telegram'          # tooltip / accessible name
    icon: 'mdi:telegram'       # Iconify icon identifier
    url: 'https://gdgpisa.it/telegram'
    visible: true              # true = shown, false = hidden
```

**Currently configured platforms:** Email, Telegram, Instagram, LinkedIn, Facebook, YouTube.

### 4.3 Sections and links

The page body is made up of named sections, each containing one or more link buttons.

```yaml
sections:
  - title: DevFest Pisa 2026   # section heading (optional — omit for no heading)
    links:
      - title: See our schedule
        icon: material-symbols:schedule
        url: https://devfest.gdgpisa.it/schedule
        visible: true
```

#### Full link fields

| Field | Type | Required | Description |
|---|---|---|---|
| `title` | string | ✅ | Button label shown to the user |
| `icon` | string | ✅ | Iconify icon (`{set}:{name}`) |
| `url` | string | ✅ | Destination URL |
| `visible` | boolean | ✅ | Whether the link is shown at all |
| `dataInizio` | string | ❌ | Start of visibility window (ISO 8601) |
| `dataFine` | string | ❌ | End of visibility window (ISO 8601) |

#### Time-based visibility

When `dataInizio` and/or `dataFine` are set, the link is only rendered if the current time falls within that window. This is useful for links that are relevant only during a specific slot of the event (e.g. a live-voting form).

```yaml
- title: Rate this talk!
  icon: material-symbols:star
  url: https://forms.gle/...
  visible: true
  dataInizio: 2026-04-15T10:00:00
  dataFine:   2026-04-15T11:00:00
```

> ⚠️ **Timezone note:** Timestamps are interpreted as local system time by the browser. Use Italian standard time (CET = UTC+1, CEST = UTC+2 in summer) when specifying values.

#### Section visibility

A section is automatically hidden if none of its links are currently visible. The `title` field on a section is optional: omit it to render the links without a heading.

### 4.4 Icon identifiers

Icons are sourced from [Iconify](https://icon-sets.iconify.design). Three sets are bundled:

| Prefix | Set | Example |
|---|---|---|
| `mdi:` | Material Design Icons | `mdi:telegram` |
| `material-symbols:` | Material Symbols (Google) | `material-symbols:schedule` |
| `ic:` | Material Icons (Google) | `ic:baseline-home` |

Search the full catalogue at https://icon-sets.iconify.design.

---

## 5. Components

### 5.1 `index.astro` (Main Page)

The root Astro page. Renders entirely at build time.

**Responsibilities:**
- Sets HTML metadata (title, Open Graph tags, favicon)
- Renders the header with logo and social icon links
- Iterates over `data.sections`, filters links, and renders visible sections

**Filtering logic:**
```typescript
const visibleLinks = section.links.filter(link =>
    link.visible && isDateTimeInRange(link.dataInizio, link.dataFine)
)
```
A section is only rendered when `visibleLinks.length > 0`.

---

### 5.2 `DateUtils.tsx`

Utility module that provides two exported functions used by `index.astro`.

#### `isDateTimeInRange(startDateTime?, endDateTime?)`

```typescript
export const isDateTimeInRange = (
    startDateTime?: string,
    endDateTime?: string
): boolean
```

- If both parameters are `undefined`, returns `true` (always visible).
- If only `startDateTime` is defined, returns `true` after that time.
- If only `endDateTime` is defined, returns `true` before that time.
- If both are defined, returns `true` only within the window.

#### `formatItalianDateTime(dateStr)`

```typescript
export const formatItalianDateTime = (dateStr: string): string
```

Converts an ISO 8601 string to Italian locale format (`dd/mm/yyyy, HH:mm`) using the `Europe/Rome` timezone. Used for debugging/logging purposes.

#### Default export: `DateUtils` component

A headless Preact component (`client:load`) that logs date-range information to the console during development. It renders nothing to the DOM and is currently commented out in `index.astro`.

---

### 5.3 `LatestEventLink.tsx` *(currently disabled)*

A Preact component that fetches live event data from the GDG Community API and renders:

1. A card linking to the next upcoming event
2. A pre-filled feedback form link for the most recently completed event

**API used:** `https://gdg.community.dev/api/event/?chapter=854&status={status}&fields=...`

**State:**
| Variable | Type | Description |
|---|---|---|
| `latestEvent` | `GDGComunityEvent \| null` | Next upcoming event |
| `latestCompletedEvent` | `GDGComunityEvent \| null` | Most recently completed event |

**To re-enable:** Uncomment lines 73–75 in `index.astro`:
```astro
<DateUtils client:load />
<h2>Next Event:</h2>
<LatestEventLink client:load />
```

---

## 6. Styling

All styles are in `src/style.css`. The file uses native CSS features only (no preprocessor, no utility framework).

### Color scheme

| Token | Light | Dark |
|---|---|---|
| Page background | `#fafbff` | `#222` |
| Body text | `#333` | `#ccc` |
| Link button background | `#fff` | `#333` |
| Link button hover | `#f8f8f8` | `#444` |

Dark mode is activated automatically via `@media (prefers-color-scheme: dark)`.

### Typography

- Font: **Google Sans** (loaded via `@font-face` from Google Fonts CDN)
- `h1`: 30px · `h2`: 24px · `h3`: 18px

### Responsive breakpoints

| Breakpoint | Behaviour |
|---|---|
| `> 768px` (desktop) | Full layout; `.desktop-only` elements visible |
| `≤ 768px` (mobile) | Compact layout; `.mobile-only` elements visible, headings centred |

### Utility classes

| Class | Effect |
|---|---|
| `.large` | Bigger padding and font size on link buttons |
| `.card` | Link card with image |
| `.fill` | `flex: 1` — fills available space |
| `.center` | `text-align: center` |
| `.desktop-only` | Hidden on mobile |
| `.mobile-only` | Hidden on desktop |

---

## 7. Build & Deployment

### Local development

```sh
# Install dependencies
npm install        # or: bun install

# Start dev server (hot reload at http://localhost:4321)
npm run dev        # or: bun dev

# Preview production build locally
npm run build && npm run preview
```

### Netlify deployment

The project is connected to **Netlify** via the GitHub repository. Every push to `main` triggers an automatic build and deploy.

**Build settings (Netlify):**
| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Publish directory | `dist` |
| Node version | ≥ 18 |

Manual deploys can also be triggered from the Netlify dashboard.

### Astro configuration (`astro.config.mjs`)

```javascript
export default defineConfig({
    integrations: [
        preact({ compat: true }),  // Preact with React-compat layer
        icon(),                    // astro-icon SVG system
    ],
    vite: {
        plugins: [yaml()],         // enables `import data from '@/data.yaml'`
    },
})
```

---

## 8. Contributing

### Updating links (no code required)

Edit `src/data.yaml`, commit, and push to `main`. Netlify rebuilds automatically.

### Code changes

```sh
git checkout -b feat/your-feature
# make changes
git commit -m 'feat: description'
# open a Pull Request against main
```

**Commit message conventions:**

| Prefix | Use case |
|---|---|
| `feat:` | New feature or link section |
| `fix:` | Bug fix or broken link correction |
| `chore:` | Dependency update, config change |
| `refactor:` | Code restructuring without behaviour change |
| `style:` | CSS or visual changes |
| `docs:` | Documentation only |

### Code formatting

The project uses **Prettier**. Before committing, run:

```sh
npx prettier --write .
```

Configuration: 4-space indent, single quotes, no semicolons, 120-char line width. YAML and JSON files use 2-space indent.
