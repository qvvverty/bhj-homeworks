'use strict';

const modalMain = document.getElementById('modal_main');
modalMain.classList.add('modal_active');

function close() {
  this.closest('.modal').classList.remove('modal_active');
}

const modalClose = document.getElementsByClassName('modal__close_times');
modalClose[0].onclick = close;
modalClose[1].onclick = () => {close.bind(modalClose[1])(); modalClose[0].click()};

const modalSuccess = document.getElementById('modal_success');
const showSuccess = document.querySelector('a.show-success');
showSuccess.onclick = () => modalSuccess.classList.add('modal_active');
