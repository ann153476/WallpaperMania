const menuBTN = document.querySelector(".nav__menu__btn");
const Xbtn = document.querySelector(".close__modal__btn");
const modal = document.querySelector("#modal");

menuBTN.addEventListener("click", () => {
  modal.style.transform = "translateX(0%)";
});
Xbtn.addEventListener("click", () => {
  modal.style.transform = "translateX(100%)";
});
