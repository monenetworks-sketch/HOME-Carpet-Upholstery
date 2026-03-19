/* ===================================================
   @Home Carpet & Upholstery Cleaning — JavaScript
   =================================================== */

// ---- Navbar: scroll effect + hamburger ----
const navbar   = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ---- Active nav link highlight on scroll ----
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 100;
  sections.forEach(sec => {
    const top    = sec.offsetTop;
    const height = sec.offsetHeight;
    const id     = sec.getAttribute('id');
    const link   = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      link.classList.toggle('active', scrollY >= top && scrollY < top + height);
    }
  });
});

// ---- Scroll-reveal (fade-up) ----
const observerOptions = { threshold: 0.12, rootMargin: '0px 0px -40px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Apply fade-up to key elements
const animateTargets = [
  '.why-card',
  '.service-card',
  '.ba-card',
  '.note-card',
  '.contact-card',
  '.channel-btn',
  '.section-header',
  '.info-content',
  '.pricing-table-container',
  '.quote-form-section',
];

animateTargets.forEach(selector => {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.classList.add('fade-up');
    el.style.transitionDelay = `${i * 80}ms`;
    observer.observe(el);
  });
});

// ---- Pricing table row highlight ----
document.querySelectorAll('.pricing-table tbody tr').forEach(row => {
  row.addEventListener('mouseenter', () => {
    row.style.cursor = 'default';
  });
});

// ---- Quote form submission ----
const quoteForm    = document.getElementById('quoteForm');
const formSuccess  = document.getElementById('formSuccess');

if (quoteForm) {
  quoteForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = document.getElementById('name').value.trim();
    const phone   = document.getElementById('phone').value.trim();
    const service = document.getElementById('service').value;
    const location = document.getElementById('location').value.trim();
    const message = document.getElementById('message').value.trim();

    // Build WhatsApp message and open it
    const waText = encodeURIComponent(
      `Hi! I'd like to request a quote.\n\n` +
      `*Name:* ${name}\n` +
      `*Phone:* ${phone}\n` +
      `*Service:* ${service}\n` +
      `*Location:* ${location || 'Not specified'}\n` +
      `*Details:* ${message || 'None'}`
    );

    window.open(`https://wa.me/27676774959?text=${waText}`, '_blank');

    // Show success message
    quoteForm.style.display = 'none';
    formSuccess.classList.add('visible');
  });
}

// ---- Smooth scroll for anchor links ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 75;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ---- Pricing table: animate price numbers on scroll ----
function animatePrice(el) {
  const target  = parseInt(el.textContent.replace(/\D/g, ''), 10);
  const duration = 800;
  const start   = performance.now();

  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = 'R' + Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = 'R' + target;
  };
  requestAnimationFrame(step);
}

const priceObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.price').forEach(animatePrice);
      priceObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const pricingTable = document.querySelector('.pricing-table');
if (pricingTable) priceObserver.observe(pricingTable);
