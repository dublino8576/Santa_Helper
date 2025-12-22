/**
 * UTILS.JS - Utility Functions
 *
 * Reusable helper functions for the application
 */

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
 * Initialize smooth scroll for anchor links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href.length > 1) {
        e.preventDefault();
        smoothScrollTo(href);
      }
    });
  });
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

// Auto-initialize smooth scroll when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initSmoothScroll, 500); // Wait for components to load
  });
} else {
  setTimeout(initSmoothScroll, 500);
}

// Export utilities
window.ChristmasTree = window.ChristmasTree || {};
window.ChristmasTree.smoothScrollTo = smoothScrollTo;
window.ChristmasTree.createCard = createCard;
