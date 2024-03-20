document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const offcanvasCloseBtn = document.querySelector("#offcanvasMenuCloseBtn");

  menuToggle.addEventListener("click", function () {
    menuToggle.classList.add("open");
  });

  offcanvasCloseBtn.addEventListener("click", function () {
    menuToggle.classList.remove("open");
  });
});
