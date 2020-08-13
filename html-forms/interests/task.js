'use strict';

// document.addEventListener('click', function(click) {
//   if (click.target.classList.contains('interest__check')) {
//     const sameLevelElements = click.target.closest('.interest').parentElement.children;
//     let checkedCounter = 0;
//     for (const li of sameLevelElements) {
//       if (li.querySelector('.interest__check').checked) {
//         checkedCounter += 1;
//       }
//     }
//     console.log(checkedCounter);
//     if (checkedCounter === sameLevelElements.length) {
//       click.target.closest('.interest').parentElement.previousElementSibling.querySelector('.interest__check').checked = true;
//     } else {
//       click.target.closest('.interest').parentElement.previousElementSibling.querySelector('.interest__check').checked = false;
//     }
//   }
// });

document.addEventListener('change', change => {
  if (change.target.classList.contains('interest__check')) {
    // Все нисходящие
    const allDescendingCheckboxes = change.target.closest('.interest').querySelectorAll('.interest__check');
    if (change.target.checked) {
      for (const checkbox of allDescendingCheckboxes) {
        checkbox.checked = true;
      }
    } else {
      for (const checkbox of allDescendingCheckboxes) {
        checkbox.checked = false;
      }
    }
    // Закончили с нисходящими

    function indeterminateAscending(elem) {
      if (elem.closest('.interests')) {
        const nearestAscending = elem.closest('.interests').parentElement;
        console.log(nearestAscending);
        const neighbors = nearestAscending.querySelector('.interests').children;
        let checkedCounter = 0;
        for (const neighbor of neighbors) {
          if (neighbor.querySelector('.interest__check').checked) {
            checkedCounter += 1;
          }
        }
        console.log(checkedCounter, neighbors.length)
        if (checkedCounter >= 1 && checkedCounter < neighbors.length) {
          nearestAscending.querySelector('.interest .interest__check').checked = false;
          nearestAscending.querySelector('.interest__check').indeterminate = true;
        } else if (checkedCounter === neighbors.length) {
          nearestAscending.querySelector('.interest .interest__check').indeterminate = false;
          nearestAscending.querySelector('.interest .interest__check').checked = true;
        } else if (checkedCounter === 0) {
          nearestAscending.querySelector('.interest .interest__check').indeterminate = false;
          nearestAscending.querySelector('.interest .interest__check').checked = false;
      }
      indeterminateAscending(nearestAscending);
      }
    }

    indeterminateAscending(change.target);
    // if (change.target.closest('.interests').parentElement) {
    //   indeterminateAscending(change.target);
    // }
  }
});