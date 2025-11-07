// Work Page Scroll Effect
(function() {
  'use strict';

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    // Show all sections immediately if reduced motion
    document.querySelectorAll('.case-study-section').forEach(section => {
      section.classList.add('scroll-in');
    });
    return;
  }

  function initScrollEffect() {
    const sections = document.querySelectorAll('.case-study-section');
    
    if (sections.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -10% 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('scroll-in');
          // Optionally stop observing after it's been shown
          // observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    sections.forEach(section => {
      observer.observe(section);
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollEffect);
  } else {
    initScrollEffect();
  }
})();

