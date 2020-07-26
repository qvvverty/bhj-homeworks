'use strict';

const timer = document.getElementById('timer');

const timerId = setInterval(() => {
  timer.textContent--;
  if (timer.textContent == 0) {
    alert('Вы победили в конкурсе!');
    clearInterval(timerId);

    // document.getElementById('download-link').click();
    document.location = './file.docx';
  }
}, 1000);

const timer2 = document.getElementById('timer2');
const timeSplitted = timer2.textContent.split(':');

const time = new Date();
time.setHours(parseInt(timeSplitted[0]), parseInt(timeSplitted[1]), parseInt(timeSplitted[2]));
const timerId2 = setInterval(() => {
  time.setMilliseconds(-1);
  timer2.textContent = `${time.getHours() < 10 ? '0' + time.getHours() : time.getHours()}:${time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()}:${time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds()}`;
  if (timer.textContent === '00:00:00') {
    alert('Вы победили в конкурсе!');
    clearInterval(timerId2);
  }
}, 1000);
