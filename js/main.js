/* ============================================================
   NEGROS ISLAND TOURISM — Shared JavaScript
   js/main.js · Used by all pages
   ============================================================ */

'use strict';

/* ────────────────────────────────────────────────────────────
   1. NAV SCROLL EFFECT
   ──────────────────────────────────────────────────────────── */
(function initNav() {
  const nav = document.getElementById('mainNav');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();


/* ────────────────────────────────────────────────────────────
   2. SMOOTH SCROLL (anchor links)
   ──────────────────────────────────────────────────────────── */
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


/* ────────────────────────────────────────────────────────────
   3. SCROLL REVEAL
   ──────────────────────────────────────────────────────────── */
(function initReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();


/* ────────────────────────────────────────────────────────────
   4. FILTER GRID
   Supports: destinations (dest), products (prod), festivals (fest)
   ──────────────────────────────────────────────────────────── */
window.filterGrid = function (type, value, btn) {
  // Deactivate sibling chips
  const chipRow = btn.closest('.filter-row, .d-flex');
  if (chipRow) {
    chipRow.querySelectorAll('.chip, .filter-btn').forEach(c => c.classList.remove('active'));
  }
  btn.classList.add('active');

  // Map type → [itemClass, dataAttribute]
  const map = {
    dest: ['dest-item', 'province'],
    prod: ['prod-item', 'cat'],
    fest: ['fest-item', 'province'],
  };

  const [itemClass, dataAttr] = map[type] || [];
  if (!itemClass) return;

  document.querySelectorAll(`.${itemClass}`).forEach(el => {
    const match = value === 'all' || el.dataset[dataAttr] === value;
    el.style.display = match ? '' : 'none';
  });
};


/* ────────────────────────────────────────────────────────────
   5. MODAL OPENER (Bootstrap 5)
   ──────────────────────────────────────────────────────────── */
window.openModal = function (id) {
  const el = document.getElementById(id);
  if (!el) return;
  const modal = new bootstrap.Modal(el);
  modal.show();
};