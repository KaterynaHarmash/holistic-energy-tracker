import { getUserProfile, updateUserProfile } from "./storage.js";

const themeToggle = document.querySelector("#theme-toggle");
const sun = document.querySelector("#sun");
const moon = document.querySelector("#moon");

themeToggle.addEventListener("change", () => {
  const userProfile = getUserProfile();
  if (userProfile) {
    updateUserProfile({ "dark theme": themeToggle.checked });
  }

  if (themeToggle.checked) {
    darkTheme();
  } else {
    lightTheme();
  }
});

export function darkTheme() {
  document.documentElement.classList.add("dark");
  themeToggle.checked = true;
  sun.classList.remove("opacity-0");
  moon.classList.add("opacity-0");
}

export function lightTheme() {
  document.documentElement.classList.remove("dark");
  moon.classList.remove("opacity-0");
  sun.classList.add("opacity-0");
}
