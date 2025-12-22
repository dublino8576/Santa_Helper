/**
 * SNOWFLAKES.JS - Subtle Floating Snowflake Animation
 *
 * Creates gentle snowflakes that fall across the page
 * for a festive winter atmosphere
 */

function initSnowflakes() {
  const snowflakeChars = ['❄', '❅', '❆'];
  const container = document.body;

  // Create 8 snowflakes (subtle, not overwhelming)
  for (let i = 0; i < 8; i++) {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';

    // Random snowflake character
    snowflake.textContent = snowflakeChars[Math.floor(Math.random() * snowflakeChars.length)];

    // Random horizontal position
    snowflake.style.left = `${Math.random() * 100}%`;

    // Random animation duration (12-20 seconds)
    snowflake.style.animationDuration = `${12 + Math.random() * 8}s`;

    // Random animation delay (0-5 seconds)
    snowflake.style.animationDelay = `${Math.random() * 5}s`;

    // Random size variation (1-1.5rem)
    snowflake.style.fontSize = `${1 + Math.random() * 0.5}rem`;

    container.appendChild(snowflake);
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSnowflakes);
} else {
  initSnowflakes();
}
