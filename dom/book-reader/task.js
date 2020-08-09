'use strict';

document.addEventListener('click', click => {
  if (click.target.tagName === 'A' && click.target.parentElement.classList.contains('book__control')) {
    click.preventDefault();
  }

  const book = document.getElementById('book');
  book.removeFontSize = function() {
    this.classList.remove('book_fs-small', 'book_fs-big');
  }
  book.removeFontColor = function() {
    this.classList.remove('book_color-gray', 'book_color-whitesmoke');
  }
  book.removeBgColor = function() {
    this.classList.remove('book_bg-gray', 'book_bg-black');
  }

  const menuControl = function(whatControls) {
    const activeButton = click.target.parentElement.querySelector(`a.${whatControls}_active`);
    if (activeButton !== click.target) {
      activeButton.classList.remove(`${whatControls}_active`);
      click.target.classList.add(`${whatControls}_active`);
    }
  }

  menuControl(click.target.classList[0]);

  switch (click.target.dataset.size) {
    case 'small':
      book.removeFontSize();
      book.classList.add('book_fs-small');
      break;
    case 'big':
      book.removeFontSize();
      book.classList.add('book_fs-big');
      break;
    default:
      book.removeFontSize();
  }

  if (click.target.parentElement.classList.contains('book__control_color')) {
    switch (click.target.dataset.color) {
      case 'gray':
        book.removeFontColor();
        book.classList.add('book_color-gray');
        break;
      case 'whitesmoke':
        book.removeFontColor();
        book.classList.add('book_color-whitesmoke');
        break;
      default:
        book.removeFontColor();
    }
  }

  if (click.target.parentElement.classList.contains('book__control_background')) {
    switch (click.target.dataset.color) {
      case 'gray':
        book.removeBgColor();
        book.classList.add('book_bg-gray');
        break;
      case 'black':
        book.removeBgColor();
        book.classList.add('book_bg-black');
        break;
      default:
        book.removeBgColor();
    }
  }
});
