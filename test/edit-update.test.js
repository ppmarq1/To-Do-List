/**
 * @jest-environment jsdom
 */

import TaskList, { storageName } from '../src/modules/class-task-list.js';
import refreshList from '../src/modules/refresh-list.js';

const taskList = new TaskList();
const taskA = 'This is task A';
const taskB = 'This is task B';
const taskC = 'This is task C';
const taskBNew = 'Edit task B';

beforeAll(() => {
  taskList.addTask(taskA);
  taskList.addTask(taskB);
  taskList.addTask(taskC);
  refreshList(taskList, document.body);
});

describe('Check if edit, update, and clear are working:', () => {
  describe('Edit', () => {
    test(`localStorage edit task: "${taskB}" to "${taskBNew}"`, () => {
      taskList.renameTask(2, taskBNew);

      expect(JSON.parse(localStorage.getItem(storageName)))
        .toEqual([
          { description: taskA, id: 1, completed: false },
          { description: taskBNew, id: 2, completed: false },
          { description: taskC, id: 3, completed: false },
        ]);
    });
    // DOM
    test(`DOM edit task: "${taskB}" to "${taskBNew}"`, () => {
      refreshList(taskList, document.body);

      const taskBNewElement = document.querySelectorAll('.todo-list')[1];
      const taskBNewText = taskBNewElement.querySelector('.list-text');

      expect(taskBNewText.value)
        .toBe(taskBNew);
    });
  });
  describe('Update status of task :', () => {
    test(`localStorage update task: "${taskBNew}" to completed`, () => {
      taskList.updateStatus(2, true);

      expect(JSON.parse(localStorage.getItem(storageName)))
        .toEqual([
          { description: taskA, id: 1, completed: false },
          { description: taskBNew, id: 2, completed: true },
          { description: taskC, id: 3, completed: false },
        ]);
    });

    test(`DOM update status of the task: "${taskBNew}" to completed`, () => {
      refreshList(taskList, document.body);

      const taskBNewElement = document.querySelectorAll('.todo-list')[1];
      const taskBNewCheckBox = taskBNewElement.querySelector('.checkbox');

      expect(taskBNewCheckBox.checked)
        .toBe(true);
    });
  });
  describe('Clear all completed tasks:', () => {
    test(`localStorage clear completed tasks ("${taskBNew}")`, () => {
      taskList.clearCompleted();
      expect(JSON.parse(localStorage.getItem(storageName)))
        .toEqual([
          { description: taskA, id: 1, completed: false },
          { description: taskC, id: 2, completed: false },
        ]);
    });
    // DOM
    test(`DOM clear completed tasks ("${taskBNew}")`, () => {
      refreshList(taskList, document.body);

      const validateElements = document.querySelectorAll('.todo-list');

      expect(validateElements.length)
        .toBe(2);
    });
  });
});
