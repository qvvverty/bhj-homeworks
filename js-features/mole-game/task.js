'use strict';

let deadCounter = document.getElementById('dead');
let lostCounter = document.getElementById('lost');

for (let i = 1; i <= 9; i++) {
  document.getElementById(`hole${i}`).onclick = function() {
    if (this.className.includes('hole_has-mole')) {
      deadCounter.textContent++;
    } else {
      lostCounter.textContent++;
    }

    const resetCounters = () => {
      deadCounter.textContent = 0;
      lostCounter.textContent = 0;
    }
    
    if (deadCounter.textContent == 10) {
      alert('Победа!');
      resetCounters();
    } else if (lostCounter.textContent == 10) {
      alert('Поражение! Кроты уничтожили все деревья!');
      resetCounters();
    }
  }
}