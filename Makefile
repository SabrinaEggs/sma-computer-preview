PORT ?= 8080

.PHONY: run test generate deploy

# Startet lokalen Entwicklungsserver auf Port 8080 und öffnet den Browser
# Bildet .htaccess-Routing nach (DE + EN Routen)
run:
	@echo "Starting local server at http://localhost:$(PORT)"
	@open http://localhost:$(PORT)
	@python3 server.py $(PORT)

# Generiert englische Seiten aus DE-Vorlagen + translations.js
# Wird automatisch vor 'make test' ausgeführt
# Nur geänderte Seiten werden neu generiert (Zeitstempel-Vergleich)
generate:
	@echo "Generating EN pages..."
	@node scripts/generate-en.js

# Führt die komplette Testsuite aus (tests/validate.js)
# Generiert vorher automatisch EN-Seiten
# Prüft: JS-Syntax, Translations, HTML-Struktur, Components, Assets
test: generate
	@node tests/validate.js

# Baut einen deploy-fertigen dist/ Ordner mit flacher URL-Struktur
# und pusht ihn auf den gh-pages Branch für GitHub Pages
# Vorschau: https://sabrinaeggs.github.io/sma-computer-preview/
deploy: test
	@node scripts/build-deploy.js
	@echo "Pushing to gh-pages..."
	@cd dist && git init && git add -A && git commit -m "Deploy" && git push -f git@github.com:SabrinaEggs/sma-computer-preview.git main:gh-pages
	@echo "Deployed! https://sabrinaeggs.github.io/sma-computer-preview/"
