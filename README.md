# 🌿 Holistic Energy Tracker

**Holistic Energy Tracker** — це легкий веб-застосунок для самоспостереження, який дозволяє відстежувати рівень енергії, настрій і коментарі протягом дня. Додаток реалізований без бекенду — всі дані зберігаються в `localStorage`.

---

## 🧠 Можливості

- 📆 Додавання записів із рівнем енергії, настроєм та нотатками
- 📊 Візуалізація середнього рівня енергії по днях
- 🔍 Фільтрація записів: за 7 днів, 30 днів і за весь час
- 🌓 Перемикання світлої/темної теми
- ❌ Видалення окремих записів
- ✅ Валідація форми (JustValidate)
- 🔐 Зберігання даних у `localStorage`

---

## 🚀 Технології

- **Vanilla JavaScript (ES Modules)**
- **TailwindCSS** (через CDN)
- **Chart.js** (графік енергії)
- **JustValidate** (форма)
- **LocalStorage API**

---

## 📁 Структура проєкту (поточна)

```
├── index.html             # Сторінка реєстрації користувача
├── myProfile.html         # Основна сторінка з дашбордом
├── js/
│   ├── main.js            # Запуск реєстрації
│   ├── myProfile.js       # Основна логіка: рендер, події, ініціалізація
│   ├── dashboardChart.js  # Побудова графіка та агрегація логів
│   ├── modal.js           # Відкриття та закриття модального вікна
│   ├── storage.js         # Робота з localStorage: збереження, видалення, фільтрація
│   ├── themeToggle.js     # Тема: світла/темна, збереження в профілі
│   ├── validation.js      # Валідація форм
```

---

## 📦 Локальні дані

Дані користувача зберігаються в `localStorage` під ключем:
```js
"userProfile" // об'єкт з полями: name, age, gender, dark theme, energyLogs[]
```

---

## 📈 Приклад запису в energyLogs
```js
{
  id: 1746119840759,
  timestamp: "2025-05-01T17:17:20.759Z",
  mood: "🥰",
  energyLvl: 5,
  comment: "errrf"
}
```

---

## 🗺 План на розвиток

- [ ] Перенести на React або структурувати під SPA
- [ ] Додати більше метрик (фокус, сон, їжа)
- [ ] Розширена статистика і таби
- [ ] Синхронізація з бекендом (у майбутньому)

---

## 👤 Автор

Розроблено з ❤️ як навчальний pet-проєкт.  
GitHub: [KaterynaHarmash](https://github.com/KaterynaHarmash)

---