import { initI18n } from './i18n.js';

const base = document.documentElement.dataset.base || '';

// Ermittelt den Basepfad automatisch (wichtig für GitHub Pages Subdirectory)
function getBase() {
  if (base) return base;
  const script = document.querySelector('script[src*="components.js"]');
  if (script) {
    return script.src.replace(/src\/js\/components\.js.*$/, '');
  }
  return '/';
}

// Passt absolute Nav-Links an den Basepfad an
function fixAbsoluteLinks(b) {
  // Nur nötig wenn wir nicht im Root laufen
  if (b === '/' || b === '') return;
  const prefix = b.replace(/\/$/, '');
  document.querySelectorAll('a[href^="/"]').forEach(a => {
    const href = a.getAttribute('href');
    if (href.startsWith(prefix)) return;
    a.setAttribute('href', prefix + href);
  });
  document.querySelectorAll('img[src^="/"]').forEach(img => {
    const src = img.getAttribute('src');
    if (src.startsWith(prefix)) return;
    img.setAttribute('src', prefix + src);
  });
}

async function loadComponent(id, path) {
  const el = document.getElementById(id);
  if (!el) return;
  try {
    const res  = await fetch(path, { cache: 'no-cache' });
    const html = await res.text();
    el.outerHTML = html;
  } catch (e) {
    console.warn('Komponente nicht gefunden:', path);
  }
}

function setActiveNav() {
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.primary-nav a').forEach(a => {
    const href = a.getAttribute('href').replace(/\/$/, '') || '/';
    if (href === path) a.setAttribute('aria-current', 'page');
  });
}

function initNav() {
  const toggle = document.querySelector('.nav-toggle');
  const nav    = document.querySelector('.primary-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open);
  });
  document.addEventListener('click', e => {
    if (!nav.contains(e.target) && !toggle.contains(e.target)) {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    }
  });
}

function initYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}

(async () => {
  const b = getBase();
  await Promise.all([
    loadComponent('site-header', b + 'src/components/header.html'),
    loadComponent('site-footer', b + 'src/components/footer.html'),
  ]);
  fixAbsoluteLinks(b);
  setActiveNav();
  initNav();
  initYear();
  initI18n();
})();
