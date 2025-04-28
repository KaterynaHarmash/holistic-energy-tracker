# Holistic Energy Tracker

A lightweight personal self-tracking app built with TailwindCSS and Vanilla JavaScript.

## Key Features
- **User registration** (name, age, biological gender)
- **Dynamic theme switching** (light/dark mode) with custom white SVG icons
- **Persistent theme selection** saved into user profile (LocalStorage)
- **Modal form** for tracking energy level, mood, and personal notes
- **Energy tracking records** saved to the user profile
- **Asynchronous user profile updates** using modular LocalStorage handlers
- **Dynamic rendering** of user records into responsive data tables
- **Smooth modal animations** using TailwindCSS transitions
- **Responsive, mobile-friendly interface** built with Tailwind utility classes
- **Clean modular JavaScript code** using ES modules

## Current Structure
```
holistic-energy-tracker/
├── index.html                  # Registration page
├── myProfile.html               # Profile page with energy tracking
├── README.md
├── js/
│   ├── main.js                  # Initializes app, imports modules
│   ├── modal.js                 # Handles energy tracking modal logic
│   ├── myProfile.js             # Manages user profile settings and dynamic rendering
│   ├── storage.js               # LocalStorage abstraction for user data (async handling)
│   ├── themeToggle.js           # Dynamic light/dark theme toggle
│   ├── validation.js            # Form validation for registration and energy tracking
```

## Architecture Highlights
- **Flat modular structure** with logical separation by responsibility
- **Separation of business logic and UI logic**
- **Explicit LocalStorage usage** for scalable data management
- **TailwindCSS** for consistent layout, responsiveness, and animations
- **Dark mode** handled via class strategy (`darkMode: 'class'` in Tailwind config)
- **Dynamic data-driven rendering** of user activity records
- **Focus on clean, scalable front-end architecture practices

## Technologies
- HTML5
- TailwindCSS (via CDN)
- Vanilla JavaScript (ES modules)
- JustValidate (via CDN)

## Future Development
- Build dashboard to visualize energy and mood history
- Integrate data visualization charts (e.g., using Chart.js)
- Implement filtering of records by date range
- Expand tracking to additional wellness factors (sleep, menstrual cycle, nutrition)
- Enhance UX with better transitions and mobile-friendly optimizations
- Consider migration to IndexedDB for offline-first advanced storage

---

*Created with ❤️ to practice scalable front-end architecture and enhance real-world development skills.*

