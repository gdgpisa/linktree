# Changelog

Modifiche rilevanti al progetto, in ordine cronologico inverso.
Il formato segue [Keep a Changelog](https://keepachangelog.com/it/1.1.0/).

## [Non rilasciato]

### Aggiunto

- Sezione **DevFest Pisa 2027** con i link _Call for Speakers_ (Sessionize) e
  _Call for Sponsors_ (Google Doc).
- Pulsante per passare dal tema chiaro al tema scuro (in alto a sinistra). La
  scelta viene salvata in `localStorage`; senza una scelta salvata la pagina
  segue la preferenza del sistema operativo.
- Angolo "Fork me on GitHub" (in alto a destra) che punta al repository.
- Font Product Sans ospitato nel progetto (`public/fonts/product-sans/`), gli
  stessi file usati da [gdgpisa.it](https://gdgpisa.it).
- Footer con la scritta "Made with ❤️ by GDG Pisa · © GDG Pisa <anno>" (anno
  calcolato in build, quindi sempre aggiornato grazie al rebuild quotidiano) e
  una striscia con i colori Google, uguale a quello di gdgpisa.it.
- Questo changelog.

### Modificato

- Grafica riallineata a [gdgpisa.it](https://gdgpisa.it): sezioni in pannelli
  colorati, link e card in stile "sticker" (bordo spesso e ombra piena).
  `src/style.css` è stato riscritto.
- Hero volutamente diverso dal sito principale, per distinguere la pagina dei
  link: tinta piatta in uno dei quattro colori Google, scelto a caso a ogni
  visita, con testo scuro, logo in un cerchio bianco e dimensioni compatte per
  l'uso da mobile.
- Il blocco evento ora mostra il **prossimo** evento in programma ("Next
  event": il più vicino, con titolo, tipo e data) e, se ce ne sono altri già
  pubblicati, fino a tre eventi successivi sotto "Coming soon". Quando un
  evento è passato sparisce da solo al rebuild successivo; senza eventi in
  programma l'intero blocco non viene mostrato.
- L'immagine dell'evento viene scaricata e ridimensionata durante la build
  (`astro:assets`) e servita dal nostro dominio in più misure.
- Il CSS è incluso direttamente nell'HTML (`inlineStylesheets` in
  `astro.config.mjs`) per evitare una richiesta bloccante.
- Aggiunta la meta description. Punteggio Lighthouse 100 in tutte le categorie
  (mobile e desktop) sulla build locale.
- README aggiornato (badge Astro 7, URL del repository, sezione sulla grafica).

### Rimosso

- Sezione **DevFest Pisa 2026** (sito, form di feedback, album foto).
- Pulsante "Feedback from last event".
- Font Google Sans caricato da `fonts.gstatic.com`, sostituito da Product Sans.

### Note

- Il link al sito DevFest (`https://devfest.gdgpisa.it/`) è presente in
  `src/data.yaml` ma nascosto (`visible: false`) finché il sito 2027 non è
  pronto.
- Nessuna modifica alle dipendenze né alla GitHub Action di rebuild
  pianificato (`.github/workflows/netlify-rebuild.yml`).

## 2026-09-17

### Modificato

- Aggiornati Astro e Preact, ritoccato il logo, README tradotto in italiano.

## 2026-04-21

### Modificato

- Logo PNG sostituito con la versione SVG, favicon aggiornata.
- Aggiornati il titolo dell'ultimo evento e i link della sezione DevFest.
