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
    const response = await fetch(`/components/${componentName}.html`);
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

// Load components when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadComponents);
} else {
  loadComponents();
}

// Export for use in other scripts
window.ChristmasTree = window.ChristmasTree || {};
window.ChristmasTree.loadComponent = loadComponent;
