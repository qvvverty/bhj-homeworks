'use strict';

const sliderItems = Array.from(document.getElementsByClassName('slider__item'));
const sliderDots = Array.from(document.getElementsByClassName('slider__dot'));
let activeIndex = sliderItems.findIndex(slide => slide.classList.contains('slider__item_active'));
sliderDots[activeIndex].classList.add('slider__dot_active');

function deactSlide() {
  sliderItems[activeIndex].classList.remove('slider__item_active');
  sliderDots[activeIndex].classList.remove('slider__dot_active');
}

function actSlide() {
  sliderItems[activeIndex].classList.add('slider__item_active');
  sliderDots[activeIndex].classList.add('slider__dot_active');
}

for (let dot of sliderDots) {
  dot.onclick = () => {
    deactSlide();
    activeIndex = sliderDots.findIndex(dotIter => dotIter === dot);
    actSlide();
  };
}

const arrowNext = document.querySelector('.slider__arrow_next');
arrowNext.onclick = () => {
  deactSlide();

  if (activeIndex < sliderItems.length - 1) {
    activeIndex++;
  } else {
    activeIndex = 0;
  }

  actSlide();
};

const arrowPrev = document.querySelector('.slider__arrow_prev');
arrowPrev.onclick = () => {
  deactSlide();

  if (activeIndex > 0) {
    activeIndex--;
  } else {
    activeIndex = sliderItems.length - 1;
  }

  actSlide();
};
