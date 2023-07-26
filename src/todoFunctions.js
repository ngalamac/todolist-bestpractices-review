/* eslint-disable no-use-before-define */
export const tasks = [];

export const addTask = (description) => {
  const newTask = {
    description,
    completed: false,
    index: tasks.length + 1,
  };
  tasks.push(newTask);
};

export const deleteTask = (index) => {
  tasks.splice(index - 1, 1);
  updateIndexes();
};

export const editTaskDescription = (index, newDescription) => {
  tasks[index - 1].description = newDescription;
};

export const updateIndexes = () => {
  tasks.forEach((task, index) => {
    task.index = index + 1;
  });
};

export const saveToLocalStorage = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

export const loadFromLocalStorage = () => {
  const storedTasks = JSON.parse(localStorage.getItem('tasks'));
  if (storedTasks) {
    tasks.push(...storedTasks);
  }
};
