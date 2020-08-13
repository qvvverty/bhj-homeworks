'use strict';

document.addEventListener('change', change => {
  if (change.target.classList.contains('interest__check')) {
    const allDescendingCheckboxes = change.target.closest('.interest').querySelectorAll('.interest__check');
    if (change.target.checked) {
      for (const checkbox of allDescendingCheckboxes) {
        checkbox.checked = true;
      }
    } else {
      for (const checkbox of allDescendingCheckboxes) {
        checkbox.checked = false;
        checkbox.indeterminate = false;
      }
    }

    function indeterminateAscending(elem) {
      if (!elem.closest('.interests').classList.contains('interests_main')) {
        const nearestAscending = elem.closest('.interests').parentElement;
        const neighbors = nearestAscending.querySelector('.interests').children;
        let checkedCounter = 0;
        let isIndeterminate = false;
        for (const neighbor of neighbors) {
          if (neighbor.querySelector('.interest__check').indeterminate) {
            isIndeterminate = true;
            break;
          }
          if (neighbor.querySelector('.interest__check').checked || neighbor.querySelector('.interest__check').indeterminate) {
            checkedCounter += 1;
          }
        }

        if (isIndeterminate === true) {
          nearestAscending.querySelector('.interest .interest__check').checked = false;
          nearestAscending.querySelector('.interest__check').indeterminate = true;
        } else if (checkedCounter >= 1 && checkedCounter < neighbors.length) {
          nearestAscending.querySelector('.interest .interest__check').checked = false;
          nearestAscending.querySelector('.interest__check').indeterminate = true;
        } else if (checkedCounter === neighbors.length) {
          nearestAscending.querySelector('.interest .interest__check').indeterminate = false;
          nearestAscending.querySelector('.interest .interest__check').checked = true;
        } else if (checkedCounter === 0) {
          nearestAscending.querySelector('.interest .interest__check').indeterminate = false;
          nearestAscending.querySelector('.interest .interest__check').checked = false;
        }

        indeterminateAscending(nearestAscending.querySelector('.interest__check'));
      }
    }

    indeterminateAscending(change.target);
  }
});