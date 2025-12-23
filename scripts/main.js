/**
 * MAIN.JS - Component Loader & Navigation Handler
 *
 * This script handles:
 * - Loading reusable components (nav, footer) into pages
 * - Mobile navigation toggle
 * - Active page highlighting
 */

// ========================================
// COMPONENT LOADER
// ========================================

/**
 * Load a component from the components directory into a target element
 * @param {string} componentName - Name of the component file (without .html)
 * @param {string} targetSelector - CSS selector for the target element
 */
async function loadComponent(componentName, targetSelector) {
  try {
    const basePath = window.location.pathname.includes('/pages/') ? '../' : './';
    const response = await fetch(`${basePath}components/${componentName}.html`);
    if (!response.ok) throw new Error(`Failed to load ${componentName}`);

    const html = await response.text();
    const target = document.querySelector(targetSelector);

    if (target) {
      target.innerHTML = html;
    }
  } catch (error) {
    console.error(`Error loading component ${componentName}:`, error);
  }
}

/**
 * Load all common components on page load
 */
async function loadComponents() {
  await loadComponent('nav', '#nav-placeholder');
  await loadComponent('footer', '#footer-placeholder');

  // Load chatbot widget if placeholder exists
  const chatbotPlaceholder = document.querySelector('#chatbot-placeholder');
  if (chatbotPlaceholder) {
    await loadComponent('chatbot-widget', '#chatbot-placeholder');
    initChatbotWidget();
  }

  // Load hero section if placeholder exists
  const heroPlaceholder = document.querySelector('#hero-placeholder');
  if (heroPlaceholder) {
    await loadComponent('hero', '#hero-placeholder');
  }

  // Initialize navigation after components are loaded
  initNavigation();
}

// ========================================
// NAVIGATION FUNCTIONALITY
// ========================================

/**
 * Initialize navigation features:
 * - Mobile toggle
 * - Active page highlighting
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

// ========================================
// UTILITY FUNCTIONS
// ========================================

/**
 * Smooth scroll to element
 * @param {string} selector - CSS selector of target element
 */
function smoothScrollTo(selector) {
  const element = document.querySelector(selector);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/**
 * Create a card element programmatically
 * @param {Object} data - Card data {title, text, frost}
 * @returns {HTMLElement} - Card element
 */
function createCard({ title, text, frost = false }) {
  const card = document.createElement('div');
  card.className = frost ? 'card card-frost' : 'card';

  card.innerHTML = `
    <h3 class="card-title">${title}</h3>
    <p class="card-text">${text}</p>
  `;

  return card;
}

// ========================================
// INITIALIZATION
// ========================================

// Load components when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadComponents);
} else {
  loadComponents();
}

// Export functions for use in other scripts
window.ChristmasTree = {
  loadComponent,
  smoothScrollTo,
  createCard
};
