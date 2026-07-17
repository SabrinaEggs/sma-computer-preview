#!/usr/bin/env node
// Baut einen deploy-fertigen dist/ Ordner für GitHub Pages
// Kopiert pages/* ins Root, passt Pfade an
// run: node scripts/build-deploy.js

import { readFileSync, writeFileSync, cpSync, mkdirSync, rmSync, existsSync } from 'fs';
import { join } from 'path';

const ROOT = new URL('..', import.meta.url).pathname;
const DIST = join(ROOT, 'dist');

// dist/ Ordner neu erstellen
if (existsSync(DIST)) rmSync(DIST, { recursive: true });
mkdirSync(DIST);

console.log('  Baue dist/ Ordner...');

// src/ kopieren
cpSync(join(ROOT, 'src'), join(DIST, 'src'), { recursive: true });
console.log('  ✓ src/');

// en/ kopieren
cpSync(join(ROOT, 'en'), join(DIST, 'en'), { recursive: true });
console.log('  ✓ en/');

// Unterseiten aus pages/ ins Root kopieren und Pfade anpassen
const pages = [
  { src: 'pages/unsere-leistungen/index.html', out: 'unsere-leistungen/index.html' },
  { src: 'pages/ueber-uns/index.html',         out: 'ueber-uns/index.html' },
  { src: 'pages/kontakt/index.html',           out: 'kontakt/index.html' },
  { src: 'pages/anfahrt/index.html',           out: 'anfahrt/index.html' },
  { src: 'pages/impressum/index.html',         out: 'impressum/index.html' },
  { src: 'pages/datenschutz/index.html',       out: 'datenschutz/index.html' },
  { src: 'pages/druckkoepfe/index.html',       out: 'druckkoepfe/index.html' },
];

for (const { src, out } of pages) {
  let html = readFileSync(join(ROOT, src), 'utf8');
  // Pfade von ../../src/ auf src/ anpassen (eine Ebene flacher)
  html = html.replace(/href="\.\.\/\.\.\/src\//g, 'href="src/');
  html = html.replace(/src="\.\.\/\.\.\/src\//g,  'src="src/');
  html = html.replace(/src="[^"]*\/components\.js"/g, 'src="src/js/components.js"');
  const outPath = join(DIST, out);
  mkdirSync(join(DIST, out.split('/')[0]), { recursive: true });
  writeFileSync(outPath, html);
  console.log(`  ✓ ${out}`);
}

// Startseite kopieren (Pfade bleiben gleich)
cpSync(join(ROOT, 'index.html'), join(DIST, 'index.html'));
console.log('  ✓ index.html');

// EN-Unterseiten Pfade anpassen (von ../../src/ auf ../../src/ – bleiben gleich da en/pages/ Struktur)
// EN index.html Pfad anpassen (von ../src/ auf src/)
let enIndex = readFileSync(join(DIST, 'en/index.html'), 'utf8');
enIndex = enIndex.replace(/href="\.\.\/src\//g, 'href="../src/');
enIndex = enIndex.replace(/src="\.\.\/src\//g,  'src="../src/');
writeFileSync(join(DIST, 'en/index.html'), enIndex);

// .nojekyll damit GitHub Pages keine Jekyll-Verarbeitung macht
writeFileSync(join(DIST, '.nojekyll'), '');
console.log('  ✓ .nojekyll');

console.log('\n  dist/ fertig!\n');
