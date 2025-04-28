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
      dateStart = new Date(0);
      break;
  }

  const records = await getUserProfile().energyLogs||[];
  const filteredRecords = records.filter(rec=>Date.parse(rec.timestamp).getTime()>dateStart.getTime()&&ate.parse(rec.timestamp).getTime()<dateFinish.getTime());


  return filteredRecords;
}
