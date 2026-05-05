/* ============================================================
   NEGROS ISLAND TOURISM — Shared Components
   js/components.js · Injects navbar + footer into every page
   ============================================================ */

'use strict';

(function () {

  const body     = document.body;
  const theme    = body.dataset.theme   || '';
  const page     = body.dataset.page    || '';
  const rootPath = body.dataset.root    || '';

  /* ── 1. NAVBAR ── */
  const navClass = theme === 'oriental'   ? 'nav-ori'
                 : theme === 'occidental' ? 'nav-occ'
                 : 'nav-neg';

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
        ${buildNavLinks(rootPath, page, theme)}
      </div>
    </div>

  </div>
</nav>`;

  document.body.insertAdjacentHTML('afterbegin', navHTML);


  /* ── 2. FOOTER ── */
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
        ${buildFooterCTA(theme, rootPath)}
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

  function buildNavLinks(root, currentPage, currentTheme) {
    const linkClass = currentTheme === 'oriental'   ? 'nav-link-ori'
                    : currentTheme === 'occidental' ? 'nav-link-occ'
                    : 'nav-link-custom';

    const links = [
      { href: `${root}index.html`,                label: 'Home',         key: 'home' },
      { href: `${root}pages/where-to-go.html`,    label: 'Destinations', key: 'where-to-go' },
      { href: `${root}pages/what-to-buy.html`,    label: 'What to Buy',  key: 'what-to-buy' },
      { href: `${root}pages/festivals.html`,      label: 'Festivals',    key: 'festivals' },
      { href: `${root}web_portfolio`,      label: 'Developer',    key: 'developer' },
    ];

    const mainLinks = links.map(({ href, label, key }) => {
      const isActive = currentPage === key;
      return `<a class="${linkClass}" href="${href}"${isActive ? ' style="color:var(--accent-warm)!important;"' : ''}>${label}</a>`;
    }).join('\n        ');

    let pill = '';
    if (currentPage === 'occidental') {
      pill = `<a href="${root}oriental.html" class="nav-pill">Oriental →</a>`;
    } else if (currentPage === 'oriental') {
      pill = `<a href="${root}occidental.html" class="nav-pill">← Occidental</a>`;
    } else if (currentPage === 'developer') {
      pill = `<a href="${root}index.html" class="nav-pill">← Back Home</a>`;
    } else {
      pill = `<a href="${root}occidental.html" class="nav-pill">Explore ↗</a>`;
    }

    return `${mainLinks}\n        ${pill}`;
  }

  function buildFooterCTA(currentTheme, root) {
    if (currentTheme === 'occidental') {
      return `
        <span class="footer-label">Deeper Waters Await</span>
        <p style="font-family:var(--f-sans);font-size:0.88rem;color:rgba(255,255,255,0.4);margin-bottom:1.25rem;line-height:1.65;">
          You've explored the north. Now discover the sea, the turtles, and the City of Gentle People.
        </p>
        <a href="${root}oriental.html" class="btn-gold">Explore Negros Oriental →</a>`;
    }
    if (currentTheme === 'oriental') {
      return `
        <span class="footer-label">Explore the North</span>
        <p style="font-family:var(--f-sans);font-size:0.88rem;color:rgba(255,255,255,0.4);margin-bottom:1.25rem;line-height:1.65;">
          You've seen the sea. Now discover the haciendas, the sugarcane fields, and the city that smiles through everything.
        </p>
        <a href="${root}occidental.html" class="btn-gold">Explore Negros Occidental →</a>`;
    }
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