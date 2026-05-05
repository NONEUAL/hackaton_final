'use strict';

(function () {
  if (document.getElementById('mainNav')) return;

  const body = document.body;
  const theme = body.dataset.theme || '';
  const page = body.dataset.page || '';
  const rootPath = body.dataset.root || ''; // Should be "" for index and "../" for pages/

  const navClass = theme === 'oriental' ? 'nav-ori' : theme === 'occidental' ? 'nav-occ' : 'nav-neg';

  const navHTML = `
<nav class="navbar navbar-expand-lg ${navClass}" id="mainNav" aria-label="Main navigation">
  <div class="container d-flex align-items-center justify-content-between">

    <a class="nav-brand" href="${rootPath}index.html">NEG<span>ROS</span></a>

    <button class="navbar-toggler ms-auto" type="button"
            data-bs-toggle="collapse" data-bs-target="#navMenu"
            aria-controls="navMenu" aria-expanded="false"
            aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navMenu">
      <div class="navbar-nav ms-auto align-items-lg-center gap-lg-4 pt-3 pt-lg-0">
        ${buildNavLinks(rootPath, page, theme)}
      </div>
    </div>

  </div>
</nav>`;

  document.body.insertAdjacentHTML('afterbegin', navHTML);

  // Footer Logic... (Keep as is, but ensure rootPath is used)
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
            <a href="${rootPath}pages/where-to-go.html" class="footer-link">Where to Go</a>
            <a href="${rootPath}pages/what-to-buy.html" class="footer-link">What to Buy</a>
            <a href="${rootPath}pages/festivals.html"   class="footer-link">Festivals</a>
          </div>
          <div class="col-lg-2 col-6">
            <span class="footer-label">Region</span>
            <a href="${rootPath}occidental.html" class="footer-link">Negros Occidental</a>
            <a href="${rootPath}oriental.html" class="footer-link">Negros Oriental</a>
          </div>
          <div class="col-lg-4">
             ${buildFooterCTA(theme, rootPath)}
          </div>
        </div>
        <hr class="footer-divider">
        <p class="footer-copy">© 2026 Gabriel Velasquez. IT 210 Final Project.</p>
      </div>
    </footer>`;
    document.body.insertAdjacentHTML('beforeend', footerHTML);
  }

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

    // Dynamic Pill
    let pill = '';
    if (currentPage === 'occidental') pill = `<a href="${root}oriental.html" class="nav-pill">Oriental →</a>`;
    else if (currentPage === 'oriental') pill = `<a href="${root}occidental.html" class="nav-pill">← Occidental</a>`;
    else pill = `<a href="${root}occidental.html" class="nav-pill">Explore ↗</a>`;

    return html + pill;
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
          You've seen the sea. Now discover the haciendas, the sugarcane fields, and the city that smiles.
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