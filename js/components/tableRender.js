// Отримуємо елемент таблиці, в яку будемо рендерити записи
const tableBodyEl = document.querySelector("#recordsDashboard");

/**
 * Рендерить список енергологів у таблицю
 * @param {Array} records - масив об'єктів записів (energyLogs)
 */
export function renderRecordsLists(records) {
  if (!records.length) {
    tableBodyEl.innerHTML = `<tr><td colspan="5" class="text-center py-4 text-gray-500 dark:text-gray-400">Немає записів для відображення</td></tr>`;
    return;
  }
  // Генеруємо HTML-розмітку для кожного запису
  const tableListMarkup =
    records.map(({ id, timestamp, mood, energyLvl, comment }) => {
      // Перетворюємо timestamp у локальний формат дати (український)
      const date = new Date(timestamp).toLocaleDateString("uk-UA", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      // Повертаємо HTML-рядок для одного запису
      return `<tr class="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
            <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">${date}</td>
            <td class="px-6 py-4">${energyLvl}</td>
            <td class="px-6 py-4">${mood}</td>
            <td class="px-6 py-4">${comment}</td>
            <td class="px-6 py-4 text-right">
              <button data-id="${id}" class="font-semibold text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 deleteEnergyLogBtn">Delete</button>
            </td>
          </tr>`;
    }) || [];
  // Вставляємо всі згенеровані рядки у таблицю
  tableBodyEl.innerHTML = tableListMarkup.join("");
}
