'use strict';

const dropdownBtns = document.getElementsByClassName('dropdown__value');
for (const btn of dropdownBtns) {
  btn.addEventListener('click', () => btn.nextElementSibling.classList.toggle('dropdown__list_active'));
}

const dropdownLinks = document.getElementsByClassName('dropdown__link');
for (const link of dropdownLinks) {
  link.addEventListener('click', event => {
    event.preventDefault();
    const thisBtn = link.closest('div.dropdown').firstElementChild;
    thisBtn.textContent = link.textContent.trim();
    thisBtn.click();
  });
}