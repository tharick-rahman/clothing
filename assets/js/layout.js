export function mountLayout(){
  const headerHost = document.getElementById("site-header");
  const footerHost = document.getElementById("site-footer");
  const menuHost = document.getElementById("menu-root");

  if (headerHost){
    headerHost.innerHTML = `
      <div class="announce">
        <div class="announce__inner">
          <div class="pill">
            <span class="dot"></span>
            <span><b>Free delivery</b> above ₹1499 • Easy exchanges</span>
          </div>
          <div class="ticker" aria-label="Live offers">
            <div class="ticker__track">
              <span>50% OFF on selected styles • </span>
              <span>Free shipping above ₹1499 • </span>
              <span>New drops every week • </span>
              <span>Premium fabrics • Clean fits • </span>
            </div>
          </div>
        </div>
      </div>

      <header class="header">
        <div class="container">
          <nav class="nav" aria-label="Primary">
            <a class="brand brand--logo-only" href="index.html">
              <img class="brand__logo brand__logo--large" src="assets/img/stack logo.png" alt="Stackly Clothing">
            </a>

            <div class="nav__links" role="navigation" aria-label="Main links">
              <div class="nav__item nav__item--has-menu">
                <button class="nav__trigger" type="button" data-home-menu-toggle aria-expanded="false">
                  Home
                  <span class="nav__chevron" aria-hidden="true"></span>
                </button>
                <div class="nav__menu" data-home-menu>
                  <a href="index.html">Home1</a>
                  <a href="home2.html">Home2</a>
                </div>
              </div>
              <a href="products.html">Shop</a>
              <a href="cart.html">Cart</a>
              <a href="dash.html">Dashboard</a>
              <a href="about.html">About</a>
              <a href="service.html">Services</a>
              <a href="contact.html">Contact</a>
              <a href="login.html">Login</a>
            </div>

            <div class="nav__actions">
              <a class="icon-btn badge" href="cart.html" aria-label="Open cart" data-cart-badge>
                <span class="icon icon--cart" aria-hidden="true"></span>
              </a>
              <button class="icon-btn" type="button" aria-label="Open menu" data-nav-toggle aria-expanded="false">
                <span class="icon icon--menu" aria-hidden="true"></span>
              </button>
            </div>
          </nav>
        </div>
      </header>
    `;
  }

  if (menuHost){
    menuHost.innerHTML = `
      <div class="menu" role="dialog" aria-modal="true" aria-label="Mobile menu" hidden data-menu>
        <div class="menu__overlay" data-nav-close></div>
        <div class="menu__panel">
          <div class="menu__top">
            <a class="brand brand--logo-only" href="index.html">
              <img class="brand__logo brand__logo--large" src="assets/img/stack logo.png" alt="Stackly Clothing">
            </a>
           <button class="icon-btn" type="button" aria-label="Close menu" data-nav-close>
  ✕
</button>

          </div>

          <div class="menu__links">
            <div class="menu__item menu__item--has-submenu">
              <button class="menu__trigger" type="button" data-mobile-home-toggle aria-expanded="false">
                Home
                <span class="menu__chevron" aria-hidden="true">›</span>
              </button>
              <div class="menu__submenu" data-mobile-home-menu hidden>
                <a href="index.html">Home1</a>
                <a href="home2.html">Home2</a>
              </div>
            </div>
            <a href="products.html">Shop</a>
            <a href="cart.html">Cart</a>
            <a href="dash.html">Dashboard</a>
            <a href="about.html">About</a>
            <a href="service.html">Services</a>
            <a href="contact.html">Contact</a>
            <a href="login.html">Login</a>
          </div>

          <div class="menu__cta">
            <a class="btn btn--primary" href="products.html">Shop the new drop</a>
            <a class="btn btn--ghost" href="contact.html">Need help? Contact us</a>
            <div class="menu__note">
              When the menu is open, the page behind is hidden/locked (so only the hamburger menu is visible).
            </div>
          </div>
        </div>
      </div>
    `;
  }

  if (footerHost){
    footerHost.innerHTML = `
      <footer class="footer">
        <div class="container">
          <div class="footer__grid">
            <div>
              <div class="brand brand--logo-only" style="margin-bottom:10px">
                <img class="brand__logo brand__logo--large" src="assets/img/stack logo.png" alt="Stackly Clothing">
              </div>
              <p class="muted">
                Stackly Clothing is built for those who value style and comfort.
We combine premium quality fabrics with trend-driven designs.
Every piece is crafted with attention to detail and durability.

              </p>
              <div class="footer__social">
                <div class="social" aria-label="Social media">
                  <a class="social__link" href="404.html" aria-label="Instagram (demo)">
                    <span class="icon icon--insta" aria-hidden="true"></span>
                  </a>
                  <a class="social__link" href="404.html" aria-label="Facebook (demo)">
                    <span class="icon icon--facebook" aria-hidden="true"></span>
                  </a>
                  <a class="social__link" href="404.html" aria-label="YouTube (demo)">
                    <span class="icon icon--youtube" aria-hidden="true"></span>
                  </a>
                </div>
                <div class="app-buttons">
                  <a class="btn btn--ghost app-btn" href="404.html">Download our app on App Store</a>
                  <a class="btn btn--ghost app-btn" href="404.html">Get it on Play Store</a>
                </div>
              </div>
            </div>
            <div>
              <h4>Shop</h4>
              <div style="display:grid; gap:8px">
                <a href="products.html">All products</a>
                <a href="cart.html">Cart</a>
                <a href="service.html">Shipping & returns</a>
                <a href="contact.html">Contact</a>
                

              </div>
            </div>
            <div>
              <h4>Quick Links</h4>
              <div style="display:grid; gap:8px">
                <a href="about.html">About</a>
                <a href="dash.html">Dashboard</a>
                <a href="contact.html">Contact</a>
                <a href="service.html">Service</a>
              </div>
            </div>
            <div class="footer-newsletter">
  <h4 class="footer-title">Join Our Newsletter</h4>
  <p class="footer-subtext">Get exclusive drops, restocks, and style inspiration straight to your inbox.</p>

  <form class="newsletter" data-newsletter>
    <input class="newsletter-input" type="email" name="email" placeholder="Enter your email" required>
    <button class="newsletter-btn" type="submit">Subscribe</button>
  </form>

  <p class="footer-note">No spam. Unsubscribe anytime.</p>
</div>

          </div>

          <div class="copy">
            <span>© <span data-year></span> Stackly Clothing. All rights reserved.</span>
          
          </div>
        </div>
      </footer>
    `;
  }

  // Mark active link
  const file = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll('a[href]').forEach(a => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if (!href || href.startsWith("http") || href.startsWith("#")) return;
    if (href === file){
      a.setAttribute("aria-current", "page");
    }
  });

  const yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
}

