'use strict';

const toggleActive = element => {
  element.classList.toggle('rotator__case_active');
}

const nextElement = element => {
  if (element.nextElementSibling === null) {
    return element.parentElement.children[0];
  } else {
    return element.nextElementSibling;
  }
}

const rotate = element => {
  if (element.dataset.color) {
    element.style.color = element.dataset.color;
  }
  setTimeout(() => {
    toggleActive(element);
    toggleActive(nextElement(element));
    rotate(nextElement(element));
  }, element.dataset.speed);
}

const rotatorsActive = document.querySelectorAll('span.rotator__case_active');
for (const rotator of rotatorsActive) {
  rotate(rotator);
}
