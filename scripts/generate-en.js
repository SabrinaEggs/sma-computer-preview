#!/usr/bin/env node
// Generates English HTML pages from DE templates + translations.js
// run: node scripts/generate-en.js

import { readFileSync, writeFileSync, statSync } from 'fs';
import { pathToFileURL } from 'url';
import { join } from 'path';

const ROOT = new URL('..', import.meta.url).pathname;
const { default: t } = await import(pathToFileURL(join(ROOT, 'src/js/translations.js')).href);
const en = t.en;

function applyTranslations(html) {
  // Replace data-i18n text content
  html = html.replace(/data-i18n="([^"]+)">([^<]*)</g, (match, key) => {
    const val = en[key];
    if (!val || Array.isArray(val)) return match;
    return `data-i18n="${key}">${val}<`;
  });
  // Replace data-i18n-list items
  html = html.replace(/data-i18n-list="([^"]+)">([\s\S]*?)<\/ul>/g, (match, key) => {
    const items = en[key];
    if (!Array.isArray(items)) return match;
    const lis = items.map(i => `\n              <li>${i}</li>`).join('');
    return `data-i18n-list="${key}">${lis}\n            </ul>`;
  });
  return html;
}

function addHreflang(html, dePath, enPath) {
  const tags = `
  <link rel="alternate" hreflang="de" href="https://sma-computer.de${dePath}">
  <link rel="alternate" hreflang="en" href="https://sma-computer.de${enPath}">
  <link rel="alternate" hreflang="x-default" href="https://sma-computer.de${dePath}">`;
  return html.replace('</head>', tags + '\n</head>');
}

function fixPaths(html, depth) {
  const p = '../'.repeat(depth);
  html = html.replace(/href="\.\.\/\.\.\/src\//g, `href="${p}src/`);
  html = html.replace(/src="\.\.\/\.\.\/src\//g,  `src="${p}src/`);
  html = html.replace(/src="src\//g,              `src="${p}src/`);
  html = html.replace(/href="src\//g,             `href="${p}src/`);
  html = html.replace(/src="[^"]*\/components\.js"/g, `src="${p}src/js/components.js"`);
  return html;
}

const pages = [
  { src: 'index.html',                          out: 'en/index.html',                       dePath: '/',                  enPath: '/en/',           depth: 1 },
  { src: 'pages/druckkoepfe/index.html',        out: 'en/pages/printheads/index.html',       dePath: '/druckkoepfe/',      enPath: '/en/printheads/', depth: 3 },
  { src: 'pages/unsere-leistungen/index.html',  out: 'en/pages/services/index.html',         dePath: '/unsere-leistungen/',enPath: '/en/services/',   depth: 3 },
  { src: 'pages/ueber-uns/index.html',          out: 'en/pages/about/index.html',            dePath: '/ueber-uns/',        enPath: '/en/about/',      depth: 3 },
  { src: 'pages/kontakt/index.html',            out: 'en/pages/contact/index.html',          dePath: '/kontakt/',          enPath: '/en/contact/',    depth: 3 },
  { src: 'pages/anfahrt/index.html',            out: 'en/pages/directions/index.html',       dePath: '/anfahrt/',          enPath: '/en/directions/', depth: 3 },
];

const translationsMtime = statSync(join(ROOT, 'src/js/translations.js')).mtimeMs;

for (const page of pages) {
  const srcPath = join(ROOT, page.src);
  const outPath = join(ROOT, page.out);
  const srcMtime = statSync(srcPath).mtimeMs;
  const needsUpdate = (() => {
    try { return Math.max(srcMtime, translationsMtime) > statSync(outPath).mtimeMs; }
    catch { return true; }
  })();

  if (!needsUpdate) {
    console.log(`  – skip (up to date): ${page.out}`);
    continue;
  }
  let html = readFileSync(join(ROOT, page.src), 'utf8');
  html = html.replace('<html lang="de"', '<html lang="en"');
  html = html.replace(/<link rel="canonical" href="[^"]+"/, `<link rel="canonical" href="https://sma-computer.de${page.enPath}"`);
  html = html.replace('content="de_DE"', 'content="en_GB"');
  html = applyTranslations(html);
  html = addHreflang(html, page.dePath, page.enPath);
  html = fixPaths(html, page.depth);
  writeFileSync(join(ROOT, page.out), html);
  console.log(`  ✓ ${page.out}`);
}

console.log('\nDone.');
