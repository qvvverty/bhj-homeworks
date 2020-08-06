'use strict';

const reveal = document.getElementsByClassName('reveal');

document.addEventListener('scroll', () => {
  for (const div of reveal) {
    if (div.getBoundingClientRect().top <= window.innerHeight - 300) {
      div.classList.add('reveal_active');
    }
  }
});