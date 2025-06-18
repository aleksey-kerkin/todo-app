document.addEventListener('DOMContentLoaded', () => {
  const taskForm = document.querySelector('.task__form');
  const taskInput = document.querySelector('.task__input');
  const taskList = document.querySelector('.task__list');

  loadTasksFromLocalStorage();

  taskForm.addEventListener('submit', addTask);

  function addTask(e) {
    e.preventDefault();
    if (taskInput.value.trim() === '') {
      alert('Please add a task');
      return;
    }

    const li = document.createElement('li');
    li.textContent = taskInput.value;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', toggleTaskCompletion);
    li.insertBefore(checkbox, li.firstChild);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', deleteTask);
    li.appendChild(deleteButton);

    taskList.appendChild(li);
    taskInput.value = '';

    saveTasksToLocalStorage();
  }

  function toggleTaskCompletion(e) {
    const li = e.target.parentElement;
    li.classList.toggle('task__list__item--completed');
    saveTasksToLocalStorage();
  }

  function deleteTask(e) {
    const li = e.target.parentElement;
    taskList.removeChild(li);
    saveTasksToLocalStorage();
  }

  function saveTasksToLocalStorage() {
    const tasks = Array.from(taskList.children).map((item) => ({
      text: item.textContent.split('Delete')[0].trim(),
      completed: item.classList.contains('task__list__item--completed'),
    }));
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach((task) => {
      const li = document.createElement('li');
      li.textContent = task.text;

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.completed;
      checkbox.addEventListener('change', toggleTaskCompletion);
      li.insertBefore(checkbox, li.firstChild);

      if (task.completed) {
        li.classList.add('task__list__item--completed');
      }

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', deleteTask);
      li.appendChild(deleteButton);

      taskList.appendChild(li);
    });
  }
});
