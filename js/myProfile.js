import "./themeToggle.js";
import { getUserProfile } from "./storage.js";

const userProfile = await getUserProfile();
document.querySelector("#userName").textContent =
  userProfile.name + "`s Holistic Energy Tracker";
if (userProfile["dark theme"]) {
  document.documentElement.classList.add("dark");
  const themeToggle = document.querySelector("#theme-toggle");
  const sun = document.querySelector("#sun");
  const moon = document.querySelector("#moon");
  themeToggle.checked = true;
  sun.classList.remove("opacity-0");
  moon.classList.add("opacity-0");
}
