import { getEnergyLogs, getUserProfile, renderRecordsLists } from "./storage.js";
import { darkTheme } from "./themeToggle.js";
import "./modal.js";
import { setupAddEnergyLvlValidation } from "./validation.js";

const userProfile = await getUserProfile();
if(!userProfile.name){
  window.location.href="index.html";
}
document.querySelector("#userName").textContent = userProfile.name + "`s Holistic Energy Tracker";

if (userProfile["dark theme"]) {
  darkTheme()
}

setupAddEnergyLvlValidation();

const energyLogs = await getEnergyLogs();

renderRecordsLists(energyLogs);
