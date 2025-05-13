// Імпортуємо бібліотеку JustValidate для валідації форм
import JustValidate from "https://cdn.jsdelivr.net/npm/just-validate@4.2.0/dist/just-validate.es.js";

// Імпортуємо функції для роботи з даними користувача
import {
  addEnergyLog,
  getUserProfile,
  saveUserProfile,
} from "./core/storage.js";

// Імпортуємо рендер списку записів після додавання нового
import { renderRecordsLists } from "./components/tableRender.js";
import { closeModal } from "./components/modal.js";

// Налаштовуємо валідацію форми реєстрації
export function setupRegistrationValidation() {
  const validation = new JustValidate("#registration-form");

  validation
    // Валідація імені
    .addField("#name", [
      { rule: "required", errorMessage: "Name is required" },
      {
        rule: "minLength",
        value: 2,
        errorMessage: "Name must be at least 2 characters",
      },
    ])

    // Валідація віку
    .addField("#age", [
      { rule: "required", errorMessage: "Age is required" },
      { rule: "number", errorMessage: "Age must be a number" },
      { rule: "minNumber", value: 10, errorMessage: "Minimum age is 10" },
      { rule: "maxNumber", value: 100, errorMessage: "Maximum age is 100" },
    ])

    // Валідація статі
    .addField("#gender", [
      { rule: "required", errorMessage: "Gender is required" },
    ])

    // Якщо всі поля валідні
    .onSuccess(async (event) => {
      event.preventDefault();

      // Збираємо дані з форми
      const name = document.querySelector("#name").value.trim();
      const age = document.querySelector("#age").value.trim();
      const gender = document.querySelector("#gender").value;
      

      // Отримуємо збережений профіль для витягування теми
      const theme = await getUserProfile();

      // Формуємо об'єкт профілю
      const userProfile = {
        name,
        age: Number(age),
        gender,
        energyLogs: [],
        "dark theme": theme,
      };

      // Зберігаємо профіль і переходимо на сторінку дашборду
      saveUserProfile(userProfile);
      document.querySelector("#registration-form").reset();
      window.location.href = "myProfile.html";
    });
}

// Налаштовуємо валідацію форми додавання нового запису
export function setupAddEnergyLvlValidation() {
  const validation = new JustValidate("#addEnergyLvl-form");
  
  // Формуємо запис у форматі для energyLogs
  validation
    // Валідація поля енергії
    .addField("#energyLevel", [
      { rule: "required", errorMessage: "Energy level is required" },
      { rule: "number", errorMessage: "Energy level must be a number" },
      {
        rule: "minNumber",
        value: 0,
        errorMessage: "Minimum energy level is 0",
      },
      {
        rule: "maxNumber",
        value: 10,
        errorMessage: "Maximum energy level is 10",
      },
    ])

    // Якщо все ок — створюємо запис
    .onSuccess(async (event) => {
      event.preventDefault();

      // Збираємо значення з форми
      const { mood, energyLevel: lvl, about } = getFormValues({
        mood: '#mood',
        energyLevel: '#energyLevel',
        about: '#about'
      });
      const timestamp = new Date().toJSON();

      // Створюємо новий об'єкт запису
      const energyLevel = {
        id: Date.now(),
        timestamp,
        mood,
        energyLvl: Number(lvl),
        comment: about,
      };

      // Додаємо запис у профіль і оновлюємо рендер
      const updatedEnergyLogs = await addEnergyLog(energyLevel);
      renderRecordsLists(updatedEnergyLogs);

      // Закриваємо модалку з анімацією
      closeModal();
    });
}

// Утиліта: отримує значення полів форми за селекторами
function getFormValues(selectors) {
  return Object.fromEntries(
    Object.entries(selectors).map(([key, selector]) => [
      key,
      document.querySelector(selector)?.value.trim()
    ])
  );
}
