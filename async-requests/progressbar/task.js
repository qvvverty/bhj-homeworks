'use strict';

const form = document.getElementById('form');

form.addEventListener('submit', submit => {
  submit.preventDefault();
  const request = new XMLHttpRequest();

  request.upload.addEventListener('progress', event => {
    const progress = document.getElementById('progress');
    progress.value = event.loaded / event.total;
  });

  request.open('POST', 'https://netology-slow-rest.herokuapp.com/upload.php');
  request.send(new FormData(form));
});