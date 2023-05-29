addEventListener("DOMContentLoaded", ()=> {
    const burger = document.querySelector(".burger");
    const menu = document.querySelector(".menu");
    burger.addEventListener("click", () => {
        burger.classList.toggle("is-active");
        menu.classList.toggle("is-open");
    })

    // Footer contacts menu
    const contactsButton = document.querySelector(".footer-content__menu-contacts-button");
    const contactsMenu = document.querySelector(".footer-content__menu-contacts-nav");
    contactsButton.addEventListener("click", ()=>{
        contactsMenu.classList.toggle("opened");
    })
})
