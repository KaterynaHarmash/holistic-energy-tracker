import { deleteEnergyLog, getEnergyLogs, getUserProfile } from "../core/storage.js";
import { darkTheme } from "../components/themeToggle.js";
import "../components/modal.js";
import { setupAddEnergyLvlValidation } from "../validation.js";
import { groupEnergyLogsByDay, renderChart } from "../components/chart.js";
import { renderRecordsLists } from "../components/tableRender.js";

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