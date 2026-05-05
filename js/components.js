'use strict';

(function () {
  if (document.getElementById('mainNav')) return;

  const body = document.body;
  const page = body.dataset.page || '';

  const scriptPath = document.currentScript?.src || '';
  const rootPath = scriptPath.includes('/pages/') || scriptPath.includes('\\pages\\')
    ? '../'
    : './';

  const root = body.dataset.root || rootPath;

  const theme = body.dataset.theme || body.classList.contains('theme-oriental') ? 'oriental'
    : body.classList.contains('theme-occidental') ? 'occidental' : '';
  const navClass = theme === 'oriental' ? 'nav-ori' : theme === 'occidental' ? 'nav-occ' : 'nav-neg';

  // ── NAV ──
  const navHTML = `
<nav class="navbar navbar-expand-lg ${navClass}" id="mainNav" aria-label="Main navigation">
  <div class="container d-flex align-items-center justify-content-between">
    <a class="nav-brand" href="${root}index.html">NEG<span>ROS</span></a>
    <button class="navbar-toggler ms-auto" type="button"
            data-bs-toggle="collapse" data-bs-target="#navMenu"
            aria-controls="navMenu" aria-expanded="false"
            aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navMenu">
      <div class="navbar-nav ms-auto align-items-lg-center gap-lg-4 pt-3 pt-lg-0">
        ${buildNavLinks(root, page, theme)}
      </div>
    </div>
  </div>
</nav>`;
  document.body.insertAdjacentHTML('afterbegin', navHTML);

  // ── FOOTER ──
  if (!document.getElementById('siteFooter')) {
    const footerHTML = `
    <footer class="footer" id="siteFooter">
      <div class="container">
        <div class="row g-5 mb-4">
          <div class="col-lg-4">
            <div class="footer-brand">NEG<span>ROS</span></div>
            <p class="footer-tagline">Where sugar meets the sea.</p>
          </div>
          <div class="col-lg-2 col-6">
            <span class="footer-label">Explore</span>
            <a href="${root}pages/where-to-go.html" class="footer-link" target="_top">Where to Go</a>
            <a href="${root}pages/what-to-buy.html" class="footer-link" target="_top">What to Buy</a>
            <a href="${root}pages/festivals.html"   class="footer-link" target="_top">Festivals</a>
          </div>
          <div class="col-lg-2 col-6">
            <span class="footer-label">Region</span>
            <a href="${root}occidental.html" class="footer-link" target="_top">Negros Occidental</a>
            <a href="${root}oriental.html" class="footer-link" target="_top">Negros Oriental</a>
          </div>
          <div class="col-lg-4">
            ${buildFooterCTA()}
          </div>
        </div>
        <hr class="footer-divider">
        <p class="footer-copy">© 2026 Gabriel Velasquez. IT 210 Final Project.</p>
      </div>
    </footer>`;
    document.body.insertAdjacentHTML('beforeend', footerHTML);
  }

  // ── HELPERS ──
  function buildNavLinks(root, currentPage, currentTheme) {
    const linkClass = currentTheme === 'oriental' ? 'nav-link-ori' : currentTheme === 'occidental' ? 'nav-link-occ' : 'nav-link-custom';
    const links = [
      { href: `${root}index.html`, label: 'Home', key: 'home' },
      { href: `${root}pages/where-to-go.html`, label: 'Destinations', key: 'where-to-go' },
      { href: `${root}pages/what-to-buy.html`, label: 'What to Buy', key: 'what-to-buy' },
      { href: `${root}pages/festivals.html`, label: 'Festivals', key: 'festivals' },
      { href: `${root}web_portfolio/index.html`, label: 'Developer', key: 'developer' },
    ];
    let html = links.map(link => {
      const isActive = currentPage === link.key ? 'nav-active' : '';
      return `<a class="${linkClass} ${isActive}" href="${link.href}">${link.label}</a>`;
    }).join('');

    let pill = '';
    if (currentPage === 'occidental') pill = `<a href="${root}oriental.html" class="nav-pill">Oriental →</a>`;
    else if (currentPage === 'oriental') pill = `<a href="${root}occidental.html" class="nav-pill">← Occidental</a>`;
    else pill = `<a href="${root}occidental.html" class="nav-pill">Explore ↗</a>`;

    return html + pill;
  }

  function buildFooterCTA() {
    return `<span class="footer-label">Connect</span>
            <div>
              <a href="#" class="social-btn" aria-label="Facebook" target="_top"><i class="bi bi-facebook"></i></a>
              <a href="#" class="social-btn" aria-label="Instagram" target="_top"><i class="bi bi-instagram"></i></a>
              <a href="#" class="social-btn" aria-label="Twitter / X" target="_top"><i class="bi bi-twitter-x"></i></a>
              <a href="#" class="social-btn" aria-label="YouTube" target="_top"><i class="bi bi-youtube"></i></a>
            </div>`;
  }

})();