const openModalButton = document.querySelector("#openModal");
const closeModalButton = document.querySelector("#closeModal");
const modal = document.querySelector("#modal");

openModalButton.addEventListener("click", () => {
    modal.classList.remove('hidden');
    setTimeout(() => {
  modal.classList.remove("opacity-0");
  modal.classList.add("opacity-100");},50)
});

closeModalButton.addEventListener("click", () => {
  modal.classList.add("opacity-0");
  modal.classList.remove("opacity-100");
  setTimeout(() => {
    modal.classList.add('hidden');
  }, 300); // чекаємо завершення анімації перед приховуванням
});

modal.addEventListener("click", (e) => {
    if(e.target.id==="backdrop"){
        modal.classList.add("opacity-0");
        modal.classList.remove("opacity-100");
        setTimeout(() => {
            modal.classList.add('hidden');
          }, 300); // чекаємо завершення анімації перед приховуванням
    } else {
        return;
    }
});