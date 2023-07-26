/* eslint-disable radix */
/* eslint-disable no-use-before-define */
import './style.css';
import {
  tasks, addTask, deleteTask, saveToLocalStorage, loadFromLocalStorage,
} from './todoFunctions.js';

document.addEventListener('DOMContentLoaded', () => {
  loadFromLocalStorage();
  populateTodoList(tasks);

  // Event listener for adding a new task
  const todoInput = document.getElementById('todo-input');
  todoInput.addEventListener('keypress', handleAddTask);

  // Event listener for deleting a task when checkbox is ticked
  const todoList = document.getElementById('todo-list');
  todoList.addEventListener('change', handleTaskCheckboxChange);

  // Event listener for deleting a task using the delete button
  todoList.addEventListener('click', handleDeleteButtonClick);

  // Event listener for clearing all completed tasks
  const clearCompletedBtn = document.getElementById('clear-completed-btn');
  clearCompletedBtn.addEventListener('click', handleClearCompleted);
});

function handleAddTask(event) {
  if (event.key === 'Enter') {
    const description = event.target.value.trim();
    if (description !== '') {
      addTask(description);
      saveToLocalStorage();
      populateTodoList(tasks);
      event.target.value = '';
    }
  }
}

function handleTaskCheckboxChange(event) {
  if (event.target.classList.contains('task-completed')) {
    const index = parseInt(event.target.dataset.index);
    tasks[index - 1].completed = event.target.checked;
    if (event.target.checked) {
      addDeleteButton(index);
    } else {
      removeDeleteButton(index);
    }
    saveToLocalStorage();
  }
}

function handleDeleteButtonClick(event) {
  if (event.target.classList.contains('delete-btn')) {
    const index = parseInt(event.target.dataset.index);
    deleteTask(index);
    saveToLocalStorage();
    populateTodoList(tasks);
  }
}

function handleClearCompleted() {
  tasks.filter((task) => task.completed).forEach((task) => {
    const index = tasks.indexOf(task);
    deleteTask(index + 1);
  });
  saveToLocalStorage();
  populateTodoList(tasks);
}

function populateTodoList(tasks) {
  const todoList = document.getElementById('todo-list');
  todoList.innerHTML = '';

  // eslint-disable-next-line no-unused-vars
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.innerHTML = `
      <input type="checkbox" class="task-completed" data-index="${task.index}" ${task.completed ? 'checked' : ''}>
      <input type="text" class="task-description" data-index="${task.index}" value="${task.description}">
      <div class="task-actions">
        <span class="vertical-dots">&#8942;</span>
      </div>
    `;
    todoList.appendChild(li);

    if (task.completed) {
      addDeleteButton(task.index);
    }
  });
}

function addDeleteButton(index) {
  const taskItem = document.querySelector(`[data-index="${index}"]`).closest('.todo-item');
  if (!taskItem.querySelector('.delete-btn')) {
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.dataset.index = index;
    deleteBtn.textContent = 'Delete';
    taskItem.querySelector('.task-actions').appendChild(deleteBtn);
  }
}

function removeDeleteButton(index) {
  const taskItem = document.querySelector(`[data-index="${index}"]`).closest('.todo-item');
  const deleteBtn = taskItem.querySelector('.delete-btn');
  if (deleteBtn) {
    deleteBtn.remove();
  }
}
