document.addEventListener('DOMContentLoaded', () => {

  /* NAV SCROLL */
  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', () => {
    nav?.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  /* ACTIVE LINK */
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });

  /* HAMBURGER */
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  hamburger?.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    mobileMenu?.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  mobileMenu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    hamburger?.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }));

  /* SCROLL REVEAL */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    revealEls.forEach(el => obs.observe(el));
  }

  /* TICKER DUPLICATE */
  const ticker = document.querySelector('.ticker-track');
  if (ticker) ticker.innerHTML += ticker.innerHTML;

  /* SERVICE CARD → PREFILL CONTACT FORM */
  // Works across pages: service cards store data-service attr, clicking navigates to contact with ?service=X
  document.querySelectorAll('[data-service]').forEach(el => {
    el.addEventListener('click', () => {
      const svc = el.dataset.service;
      if (svc) window.location.href = `contact.html?service=${encodeURIComponent(svc)}`;
    });
  });

  /* PREFILL FROM URL on contact page */
  const serviceSelect = document.getElementById('service');
  if (serviceSelect) {
    const params = new URLSearchParams(window.location.search);
    const svc = params.get('service');
    if (svc) {
      Array.from(serviceSelect.options).forEach(opt => {
        if (opt.value === svc || opt.text === svc) {
          opt.selected = true;
          serviceSelect.value = opt.value;
        }
      });
    }
  }

  /* CONTACT FORM */
  const form = document.querySelector('.contact-form');
  form?.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Message Sent';
    btn.disabled = true;
    btn.style.background = '#1a7a3a';
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.disabled = false;
      btn.style.background = '';
      form.reset();
    }, 4000);
  });

});
