'use strict';

const tabNav = Array.from(document.getElementsByClassName('tab'));
const tabContent = Array.from(document.getElementsByClassName('tab__content'));
let activeIndex = tabNav.findIndex(tab => tab.classList.contains('tab_active'));

for (let tab of tabNav) {
  tab.addEventListener('click', () => {
    tabNav.forEach(tab => {
      if (tab.classList.contains('tab_active')) {
        tab.classList.remove('tab_active');
      }
    });
    tabContent[activeIndex].classList.remove('tab__content_active');

    activeIndex = Array.from(tab.parentElement.children).findIndex(currentTab => currentTab === tab);

    tabNav.forEach(currentTab => {
      if (currentTab.textContent.trim() === tab.textContent.trim()) {
        currentTab.classList.add('tab_active');
      }
    });
    tabContent[activeIndex].classList.add('tab__content_active');
  });
}
