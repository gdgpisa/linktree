# 🔗 GDG Pisa · Links

[![Netlify Status](https://api.netlify.com/api/v1/badges/85cb3619-ead6-49e1-ba01-1faa0720b787/deploy-status)](https://app.netlify.com/sites/lambent-bunny-988790/deploys)

Pagina di link ufficiale di **GDG Pisa**, usata durante gli eventi (come il DevFest) per raccogliere in un unico posto tutte le risorse utili ai partecipanti.

Costruita con [Astro](https://astro.build) + [Preact](https://preactjs.com), con supporto a dark mode e layout responsive. Il design visivo è ispirato al sito [DevFest Pisa 2025](https://devfest.gdgpisa.it).

---

## ✨ Funzionalità

- 🌙 Design responsive con supporto dark mode
- 🎨 Sfondo animato con griglia binaria (0 e 1) ispirato al DevFest 2025
- 🔗 Link ai profili social di GDG Pisa
- 📅 Sezioni di link configurabili per evento
- ⏱️ Visibilità dei link controllabile per intervallo di data/ora
- ⚙️ Configurazione centralizzata tramite `src/data.yaml`

---

## 🚀 Avvio rapido

### Prerequisiti

- [Node.js](https://nodejs.org) ≥ 18 oppure [Bun](https://bun.sh)

### Installazione

```sh
git clone https://github.com/gdgpisa/linktree
cd linktree
npm install
# oppure: bun install
```

### Sviluppo locale

```sh
npm run dev
# oppure: bun dev
```

Il server di sviluppo sarà disponibile su `http://localhost:4321`.

### Build di produzione

```sh
npm run build
# oppure: bun run build
```

L'output verrà generato nella cartella `dist/`.

### Anteprima del build

```sh
npm run preview
```

---

## 🛠️ Configurazione dei link

Tutti i link e le sezioni sono definiti nel file [`src/data.yaml`](./src/data.yaml).

### Struttura del file

```yaml
social:
  - title: 'Telegram'
    icon: 'mdi:telegram'
    url: 'https://gdgpisa.it/telegram'
    visible: true

sections:
  - title: DevFest Pisa 2026
    links:
      - title: See our schedule
        icon: material-symbols:schedule
        url: https://devfest.gdgpisa.it/schedule
        visible: true
        dataInizio: 2026-04-15T09:00:00   # opzionale
        dataFine:   2026-04-15T18:00:00   # opzionale
```

- **`visible`** — mostra o nasconde il link
- **`dataInizio` / `dataFine`** — se specificati, il link è visibile solo nell'intervallo di tempo indicato (formato ISO 8601, ora locale italiana)
- Le icone provengono da [Iconify](https://icon-sets.iconify.design); i set supportati sono `mdi`, `material-symbols` e `ic`

---

## 📁 Struttura del progetto

```
src/
├── components/       # Componenti Preact e Astro
├── lib/
│   └── binary-art.ts # Classe BinaryGrid per lo sfondo animato
├── pages/
│   └── index.astro   # Pagina principale
├── data.yaml         # Configurazione link e social
├── env.d.ts          # Tipi TypeScript per data.yaml
└── style.css         # Stili globali
public/
└── gdg-pisa-logo.png
```

---

## 🤝 Contribuire

1. Fai un fork del repository
2. Crea un branch: `git checkout -b feat/nome-feature`
3. Fai le modifiche e committa: `git commit -m 'feat: descrizione'`
4. Apri una Pull Request verso `main`

Per aggiornare i link di un evento è sufficiente modificare `src/data.yaml` — non è necessario toccare il codice.
