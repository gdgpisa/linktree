# 📋 Changelog

Tutte le modifiche rilevanti al progetto sono documentate in questo file.

Il formato segue [Keep a Changelog](https://keepachangelog.com/it/1.0.0/).

---

## [Unreleased]

---

## [2026-04-15]

### ✨ Aggiunto
- Sfondo animato con griglia binaria (0 e 1) adattato da [devfest-2025](https://github.com/gdgpisa/devfest-2025) (`src/lib/binary-art.ts`)
- Gradiente di sfondo `#a5d2ff → #fff` ispirato all'hero del sito DevFest

### 🎨 Stile
- Bottoni ridisegnati nello stile "Get Ticket" del DevFest: sfondo `#497aff`, bordo `2px solid #333`, effetto hover con `translateY(-6px)` e `box-shadow`
- CSS riscritto mobile-first (media query `min-width` al posto di `max-width`)
- Testo "Organizers" e "Staff" con colori saturi e contorno bianco per maggiore leggibilità

### ♻️ Refactor
- Aggiornamento layout e contenuti per DevFest 2026
- Nuovo logo GDG Pisa

---

## [2025-04-11]

### 🔧 Fix
- Corretti link per DevFest Pisa 2025
- Aggiornato link al modulo di feedback

---

## [2025-04-03]

### 🎨 Stile
- Colore del badge **Staff** aggiornato per corrispondere alla badge fisica
- Aggiornati bottoni e link della sezione DevFest 2025

---

## [2025-03-29]

### ✨ Aggiunto
- Nuovo layout dedicato per DevFest 2025
- Link alla pagina del programma (schedule)

---

## [2025-03-26]

### ✨ Aggiunto
- Separazione tra evento precedente e prossimo evento nella vista dinamica

---

## [2025-03-10]

### 🔧 Fix
- Aggiornamento dati in `data.yaml`

---

## [2025-03-03]

### ✨ Aggiunto
- Link "Call for Helpers" per DevFest 2025

---

## [2025-02-27]

### ✨ Aggiunto
- Pulsante per l'acquisto dei biglietti (PR #2 — DavideBri)

### 🔧 Fix
- Aggiornamento vari link

---

## [2025-02-22]

### ✨ Aggiunto
- Visualizzazione client-side della data del prossimo evento (PR #1 — refactor-devfest)
- Indicazione dell'orario dell'evento

---

## [2025-02-18]

### 🏗️ Architettura
- Migrazione del progetto da Vite a **Astro** con integrazione **Preact**
- Formattazione del codice con Prettier

### 📝 Documentazione
- Prima versione del README
