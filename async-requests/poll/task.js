'use strict';

const pollAnswers = document.getElementById('poll__answers');
const request = new XMLHttpRequest();
request.addEventListener('readystatechange', () => {
  if (request.readyState === 4 && request.status === 200) {
    const response = JSON.parse(request.response);
    pollAnswers.setAttribute('pollID', response.id)
    document.getElementById('poll__title').innerText = response.data.title;
    response.data.answers.forEach((answer, answerIndex) => {
      const answerButton = document.createElement('button');
      answerButton.classList.add('poll__answer');
      answerButton.setAttribute('answerIndex', answerIndex);
      answerButton.innerText = answer;
      pollAnswers.appendChild(answerButton);
    });
  }
});

document.addEventListener('click', click => {
  if (click.target.classList.contains('poll__answer')) {
    alert('Спасибо, ваш голос засчитан!');
    const answerRequest = new XMLHttpRequest();
    answerRequest.addEventListener('readystatechange', () => {
      if (answerRequest.readyState === 4 && answerRequest.status === 200) {
        const pollStats = JSON.parse(answerRequest.response);
        pollAnswers.innerHTML = '';
        let totalVotes = 0;
        for (const statItem of pollStats.stat) {
          totalVotes += statItem.votes;
        }
        for (const statItem of pollStats.stat) {
          const votesPersent = statItem.votes / totalVotes * 100;
          pollAnswers.innerHTML += `<p>${statItem.answer}: <b>${votesPersent.toFixed(2)}%</b></p>`
        }
      }
    });

    answerRequest.open('POST', 'https://netology-slow-rest.herokuapp.com/poll.php');
    answerRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    answerRequest.send(`vote=${click.target.parentElement.getAttribute('pollID')}&answer=${click.target.getAttribute('answerIndex')}`);
  }
});

request.open('GET', 'https://netology-slow-rest.herokuapp.com/poll.php');
request.send();