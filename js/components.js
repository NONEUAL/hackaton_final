/* ============================================================
   NEGROS ISLAND TOURISM — Shared Components
   js/components.js · Injects navbar + footer into every page

   HOW IT WORKS:
   - Reads data-page attribute on <body> to highlight active link
   - Reads data-theme on <body> ("occidental" | "oriental" | "")
     to pick the correct nav style + footer CTA
   - Call order: this script runs, then main.js handles scroll
   ============================================================ */

'use strict';

(function () {

  /* ── Helpers ── */
  const body     = document.body;
  const theme    = body.dataset.theme   || '';   // "occidental" | "oriental" | ""
  const page     = body.dataset.page    || '';   // "home" | "occidental" | "oriental" | "where-to-go" | "what-to-buy" | "festivals"
  const rootPath = body.dataset.root    || '';   // "" for root pages, "../" for /pages/ pages

  /* Active link helper */
  function isActive(p) {
    return page === p ? 'style="color:var(--accent-warm)!important;"' : '';
  }

  /* ── 1. NAVBAR ── */
  const navClass = theme === 'oriental' ? 'nav-ori' : (theme === 'occidental' ? 'nav-occ' : 'nav-neg');

  const navHTML = `
<nav class="${navClass}" id="mainNav" aria-label="Main navigation">
  <div class="container d-flex align-items-center justify-content-between">

    <a class="nav-brand" href="${rootPath}index.html">NEG<span>ROS</span></a>

    <button class="navbar-toggler d-lg-none" type="button"
            data-bs-toggle="collapse" data-bs-target="#navMenu"
            aria-controls="navMenu" aria-expanded="false"
            aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse d-lg-flex justify-content-end" id="navMenu">
      <div class="d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-3 gap-lg-4 mt-3 mt-lg-0">
        ${navLinks(rootPath, page, theme)}
      </div>
    </div>

  </div>
</nav>`;

  document.body.insertAdjacentHTML('afterbegin', navHTML);


  /* ── 2. FOOTER ── */
  const footerCTA = footerCtaBlock(theme, rootPath);

  const footerHTML = `
<footer class="footer" id="siteFooter">
  <div class="container position-relative" style="z-index:1;">
    <div class="row g-5 mb-4">

      <div class="col-lg-4">
        <div class="footer-brand">NEG<span>ROS</span></div>
        <p class="footer-tagline">Where sugar meets the sea<br>and smiles are a way of life.</p>
      </div>

      <div class="col-lg-2 col-6">
        <span class="footer-label">Explore</span>
        <a href="${rootPath}pages/where-to-go.html" class="footer-link">Where to Go</a>
        <a href="${rootPath}pages/what-to-buy.html" class="footer-link">What to Buy</a>
        <a href="${rootPath}pages/festivals.html"   class="footer-link">Festivals</a>
      </div>

      <div class="col-lg-2 col-6">
        <span class="footer-label">Region</span>
        <a href="${rootPath}occidental.html" class="footer-link"
           ${page === 'occidental' ? 'style="color:var(--accent);"' : ''}>
          Negros Occidental
        </a>
        <a href="${rootPath}oriental.html" class="footer-link"
           ${page === 'oriental' ? 'style="color:var(--accent);"' : ''}>
          Negros Oriental
        </a>
      </div>

      <div class="col-lg-4">
        ${footerCTA}
      </div>

    </div>
    <hr class="footer-divider">
    <p class="footer-copy">© 2026 Explore Negros. IT 210 Final Project. All Rights Reserved.</p>
  </div>
</footer>`;

  document.body.insertAdjacentHTML('beforeend', footerHTML);


  /* ────────────────────────────────────────────────────────
     HELPERS
  ──────────────────────────────────────────────────────── */

  function navLinks(root, currentPage, currentTheme) {
    const linkClass = currentTheme === 'oriental' ? 'nav-link-ori'
                    : currentTheme === 'occidental' ? 'nav-link-occ'
                    : 'nav-link-custom';

    /* Shared nav items for all pages */
    const links = [
      { href: `${root}index.html`,               label: 'Home',        key: 'home' },
      { href: `${root}pages/where-to-go.html`,   label: 'Destinations',key: 'where-to-go' },
      { href: `${root}pages/what-to-buy.html`,   label: 'What to Buy', key: 'what-to-buy' },
      { href: `${root}pages/festivals.html`,     label: 'Festivals',   key: 'festivals' },
    ];

    const mainLinks = links.map(({ href, label, key }) => {
      const active = currentPage === key ? ' style="color:var(--accent-warm)!important;"' : '';
      return `<a class="${linkClass}" href="${href}"${active}>${label}</a>`;
    }).join('\n        ');

    /* Province pill — changes based on current page */
    let pill = '';
    if (currentPage === 'occidental') {
      pill = `<a href="${root}oriental.html" class="nav-pill">Oriental →</a>`;
    } else if (currentPage === 'oriental') {
      pill = `<a href="${root}occidental.html" class="nav-pill">← Occidental</a>`;
    } else {
      pill = `<a href="${root}occidental.html" class="nav-pill" style="color:var(--accent-warm)!important;border:1px solid rgba(232,147,62,0.4);padding:0.35rem 0.9rem!important;border-radius:2px;">Explore ↗</a>`;
    }

    return `${mainLinks}\n        ${pill}`;
  }

  function footerCtaBlock(currentTheme, root) {
    if (currentTheme === 'occidental') {
      return `
        <span class="footer-label">Deeper Waters Await</span>
        <p style="font-family:var(--f-serif);font-style:italic;font-size:0.88rem;color:rgba(255,255,255,0.45);margin-bottom:1.25rem;line-height:1.65;">
          You've explored the north. Now discover the sea, the turtles, and the City of Gentle People.
        </p>
        <a href="${root}oriental.html" class="btn-gold">Explore Negros Oriental →</a>`;
    }

    if (currentTheme === 'oriental') {
      return `
        <span class="footer-label">Explore the North</span>
        <p style="font-family:var(--f-serif);font-style:italic;font-size:0.88rem;color:rgba(255,255,255,0.45);margin-bottom:1.25rem;line-height:1.65;">
          You've seen the sea. Now discover the haciendas, the sugarcane fields, and the city that smiles through everything.
        </p>
        <a href="${root}occidental.html" class="btn-gold">Explore Negros Occidental →</a>`;
    }

    /* Default (index + sub-pages) */
    return `
      <span class="footer-label">Connect</span>
      <div>
        <a href="#" class="social-btn" aria-label="Facebook"><i class="bi bi-facebook"></i></a>
        <a href="#" class="social-btn" aria-label="Instagram"><i class="bi bi-instagram"></i></a>
        <a href="#" class="social-btn" aria-label="Twitter / X"><i class="bi bi-twitter-x"></i></a>
        <a href="#" class="social-btn" aria-label="YouTube"><i class="bi bi-youtube"></i></a>
      </div>`;
  }

})();