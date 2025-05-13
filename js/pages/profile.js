// Імпортуємо функції для роботи з профілем користувача та енергологами
import { deleteEnergyLog, getEnergyLogs, getUserProfile } from "../core/storage.js"; 

// Темна тема — вмикається вручну, якщо обрана раніше
import { darkTheme } from "../components/themeToggle.js";

// Модалка відкривається/закривається з modal.js (підʼєднується автоматично)
import "../components/modal.js";

// Валідація форми додавання нового лог-запису
import { setupAddEnergyLvlValidation } from "../validation.js";

// Побудова та оновлення графіку
import { renderChart, updateChart } from "../components/chart.js"; 

// Рендер записів у таблиці
import { renderRecordsLists } from "../components/tableRender.js";

// Отримуємо профіль користувача з localStorage
const userProfile = await getUserProfile();
// Якщо профіль не знайдено (наприклад, користувач не реєструвався) — перекидаємо на index
if (!userProfile.name) {
  window.location.href = "index.html";
} else if (userProfile["dark theme"]) {
  darkTheme();
}

const tableBodyEl = document.querySelector("#recordsDashboard");
// Виводимо імʼя користувача у шапку
document.querySelector("#userName").textContent = `${userProfile.name}'s Holistic Energy Tracker`;

// Запускаємо валідацію форми додавання нового енергологу
setupAddEnergyLvlValidation();

// Отримуємо записи для початкового періоду (за замовчуванням — весь час)
const energyLogs = await getEnergyLogs();

// DOM-елемент для перемикання фільтрів
const logsFilter = document.querySelector("#filter");

// Рендеримо таблицю з логами
renderRecordsLists(energyLogs);

// Створюємо початковий графік
const chart = renderChart(energyLogs);

// Делегуємо клік по кнопці "Delete" у таблиці
tableBodyEl.addEventListener("click", async (e) => {
  if (e.target.className.includes("deleteEnergyLogBtn")) {
    const cleansedEnergyLogs = await deleteEnergyLog(e.target.dataset.id);

    // Оновлюємо таблицю після видалення
    renderRecordsLists(cleansedEnergyLogs);

    // Оновлюємо графік
    updateChart(chart, cleansedEnergyLogs);
  }
});

logsFilter.addEventListener("click", async (e) => {
  if (e.target.dataset.action.includes("filter")) {

    // Змінюємо активну кнопку
    const lastACtiveBtn = document.querySelector('#filter button[data-active="true"]');
    lastACtiveBtn.dataset.active = "false";
    e.target.dataset.active = "true";

    // Отримуємо записи відповідно до періоду
    const filteredEnergyLogs = await getEnergyLogs(e.target.dataset.action);

    // Оновлюємо графік і таблицю
    updateChart(chart, filteredEnergyLogs);
    return renderRecordsLists(filteredEnergyLogs);
  }
});
