/* ============================================================
   script.js — Portfolio Interactive Behaviour
   Vanilla JS only. No libraries.
   ============================================================ */

'use strict';

// ============================================================
// 1. NAVBAR — Scrolled state + Active section highlight
// ============================================================
const nav          = document.getElementById('nav');
const navLinks     = document.querySelectorAll('.nav__link[data-nav]');
const sections     = document.querySelectorAll('section[id]');
const NAV_OFFSET   = 80;

function onScroll() {
  // Frosted blur when user scrolls past the fold
  nav.classList.toggle('scrolled', window.scrollY > 20);

  // Active nav link based on scroll position
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - NAV_OFFSET) {
      current = sec.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.nav === current);
  });
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll(); // run once on load

// ============================================================
// 2. HAMBURGER MENU
// ============================================================
const hamburger   = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('[data-mobile-nav]');

function openMenu() {
  hamburger.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  mobileMenu.classList.add('open');
  mobileMenu.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  mobileMenu.classList.remove('open');
  mobileMenu.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  if (hamburger.classList.contains('open')) closeMenu();
  else openMenu();
});

// Close when a link is clicked
mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

// Close on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMenu();
});

// ============================================================
// 3. SMOOTH SCROLL — Offset for fixed nav height
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET + 10;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ============================================================
// 4. INTERSECTION OBSERVER — fade-up & stagger animations
// ============================================================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // animate once
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

// Observe all fade-up elements and stagger containers
document.querySelectorAll('.fade-up, .stagger').forEach(el => observer.observe(el));

// Also trigger hero elements on load since they are above the fold
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.hero .fade-up').forEach(el => {
    el.classList.add('visible');
  });
});

// ============================================================
// 5. CARD — Radial gradient follow cursor (desktop only)
// ============================================================
if (window.matchMedia('(hover: hover)').matches) {
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width  * 100).toFixed(1);
      const y = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1);
      card.style.setProperty('--mx', `${x}%`);
      card.style.setProperty('--my', `${y}%`);
    });
  });
}

// ============================================================
// 6. PAGE LOAD — fade-in body
// ============================================================
document.documentElement.style.opacity = '0';
document.documentElement.style.transition = 'opacity 0.3s ease';
window.addEventListener('load', () => {
  document.documentElement.style.opacity = '1';
});
