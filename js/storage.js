export function saveUserProfile(profile) {
  localStorage.setItem("userProfile", JSON.stringify(profile));
}

export async function getUserProfile() {
  const data = JSON.parse(localStorage.getItem("userProfile"))||{};
  return data;
}

export function updateUserProfile(updates) {
  const data = getUserProfile();

  // Перевірка чи updates — це об'єкт
  if (typeof updates !== 'object' || updates === null) {
    console.error('Updates must be a non-null object.');
    return existingProfile; // Повертаємо поточний об'єкт без змін
  }

  // Об'єднуємо існуючі дані з новими оновленнями
  Object.assign(data, updates);

  // Зберігаємо оновлений об'єкт назад у LocalStorage
  localStorage.setItem('userProfile', JSON.stringify(data));

  return data; // Повертаємо оновлений обʼєкт
}

export function addEnergyLog(record) {
  const user = getUserProfile();
  console.log(record, user)
  user.energyLogs.push(record)
  updateUserProfile(user);
  return user;
}

export function getEnergyLogs(period) {
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
      dateStart = new Date(0);
      break;
  }

  const records = getUserProfile().energyLogs||[];
  const filteredRecords = records.filter(rec=>Date.parse(rec.timestamp).getTime()>dateStart.getTime()&&ate.parse(rec.timestamp).getTime()<dateFinish.getTime());


  return filteredRecords;
}
