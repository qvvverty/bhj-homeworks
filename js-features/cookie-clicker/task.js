'use strict';

const clickCounter = document.getElementById('clicker__counter');
const cps = document.getElementById('cps');
const cookie = document.getElementById('cookie');
let timeInit = new Date();
let timeOnClick;
cookie.onclick = function() {
  clickCounter.textContent++;
  cookie.width === 200 ? cookie.width = 250 : cookie.width = 200;
  timeOnClick = new Date();
  cps.textContent = (1 / ((timeOnClick - timeInit) / 1000)).toFixed(2);
  timeInit = new Date();
}