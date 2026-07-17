import { initI18n } from './i18n.js';

const base = document.documentElement.dataset.base || '';

async function loadComponent(id, path) {
  const el = document.getElementById(id);
  if (!el) return;
  try {
    const res  = await fetch(base + path, { cache: 'no-cache' });
    const html = await res.text();
    el.outerHTML = html;
  } catch (e) {
    console.warn('Component not found:', path);
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
  await Promise.all([
    loadComponent('site-header', '/src/components/header.html'),
    loadComponent('site-footer', '/src/components/footer.html'),
  ]);
  setActiveNav();
  initNav();
  initYear();
  initI18n();
})();
