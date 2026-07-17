# Relaunch sma-computer.de – Projektregeln

## Tech-Stack
- Reines HTML/CSS/JS – kein Framework, kein Build-Prozess
- Hosting: bestehender Apache-Server
- Kein WordPress, kein Page Builder
- Wiederholende Elemente (Header, Footer) per JS-Include via `fetch()` aus `src/components/`

## Projektstruktur
```
Website_RE/
├── index.html
├── Makefile
├── .htaccess
├── pages/
│   ├── unsere-leistungen/
│   ├── ueber-uns/
│   ├── kontakt/
│   ├── anfahrt/
│   ├── impressum/
│   ├── datenschutz/
│   └── druckkoepfe/
├── src/
│   ├── css/style.css
│   ├── js/components.js, i18n.js, translations.js
│   ├── img/
│   └── components/header.html, footer.html
└── tests/validate.js
```
- Unterseiten liegen in `pages/`, Pfade zu Assets sind `../../src/`
- Apache routet `/unsere-leistungen/` → `pages/unsere-leistungen/` via `.htaccess`

## Entwicklung
- `make run` – startet lokalen Server auf Port 8080 und öffnet Browser
- `make generate` – generiert EN-Seiten aus DE-Vorlagen + translations.js (nach jeder Änderung an DE-Seiten oder translations.js ausführen)
- `make test` – führt Testsuite aus (`tests/validate.js`)
- Tests immer ausführen nach Änderungen an JS-Dateien, HTML-Seiten oder Components
- EN-Seiten werden **nie manuell bearbeitet** – immer nur über `make generate` aus den DE-Vorlagen generiert

## Sprache & Kommentare
- Alle Kommentare im Code, Commit-Messages und Dokumentation auf **Deutsch**
- Variablen- und Funktionsnamen auf Englisch (Code-Konvention)
- Fehlermeldungen und Log-Ausgaben auf Deutsch

## Branding (vorläufig)
- Firmenname: SMA Computer GmbH
- Wird angepasst sobald Branding-Entscheidung getroffen ist (siehe offene-fragen.md)
