'use strict';

const submenu = document.getElementsByClassName('menu_sub');

for (let i = 0; i < submenu.length; i++) {
  submenu[i].parentElement.querySelector('a.menu__link').onclick = () => {
    const menuOpen = submenu[i].closest('.menu_main').querySelector('.menu_active');
    if (menuOpen && menuOpen !== submenu[i]) {
      menuOpen.classList.remove('menu_active');
    }

    submenu[i].classList.toggle('menu_active');
    return false;
  };
}