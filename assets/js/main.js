/* ============================================================
   HARSH RAJ — PORTFOLIO
   assets/js/main.js
   ============================================================ */

/* ——— CUSTOM CURSOR ——— */
(function initCursor() {
  const cur  = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  if (!cur || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cur.style.left = mx + 'px';
    cur.style.top  = my + 'px';
  });

  (function animRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animRing);
  })();

  const hoverTargets = 'a, button, .exp-tab, .hobby-card, .project-card, .film-card, .reel-wrapper, .accolade-card, .skill-card';
  document.querySelectorAll(hoverTargets).forEach(el => {
    el.addEventListener('mouseenter', () => {
      cur.style.transform  = 'translate(-50%,-50%) scale(2.2)';
      ring.style.borderColor = 'rgba(0,229,255,0.7)';
      ring.style.transform   = 'translate(-50%,-50%) scale(1.4)';
    });
    el.addEventListener('mouseleave', () => {
      cur.style.transform  = 'translate(-50%,-50%) scale(1)';
      ring.style.borderColor = 'rgba(0,229,255,0.35)';
      ring.style.transform   = 'translate(-50%,-50%) scale(1)';
    });
  });
})();


/* ——— EXPERIENCE TABS ——— */
function showTab(index) {
  document.querySelectorAll('.exp-tab').forEach((tab, i) => {
    tab.classList.toggle('active', i === index);
  });
  document.querySelectorAll('.exp-panel').forEach((panel, i) => {
    panel.classList.toggle('active', i === index);
  });
}
// Expose globally for inline onclick
window.showTab = showTab;


/* ——— SCROLL REVEAL ——— */
(function initReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 70);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();


/* ——— ACTIVE NAV HIGHLIGHT ON SCROLL ——— */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 180) current = s.getAttribute('id');
    });
    navLinks.forEach(a => {
      const href = a.getAttribute('href');
      a.classList.toggle('active', href === '#' + current);
    });
  }, { passive: true });
})();


/* ——— INSTAGRAM REEL EMBED FALLBACK ——— */
// Instagram embeds are blocked by some browsers / privacy settings.
// If an iframe hasn't fired its load event within 5 s, swap it out
// for the styled fallback card so visitors always see something useful.
(function initReelFallbacks() {
  const reels = [
    { iframe: 'reel1-iframe', container: 'reel1-container', fallback: 'reel1-fallback' },
    { iframe: 'reel2-iframe', container: 'reel2-container', fallback: 'reel2-fallback' },
  ];

  reels.forEach(({ iframe: iframeId, container: containerId, fallback: fallbackId }) => {
    const iframe    = document.getElementById(iframeId);
    const container = document.getElementById(containerId);
    const fallback  = document.getElementById(fallbackId);
    if (!iframe || !container || !fallback) return;

    let loaded = false;
    iframe.addEventListener('load', () => { loaded = true; });

    setTimeout(() => {
      if (!loaded) {
        container.style.display = 'none';
        fallback.style.display  = 'flex';
      }
    }, 5000);
  });
})();
