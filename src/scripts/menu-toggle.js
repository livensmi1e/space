const menuButton = document.querySelector(".hamburger");
const menu = document.querySelector(".navbar");
menuButton.addEventListener("click", () => {
    menuButton.classList.toggle("active");
    menu.classList.toggle("active");
});
