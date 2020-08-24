'use strict';

const modal = document.getElementById('subscribe-modal');
if (!document.cookie.includes('modal=closed')) {
  modal.classList.add('modal_active');
}

document.addEventListener('click', click => {
  if (click.target.classList.contains('modal__close')) {
    modal.classList.remove('modal_active');
    document.cookie = 'modal=closed; max-age=60';
  }
});