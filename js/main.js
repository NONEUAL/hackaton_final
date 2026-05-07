'use strict';

/* ── 1. NAV SCROLL EFFECT ── */
(function initNav() {
  const nav = document.getElementById('mainNav');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load so refreshing mid-page is correct
})();


/* ── 2. SMOOTH SCROLL (anchor links only) ── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();


/* ── 3. SCROLL REVEAL ── */
(function initReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();


/* ── 4. FILTER GRID ──
   type  : 'dest' | 'prod' | 'fest'
   value : 'all' | province/category string
   btn   : the clicked chip element                    */
window.filterGrid = function (type, value, btn) {
  // Deactivate sibling chips
  const chipRow = btn.closest('.filter-row, .d-flex');
  if (chipRow) {
    chipRow.querySelectorAll('.chip, .filter-btn').forEach(c => c.classList.remove('active'));
  }
  btn.classList.add('active');

  const config = {
    dest: { itemClass: 'dest-item', dataAttr: 'province' },
    prod: { itemClass: 'prod-item', dataAttr: 'cat'      },
    fest: { itemClass: 'fest-item', dataAttr: 'province' },
  };

  const { itemClass, dataAttr } = config[type] || {};
  if (!itemClass) return;

  document.querySelectorAll(`.${itemClass}`).forEach(el => {
    el.style.display = (value === 'all' || el.dataset[dataAttr] === value) ? '' : 'none';
  });
};


/* ── 5. MODAL OPENER (Bootstrap 5) ── */
window.openModal = function (id) {
  const el = document.getElementById(id);
  if (el) bootstrap.Modal.getOrCreateInstance(el).show();
};