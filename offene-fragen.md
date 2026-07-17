# Offene Fragen – Relaunch sma-computer.de

---

## Branding
- [ ] Welcher Name soll verwendet werden? "SMA Computer GmbH", "Dreisessel-IT" oder beides?
- [ ] Gibt es ein neues Logo oder wird das bestehende (`Logo-SMA.jpg`) übernommen?
- [ ] Soll die Verbindung zu `druckkopf.de` im Branding sichtbar sein?
- [ ] Sind sma-computer.de und druckkopf.de zwei getrennte Marken oder eine? (aktuell sehr verwirrend)

---

## Tech-Stack[offene-fragen.md](offene-fragen.md)
- [ ] WordPress behalten oder neu aufsetzen?
- [ ] Falls neu: welches Framework? (Next.js / Astro / Webflow / anderes)
- [ ] Wer pflegt die Seite später – technisch versiert oder eher No-Code?

---

## Hosting & Domain
- [ ] Bleibt der aktuelle Apache-Server oder Wechsel (z.B. AWS, Vercel, Netlify)?
- [ ] Domain `sma-computer.de` bleibt bestehen?
- [ ] Verhältnis zu `dreisessel-it.de` und `druckkopf.de` – getrennte Seiten oder zusammenführen?

---

## Inhalte & Seiten
- [ ] Sollen neue Seiten hinzukommen? (z.B. Preisliste, Blog, Referenzen)
- [ ] Online-Terminbuchung gewünscht?
- [ ] Soll der Shop (`druckkopf.de/shop_sma/`) integriert oder weiterhin extern verlinkt werden?
- [ ] Zielgruppe: nur lokal (Neureichenau / Bayerischer Wald) oder überregional?
- [ ] Öffnungszeiten korrekt? Widerspruch zwischen den beiden Seiten:
  - sma-computer.de: Mo–So 09:00–17:00
  - druckkopf.de: Mo–Do 07:00–16:00, Fr 07:00–12:00
- [ ] Preise / Stundensatz veröffentlichen? (schafft Vertrauen, senkt Hemmschwelle)
- [ ] Kundenbewertungen / Referenzen vorhanden und verwendbar?
- [ ] Einzugsbereich für Hol-/Bringservice genauer definieren (aktuell nur "5km")

---

## Design
- [ ] Farbpalette beibehalten oder neu definieren?
- [ ] Neue Fotos / Bilder geplant oder vorhandene übernehmen?
- [ ] Gibt es ein CI/CD-Dokument oder Styleguide?

---

## Rechtliches
- [ ] Datenschutzseite neu erstellen (aktuell leitet `/datenschutz/` auf druckkopf.de weiter) – DSGVO-Problem
- [x] Kontaktdaten im Impressum aktuell? E-Mail: info@druckkopf.de ✓
- [ ] E-Mail-Adresse auf @sma-computer.de umstellen (aktuell @druckkopf.de)
- [ ] Cookie-Banner (Complianz) korrekt konfiguriert und getestet?

---

## Local SEO
- [ ] Gibt es ein Google Business Profile für SMA Computer GmbH?
- [ ] Ist das Google Business Profile aktuell und vollständig gepflegt?
- [ ] NAP-Konsistenz prüfen: Firmenname, Adresse, Telefon überall identisch? (Website, Google, Branchenbücher)
- [ ] Öffnungszeiten auf Website, Google Business und Schema.org abgleichen

---

## Conversion & Vertrauen
- [ ] Welche CTAs soll es geben? ("Jetzt anrufen", "Termin anfragen", "Angebot einholen"?)
- [ ] Kundenbewertungen von Google / anderen Plattformen einbinden?
- [ ] Zertifikate / Auszeichnungen (ISO 9001) als Vertrauenssignal prominent platzieren?

---

## Technisch
- [ ] Redirect-Strategie: alle alten URLs per 301 auf neue URLs weiterleiten
- [ ] Sitemap.xml neu erstellen
- [ ] robots.txt prüfen
- [ ] WordPress-Generator-Tag aus HTML entfernen (aktuell Sicherheitsrisiko)

---

## Kontaktformular
- [ ] Empfänger-E-Mail-Adresse für Kontaktformular-Nachrichten
- [ ] SMTP-Zugangsdaten vom Hosting-Anbieter (Host, Port, Benutzername, Passwort)
- [ ] Lösung: PHP + PHPMailer (Option 3) – einmalig einrichten, stabil, kein externer Dienst

---

## Sonstiges
- [ ] Telefonnummer klären: druckkopf.de Impressum zeigt +49 8504-2671, sma-computer.de zeigt +49 8583-978 978 1 – welche ist korrekt?
- [ ] 
