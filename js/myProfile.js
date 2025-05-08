import { deleteEnergyLog, getEnergyLogs, getUserProfile } from "./storage.js";
import { darkTheme } from "./themeToggle.js";
import "./modal.js";
import { setupAddEnergyLvlValidation } from "./validation.js";
import { groupEnergyLogsByDay, renderChart } from "./dashboardChart.js";

const userProfile = await getUserProfile();
if(!userProfile.name){
  window.location.href="index.html";
}
const tableBodyEl = document.querySelector("#recordsDashboard");
document.querySelector("#userName").textContent = userProfile.name + "`s Holistic Energy Tracker";

if (userProfile["dark theme"]) {
  darkTheme()
}

setupAddEnergyLvlValidation();

// const energyLogs = await getEnergyLogs();generateTestData();
const energyLogs = await getEnergyLogs();

const logsFilter = document.querySelector("#filter");

renderRecordsLists(energyLogs);
const chart = renderChart(energyLogs);

export function renderRecordsLists(records){
  
  const tableListMarkup = records.map(({id, timestamp, mood, energyLvl, comment}) => {
    const date = new Date(timestamp).toLocaleDateString('uk-UA',{
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return `<tr class="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
            <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">${date}</td>
            <td class="px-6 py-4">${energyLvl}</td>
            <td class="px-6 py-4">${mood}</td>
            <td class="px-6 py-4">${comment}</td>
            <td class="px-6 py-4 text-right">
              <button data-id="${id}" class="font-semibold text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 deleteEnergyLogBtn">Delete</button>
            </td>
          </tr>`
    })||[];
    tableBodyEl.innerHTML = tableListMarkup.join('');
  
}

// const deleteBtn = document.querySelector('.deleteEnergyLogBtn');
tableBodyEl.addEventListener('click',async (e)=>{
  if(e.target.className.includes("deleteEnergyLogBtn")){
    await deleteEnergyLog(e.target.dataset.id)
  }
})
logsFilter.addEventListener('click',async (e)=>{
  if(e.target.dataset.action.includes('filter')){
    const lastACtiveBtn = document.querySelector('#filter button[data-active="true"]');
    lastACtiveBtn.dataset.active = "false";
    e.target.dataset.active = "true";
    const filteredEnergyLogs = await getEnergyLogs(e.target.dataset.action);
    const groupedFilteredEnergyLogs = groupEnergyLogsByDay(filteredEnergyLogs);
    // console.log(chart.config._config.data.datasets[0].data, groupedFilteredEnergyLogs);
    chart.config._config.data.labels = groupedFilteredEnergyLogs.map(log => log.date);
    chart.config._config.data.datasets[0].data = groupedFilteredEnergyLogs.map(log => log.avgEnergy);
    // chart.data.datasets = groupEnergyLogsByDay(filteredEnergyLogs).map(log => log.avgEnergy); // Would update the first dataset's value of 'March' to be 50
    chart.update(); // Calling update now animates the position of March from 90 to 50.
    
    return renderRecordsLists(filteredEnergyLogs);
  }
})