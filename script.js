/* ============================================================
   MUHAMMAD AHMED KHAN — PORTFOLIO
   script.js  |  Navbar · Mobile Menu · Active Nav · Skill Bars
   ============================================================ */

'use strict';

// ── DOM refs ─────────────────────────────────────────────────
const navbar     = document.getElementById('navbar');
const hamburger  = document.getElementById('hamburger');
const navLinks   = document.getElementById('navLinks');
const navItems   = document.querySelectorAll('.nav-link[data-section]');
const skillFills = document.querySelectorAll('.skill-fill[data-width]');
const yearSpan   = document.getElementById('year');

// ── Footer year ───────────────────────────────────────────────
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

// ── Navbar: scrolled shadow ───────────────────────────────────
function handleNavScroll() {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}
window.addEventListener('scroll', handleNavScroll, { passive: true });
handleNavScroll();

// ── Mobile menu ───────────────────────────────────────────────
function closeMenu() {
  navLinks.classList.remove('open');
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
}

function openMenu() {
  navLinks.classList.add('open');
  hamburger.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
}

hamburger.addEventListener('click', () => {
  navLinks.classList.contains('open') ? closeMenu() : openMenu();
});

// Close when a nav link is tapped
navLinks.addEventListener('click', (e) => {
  if (e.target.classList.contains('nav-link')) closeMenu();
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu();
});

// Close if user taps outside the menu
document.addEventListener('click', (e) => {
  if (
    navLinks.classList.contains('open') &&
    !navLinks.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    closeMenu();
  }
});

// ── Active nav via IntersectionObserver ──────────────────────
const sections = document.querySelectorAll('section[id]');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navItems.forEach((link) => {
          link.classList.toggle('active', link.dataset.section === entry.target.id);
        });
      }
    });
  },
  { root: null, threshold: 0.3, rootMargin: '-5% 0px -5% 0px' }
);

sections.forEach((sec) => sectionObserver.observe(sec));

// ── Skill bars: animate on scroll into view ───────────────────
const skillObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const fill   = entry.target;
        const target = parseInt(fill.dataset.width, 10) || 0;
        setTimeout(() => { fill.style.width = target + '%'; }, 150);
        obs.unobserve(fill);
      }
    });
  },
  { threshold: 0.1 }
);

skillFills.forEach((bar) => skillObserver.observe(bar));
