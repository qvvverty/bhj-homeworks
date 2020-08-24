'use strict';

function toggleWelcome(userID) {
  document.getElementById('user_id').innerText = userID;
  document.getElementById('welcome').classList.toggle('welcome_active');
}

function toggleSignInForm() {
  document.getElementById('signin').classList.toggle('signin_active');
}

function toggleLogoutBtn() {
  document.getElementById('logout__btn').classList.toggle('logout__btn_active');
}

if (localStorage.userID) {
  toggleWelcome(localStorage.userID);
  toggleLogoutBtn();
} else {
  toggleSignInForm();
}

const form = document.forms[0];
form.addEventListener('submit', submit => {
  submit.preventDefault();
  const request = new XMLHttpRequest();
  request.addEventListener('readystatechange', () => {
    if (request.readyState === 4 && request.status === 200) {
      const response = JSON.parse(request.response);
      if (response.success) {
        const userID = response.user_id;
        toggleWelcome(userID);
        toggleSignInForm();
        toggleLogoutBtn();
        document.getElementById('login_failed').classList.remove('login_failed_active');
        
        localStorage.setItem('userID', userID);
      } else {
        document.getElementById('login_failed').classList.add('login_failed_active');
      }
    }
  });
  request.open('POST', 'https://netology-slow-rest.herokuapp.com/auth.php');
  request.send(new FormData(form));

  const inputs = form.getElementsByClassName('control');
  for (const input of inputs) {
    input.value = '';
  }
});

document.addEventListener('click', click => {
  if (click.target.id === 'logout__btn') {
    localStorage.removeItem('userID');
    toggleWelcome();
    toggleSignInForm();
    toggleLogoutBtn();
  }
});