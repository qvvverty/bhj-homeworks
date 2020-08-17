'use strict';

function saveTasks() {
  const tasksArr = [];
  const tasks = document.getElementsByClassName('task__title');
  for (let i = 0; i < tasks.length; i++) {
    tasksArr[i] = tasks[i].innerText;
  }
  localStorage.setItem('tasks', JSON.stringify(tasksArr));
}

function loadTasks() {
  if (localStorage.getItem('tasks')) {
    const tasksArr = JSON.parse(localStorage.getItem('tasks'));
    for (const task of tasksArr) {
      addTask(task);
    }
  }
}

function addTask(taskContent) {
  const newTask = document.createElement('div');
  newTask.innerHTML = `
    <div class="task__title">
      ${taskContent}
    </div>
    <a href="#" class="task__remove">&times;</a>
  `;
  newTask.classList.add('task');

  document.getElementById('tasks__list').appendChild(newTask);
}

loadTasks();

document.addEventListener('click', click => {
  if (click.target.id === 'tasks__add') {
    click.preventDefault();
    
    let taskInputFieldValue = document.getElementById('task__input').value;
    if (taskInputFieldValue) {
      addTask(taskInputFieldValue);
      taskInputFieldValue = '';
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