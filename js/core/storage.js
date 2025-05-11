export function saveUserProfile(profile) {
  localStorage.setItem("userProfile", JSON.stringify(profile));
}

export async function getUserProfile() {
  const data = JSON.parse(await localStorage.getItem("userProfile")) || {};
  return data;
}

export async function updateUserProfile(updates) {
  const data = await getUserProfile(); 

  if (typeof updates !== "object" || updates === null) {
    console.error("Updates must be a non-null object.");
    return data;
  }

  const updatedProfile = { ...data, ...updates }; 

  localStorage.setItem("userProfile", JSON.stringify(updatedProfile)); 

  return updatedProfile;
}

export async function addEnergyLog(record) {
  const user = await getUserProfile();
  user.energyLogs.push(record);
  await updateUserProfile(user);
  const energyLogs = await getEnergyLogs();

  return energyLogs;
}

export async function deleteEnergyLog(recordID) {
  const user = await getUserProfile();
  user.energyLogs = user.energyLogs.filter((log) => Number(log.id) !== Number(recordID));
  await updateUserProfile(user);
  const energyLogs = await getEnergyLogs();

  return energyLogs;
}

export async function getEnergyLogs(period) {
  let dateStart = null;
  let dateFinish = new Date(); // Сьогодні

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
      dateStart = new Date(null);
      break;
  }

  const user = await getUserProfile();
  
  const filteredRecords =
    user.energyLogs.filter(
      (rec) =>Date.parse(rec.timestamp) > dateStart.getTime()&&Date.parse(rec.timestamp) < dateFinish.getTime()
    );

  return filteredRecords;
}
