# WCAG & Performance

## WCAG (Barrierefreiheit, mind. WCAG 2.1 AA)
- Kontrastverhältnis mind. 4.5:1 für Fließtext, 3:1 für große Texte
- Alle interaktiven Elemente per Tastatur erreichbar und mit sichtbarem Fokus-Indikator
- Alle Bilder mit Alt-Text, dekorative Bilder mit `alt=""`
- Formularfelder haben zugehörige `<label>`-Elemente
- Semantisches HTML verwenden (nav, main, header, footer, h1–h6 in korrekter Reihenfolge)
- Keine Information nur über Farbe vermitteln

## Performance
- Ziel: Core Web Vitals alle grün (LCP < 2.5s, CLS < 0.1, INP < 200ms)
- Bilder in WebP, mit `width` und `height`-Attributen, Lazy Loading für below-the-fold
- Keine externen Ressourcen von Drittdomains wo vermeidbar (z.B. Bilder lokal hosten)
- CSS und JS minimieren, kein ungenutztes CSS ausliefern
- Schriften: System-Fonts bevorzugen oder max. 1–2 Webfonts mit `font-display: swap`
- Cache-Header für statische Assets: mind. 1 Jahr
