import { getUserProfile } from "./storage.js";
import { darkTheme } from "./themeToggle.js";
import "./modal.js";
import { setupAddEnergyLvlValidation } from "./validation.js";

const userProfile = await getUserProfile();
document.querySelector("#userName").textContent = userProfile.name + "`s Holistic Energy Tracker";

if (userProfile["dark theme"]) {
  darkTheme()
}

setupAddEnergyLvlValidation();


