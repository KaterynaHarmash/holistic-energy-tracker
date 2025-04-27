export function saveUserProfile(profile) {
  localStorage.setItem("userProfile", JSON.stringify(profile));
}

export async function getUserProfile() {
  const data = localStorage.getItem("userProfile");
  return data ? JSON.parse(data) : null;
}

export function updateUserProfile(updates) {
  const data = JSON.parse(localStorage.getItem('userProfile')) || {};

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