// Імпортуємо функції для зчитування/оновлення профілю користувача
import { getUserProfile, updateUserProfile } from "../core/storage.js";

// Отримуємо DOM-елементи: перемикач теми і іконки
const themeToggle = document.querySelector("#theme-toggle");
const sun = document.querySelector("#sun");
const moon = document.querySelector("#moon");

// Слухаємо зміну чекбокса: перемикач теми
themeToggle.addEventListener("change", async () => {
    // Отримуємо профіль користувача з localStorage
  const userProfile = await getUserProfile();
  if (userProfile) {
        // Зберігаємо новий стан теми в профіль
    userProfile.darkTheme = themeToggle.checked;
    updateUserProfile(userProfile);
  }
  // Застосовуємо відповідну тему до DOM
  if (themeToggle.checked) {
    darkTheme();
  } else {
    lightTheme();
  }
});
/**
 * Вмикає темну тему:
 * - додає клас .dark до <html>
 * - вмикає чекбокс
 * - показує іконку сонця
 */
export function darkTheme() {
  document.documentElement.classList.add("dark");
  themeToggle.checked = true;
  sun.classList.remove("opacity-0");// показати сонце
  moon.classList.add("opacity-0");// приховати місяць
}
/**
 * Вимикає темну тему (вмикає світлу):
 * - прибирає клас .dark
 * - показує місяць, приховує сонце
 */
export function lightTheme() {
  document.documentElement.classList.remove("dark");
  moon.classList.remove("opacity-0"); // показати місяць
  sun.classList.add("opacity-0");     // приховати сонце
}
