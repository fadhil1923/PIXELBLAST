/* =============================================
   PIXELBLAST — app.js
   Interactive JavaScript for the website
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ===== NAVBAR SCROLL EFFECT =====
  const navbar = document.getElementById('navbar');
  const topbar = document.getElementById('topbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
      topbar.style.display = 'none';
    } else {
      navbar.classList.remove('scrolled');
      topbar.style.display = '';
    }
  });

  // ===== MOBILE HAMBURGER MENU =====
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  let menuOpen = false;
  hamburger.addEventListener('click', () => {
    menuOpen = !menuOpen;
    navLinks.style.display = menuOpen ? 'flex' : '';
    if (menuOpen) {
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '72px';
      navLinks.style.left = '0';
      navLinks.style.right = '0';
      navLinks.style.background = 'rgba(10,10,10,0.98)';
      navLinks.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
      navLinks.style.padding = '1rem 2rem 1.5rem';
    } else {
      navLinks.style.display = '';
    }
  });

  // ===== COUNTER ANIMATION =====
  function animateCounter(el, target, suffix = '', duration = 2000) {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        start = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(start).toLocaleString('id-ID') + suffix;
    }, 16);
  }

  // Observe hero widget counters
  const countSold = document.getElementById('count-sold');
  const countMembers = document.getElementById('count-members');
  let heroCounterDone = false;
  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !heroCounterDone) {
        heroCounterDone = true;
        animateCounter(countSold, 10500, '+');
        animateCounter(countMembers, 8240, '+');
      }
    });
  }, { threshold: 0.3 });
  if (countSold) heroObserver.observe(countSold);

  // Promo Banner Counters
  const statProducts = document.getElementById('stat-products');
  const statCustomers = document.getElementById('stat-customers');
  const statCities = document.getElementById('stat-cities');
  let bannerCounterDone = false;
  const bannerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !bannerCounterDone) {
        bannerCounterDone = true;
        if (statProducts) animateCounter(statProducts, 182, '+');
        if (statCustomers) animateCounter(statCustomers, 10500, '+');
        if (statCities) animateCounter(statCities, 34, '+');
      }
    });
  }, { threshold: 0.3 });
  const promoBanner = document.getElementById('promo-banner');
  if (promoBanner) bannerObserver.observe(promoBanner);

  // ===== COUNTDOWN TIMER =====
  function startCountdown(hours, minutes, seconds) {
    let total = hours * 3600 + minutes * 60 + seconds;
    const hEl = document.getElementById('cnt-h');
    const mEl = document.getElementById('cnt-m');
    const sEl = document.getElementById('cnt-s');
    function update() {
      if (total <= 0) { clearInterval(timer); return; }
      total--;
      const h = Math.floor(total / 3600);
      const m = Math.floor((total % 3600) / 60);
      const s = total % 60;
      if (hEl) hEl.textContent = String(h).padStart(2, '0');
      if (mEl) mEl.textContent = String(m).padStart(2, '0');
      if (sEl) sEl.textContent = String(s).padStart(2, '0');
    }
    update();
    const timer = setInterval(update, 1000);
  }
  startCountdown(8, 24, 0);

  // ===== PRODUCTS SLIDER =====
  const slider = document.getElementById('products-slider');
  const prevBtn = document.getElementById('slide-prev');
  const nextBtn = document.getElementById('slide-next');
  const dots = document.querySelectorAll('.dot');
  let currentSlide = 0;
  let itemsPerSlide = 4;

  function getItemsPerSlide() {
    if (window.innerWidth <= 600) return 1;
    if (window.innerWidth <= 900) return 2;
    if (window.innerWidth <= 1200) return 3;
    return 4;
  }

  function updateSlider() {
    if (!slider) return;
    itemsPerSlide = getItemsPerSlide();
    const cards = slider.querySelectorAll('.product-card');
    const maxSlide = Math.max(0, cards.length - itemsPerSlide);
    currentSlide = Math.min(currentSlide, maxSlide);
    const cardWidth = cards[0] ? cards[0].offsetWidth + 20 : 0;
    slider.style.transform = `translateX(-${currentSlide * cardWidth}px)`;

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const cards = slider.querySelectorAll('.product-card');
      const maxSlide = Math.max(0, cards.length - getItemsPerSlide());
      currentSlide = currentSlide < maxSlide ? currentSlide + 1 : 0;
      updateSlider();
    });
  }
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const cards = slider.querySelectorAll('.product-card');
      const maxSlide = Math.max(0, cards.length - getItemsPerSlide());
      currentSlide = currentSlide > 0 ? currentSlide - 1 : maxSlide;
      updateSlider();
    });
  }
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      currentSlide = i;
      updateSlider();
    });
  });
  window.addEventListener('resize', updateSlider);

  // ===== FILTER TABS =====
  const filterTabs = document.querySelectorAll('.filter-tab');
  const productCards = document.querySelectorAll('.product-card');
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.filter;
      productCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = '';
          card.style.opacity = '0';
          setTimeout(() => { card.style.transition = 'opacity 0.4s'; card.style.opacity = '1'; }, 50);
        } else {
          card.style.display = 'none';
        }
      });
      currentSlide = 0;
      setTimeout(updateSlider, 100);
    });
  });

  // ===== CART SYSTEM =====
  const cartBtn = document.getElementById('cart-btn');
  const cartSidebar = document.getElementById('cart-sidebar');
  const cartOverlay = document.getElementById('cart-overlay');
  const cartClose = document.getElementById('cart-close');
  const cartCount = document.getElementById('cart-count');
  const cartItems = document.getElementById('cart-items');
  const cartEmpty = document.getElementById('cart-empty');
  const cartFooter = document.getElementById('cart-footer');
  const cartTotalPrice = document.getElementById('cart-total-price');

  let cart = [];

  const products = {
    'add-cart-1': { name: 'Urban Chaos Oversized Hoodie', price: 289000, img: 'C:\\Users\\ASUS\\.gemini\\antigravity-ide\\brain\\f0542c92-bd3f-41d3-a2cf-9fc07616fc12\\product_hoodie_1787761455996.jpg' },
    'add-cart-2': { name: 'Praja Tiger Graphic Tee', price: 159000, img: 'C:\\Users\\ASUS\\.gemini\\antigravity-ide\\brain\\f0542c92-bd3f-41d3-a2cf-9fc07616fc12\\product_tshirt_1787761472445.jpg' },
    'add-cart-3': { name: 'Orbit Outdoor Cargo Jacket', price: 459000, img: 'C:\\Users\\ASUS\\.gemini\\antigravity-ide\\brain\\f0542c92-bd3f-41d3-a2cf-9fc07616fc12\\product_jacket_1787761485609.jpg' },
    'add-cart-4': { name: 'Night Archive Cargo Pants', price: 329000, img: 'C:\\Users\\ASUS\\.gemini\\antigravity-ide\\brain\\f0542c92-bd3f-41d3-a2cf-9fc07616fc12\\product_pants_1787761501135.jpg' },
    'add-cart-5': { name: 'Archive Vol.01 Pullover Hoodie', price: 259000, img: 'C:\\Users\\ASUS\\.gemini\\antigravity-ide\\brain\\f0542c92-bd3f-41d3-a2cf-9fc07616fc12\\product_pants_1787761501135.jpg' },
  };

  function openCart() {
    cartSidebar.classList.add('open');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeCart() {
    cartSidebar.classList.remove('open');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (cartBtn) cartBtn.addEventListener('click', openCart);
  if (cartClose) cartClose.addEventListener('click', closeCart);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

  function renderCart() {
    if (!cartItems) return;
    if (cart.length === 0) {
      cartEmpty.style.display = 'block';
      cartFooter.style.display = 'none';
      cartCount.textContent = '0';
      return;
    }
    cartEmpty.style.display = 'none';
    cartFooter.style.display = 'block';

    // Remove non-empty items
    const existing = cartItems.querySelectorAll('.cart-item');
    existing.forEach(el => el.remove());

    let total = 0;
    cart.forEach((item, index) => {
      total += item.price;
      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
        <img src="${item.img}" alt="${item.name}" class="cart-item-img" onerror="this.style.background='#1e1e1e';this.style.display='block';this.style.width='70px';this.style.height='90px'" />
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">Rp ${item.price.toLocaleString('id-ID')}</div>
        </div>
        <button class="cart-item-remove" data-index="${index}" title="Hapus dari keranjang">✕</button>
      `;
      cartItems.appendChild(div);
    });

    cartTotalPrice.textContent = 'Rp ' + total.toLocaleString('id-ID');
    cartCount.textContent = String(cart.length);

    cartItems.querySelectorAll('.cart-item-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        cart.splice(Number(btn.dataset.index), 1);
        renderCart();
        if (cart.length === 0) cartCount.textContent = '0';
      });
    });
  }

  Object.keys(products).forEach(btnId => {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    btn.addEventListener('click', (e) => {
      cart.push(products[btnId]);
      renderCart();
      // Animate button
      const orig = btn.textContent;
      btn.textContent = '✓ Ditambahkan!';
      btn.style.background = '#22c55e';
      btn.style.color = '#fff';
      btn.style.borderColor = '#22c55e';
      setTimeout(() => {
        btn.textContent = orig;
        btn.style.background = '';
        btn.style.color = '';
        btn.style.borderColor = '';
      }, 1500);
      openCart();
    });
  });

  // Cart shop btn inside empty cart
  const cartShopBtn = document.getElementById('cart-shop-btn');
  if (cartShopBtn) cartShopBtn.addEventListener('click', closeCart);

  // Checkout btn
  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      alert('Fitur checkout akan segera hadir! Terima kasih sudah memilih PIXELBLAST. 🧡');
    });
  }

  // ===== BACK TO TOP =====
  const backTop = document.getElementById('back-top');
  window.addEventListener('scroll', () => {
    if (backTop) {
      if (window.scrollY > 400) {
        backTop.classList.add('visible');
      } else {
        backTop.classList.remove('visible');
      }
    }
  });
  if (backTop) {
    backTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ===== INTERSECTION OBSERVER — FADE IN =====
  const fadeEls = document.querySelectorAll(
    '.cat-card, .product-card, .review-card, .widget-card, .section-header'
  );
  const ioOptions = { threshold: 0.15, rootMargin: '0px 0px -40px 0px' };
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 60);
        io.unobserve(entry.target);
      }
    });
  }, ioOptions);
  fadeEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    io.observe(el);
  });

  // Rating bar animation
  const ratingBars = document.querySelectorAll('.or-bar');
  const ratingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // bars are already set via inline style, just trigger the transition
        ratingObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  ratingBars.forEach(bar => {
    const target = bar.style.width;
    bar.style.width = '0%';
    ratingObserver.observe(bar);
    setTimeout(() => { bar.style.width = target; }, 500);
  });

  // ===== NEWSLETTER FORM =====
  const nlForm = document.getElementById('nl-form');
  if (nlForm) {
    nlForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('nl-email');
      const submitBtn = document.getElementById('nl-submit');
      if (emailInput && emailInput.value) {
        const orig = submitBtn.textContent;
        submitBtn.textContent = '✓ BERHASIL!';
        submitBtn.style.background = '#22c55e';
        emailInput.value = '';
        setTimeout(() => {
          submitBtn.textContent = orig;
          submitBtn.style.background = '';
        }, 3000);
      }
    });
  }

  // ===== SEARCH FUNCTIONALITY =====
  const searchInput = document.getElementById('search-input');
  const searchBtn = document.getElementById('search-btn');
  if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', () => {
      const q = searchInput.value.trim();
      if (q) {
        alert(`Mencari: "${q}"\nFitur pencarian penuh akan segera hadir!`);
      }
    });
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') searchBtn.click();
    });
  }

  // ===== SMOOTH SCROLL FOR NAV LINKS =====
  document.querySelectorAll('.nav-link, .hero-cta-group a').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Close mobile menu if open
          if (menuOpen) {
            menuOpen = false;
            navLinks.style.display = '';
          }
        }
      }
    });
  });

  // ===== ACTIVE NAV LINK ON SCROLL =====
  const sections = document.querySelectorAll('section[id]');
  const navLinkEls = document.querySelectorAll('.nav-link');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const offset = section.offsetTop - 120;
      if (window.scrollY >= offset) current = section.getAttribute('id');
    });
    navLinkEls.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // ===== WISHLIST BUTTONS =====
  document.querySelectorAll('.wishlist-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const svg = btn.querySelector('svg');
      if (svg) {
        const filled = btn.dataset.wishlisted === 'true';
        if (!filled) {
          svg.style.fill = '#f97316';
          svg.style.stroke = '#f97316';
          btn.dataset.wishlisted = 'true';
          btn.style.background = 'rgba(249,115,22,0.2)';
        } else {
          svg.style.fill = 'none';
          svg.style.stroke = 'currentColor';
          btn.dataset.wishlisted = 'false';
          btn.style.background = '';
        }
      }
    });
  });

  // ===== PARALLAX HERO =====
  window.addEventListener('scroll', () => {
    const heroImg = document.getElementById('hero-img');
    if (heroImg && window.scrollY < window.innerHeight) {
      heroImg.style.transform = `scale(1.05) translateY(${window.scrollY * 0.3}px)`;
    }
  });

  console.log('%c PIXELBLAST — SOLO · EST. 2025 ', 'background:#f97316;color:#fff;font-size:14px;font-weight:bold;padding:6px 12px;border-radius:4px;');
});
