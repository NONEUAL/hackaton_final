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
  onScroll(); // run once on load in case page is already scrolled
})();


/* ────────────────────────────────────────────────────────────
   2. SMOOTH SCROLL  (anchor links)
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
   Usage in HTML:
     <button class="chip active" onclick="filterGrid('dest','all',this)">All</button>
     <div class="dest-item" data-province="occidental">…</div>
   ──────────────────────────────────────────────────────────── */
window.filterGrid = function (type, value, btn) {
  // Deactivate sibling chips
  const chipRow = btn.closest('[id$="-filter"], .filter-row, .d-flex');
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
   5. MODAL OPENER  (Bootstrap 5)
   Usage: onclick="openModal('modal-ruins')"
   ──────────────────────────────────────────────────────────── */
window.openModal = function (id) {
  const el = document.getElementById(id);
  if (!el) return;
  const modal = new bootstrap.Modal(el);
  modal.show();
};


/* ────────────────────────────────────────────────────────────
   6. SCROLL-TO + FILTER  (province card clicks on index)
   Usage: onclick="scrollToFilter('destinations','occidental')"
   ──────────────────────────────────────────────────────────── */
window.scrollToFilter = function (sectionId, province) {
  const section = document.getElementById(sectionId);
  if (!section) return;

  section.scrollIntoView({ behavior: 'smooth', block: 'start' });

  // After scroll animation settles, click the matching chip
  setTimeout(() => {
    const chip = section.querySelector(`.chip[onclick*="'${province}'"]`);
    if (chip) chip.click();
  }, 650);
};


/* ────────────────────────────────────────────────────────────
   7. SUB-PAGE FILTER  (pages/festivals, pages/what-to-buy,
                        pages/where-to-go — Bootstrap style btns)
   Usage: onclick="filterSection('dest','occidental',this)"
   ──────────────────────────────────────────────────────────── */
window.filterSection = function (type, value, btn) {
  // Reset all filter buttons in the same row
  const row = btn.closest('section, div');
  if (row) {
    row.querySelectorAll('.filter-btn').forEach(b => {
      b.classList.remove('active');
      b.style.background = 'var(--bg-alt)';
      b.style.color = '#333';
    });
  }
  btn.classList.add('active');
  btn.style.background = 'var(--brand)';
  btn.style.color = '#fff';

  // Reuse filterGrid logic
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