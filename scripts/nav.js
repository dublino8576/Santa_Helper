/**
 * NAV.JS - Navigation Handler
 *
 * Handles navigation functionality:
 * - Mobile menu toggle
 * - Active page highlighting
 */

/**
 * Initialize navigation features
 */
function initNavigation() {
  // Mobile menu toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
      });
    });
  }

  // Highlight active page
  highlightActivePage();
}

/**
 * Add 'active' class to current page's nav link
 */
function highlightActivePage() {
  const currentPath = window.location.pathname;

  document.querySelectorAll('.nav-link').forEach(link => {
    const linkPath = link.getAttribute('href');

    // Check if current page matches link
    if (currentPath === linkPath ||
        (currentPath.endsWith(linkPath) && linkPath !== '/index.html')) {
      link.classList.add('active');
    }

    // Handle root/index case
    if ((currentPath === '/' || currentPath === '/index.html') &&
        linkPath === '/index.html') {
      link.classList.add('active');
    }
  });
}
