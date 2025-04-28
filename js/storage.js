export function saveUserProfile(profile) {
  localStorage.setItem("userProfile", JSON.stringify(profile));
}

export async function getUserProfile() {
  const data = JSON.parse(await localStorage.getItem("userProfile"))||{};
  return data;
}

export async function updateUserProfile(updates) {
  const data =  await getUserProfile(); // 1. Отримуємо актуальний профіль
  console.log(data)

  if (typeof updates !== 'object' || updates === null) {
    console.error('Updates must be a non-null object.');
    return data;
  }

  const updatedProfile = { ...data, ...updates }; // 2. Об'єднуємо

  localStorage.setItem('userProfile', JSON.stringify(updatedProfile)); // 3. Зберігаємо повний профіль

  return updatedProfile;
}


export async function addEnergyLog(record) {
  const user = await getUserProfile();
  console.log(record, user)
  user.energyLogs.push(record)
  await updateUserProfile(user);
  return user;
}

export async function getEnergyLogs(period) {
  let dateStart = null;
  let dateFinish = new Date(); // Сьогодні
  
  switch (period) {
    case "Last 30 days":
      dateStart = new Date();
      dateStart.setDate(dateStart.getDate() - 30);
      break;
    case "Last 7 days":
      dateStart = new Date();
      dateStart.setDate(dateStart.getDate() - 7);
      break;
    default:
      dateStart = new Date(null);
      break;
  }

  const user = await getUserProfile();
  const filteredRecords = user.energyLogs||[]
  .filter(rec=>Date.parse(rec.timestamp).getTime()>dateStart.getTime()&&ate.parse(rec.timestamp).getTime()<dateFinish.getTime());


  return filteredRecords;
}

export function renderRecordsLists(records){
  const tableBodyEl = document.querySelector("#recordsDashboard");
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
              <button data-id="${id}" class="font-semibold text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300">Delete</button>
            </td>
          </tr>`
    })||[];

    tableBodyEl.insertAdjacentHTML('beforeend', tableListMarkup.join(''));
  
}