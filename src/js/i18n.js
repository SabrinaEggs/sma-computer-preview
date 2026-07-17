const STORAGE_KEY = 'sma_lang';

// URL mapping DE → EN and EN → DE
const DE_TO_EN = {
  '/':                   '/en/',
  '/unsere-leistungen/': '/en/services/',
  '/ueber-uns/':         '/en/about/',
  '/kontakt/':           '/en/contact/',
  '/anfahrt/':           '/en/directions/',
  '/druckkoepfe/':       '/en/printheads/',
};
const EN_TO_DE = Object.fromEntries(Object.entries(DE_TO_EN).map(([k,v]) => [v,k]));

function currentLang() {
  const path = window.location.pathname;
  return path.startsWith('/en/') || path === '/en' ? 'en' : 'de';
}

function switchLang(lang) {
  localStorage.setItem(STORAGE_KEY, lang);
  const path = window.location.pathname;
  const current = currentLang();
  if (lang === current) return;

  if (lang === 'en') {
    const target = DE_TO_EN[path] || '/en/';
    window.location.href = target;
  } else {
    const target = EN_TO_DE[path] || '/';
    window.location.href = target;
  }
}

function updateToggle() {
  const lang = currentLang();
  document.querySelectorAll('.lang-toggle-btn').forEach(btn => {
    const active = btn.dataset.lang === lang;
    btn.setAttribute('aria-pressed', active);
    btn.classList.toggle('is-active', active);
  });
  document.documentElement.lang = lang;
}

function buildToggle() {
  const wrap = document.querySelector('.lang-toggle');
  if (!wrap) return;
  [['de','Deutsch'], ['en','English']].forEach(([lang, label]) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'lang-toggle-btn';
    btn.dataset.lang = lang;
    btn.textContent = lang.toUpperCase();
    btn.setAttribute('aria-label', label);
    btn.addEventListener('click', () => switchLang(lang));
    wrap.appendChild(btn);
  });
}

export function initI18n() {
  buildToggle();
  updateToggle();
}
