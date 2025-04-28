import { getUserProfile } from "./storage.js";
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

function renderRecordsLists(records){
  const tableBodyEl = document.querySelector("#recordsDashboard");

  // <tr class="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
  //           <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">Lindsay Walton</td>
  //           <td class="px-6 py-4">Front-end Developer</td>
  //           <td class="px-6 py-4">lindsay.walton@example.com</td>
  //           <td class="px-6 py-4">Member</td>
  //           <td class="px-6 py-4 text-right">
  //             <button data-id="" class="font-semibold text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300">Delete</button>
  //           </td>
  //         </tr>
}
