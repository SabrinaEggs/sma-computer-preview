#!/usr/bin/env node
// run: node tests/validate.js

import { readFileSync, existsSync } from 'fs';
import { pathToFileURL } from 'url';
import { join } from 'path';

const ROOT = new URL('..', import.meta.url).pathname;
let passed = 0;
let failed = 0;

function ok(name)        { console.log(`  ✓ ${name}`); passed++; }
function fail(name, msg) { console.error(`  ✗ ${name}: ${msg}`); failed++; }
function read(rel)       { return readFileSync(join(ROOT, rel), 'utf8'); }

// ── 1. JS MODULE SYNTAX ───────────────────────────────────
console.log('\n1. JS Module Syntax');

for (const f of ['src/js/translations.js', 'src/js/i18n.js']) {
  try {
    await import(pathToFileURL(join(ROOT, f)).href);
    ok(f);
  } catch (e) {
    fail(f, e.message.split('\n')[0]);
  }
}

// ── 2. TRANSLATIONS COMPLETENESS ─────────────────────────
console.log('\n2. Translations Completeness');

const { default: t } = await import(pathToFileURL(join(ROOT, 'src/js/translations.js')).href);
const deKeys = Object.keys(t.de);
const enKeys = Object.keys(t.en);

const missingEn = deKeys.filter(k => t.en[k] === undefined);
const missingDe = enKeys.filter(k => t.de[k] === undefined);
const emptyDe   = deKeys.filter(k => !t.de[k] || (Array.isArray(t.de[k]) && !t.de[k].length));
const emptyEn   = enKeys.filter(k => !t.en[k] || (Array.isArray(t.en[k]) && !t.en[k].length));

if (!missingEn.length) ok(`All ${deKeys.length} DE keys present in EN`);
else fail('Missing EN keys', missingEn.join(', '));

if (!missingDe.length) ok(`All ${enKeys.length} EN keys present in DE`);
else fail('Missing DE keys', missingDe.join(', '));

if (!emptyDe.length) ok('No empty DE values');
else fail('Empty DE values', emptyDe.join(', '));

if (!emptyEn.length) ok('No empty EN values');
else fail('Empty EN values', emptyEn.join(', '));

// ── 3. HTML PAGES ─────────────────────────────────────────
console.log('\n3. HTML Pages');

const pages = [
  'index.html',
  'pages/unsere-leistungen/index.html',
  'pages/ueber-uns/index.html',
  'pages/kontakt/index.html',
  'pages/anfahrt/index.html',
  'pages/impressum/index.html',
  'pages/datenschutz/index.html',
  'pages/druckkoepfe/index.html',
  'en/index.html',
  'en/pages/services/index.html',
  'en/pages/about/index.html',
  'en/pages/contact/index.html',
  'en/pages/directions/index.html',
  'en/pages/printheads/index.html',
];

for (const page of pages) {
  const c = read(page);
  const expectedLang = page.startsWith('en/') ? 'en' : 'de';
  const checks = [
    ['<title>',          /<title>[^<]+<\/title>/.test(c)],
    ['meta description', /<meta name="description" content="[^"]{10,}"/.test(c)],
    ['canonical',        /<link rel="canonical"/.test(c)],
    [`lang="${expectedLang}"`, new RegExp(`<html lang="${expectedLang}"`).test(c)],
    ['skip-link',        /skip-link/.test(c)],
    ['#site-header',     /id="site-header"/.test(c)],
    ['#site-footer',     /id="site-footer"/.test(c)],
    ['type=module',      /type="module"/.test(c)],
    ['no inline JS',     !/onclick=|javascript:/.test(c)],
  ];
  for (const [label, result] of checks) {
    if (result) ok(`${page} – ${label}`);
    else fail(`${page} – ${label}`, 'failed');
  }
}

// ── 4. COMPONENTS ─────────────────────────────────────────
console.log('\n4. Components');

const header = read('src/components/header.html');
const footer = read('src/components/footer.html');

if (/<header/.test(header))    ok('header.html has <header>');
else fail('header.html', 'missing <header>');

if (/lang-toggle/.test(header)) ok('header.html has lang-toggle');
else fail('header.html', 'missing lang-toggle');

if (/<footer/.test(footer))    ok('footer.html has <footer>');
else fail('footer.html', 'missing <footer>');

if (/id="year"/.test(footer))  ok('footer.html has #year');
else fail('footer.html', 'missing #year span');

// ── 5. REQUIRED ASSETS ────────────────────────────────────
console.log('\n5. Required Assets');

for (const f of ['src/img/logo-sma.jpg', 'src/img/favicon.svg']) {
  if (existsSync(join(ROOT, f))) ok(f);
  else fail(f, 'file not found');
}

// ── SUMMARY ───────────────────────────────────────────────
console.log(`\n${'─'.repeat(40)}`);
console.log(`  ${passed} passed, ${failed} failed`);
console.log('─'.repeat(40) + '\n');
if (failed > 0) process.exit(1);
