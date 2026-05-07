'use strict';

(function () {
  if (document.getElementById('mainNav')) return;

  const body    = document.body;
  const page    = body.dataset.page  || '';
  const root    = body.dataset.root  || './';
  const theme   = body.dataset.theme || '';

  const navClass  = theme === 'oriental'   ? 'nav-ori'
                  : theme === 'occidental' ? 'nav-occ'
                  : 'nav-neg';

  const linkClass = theme === 'oriental'   ? 'nav-link-ori'
                  : theme === 'occidental' ? 'nav-link-occ'
                  : 'nav-link-custom';

  // ── NAV ──
  document.body.insertAdjacentHTML('afterbegin', `
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
            ${buildNavLinks(root, page, linkClass)}
          </div>
        </div>
      </div>
    </nav>`);

  // ── FOOTER ──
  if (!document.getElementById('siteFooter')) {
    document.body.insertAdjacentHTML('beforeend', `
      <footer class="footer" id="siteFooter">
        <div class="container">
          <div class="row g-5 mb-4">
            <div class="col-lg-4">
              <div class="footer-brand">NEG<span>ROS</span></div>
              <p class="footer-tagline">Where sugar meets the sea.</p>
            </div>
            <div class="col-lg-2 col-6">
              <span class="footer-label">Explore</span>
              <a href="${root}pages/where-to-go.html" class="footer-link">Where to Go</a>
              <a href="${root}pages/what-to-buy.html" class="footer-link">What to Buy</a>
              <a href="${root}pages/festivals.html"   class="footer-link">Festivals</a>
            </div>
            <div class="col-lg-2 col-6">
              <span class="footer-label">Region</span>
              <a href="${root}occidental.html" class="footer-link">Negros Occidental</a>
              <a href="${root}oriental.html"   class="footer-link">Negros Oriental</a>
            </div>
            <div class="col-lg-4">
              <span class="footer-label">Connect</span>
              <div>
                <a href="https://www.facebook.com/negrosdailybulletin/"                              class="social-btn" target="_blank" rel="noopener" aria-label="Facebook"><i class="bi bi-facebook"></i></a>
                <a href="https://www.instagram.com/explore/locations/1031636215/negros-island/?hl=es" class="social-btn" target="_blank" rel="noopener" aria-label="Instagram"><i class="bi bi-instagram"></i></a>
                <a href="https://x.com/negrosislandr18?lang=en"                                       class="social-btn" target="_blank" rel="noopener" aria-label="Twitter / X"><i class="bi bi-twitter-x"></i></a>
                <a href="https://www.youtube.com/watch?v=7d8VVc1fN-8"                                 class="social-btn" target="_blank" rel="noopener" aria-label="YouTube"><i class="bi bi-youtube"></i></a>
              </div>
            </div>
          </div>
          <hr class="footer-divider">
          <p class="footer-copy">© Gabriel Velasquez. IT 210 Final Project.</p>
        </div>
      </footer>`);
  }

  // ── HELPERS ──
  function buildNavLinks(root, currentPage, linkClass) {
    const links = [
      { href: `${root}index.html`,                  label: 'Home',         key: 'home'        },
      { href: `${root}pages/where-to-go.html`,      label: 'Destinations', key: 'where-to-go' },
      { href: `${root}pages/what-to-buy.html`,      label: 'What to Buy',  key: 'what-to-buy' },
      { href: `${root}pages/festivals.html`,        label: 'Festivals',    key: 'festivals'   },
      { href: `${root}web_portfolio/index.html`,    label: 'Developer',    key: 'developer'   },
    ];

    const navItems = links.map(({ href, label, key }) => {
      const active = currentPage === key ? ' nav-active' : '';
      return `<a class="${linkClass}${active}" href="${href}">${label}</a>`;
    }).join('');

    const pillTarget = currentPage === 'occidental' ? `${root}oriental.html`
                     : currentPage === 'oriental'   ? `${root}occidental.html`
                     : `${root}occidental.html`;

    const pillLabel  = currentPage === 'occidental' ? 'Oriental →'
                     : currentPage === 'oriental'   ? '← Occidental'
                     : 'Explore ↗';

    return `${navItems}<a href="${pillTarget}" class="nav-pill">${pillLabel}</a>`;
  }

})();