# Holistic Energy Tracker

A lightweight self-tracking app designed for personal energy and mood monitoring.

## Key Features
- User registration (name, age, biological gender)
- Dynamic theme switching (light/dark mode)
- Custom toggle with white SVG icons (sun/moon)
- Architecture focused on scalability and modularity
- TailwindCSS setup with explicit `darkMode: 'class'` configuration

## Architecture Highlights
- Separation of responsibilities: theme toggle, user registration, and future tracking modules are logically separated
- Flexible data structure allowing easy extension (e.g., energy logs, cycle tracking, sleep tracking)
- Minimal, scalable approach suitable for future API integration or local storage management
- Clear use of Tailwind utility classes for maintainable styling without heavy custom CSS

## Technologies
- HTML5
- TailwindCSS (via CDN)
- Vanilla JavaScript (no external libraries)

## Future Development
- Save user's theme preference in LocalStorage
- Add daily energy, mood, and comment tracking
- Visualize weekly statistics with charts

---

*Created with ❤️ to practice not just coding, but scalable front-end architecture.*
