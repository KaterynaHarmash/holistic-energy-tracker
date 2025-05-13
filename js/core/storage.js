/**
 * Зберігає об'єкт профілю користувача в localStorage
 * @param {Object} profile - повний профіль користувача
 */
export function saveUserProfile(profile) {
  localStorage.setItem("userProfile", JSON.stringify(profile));
}

/**
 * Повертає об'єкт профілю користувача з localStorage
 * @returns {Object}
 */
export async function getUserProfile() {
  const data = JSON.parse(await localStorage.getItem("userProfile")) || {};
  return data;
}

/**
 * Оновлює збережений профіль користувача новими даними
 * @param {Object} updates - часткові зміни до профілю
 * @returns {Object} - оновлений профіль
 */
export async function updateUserProfile(updates) {
  const data = await getUserProfile(); // Отримуємо поточний профіль

  if (typeof updates !== "object" || updates === null) {
    console.error("Updates must be a non-null object.");
    return data;
  }

  // Створюємо оновлений профіль шляхом обʼєднання старого і нового
  const updatedProfile = { ...data, ...updates }; 
// Зберігаємо в localStorage
  localStorage.setItem("userProfile", JSON.stringify(updatedProfile)); 

  return updatedProfile;
}

/**
 * Додає новий лог запису в energyLogs користувача
 * @param {Object} record - запис енергії (id, timestamp, mood, energyLvl, comment)
 * @returns {Array} - оновлений масив записів
 */
export async function addEnergyLog(record) {
  const user = await getUserProfile();
  user.energyLogs.push(record);
  await updateUserProfile(user);
  const energyLogs = await getEnergyLogs();

  return energyLogs;
}

/**
 * Видаляє лог за вказаним ID
 * @param {string|number} recordID - ідентифікатор запису
 * @returns {Array} - оновлений масив energyLogs
 */
export async function deleteEnergyLog(recordID) {
  const user = await getUserProfile();

  // Фільтруємо логи, залишаючи лише ті, що не мають вказаного ID
  user.energyLogs = user.energyLogs.filter((log) => Number(log.id) !== Number(recordID));
  await updateUserProfile(user);
  const energyLogs = await getEnergyLogs();

  return energyLogs;
}


/**
 * Повертає логи, відфільтровані за періодом
 * @param {string} period - "filter-7days", "filter-30days", або будь-що інше (весь час)
 * @returns {Array} - відфільтровані energyLogs
 */

export async function getEnergyLogs(period) {
  let dateStart = null;
  let dateFinish = new Date(); // Сьогодні

  // Визначаємо початок періоду
  switch (period) {
    case "filter-30days":
      dateStart = new Date();
      dateStart.setDate(dateStart.getDate() - 30);
      break;
    case "filter-7days":
      dateStart = new Date();
      dateStart.setDate(dateStart.getDate() - 7);
      break;
    default:
      dateStart = new Date(null); // Дуже рання дата — фільтрація по "весь час"
      break;
  }

  const user = await getUserProfile();

  if (!Array.isArray(user.energyLogs)) return [];
  
  // Фільтруємо записи за датою
  const filteredRecords = user.energyLogs.filter(
    (rec) =>
      Date.parse(rec.timestamp) > dateStart.getTime() &&
      Date.parse(rec.timestamp) < dateFinish.getTime()
  );

  return filteredRecords;
}
