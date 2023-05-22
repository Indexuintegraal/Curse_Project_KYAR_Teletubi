addEventListener("DOMContentLoaded", ()=> {
    const burger = document.querySelector(".burger");
    const menu = document.querySelector(".menu");
    burger.addEventListener("click", () => {
        burger.classList.toggle("is-active");
        menu.classList.toggle("is-open");
    })
})
