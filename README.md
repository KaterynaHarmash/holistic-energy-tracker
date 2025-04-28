# Holistic Energy Tracker

A lightweight personal self-tracking app built with TailwindCSS and Vanilla JavaScript.

## Key Features
- **User registration** (name, age, biological gender)
- **Dynamic theme switching** (light/dark mode) with custom white SVG icons
- **Persistent theme selection** saved into user profile (LocalStorage)
- **Modal form** for tracking energy level, mood, and personal notes
- **Energy tracking records** saved to the user profile
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
│   ├── myProfile.js             # Manages user profile settings and energy logs
│   ├── storage.js               # LocalStorage abstraction for user data
│   ├── themeToggle.js           # Dynamic light/dark theme toggle
│   ├── validation.js            # Form validation for registration and energy tracking
```

## Architecture Highlights
- **Flat structure** with logical separation by functionality
- **Focus on modular code**: independent scripts for theme, profile, registration, modals
- **Explicit LocalStorage usage** for data persistence
- **TailwindCSS** used for layout, responsiveness, and transitions
- **Dark mode** handled via class strategy (`darkMode: 'class'` in Tailwind config)

## Technologies
- HTML5
- TailwindCSS (via CDN)
- Vanilla JavaScript (ES modules)
- JustValidate (via CDN)

## Future Development
- Build dashboard to display energy and mood history
- Visualize data trends with charts (e.g., using Chart.js)
- Implement filtering of records by date range
- Expand tracking to additional factors (sleep, menstrual cycle, nutrition)
- Improve responsive layout and animations for even better UX                                                                                                                   

---

*Created with ❤️ to practice scalable front-end architecture and enhance real-world development skills.*
