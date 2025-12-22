/**
 * SCROLL-ANIMATION.JS - Scroll-based Animations
 *
 * Creates an immersive parallax zoom effect on the hero section
 * and slide-in animations for content as the user scrolls
 */

function initScrollAnimation() {
  const heroBackground = document.querySelector('.hero-background-wrapper');
  const heroOverlay = document.querySelector('.hero-overlay');
  const heroSection = document.querySelector('.hero-immersive');
  const navbar = document.querySelector('.main-nav');

  // Scroll event handler with throttling for performance
  let ticking = false;

  function updateAnimations() {
    const scrollPosition = window.pageYOffset;
    const windowHeight = window.innerHeight;

    // Fixed background with parallax movement (moves slower than scroll)
    if (heroBackground) {
      // Background moves at 40% of scroll speed
      // Negative value makes it move up (opposite of scroll direction)
      // This creates the "lagging behind" effect
      const parallaxY = scrollPosition * -0.4;
      heroBackground.style.transform = `translateY(${parallaxY}px)`;

      // Apply same transform to overlay so it moves with background
      if (heroOverlay) {
        heroOverlay.style.transform = `translateY(${parallaxY}px)`;
      }
    }

    // Navbar scroll effect
    if (navbar) {
      if (scrollPosition > 100) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Animate elements on scroll
    animateOnScroll();

    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      window.requestAnimationFrame(updateAnimations);
      ticking = true;
    }
  }

  // Listen to scroll events
  window.addEventListener('scroll', requestTick, { passive: true });

  // Initial call
  updateAnimations();
}

/**
 * Animate elements when they come into view
 */
function animateOnScroll() {
  const elements = document.querySelectorAll('.animate-on-scroll, .slide-in-left, .slide-in-right');

  elements.forEach(element => {
    const rect = element.getBoundingClientRect();
    const isVisible = (rect.top <= window.innerHeight * 0.85) && (rect.bottom >= 0);

    if (isVisible && !element.classList.contains('animated')) {
      element.classList.add('animated');
    }
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollAnimation);
} else {
  // If DOM is already loaded, check if elements exist
  const checkElements = setInterval(() => {
    const heroExists = document.querySelector('.hero-background-wrapper');
    const hasAnimatableElements = document.querySelector('.animate-on-scroll, .slide-in-left, .slide-in-right');

    if (heroExists || hasAnimatableElements) {
      clearInterval(checkElements);
      initScrollAnimation();
    }
  }, 100);

  // Clear check after 3 seconds if not found
  setTimeout(() => clearInterval(checkElements), 3000);
}
