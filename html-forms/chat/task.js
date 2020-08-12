'use strict';

const chatWindow = document.querySelector('div.chat-widget__messages');
const chatInput = document.getElementById('chat-widget__input');
const msgContainer = document.querySelector('div.chat-widget__messages-container');
let inactivityTimer;

const answers = [
  'Ай! Кто здесь?',
  'Вы слишком настойчивы. Кто учил вас манерам?',
  'Не понял ни слова. Попробуйте в двоичном коде.',
  'Мне не нравится ваш тон!',
  'Слушайте, давайте завтра, а? Я хочу спать...',
  'Вы что, не видите, что у нас обед?',
  'Спасибо за ваш вопрос. Мы ответим вам... Никогда. Никогда вас устроит?',
  'И такая фигня целый день: то тюлень позвонит, то свиноолень...'
];

const questions = [
  'Вы там что, уснули?',
  'Почему никто не хочет со мной разговаривать?',
  'Эй, там! Торговать будем?',
  'Что это вы так загадочно молчите? Хотите скидку?',
  'Ваш энтузиазм так быстро угас... Вам что, дорого?'
];

const greetings = [
  'Вы, простите, кто?',
  'Опять вы? Да сколько ж можно!',
  'Здрасте-мордасте.'
];

function sendMessage(message) {
  chatWindow.innerHTML += `<div class="message">
  <div class="message__time">${new Date().toLocaleTimeString('ru', {hour: 'numeric', minute: 'numeric'})}</div>
  <div class="message__text">${message}</div>
</div>`;
  msgContainer.scrollTop = msgContainer.scrollHeight;
}

function phrase(phraseArray) {
  sendMessage(getRandomPhrase(phraseArray));
}

function getRandomPhrase(phraseArray) {
  const phraseIndex = Math.floor(Math.random() * phraseArray.length);
  return phraseArray[phraseIndex];
}

function keepConversationGoing() {
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(() => {
    phrase(questions);
    keepConversationGoing();
  }, 30000);
}

document.addEventListener('click', click => {
  if (click.target.closest('.chat-widget')) {
    click.target.closest('.chat-widget').classList.add('chat-widget_active');
    setTimeout(phrase, 2000, greetings);
    keepConversationGoing();
  }
});

chatInput.addEventListener('keydown', event => {
  if (event.keyCode === 13 && chatInput.value) {
    sendMessage(chatInput.value);
    chatWindow.lastChild.classList.add('message_client');
    chatInput.value = '';
    setTimeout(phrase, 2000, answers);
    keepConversationGoing();
  }
});
