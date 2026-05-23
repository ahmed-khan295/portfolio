/* ============================================================
   MUHAMMAD AHMED KHAN — PORTFOLIO
   script.js  |  Navbar · Mobile Menu · Active Nav · Skill Bars
   ============================================================ */

'use strict';

// ── DOM refs ─────────────────────────────────────────────────
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
const navItems  = document.querySelectorAll('.nav-link[data-section]');
const skillFills= document.querySelectorAll('.skill-fill[data-width]');
const yearSpan  = document.getElementById('year');

// ── Footer year ───────────────────────────────────────────────
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

// ── Navbar: add scrolled class on scroll ─────────────────────
function handleNavScroll() {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}
window.addEventListener('scroll', handleNavScroll, { passive: true });
handleNavScroll(); // run once on load

// ── Mobile menu toggle ────────────────────────────────────────
hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

// Close menu when a link is clicked
navLinks.addEventListener('click', (e) => {
  if (e.target.classList.contains('nav-link')) {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }
});

// Close menu on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navLinks.classList.contains('open')) {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }
});

// ── Active nav highlight via IntersectionObserver ────────────
const sections = document.querySelectorAll('section[id]');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navItems.forEach((link) => {
          const active = link.dataset.section === entry.target.id;
          link.classList.toggle('active', active);
        });
      }
    });
  },
  {
    root: null,
    threshold: 0.35,        // section is "active" when 35% visible
    rootMargin: '-10% 0px -10% 0px',
  }
);

sections.forEach((sec) => sectionObserver.observe(sec));

// ── Skill bars: animate on first sight ───────────────────────
const skillObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const target = parseInt(fill.dataset.width, 10) || 0;
        // Small delay so the transition feels deliberate
        setTimeout(() => {
          fill.style.width = target + '%';
        }, 120);
        obs.unobserve(fill);
      }
    });
  },
  { threshold: 0.1 }
);

skillFills.forEach((bar) => skillObserver.observe(bar));
