/* ========================================
   Urban Blue Project — main.js
   Lenis smooth scroll + GSAP animations
   ======================================== */

// ==========================================
// LENIS — Smooth Scrolling (desktop only)
// ==========================================
const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
let lenis = null;

if (isDesktop) {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Sync Lenis with GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

// ==========================================
// MOBILE NAVIGATION
// ==========================================
const hamburger = document.querySelector('.nav__hamburger');
const mobileMenu = document.querySelector('.nav__mobile');
const nav = document.querySelector('.nav');

// Nav glassmorphism enhancement on scroll
if (nav) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
}

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
  });

  // Close mobile menu when a link is clicked
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
    });
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(target, {
          offset: -88,
          duration: 1.8,
          easing: (t) => 1 - Math.pow(1 - t, 4),
        });
      } else {
        const y = target.getBoundingClientRect().top + window.pageYOffset - 88;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  });
});

// ==========================================
// GSAP — Register ScrollTrigger
// ==========================================
gsap.registerPlugin(ScrollTrigger);

// ==========================================
// HERO ORBS — Subtle floating animation
// ==========================================
gsap.utils.toArray('.hero__orb').forEach((orb, i) => {
  const duration = 8 + i * 2;
  const xRange = 15 + i * 5;
  const yRange = 12 + i * 4;
  gsap.to(orb, {
    x: `random(-${xRange}, ${xRange})`,
    y: `random(-${yRange}, ${yRange})`,
    scale: `random(0.95, 1.08)`,
    duration: duration,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
    delay: i * 0.5,
  });
});

// ==========================================
// HERO — Page Load Animation (not scroll-triggered)
// ==========================================
const heroTl = gsap.timeline({ delay: 0.2 });

heroTl
  .from('.hero-tag', {
    y: 20,
    opacity: 0,
    duration: 0.5,
    ease: 'power2.out'
  })
  .from('.hero-heading', {
    y: 30,
    opacity: 0,
    duration: 0.7,
    ease: 'power3.out'
  }, '-=0.2')
  .from('.hero-body', {
    y: 20,
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out'
  }, '-=0.3')
  .from('.hero-buttons', {
    y: 20,
    opacity: 0,
    duration: 0.5,
    ease: 'power2.out'
  }, '-=0.2')
  .from('.hero-image', {
    scale: 1.05,
    opacity: 0,
    duration: 1,
    ease: 'power2.out'
  }, '-=0.6');

// ==========================================
// FADE-UP REVEAL — Generic scroll animation
// ==========================================
gsap.utils.toArray('.reveal').forEach(el => {
  gsap.from(el, {
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: el,
      start: 'top 85%',
      toggleActions: 'play none none none'
    }
  });
});

// ==========================================
// STAGGERED CARD REVEALS — Card grids
// ==========================================
gsap.utils.toArray('.card-grid').forEach(grid => {
  gsap.from(grid, {
    y: 40,
    opacity: 0,
    duration: 0.7,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: grid,
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  });
});

// ==========================================
// SECTION HEADERS — Reveal on scroll
// ==========================================
gsap.utils.toArray('.section-header').forEach(header => {
  gsap.from(header, {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: header,
      start: 'top 85%',
      toggleActions: 'play none none none'
    }
  });
});

// ==========================================
// HERO FEATURES — Staggered reveal
// ==========================================
const heroFeaturesEl = document.querySelector('.hero__features-grid');
if (heroFeaturesEl) {
  gsap.from(heroFeaturesEl, {
    y: 30,
    opacity: 0,
    duration: 0.7,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.hero__features',
      start: 'top 85%',
      toggleActions: 'play none none none'
    }
  });
}

// ==========================================
// FORM CTA — Reveal
// ==========================================
const formWrapper = document.querySelector('.form-cta__wrapper');
if (formWrapper) {
  gsap.from(formWrapper, {
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: formWrapper,
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  });
}

// ==========================================
// FOOTER — Subtle reveal
// ==========================================
const footer = document.querySelector('.footer');
if (footer) {
  gsap.from(footer, {
    y: 20,
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: footer,
      start: 'top 90%',
      toggleActions: 'play none none none'
    }
  });
}

// ==========================================
// DIVIDERS — Grow in from left
// ==========================================
gsap.utils.toArray('.section-divider').forEach(divider => {
  gsap.from(divider, {
    scaleX: 0,
    transformOrigin: 'left center',
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: divider,
      start: 'top 90%',
      toggleActions: 'play none none none'
    }
  });
});

// FAQ accordion is handled by inline script in index.html

// ==========================================
// CONTACT FORM SUBMISSION (Formspark + Turnstile)
// ==========================================
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  const successEl = document.querySelector('.form__success');
  const errorEl = document.querySelector('.form__error');
  const submitBtn = contactForm.querySelector('button[type="submit"]');

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Hide any prior status messages
    if (successEl) successEl.style.display = 'none';
    if (errorEl) errorEl.style.display = 'none';

    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
      const formData = new FormData(contactForm);

      // Log what we're sending (diagnostic)
      const sentFields = {};
      for (const [k, v] of formData.entries()) {
        sentFields[k] = typeof v === 'string' && v.length > 80 ? v.slice(0, 80) + '...' : v;
      }
      console.log('[form] submitting fields:', sentFields);

      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      // Capture diagnostic info from Formspark
      const formsparkStatus = response.headers.get('formspark-status');
      const responseBody = await response.text();
      console.log('[form] HTTP status:', response.status);
      console.log('[form] formspark-status:', formsparkStatus);
      console.log('[form] response body:', responseBody);

      // Formspark returns 200 even when silently filtering submissions.
      // Treat anything other than formspark-status: "ok" or null/missing as a failure.
      const realSuccess = response.ok && formsparkStatus !== 'empty' && formsparkStatus !== 'spam';

      if (realSuccess) {
        contactForm.style.display = 'none';
        if (successEl) successEl.style.display = 'block';
      } else {
        // Surface the actual reason in the error UI so we can diagnose
        if (errorEl) {
          const debugLine = document.createElement('p');
          debugLine.style.cssText = 'margin-top:0.5rem;font-size:0.75rem;opacity:0.7;font-family:monospace;';
          debugLine.textContent = `[debug] HTTP ${response.status} · formspark-status: ${formsparkStatus || '(none)'} · body: ${responseBody.slice(0, 200)}`;
          // Remove any previous debug line before appending a fresh one
          const oldDebug = errorEl.querySelector('[data-debug]');
          if (oldDebug) oldDebug.remove();
          debugLine.setAttribute('data-debug', 'true');
          errorEl.querySelector('.form__message').appendChild(debugLine);
          errorEl.style.display = 'block';
        }
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
      }
    } catch (err) {
      console.error('[form] fetch error:', err);
      if (errorEl) errorEl.style.display = 'block';
      submitBtn.textContent = originalBtnText;
      submitBtn.disabled = false;
      if (window.turnstile) window.turnstile.reset();
    }
  });
}
