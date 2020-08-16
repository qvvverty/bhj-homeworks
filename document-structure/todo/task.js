'use strict';

function saveTasks() {
  localStorage.setItem('tasks', document.getElementById('tasks__list').outerHTML);
}

function loadTasks() {
  document.getElementById('tasks__list').outerHTML = localStorage.getItem('tasks');
}

loadTasks();

document.addEventListener('click', click => {
  if (click.target.id === 'tasks__add') {
    click.preventDefault();
    
    if (document.getElementById('task__input').value) {
      const newTask = document.createElement('div');
      newTask.innerHTML = `
        <div class="task__title">
          ${document.getElementById('task__input').value}
        </div>
        <a href="#" class="task__remove">&times;</a>
      `;
      newTask.classList.add('task');

      document.getElementById('tasks__list').appendChild(newTask);

      document.getElementById('task__input').value = '';
      
      saveTasks();
    }
  }
});

document.addEventListener('click', click => {
  if (click.target.classList.contains('task__remove')) {
    click.target.parentElement.remove();
    saveTasks();
  }
});
