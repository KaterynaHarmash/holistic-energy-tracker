// Отримуємо DOM-елементи: кнопки відкриття/закриття та саму модалку
const openModalButton = document.querySelector("#openModal");
const closeModalButton = document.querySelector("#closeModal");
const modal = document.querySelector("#modal");

// Відкриваємо модалку по кліку на кнопку
openModalButton.addEventListener("click", () => {
    openModal();
});

// Закриваємо модалку по кліку на кнопку Cancel
closeModalButton.addEventListener("click", () => {
  closeModal();
});

// Додатково закриваємо модалку, якщо користувач клікає на фон (бекдроп)
modal.addEventListener("click", (e) => {
    if (e.target.id === "backdrop") {
        closeModal();
    } else {
        return;
    }
});
// Закриває модальне вікно з плавною анімацією (opacity -> hidden)
export function closeModal() {
  const modal = document.querySelector("#modal");
  modal.classList.add("opacity-0");      // затемнення
  modal.classList.remove("opacity-100"); // прибираємо повну видимість

  // Після завершення анімації ховаємо повністю
  setTimeout(() => modal.classList.add('hidden'), 300);
}
// Відкриває модальне вікно з анімацією (hidden -> visible)
function openModal(){
  modal.classList.remove('hidden');

  setTimeout(() => {
    modal.classList.remove("opacity-0");
    modal.classList.add("opacity-100");
  }, 50); // невелика затримка для плавності
}
