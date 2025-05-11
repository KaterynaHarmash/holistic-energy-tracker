const tableBodyEl = document.querySelector("#recordsDashboard");
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