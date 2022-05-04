// ### 0. Imports
import './style.css';

// ### 1. Data
const taskList = [
  {
    description: 'Shopping',
    completed: false,
    index: 0,
  },
  {
    description: 'Study ES6 - Webpack',
    completed: true,
    index: 1,
  },
  {
    description: 'Complete Awesome Books ES6',
    completed: false,
    index: 2,
  },
  {
    description: 'Workout',
    completed: true,
    index: 3,
  },
];

// ### 2. DOM Manipulations
const mainContainer = document.querySelector('.todo-list-container');

mainContainer.innerHTML = `<div class="row">
<h1>Today's To Do</h1>
<i class="fa-solid fa-rotate fa-lg font-awesome-icon"></i>
</div>
<div>
<input placeholder="Add to your list...">
</div>`;

taskList.forEach((e) => {
  let isChecked;
  let strikeThrough;
  if (e.completed === true) {
    isChecked = 'checked';
    strikeThrough = 'strike-through';
  }

  mainContainer.innerHTML += `<div class="row">
  <input class="checkbox" type="checkbox" ${isChecked}>
  <p class="${strikeThrough}">${e.description}</p>
  <i class="fa-solid fa-ellipsis-vertical fa-lg font-awesome-icon"></i>
  </div>`;
});

mainContainer.innerHTML += '<button class="button">Clear all completed</button>';
