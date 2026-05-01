// --- Main JS: Language Switcher, Nav, Smooth Scroll ---
(function () {
  let currentLang = 'en';
  try {
    currentLang = localStorage.getItem('nawah-lang') || 'en';
  } catch (e) {
    console.warn('localStorage not available, defaulting to English');
  }

  // --- Language Switcher ---
  function setLanguage(lang) {
    currentLang = lang;
    try {
      localStorage.setItem('nawah-lang', lang);
    } catch (e) { }

    const html = document.documentElement;
    html.setAttribute('lang', lang);
    html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });

    // Show/hide language blocks
    document.querySelectorAll('[data-lang-block]').forEach(el => {
      el.style.display = el.getAttribute('data-lang-block') === lang ? 'block' : 'none';
    });

    // Update lang switch buttons
    document.querySelectorAll('.lang-switch button').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
  }

  // Init language on load
  document.addEventListener('DOMContentLoaded', () => {
    setLanguage(currentLang);

    // Bind lang buttons
    document.querySelectorAll('.lang-switch button').forEach(btn => {
      btn.addEventListener('click', () => setLanguage(btn.getAttribute('data-lang')));
    });

    // --- Sticky Nav ---
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
      }, { passive: true });
    }

    // --- Mobile Nav Toggle ---
    const toggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (toggle && navLinks) {
      toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        navLinks.classList.toggle('open');
      });
      navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          toggle.classList.remove('active');
          navLinks.classList.remove('open');
        });
      });
    }

    // --- Smooth Scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  });
})();
