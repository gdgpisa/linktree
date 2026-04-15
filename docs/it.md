# 📖 GDG Pisa · Links — Documentazione

## Indice

1. [Panoramica del progetto](#1-panoramica-del-progetto)
2. [Architettura](#2-architettura)
3. [Struttura del progetto](#3-struttura-del-progetto)
4. [Configurazione — `data.yaml`](#4-configurazione--datayaml)
5. [Componenti](#5-componenti)
6. [Stili](#6-stili)
7. [Build e deploy](#7-build-e-deploy)
8. [Contribuire](#8-contribuire)

---

## 1. Panoramica del progetto

**GDG Pisa · Links** è una pagina di raccolta link usata da [GDG Pisa](https://gdgpisa.it) durante gli eventi — in particolare il DevFest — per distribuire ai partecipanti tutte le risorse utili in un unico URL facile da raggiungere.

La pagina è volutamente leggera: è un sito statico senza logica server. Tutto il contenuto è guidato da un singolo file YAML, cosicché anche i contributor non tecnici possano aggiornare i link senza toccare il codice.

**Sito live:** https://links.gdgpisa.it  
**Deploy:** Netlify (auto-deploy ad ogni push su `main`)

### Caratteristiche principali

| Proprietà | Valore |
|---|---|
| Framework | Astro 5.3 |
| Layer UI | Preact 10 |
| Linguaggio | TypeScript (strict) |
| Sorgente contenuti | `src/data.yaml` |
| Stile | CSS puro con supporto dark mode |
| Sistema icone | Iconify (`mdi`, `material-symbols`, `ic`) |
| Hosting | Netlify (statico) |

---

## 2. Architettura

Il progetto segue il pattern di **generazione statica a build time**. Non esiste un server a runtime: Astro produce tutto l'HTML durante la build, e il risultato è un insieme di file statici serviti direttamente dal CDN di Netlify.

```
                ┌─────────────────┐
                │   data.yaml     │  ← contenuto modificato dagli organizzatori
                └────────┬────────┘
                         │ import
                ┌────────▼────────┐
                │  index.astro    │  ← pagina Astro (render a build time)
                │                 │
                │  • filtra link  │  isDateTimeInRange()
                │  • genera HTML  │
                └────────┬────────┘
                         │ output build
                ┌────────▼────────┐
                │    dist/        │  ← HTML + CSS + asset statici
                └────────┬────────┘
                         │
                ┌────────▼────────┐
                │    Netlify CDN  │  ← servito ai partecipanti
                └─────────────────┘
```

### Interattività lato client

Di default la pagina non invia **nessun JavaScript** al browser. I componenti Preact esistono nel codebase ma sono opt-in tramite la direttiva `client:load` di Astro. Il componente `LatestEventLink` (che recupera eventi dinamicamente dall'API di GDG Community) è attualmente commentato e può essere riabilitato quando serve contenuto dinamico.

---

## 3. Struttura del progetto

```
linktree/
├── docs/
│   ├── en.md               ← documentazione in inglese
│   └── it.md               ← questo file
├── public/
│   ├── gdg-pisa-logo.png   ← logo GDG Pisa (PNG, usato in OG e header)
│   └── favicon.svg
├── src/
│   ├── pages/
│   │   └── index.astro     ← unica pagina del sito
│   ├── components/
│   │   ├── DateUtils.tsx   ← utilità per intervalli di date + componente debug
│   │   └── LatestEventLink.tsx  ← componente eventi dinamici (disabilitato)
│   ├── data.yaml           ← ⭐ configurazione centrale dei contenuti
│   ├── env.d.ts            ← tipi TypeScript per data.yaml
│   └── style.css           ← foglio di stile globale
├── astro.config.mjs        ← configurazione Astro + Vite
├── tsconfig.json           ← configurazione TypeScript
├── .prettierrc.mjs         ← regole di formattazione del codice
├── package.json
├── README.md
└── CHANGELOG.md
```

---

## 4. Configurazione — `data.yaml`

`src/data.yaml` è la **fonte unica di verità** per tutti i contenuti della pagina. Per aggiornare link o sezioni è sufficiente modificare questo file.

### 4.1 Struttura di alto livello

```yaml
social:   # lista di link ai social mostrati nell'header
  - ...

sections: # lista di gruppi di link mostrati nel corpo pagina
  - ...
```

### 4.2 Link social

Vengono mostrati come pulsanti con sola icona nell'header della pagina.

```yaml
social:
  - title: 'Telegram'          # tooltip / nome accessibile
    icon: 'mdi:telegram'       # identificatore icona Iconify
    url: 'https://gdgpisa.it/telegram'
    visible: true              # true = visibile, false = nascosto
```

**Piattaforme attualmente configurate:** Email, Telegram, Instagram, LinkedIn, Facebook, YouTube.

### 4.3 Sezioni e link

Il corpo della pagina è composto da sezioni con titolo, ciascuna contenente uno o più pulsanti link.

```yaml
sections:
  - title: DevFest Pisa 2026   # intestazione sezione (opzionale — omettere per nessun titolo)
    links:
      - title: Vedi il programma
        icon: material-symbols:schedule
        url: https://devfest.gdgpisa.it/schedule
        visible: true
```

#### Campi completi di un link

| Campo | Tipo | Obbligatorio | Descrizione |
|---|---|---|---|
| `title` | string | ✅ | Etichetta del pulsante mostrata all'utente |
| `icon` | string | ✅ | Icona Iconify (`{set}:{nome}`) |
| `url` | string | ✅ | URL di destinazione |
| `visible` | boolean | ✅ | Se il link deve essere mostrato |
| `dataInizio` | string | ❌ | Inizio finestra di visibilità (ISO 8601) |
| `dataFine` | string | ❌ | Fine finestra di visibilità (ISO 8601) |

#### Visibilità temporizzata

Quando `dataInizio` e/o `dataFine` sono impostati, il link viene mostrato solo se l'orario corrente rientra in quella finestra. Utile per link rilevanti solo in una fascia oraria specifica dell'evento (es. un modulo di voto live).

```yaml
- title: Valuta questo talk!
  icon: material-symbols:star
  url: https://forms.gle/...
  visible: true
  dataInizio: 2026-04-15T10:00:00
  dataFine:   2026-04-15T11:00:00
```

> ⚠️ **Nota sul fuso orario:** I timestamp vengono interpretati come ora locale del sistema. Usa l'ora italiana (CET = UTC+1, CEST = UTC+2 in estate) quando specifichi i valori.

#### Visibilità delle sezioni

Una sezione viene nascosta automaticamente se nessuno dei suoi link è attualmente visibile. Il campo `title` di una sezione è opzionale: ometterlo renderizza i link senza intestazione.

### 4.4 Identificatori delle icone

Le icone provengono da [Iconify](https://icon-sets.iconify.design). Tre set sono inclusi nel progetto:

| Prefisso | Set | Esempio |
|---|---|---|
| `mdi:` | Material Design Icons | `mdi:telegram` |
| `material-symbols:` | Material Symbols (Google) | `material-symbols:schedule` |
| `ic:` | Material Icons (Google) | `ic:baseline-home` |

Cerca nel catalogo completo su https://icon-sets.iconify.design.

---

## 5. Componenti

### 5.1 `index.astro` (Pagina principale)

La pagina Astro radice. Viene renderizzata interamente a build time.

**Responsabilità:**
- Imposta i metadati HTML (titolo, tag Open Graph, favicon)
- Renderizza l'header con logo e icone social
- Itera su `data.sections`, filtra i link e renderizza le sezioni visibili

**Logica di filtraggio:**
```typescript
const visibleLinks = section.links.filter(link =>
    link.visible && isDateTimeInRange(link.dataInizio, link.dataFine)
)
```
Una sezione viene renderizzata solo quando `visibleLinks.length > 0`.

---

### 5.2 `DateUtils.tsx`

Modulo di utilità che fornisce due funzioni esportate, usate da `index.astro`.

#### `isDateTimeInRange(startDateTime?, endDateTime?)`

```typescript
export const isDateTimeInRange = (
    startDateTime?: string,
    endDateTime?: string
): boolean
```

- Se entrambi i parametri sono `undefined`, ritorna `true` (sempre visibile).
- Se è definito solo `startDateTime`, ritorna `true` dopo quell'orario.
- Se è definita solo `dataFine`, ritorna `true` prima di quell'orario.
- Se entrambi sono definiti, ritorna `true` solo nell'intervallo.

#### `formatItalianDateTime(dateStr)`

```typescript
export const formatItalianDateTime = (dateStr: string): string
```

Converte una stringa ISO 8601 nel formato italiano (`dd/mm/yyyy, HH:mm`) usando il fuso orario `Europe/Rome`. Usata principalmente per log di debug.

#### Export di default: componente `DateUtils`

Componente Preact headless (`client:load`) che scrive informazioni sugli intervalli di date nella console durante lo sviluppo. Non renderizza nulla nel DOM ed è attualmente commentato in `index.astro`.

---

### 5.3 `LatestEventLink.tsx` *(attualmente disabilitato)*

Componente Preact che recupera dati live dall'API di GDG Community e mostra:

1. Una card con link al prossimo evento in programma
2. Un link al modulo di feedback pre-compilato con il titolo dell'ultimo evento completato

**API usata:** `https://gdg.community.dev/api/event/?chapter=854&status={status}&fields=...`

**Stato interno:**
| Variabile | Tipo | Descrizione |
|---|---|---|
| `latestEvent` | `GDGComunityEvent \| null` | Prossimo evento in programma |
| `latestCompletedEvent` | `GDGComunityEvent \| null` | Ultimo evento completato |

**Per riabilitarlo:** Decommenta le righe 73–75 di `index.astro`:
```astro
<DateUtils client:load />
<h2>Prossimo evento:</h2>
<LatestEventLink client:load />
```

---

## 6. Stili

Tutti gli stili si trovano in `src/style.css`. Il file usa esclusivamente CSS nativo (nessun preprocessore, nessun framework utility).

### Schema colori

| Token | Modalità chiara | Modalità scura |
|---|---|---|
| Sfondo pagina | `#fafbff` | `#222` |
| Testo corpo | `#333` | `#ccc` |
| Sfondo pulsante link | `#fff` | `#333` |
| Hover pulsante link | `#f8f8f8` | `#444` |

La dark mode si attiva automaticamente tramite `@media (prefers-color-scheme: dark)`.

### Tipografia

- Font: **Google Sans** (caricato via `@font-face` dal CDN di Google Fonts)
- `h1`: 30px · `h2`: 24px · `h3`: 18px

### Breakpoint responsive

| Breakpoint | Comportamento |
|---|---|
| `> 768px` (desktop) | Layout completo; elementi `.desktop-only` visibili |
| `≤ 768px` (mobile) | Layout compatto; elementi `.mobile-only` visibili, intestazioni centrate |

### Classi di utilità

| Classe | Effetto |
|---|---|
| `.large` | Padding e dimensione font maggiori sui pulsanti link |
| `.card` | Link card con immagine |
| `.fill` | `flex: 1` — occupa lo spazio disponibile |
| `.center` | `text-align: center` |
| `.desktop-only` | Nascosto su mobile |
| `.mobile-only` | Nascosto su desktop |

---

## 7. Build e deploy

### Sviluppo locale

```sh
# Installare le dipendenze
npm install        # oppure: bun install

# Avviare il server di sviluppo (hot reload su http://localhost:4321)
npm run dev        # oppure: bun dev

# Anteprima del build di produzione in locale
npm run build && npm run preview
```

### Deploy su Netlify

Il progetto è collegato a **Netlify** tramite il repository GitHub. Ogni push su `main` scatta una build e un deploy automatici.

**Impostazioni build (Netlify):**
| Impostazione | Valore |
|---|---|
| Build command | `npm run build` |
| Publish directory | `dist` |
| Versione Node | ≥ 18 |

I deploy manuali possono essere avviati anche dalla dashboard di Netlify.

### Configurazione Astro (`astro.config.mjs`)

```javascript
export default defineConfig({
    integrations: [
        preact({ compat: true }),  // Preact con layer di compatibilità React
        icon(),                    // sistema SVG di astro-icon
    ],
    vite: {
        plugins: [yaml()],         // abilita `import data from '@/data.yaml'`
    },
})
```

---

## 8. Contribuire

### Aggiornare i link (senza toccare il codice)

Modifica `src/data.yaml`, fai il commit e pusha su `main`. Netlify ricostruisce il sito automaticamente.

### Modifiche al codice

```sh
git checkout -b feat/nome-feature
# apporta le modifiche
git commit -m 'feat: descrizione'
# apri una Pull Request verso main
```

**Convenzioni per i messaggi di commit:**

| Prefisso | Caso d'uso |
|---|---|
| `feat:` | Nuova funzionalità o sezione link |
| `fix:` | Correzione bug o link non funzionante |
| `chore:` | Aggiornamento dipendenze, modifica configurazione |
| `refactor:` | Ristrutturazione codice senza cambiamenti di comportamento |
| `style:` | Modifiche CSS o visive |
| `docs:` | Solo documentazione |

### Formattazione del codice

Il progetto usa **Prettier**. Prima di fare il commit, esegui:

```sh
npx prettier --write .
```

Configurazione: indentazione a 4 spazi, virgolette singole, niente punto e virgola, larghezza massima riga 120 caratteri. File YAML e JSON usano indentazione a 2 spazi.
