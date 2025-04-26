const themeToggle = document.querySelector("#theme-toggle");
const sun = document.querySelector("#sun");
const moon = document.querySelector("#moon");

themeToggle.addEventListener("change", () => {
  document.documentElement.classList.toggle("dark", themeToggle.checked);
  if (themeToggle.checked) {
    sun.classList.remove("opacity-0");
    moon.classList.add("opacity-0");
  } else {
    moon.classList.remove("opacity-0");
    sun.classList.add("opacity-0");
  }
});
