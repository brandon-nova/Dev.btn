// Check for reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Header scroll behavior
const header = document.getElementById('header');
const scrollThreshold = 24;

function handleScroll() {
  if (window.scrollY > scrollThreshold) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

// Throttle scroll handler for performance
let ticking = false;
function onScroll() {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      handleScroll();
      ticking = false;
    });
    ticking = true;
  }
}

window.addEventListener('scroll', onScroll, { passive: true });

// Navigation active state
function setActiveNavLink() {
  const currentPath = window.location.pathname;
  // Remove trailing slash and get the path segments
  const normalizedPath = currentPath.replace(/\/$/, '') || '/';
  const pathSegments = normalizedPath.split('/').filter(s => s);
  const currentPage = pathSegments.length > 0 ? '/' + pathSegments.join('/') : '/';
  
  const navLinks = document.querySelectorAll('.nav-link');
  const hash = window.location.hash;
  
  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (!linkHref) return;
    
    // Handle anchor links (like /#contact)
    if (linkHref.includes('#')) {
      const [linkPath, linkHash] = linkHref.split('#');
      const normalizedLinkPath = (linkPath || '/').replace(/\/$/, '') || '/';
      
      // Only mark as current if we're on the home page and hash matches
      if (currentPage === '/' && hash === '#' + linkHash) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
      return;
    }
    
    // Handle clean URLs (/, /work, /projects, /resume)
    let linkPath = '';
    try {
      const url = new URL(linkHref, window.location.href);
      linkPath = url.pathname.replace(/\/$/, '') || '/';
    } catch (e) {
      // For relative paths
      linkPath = (linkHref.split('#')[0] || '/').replace(/\/$/, '') || '/';
    }
    
    // Check if paths match
    if (currentPage === linkPath) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

// Smooth scroll for anchor links
function initSmoothScroll() {
  if (prefersReducedMotion) return;
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      
      // Skip empty hash or just #
      if (!href || href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Scroll reveal animations
function initScrollReveal() {
  if (prefersReducedMotion) {
    // If reduced motion, show all elements immediately
    document.querySelectorAll('.reveal').forEach(el => {
      el.classList.add('revealed');
    });
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
  });
}

// Add rel="noopener" to external links
function initExternalLinks() {
  document.querySelectorAll('a[target="_blank"]').forEach(link => {
    if (!link.hasAttribute('rel')) {
      link.setAttribute('rel', 'noopener');
    }
  });
}

// Initialize on DOM load
function init() {
  setActiveNavLink();
  initSmoothScroll();
  initScrollReveal();
  initExternalLinks();
  handleScroll(); // Set initial header state
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Handle navigation changes (for SPA-like behavior if needed)
window.addEventListener('popstate', () => {
  setActiveNavLink();
});

// Update active nav link when hash changes
window.addEventListener('hashchange', () => {
  setActiveNavLink();
});

// Also check on scroll to see if we're in a section
let scrollTimeout;
window.addEventListener('scroll', () => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    // Only update if we're on index.html and hash is present
    const currentPath = window.location.pathname;
    const currentFile = currentPath.split('/').pop() || 'index.html';
    if (!currentFile || currentFile === 'index.html' || currentFile.endsWith('/index.html')) {
      setActiveNavLink();
    }
  }, 100);
}, { passive: true });

