'use strict';

function addCurrency(code, value, currency) {
  const currencyItem = document.createElement('div');
  currencyItem.classList.add('item');
  currencyItem.innerHTML = `
    <div class="item__code">${code}</div>
    <div class="item__value">${value}</div>
    <div class="item__currency">${currency}</div>
  `;

  document.getElementById('items').appendChild(currencyItem);
}

const request = new XMLHttpRequest();
const cache = [];

if (localStorage.rates) {
  document.getElementById('items').before(document.getElementById('loader'));
  const ratesUncached = JSON.parse(localStorage.rates);
  for (const rate of ratesUncached) {
    addCurrency(rate.code, rate.value, rate.currency);
  }
}

request.addEventListener('readystatechange', () => {
  if (request.readyState === 4 && request.status === 200) {
    document.getElementById('loader').classList.remove('loader_active');

    const rates = JSON.parse(request.response);
    document.getElementById('items').innerHTML = '';
    for (const valuteItem in rates.response.Valute) {
      const thisItem = rates.response.Valute[valuteItem];
      addCurrency(thisItem.CharCode, thisItem.Value, thisItem.Name);
      cache.push({
        code: thisItem.CharCode,
        value: thisItem.Value,
        currency: thisItem.Name
      });
    }

    localStorage.rates = JSON.stringify(cache);
  }
});

request.open('GET', 'https://netology-slow-rest.herokuapp.com/');
request.send();