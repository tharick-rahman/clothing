import { mountLayout } from "./layout.js";
import { PRODUCTS, findProduct } from "./data.js";
import { addToCart, getCartCount, readCart, removeFromCart, setCartQty, clearCart } from "./cart.js";

function money(paise){
  const v = Number(paise) || 0;
  return "₹" + (v / 100).toFixed(2);
}

function setCartBadges(){
  const count = getCartCount();
  document.querySelectorAll("[data-cart-badge]").forEach(el => {
    if (count > 0) el.setAttribute("data-count", String(count));
    else el.removeAttribute("data-count");
  });
  document.querySelectorAll("[data-cart-count]").forEach(el => {
    el.textContent = String(count);
  });
}

function toast(message){
  const t = document.createElement("div");
  t.style.position = "fixed";
  t.style.left = "50%";
  t.style.bottom = "20px";
  t.style.transform = "translateX(-50%)";
  t.style.zIndex = "120";
  t.style.padding = "12px 14px";
  t.style.borderRadius = "16px";
  t.style.background = "rgba(255,255,255,.08)";
  t.style.border = "1px solid rgba(255,255,255,.14)";
  t.style.backdropFilter = "blur(12px)";
  t.style.boxShadow = "0 18px 50px rgba(0,0,0,.45)";
  t.style.color = "rgba(242,243,255,.92)";
  t.style.fontWeight = "800";
  t.style.letterSpacing = ".1px";
  t.style.opacity = "0";
  t.style.transition = "opacity .18s ease, transform .18s ease";
  t.textContent = message;
  document.body.appendChild(t);
  requestAnimationFrame(() => {
    t.style.opacity = "1";
    t.style.transform = "translateX(-50%) translateY(-2px)";
  });
  setTimeout(() => {
    t.style.opacity = "0";
    t.style.transform = "translateX(-50%) translateY(8px)";
    setTimeout(() => t.remove(), 220);
  }, 1200);
}

function initNav(){
  const menu = document.querySelector("[data-menu]");
  const toggle = document.querySelector("[data-nav-toggle]");
  const closeEls = document.querySelectorAll("[data-nav-close]");
  const toggleIcon = toggle ? toggle.querySelector(".icon") : null;

  function open(){
    document.body.classList.add("nav-open");
    if (menu){
      menu.hidden = false;
      menu.style.display = "block";
    }
    if (toggle) toggle.setAttribute("aria-expanded", "true");
    if (toggleIcon){
      toggleIcon.classList.remove("icon--menu");
      toggleIcon.classList.add("icon--close");
    }
  }
  function close(){
    document.body.classList.remove("nav-open");
    if (menu){
      menu.hidden = true;
      menu.style.display = "";
    }
    if (toggle) toggle.setAttribute("aria-expanded", "false");
    if (toggleIcon){
      toggleIcon.classList.remove("icon--close");
      toggleIcon.classList.add("icon--menu");
    }
  }

  if (toggle){
    toggle.addEventListener("click", () => {
      if (document.body.classList.contains("nav-open")) close();
      else open();
    });
  }
  closeEls.forEach(el => el.addEventListener("click", close));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
  // close after clicking a menu link (but not the home trigger)
  document.querySelectorAll(".menu__links a").forEach(a => a.addEventListener("click", close));
}

function initHomeDropdown(){
  const item = document.querySelector(".nav__item--has-menu");
  if (!item) return;
  const trigger = item.querySelector("[data-home-menu-toggle]");
  const menu = item.querySelector("[data-home-menu]");
  if (!trigger || !menu) return;

  function close(){
    item.classList.remove("nav__item--open");
    trigger.setAttribute("aria-expanded", "false");
  }
  function toggle(){
    const open = item.classList.toggle("nav__item--open");
    trigger.setAttribute("aria-expanded", open ? "true" : "false");
  }

  trigger.addEventListener("click", (e) => {
    e.stopPropagation();
    toggle();
  });

  document.addEventListener("click", (e) => {
    if (!item.contains(e.target)){
      close();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
}

function initMobileHomeDropdown(){
  const item = document.querySelector(".menu__item--has-submenu");
  if (!item) return;
  const trigger = item.querySelector("[data-mobile-home-toggle]");
  const submenu = item.querySelector("[data-mobile-home-menu]");
  if (!trigger || !submenu) return;

  function toggle(){
    const isExpanded = trigger.getAttribute("aria-expanded") === "true";
    trigger.setAttribute("aria-expanded", !isExpanded ? "true" : "false");
    if (!isExpanded){
      submenu.hidden = false;
      submenu.style.display = "flex";
    } else {
      submenu.hidden = true;
      submenu.style.display = "";
    }
  }

  trigger.addEventListener("click", (e) => {
    e.preventDefault();
    toggle();
  });
}

function initReveal(){
  const items = Array.from(document.querySelectorAll("[data-reveal]"));
  if (!items.length) return;
  const obs = new IntersectionObserver((entries) => {
    for (const e of entries){
      if (e.isIntersecting){
        e.target.classList.add("is-visible");
        obs.unobserve(e.target);
      }
    }
  }, { threshold: 0.16 });
  items.forEach(el => obs.observe(el));
}

function renderProducts(){
  const grid = document.getElementById("productGrid");
  if (!grid) return;

  grid.innerHTML = PRODUCTS.map(p => `
    <article class="product-card" data-reveal>
      <div class="product-media">
        <span class="product-badge">${p.tag}</span>
        <img src="${p.img}" alt="${p.alt}">
      </div>
      <div class="product-body">
        <div class="product-top">
          <div>
            <h3 class="product-name">${p.name}</h3>
            <p class="product-desc">${p.desc}</p>
          </div>
          <div class="price">${money(p.price)}</div>
        </div>
        <div class="sizes" aria-label="Sizes">
          ${p.sizes.map(s => `<span class="size" data-size>${s}</span>`).join("")}
        </div>
        <div class="product-actions">
          <button class="btn btn--primary" type="button" data-add-to-cart data-id="${p.id}">Add to cart</button>
          <a class="btn btn--ghost" href="cart.html">View cart</a>
        </div>
      </div>
    </article>
  `).join("");

  initReveal();
}

function renderFeatured(){
  const grid = document.getElementById("featuredGrid");
  if (!grid) return;
  const picks = PRODUCTS.slice(0, 6);
  grid.innerHTML = picks.map(p => `
    <article class="product-card" data-reveal>
      <div class="product-media">
        <span class="product-badge">${p.tag}</span>
        <img src="${p.img}" alt="${p.alt}">
      </div>
      <div class="product-body">
        <div class="product-top">
          <div>
            <h3 class="product-name">${p.name}</h3>
            <p class="product-desc">${p.desc}</p>
          </div>
          <div class="price">${money(p.price)}</div>
        </div>
        <div class="product-actions">
          <button class="btn btn--primary" type="button" data-add-to-cart data-id="${p.id}">Add to cart</button>
          <a class="btn btn--ghost" href="products.html">Shop</a>
        </div>
      </div>
    </article>
  `).join("");
  initReveal();
}

function initAddToCart(){
  document.addEventListener("click", (e) => {
    const btn = e.target instanceof Element ? e.target.closest("[data-add-to-cart]") : null;
    if (!btn) return;
    const id = btn.getAttribute("data-id");
    if (!id) return;
    const product = findProduct(id);
    if (!product) return;
    addToCart({ id: product.id, size: product.sizes?.[0] || "Default", qty: 1 });
    setCartBadges();
    toast("Added to cart");
  });
}

function renderCartPage(){
  const host = document.getElementById("cartItems");
  const summaryHost = document.getElementById("cartSummary");
  if (!host || !summaryHost) return;

  const cart = readCart();
  if (!cart.length){
    host.innerHTML = `
      <div class="panel__body">
        <p class="muted" style="margin:0 0 14px">Your cart is empty. Start building a look you love.</p>
        <a class="btn btn--primary" href="products.html">Shop products</a>
      </div>
    `;
    summaryHost.innerHTML = `
      <div class="summary">
        <div class="row"><span>Subtotal</span><small>₹0.00</small></div>
        <div class="row"><span>Shipping</span><small>₹0.00</small></div>
        <div class="row total"><b>Total</b><b>₹0.00</b></div>
        <button class="btn btn--primary" type="button" disabled>Checkout</button>
      </div>
    `;
    return;
  }

  const rows = cart.map(it => {
    const p = findProduct(it.id);
    if (!p) return null;
    const line = (Number(p.price) || 0) * (Number(it.qty) || 1);
    return { ...it, p, line };
  }).filter(Boolean);

  const subtotal = rows.reduce((s, r) => s + r.line, 0);
  const shipping = subtotal >= 149900 ? 0 : 9900; // ₹1499 free delivery rule
  const total = subtotal + shipping;

  host.innerHTML = `
    <div class="panel__body">
      ${rows.map(r => `
        <div class="cart-item">
          <div class="thumb"><img src="${r.p.img}" alt="${r.p.alt}"></div>
          <div>
            <p class="ci-title">${r.p.name}</p>
            <p class="ci-meta">Color: <b>${r.p.color}</b> • Size: <b>${r.size}</b></p>
            <div class="qty" aria-label="Quantity controls">
              <button type="button" data-qty-minus data-id="${r.id}" data-size="${r.size}" aria-label="Decrease">−</button>
              <input type="text" inputmode="numeric" value="${r.qty}" aria-label="Quantity" data-qty-input data-id="${r.id}" data-size="${r.size}">
              <button type="button" data-qty-plus data-id="${r.id}" data-size="${r.size}" aria-label="Increase">+</button>
            </div>
          </div>
          <div class="ci-right">
            <div class="price">${money(r.line)}</div>
            <button class="link-danger" type="button" data-remove data-id="${r.id}" data-size="${r.size}">Remove</button>
          </div>
        </div>
      `).join("")}
    </div>
  `;

  summaryHost.innerHTML = `
    <div class="summary">
      <div class="row"><span>Subtotal</span><small>${money(subtotal)}</small></div>
      <div class="row"><span>Shipping</span><small>${shipping === 0 ? "Free" : money(shipping)}</small></div>
      <div class="row total"><b>Total</b><b>${money(total)}</b></div>
      <button class="btn btn--primary" type="button" data-checkout>Checkout</button>
      <button class="btn btn--ghost" type="button" data-clear>Clear cart</button>
    </div>
  `;
}

function initCartInteractions(){
  const host = document.getElementById("cartItems");
  const summaryHost = document.getElementById("cartSummary");
  if (!host || !summaryHost) return;

  document.addEventListener("click", (e) => {
    const el = e.target instanceof Element ? e.target : null;
    if (!el) return;

    const minus = el.closest("[data-qty-minus]");
    const plus = el.closest("[data-qty-plus]");
    const remove = el.closest("[data-remove]");
    const clear = el.closest("[data-clear]");
    const checkout = el.closest("[data-checkout]");

    if (minus){
      const id = minus.getAttribute("data-id");
      const size = minus.getAttribute("data-size");
      const it = readCart().find(x => x.id === id && x.size === size);
      if (it) setCartQty({ id, size, qty: Math.max(1, (Number(it.qty) || 1) - 1) });
      renderCartPage(); setCartBadges();
    }
    if (plus){
      const id = plus.getAttribute("data-id");
      const size = plus.getAttribute("data-size");
      const it = readCart().find(x => x.id === id && x.size === size);
      if (it) setCartQty({ id, size, qty: Math.min(99, (Number(it.qty) || 1) + 1) });
      renderCartPage(); setCartBadges();
    }
    if (remove){
      const id = remove.getAttribute("data-id");
      const size = remove.getAttribute("data-size");
      removeFromCart({ id, size });
      renderCartPage(); setCartBadges();
      toast("Removed");
    }
    if (clear){
      clearCart();
      renderCartPage(); setCartBadges();
      toast("Cart cleared");
    }
    if (checkout){
      toast("Checkout demo (connect payment later)");
    }
  });

  document.addEventListener("change", (e) => {
    const el = e.target;
    if (!(el instanceof HTMLInputElement)) return;
    if (!el.matches("[data-qty-input]")) return;
    const id = el.getAttribute("data-id");
    const size = el.getAttribute("data-size");
    setCartQty({ id, size, qty: Number(el.value) || 1 });
    renderCartPage(); setCartBadges();
  });
}

function initNewsletter(){
  document.addEventListener("submit", (e) => {
    const form = e.target;
    if (!(form instanceof HTMLFormElement)) return;
    if (!form.matches("[data-newsletter]")) return;
    e.preventDefault();
    form.reset();
    toast("Welcome to the drop list");
  });
}

function initContactForm(){
  const form = document.getElementById("contactForm");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    form.reset();
    toast("Message sent (demo)");
  });
}

function initHeroSlider(){
  const sliders = Array.from(document.querySelectorAll(".js-hero-slider"));
  sliders.forEach(slider => {
    const slides = Array.from(slider.querySelectorAll(".slider__slide"));
    if (slides.length === 0) return;
    const dotsHost = slider.querySelector(".slider__dots");
    const prevBtn = slider.querySelector(".slider__btn--prev");
    const nextBtn = slider.querySelector(".slider__btn--next");
    let index = 0;
    let timer = null;

    function setActive(newIndex){
      index = (newIndex + slides.length) % slides.length;
      slides.forEach((s, i) => {
        s.classList.toggle("is-active", i === index);
      });
      if (dotsHost){
        const dots = Array.from(dotsHost.querySelectorAll(".slider__dot"));
        dots.forEach((d, i) => d.classList.toggle("is-active", i === index));
      }
    }

    function next(){ setActive(index + 1); }
    function prev(){ setActive(index - 1); }

    function startAuto(){
      stopAuto();
      timer = window.setInterval(next, 6000);
    }
    function stopAuto(){
      if (timer != null){
        window.clearInterval(timer);
        timer = null;
      }
    }

    // dots
    if (dotsHost){
      dotsHost.innerHTML = "";
      slides.forEach((_, i) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "slider__dot" + (i === 0 ? " is-active" : "");
        b.setAttribute("aria-label", "Go to slide " + (i + 1));
        b.addEventListener("click", () => {
          setActive(i);
          startAuto();
        });
        dotsHost.appendChild(b);
      });
    }

    if (prevBtn) prevBtn.addEventListener("click", () => { prev(); startAuto(); });
    if (nextBtn) nextBtn.addEventListener("click", () => { next(); startAuto(); });

    slider.addEventListener("mouseenter", stopAuto);
    slider.addEventListener("mouseleave", startAuto);
    slider.addEventListener("touchstart", stopAuto, { passive: true });
    slider.addEventListener("touchend", startAuto);

    setActive(0);
    startAuto();
  });
}

// Boot
mountLayout();
initNav();
initHomeDropdown();
initMobileHomeDropdown();
initAddToCart();
renderFeatured();
renderProducts();
renderCartPage();
initCartInteractions();
initReveal();
initNewsletter();
initContactForm();
initHeroSlider();
setCartBadges();

