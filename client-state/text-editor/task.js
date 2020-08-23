'use strict';

const textarea = document.getElementById('editor');
if (localStorage.input) {
  textarea.value = localStorage.input;
}

document.addEventListener('input', input => {
  if (input.target === textarea) {
    localStorage.input = textarea.value;
  }
});

document.addEventListener('click', click => {
  if (click.target.classList.contains('textarea__clear')) {
    click.preventDefault();
    textarea.value = '';
    localStorage.input = '';
  }
});