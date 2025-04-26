# Holistic Energy Tracker

A lightweight self-tracking app designed for personal energy, mood, and habit monitoring.

## Key Features
- User registration (name, age, biological gender)
- Dynamic theme switching (light/dark mode) using a custom toggle with white SVG icons (sun/moon)
- Front-end architecture with separated modules (theme toggle, form validation, storage)
- Form validation using Just-validate library via ES modules import
- TailwindCSS setup with explicit `darkMode: 'class'` configuration

## Architecture Highlights
- Modular structure:
  - `main.js` — main entry point
  - `themeToggle.js` — handles light/dark mode switching
  - `validateRegistration.js` — manages form validation and registration logic
  - `storage.js` — handles saving and retrieving user data from LocalStorage
- Separation of concerns for easier maintenance and scalability
- Flexible data model prepared for future features (energy tracking, cycle tracking, analytics)
- Modern import/export module structure without external bundlers

## Technologies
- HTML5
- TailwindCSS (via CDN)
- Vanilla JavaScript (ES modules)
- Just-validate (imported via CDN)

## Future Development
- Save theme preference to LocalStorage for persistence
- Add daily tracking of energy, mood, sleep, and other wellness factors
- Visualize data with charts (e.g., Chart.js)
- Build dashboard and statistics page

---

*Created with ❤️ to practice scalable front-end architecture and enhance real-world development skills.*
