# Component & Utility Guide

Quick reference for using the reusable components and utility classes in the Christmas Tree project.

---

## File Structure

```
components/
├── nav.html              # Main navigation bar
├── footer.html           # Site footer
├── section-wrapper.html  # Section container template
└── card.html            # Card component template

styles/
├── global.css           # Global styles + utility classes
├── nav.css              # Navigation styles
└── footer.css           # Footer styles

scripts/
└── main.js              # Component loader + utilities
```

---

## 🎨 Using Components in Your Page

### Basic Page Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Page Title</title>

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet">

  <!-- Stylesheets -->
  <link rel="stylesheet" href="/styles/global.css">
  <link rel="stylesheet" href="/styles/nav.css">
  <link rel="stylesheet" href="/styles/footer.css">
</head>
<body>

  <!-- Navigation (auto-loaded) -->
  <div id="nav-placeholder"></div>

  <!-- Your content here -->
  <main>
    <section class="section-wrapper">
      <div class="section-container">
        <h1>Your Content</h1>
      </div>
    </section>
  </main>

  <!-- Footer (auto-loaded) -->
  <div id="footer-placeholder"></div>

  <!-- Scripts -->
  <script src="/scripts/main.js"></script>

</body>
</html>
```

---

## Utility Classes

### Layout Helpers

**Section Wrappers**
```html
<section class="section-wrapper">              <!-- Standard padding -->
<section class="section-wrapper section-dark">  <!-- Dark background -->
<section class="section-wrapper section-center"> <!-- Centered text -->
```

**Container**
```html
<div class="section-container">  <!-- Max-width 1200px, centered -->
```

### Spacing

**Margin**
```html
.mt-1 to .mt-5  <!-- Margin top (0.5rem to 3rem) -->
.mb-1 to .mb-5  <!-- Margin bottom -->
```

**Padding**
```html
.py-1 to .py-4  <!-- Padding top/bottom -->
.px-1 to .px-4  <!-- Padding left/right -->
```

### Grid Layouts

```html
<div class="grid-2">  <!-- 2 column responsive grid -->
<div class="grid-3">  <!-- 3 column responsive grid -->
<div class="grid-4">  <!-- 4 column responsive grid -->
```

### Flexbox

```html
<div class="flex-center">   <!-- Center items -->
<div class="flex-between">  <!-- Space between -->
<div class="flex-col">      <!-- Column direction -->

.gap-1 to .gap-4            <!-- Gap spacing -->
```

### Cards

```html
<div class="card">
  <h3 class="card-title">Title</h3>
  <p class="card-text">Content</p>
</div>

<div class="card card-frost">  <!-- Frosted glass variant -->
```

### Buttons

```html
<a href="#" class="btn-primary">Primary Button</a>
<a href="#" class="btn-secondary">Secondary Button</a>
```

### Text Utilities

```html
.text-center
.text-left
.text-right
.text-snow-glow  <!-- Glowing white text -->
```

### Backgrounds

```html
.winter-gradient  <!-- Winter themed gradient -->
```

---

## CSS Variables

Use these in your custom styles:

```css
/* Colors */
var(--color-bg-primary)      /* #0d1b2a - deep winter navy */
var(--color-bg-secondary)    /* #1b263b */
var(--color-bg-accent)       /* #415a77 */
var(--color-text-light)      /* #e0e5ec */
var(--color-accent)          /* #d8572a - festive warm accent */
var(--color-snow)            /* #f8f9fa */
var(--color-gold)            /* #f6d469 */

/* Fonts */
var(--font-heading)          /* 'Playfair Display', serif */
var(--font-body)             /* 'Inter', sans-serif */

/* Spacing */
var(--space-section)         /* 5rem */
```

---

## Example: Building a Feature Page

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Feature</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/styles/global.css">
  <link rel="stylesheet" href="/styles/nav.css">
  <link rel="stylesheet" href="/styles/footer.css">
</head>
<body>

  <div id="nav-placeholder"></div>

  <main>
    <!-- Hero Section -->
    <section class="section-wrapper section-center">
      <div class="section-container">
        <h1 class="text-snow-glow">My Feature</h1>
        <p class="mb-4">Feature description here</p>
        <a href="#" class="btn-primary">Get Started</a>
      </div>
    </section>

    <!-- Content Section -->
    <section class="section-wrapper">
      <div class="section-container">
        <div class="grid-3">
          <div class="card card-frost">
            <h3 class="card-title">Feature 1</h3>
            <p class="card-text">Description</p>
          </div>
          <!-- More cards... -->
        </div>
      </div>
    </section>
  </main>

  <div id="footer-placeholder"></div>
  <script src="/scripts/main.js"></script>

</body>
</html>
```

---

## Tips

1. **Always wrap content in `section-wrapper` and `section-container`** for consistent spacing
2. **Use utility classes** instead of inline styles when possible
3. **Cards auto-hover** with transform effect
4. **Navigation auto-highlights** the current page
5. **Mobile responsive** - all components work on mobile automatically
6. **Keep HTML, CSS, JS separate** - don't add styles/scripts directly in HTML files

---

## Examples:

Check the source files:
- [global.css](styles/global.css) - All utility classes
- [main.js](scripts/main.js) - Helper functions
- [index.html](index.html) - Working example
