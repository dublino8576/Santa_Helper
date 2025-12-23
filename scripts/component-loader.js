/**
 * COMPONENT-LOADER.JS - Component Loading System
 *
 * Handles loading HTML components dynamically into pages
 */

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
 * Fix component links to work from both root and pages subdirectory
 */
function adjustComponentLinks() {
  const isInPages = window.location.pathname.includes('/pages/');

  if (isInPages) {
    // Fix nav and footer links when loaded in /pages/ subdirectory
    document.querySelectorAll('#nav-placeholder a, #footer-placeholder a, #hero-placeholder a').forEach(link => {
      let href = link.getAttribute('href');
      if (href && href.startsWith('./pages/')) {
        link.setAttribute('href', href.replace('./pages/', './'));
      } else if (href === './index.html') {
        link.setAttribute('href', '../index.html');
      }
    });

    // Fix chatbot widget image
    const chatbotImg = document.querySelector('#chatbot-placeholder img[src^="./assets"]');
    if (chatbotImg) {
      const src = chatbotImg.getAttribute('src');
      chatbotImg.setAttribute('src', '../' + src.substring(2));
    }

    // Fix hero image
    const heroImg = document.querySelector('#hero-placeholder img[src^="./assets"]');
    if (heroImg) {
      const src = heroImg.getAttribute('src');
      heroImg.setAttribute('src', '../' + src.substring(2));
    }
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

  // Fix component links after loading
  adjustComponentLinks();

  // Initialize navigation after components are loaded
  initNavigation();
}

// Load components when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadComponents);
} else {
  loadComponents();
}

// Export for use in other scripts
window.ChristmasTree = window.ChristmasTree || {};
window.ChristmasTree.loadComponent = loadComponent;
