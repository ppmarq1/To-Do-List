/**
 * @jest-environment jsdom
 */

import TaskList, { storageName } from '../src/modules/class-task-list.js';
import refreshList from '../src/modules/refresh-list.js';

const taskList = new TaskList();
const taskA = 'This is task A';
const taskB = 'This is task B';
const taskC = 'This is task C';

// add test part 1

describe('Check if the localStorage and the DOM are used:', () => {
  describe('Add items:', () => {
    test(`localStorage add task: "${taskA}"`, () => {
      taskList.addTask(taskA);

      expect(JSON.parse(localStorage.getItem(storageName)))
        .toEqual([{ description: taskA, id: 1, completed: false }]);
    });
    test(`DOM add task: "${taskA}"`, () => {
      refreshList(taskList, document.body);
      const validateElements = document.querySelectorAll('.todo-list');

      expect(validateElements.length)
        .toBe(1);
    });

    test(`localStorage add task: "${taskB}"`, () => {
      taskList.addTask(taskB);

      expect(JSON.parse(localStorage.getItem(storageName)))
        .toEqual([
          { description: taskA, id: 1, completed: false },
          { description: taskB, id: 2, completed: false },
        ]);
    });

    test(`DOM add task: "${taskB}"`, () => {
      refreshList(taskList, document.body);
      const validateElements = document.querySelectorAll('.todo-list');

      expect(validateElements.length)
        .toBe(2);
    });

    test(`localStorage add task: "${taskC}"`, () => {
      taskList.addTask(taskC);

      expect(JSON.parse(localStorage.getItem(storageName)))
        .toEqual([
          { description: taskA, id: 1, completed: false },
          { description: taskB, id: 2, completed: false },
          { description: taskC, id: 3, completed: false },
        ]);
    });

    test(`DOM add task: "${taskC}"`, () => {
      refreshList(taskList, document.body);
      const validateElements = document.querySelectorAll('.todo-list');

      expect(validateElements.length)
        .toBe(3);
    });
  });
  // remove test part 1
  describe('Remove items:', () => {
    test(` localStorage remove task: "${taskA}"`, () => {
      taskList.removeTask(1);

      expect(JSON.parse(localStorage.getItem(storageName)))
        . toEqual([
          { description: taskB, id: 1, completed: false },
          { description: taskC, id: 2, completed: false },
        ]);
    });

    test(`DOM remove task: "${taskA}"`, () => {
      refreshList(taskList, document.body);
      const validateElements = document.querySelectorAll('.todo-list');

      expect(validateElements.length)
        .toBe(2);
    });

    test(`localStorage remove task: "${taskC}"`, () => {
      taskList.removeTask(2);

      expect(JSON.parse(localStorage.getItem(storageName)))
        . toEqual([
          { description: taskB, id: 1, completed: false },
        ]);
    });

    test(`DOM remove task: "${taskC}"`, () => {
      refreshList(taskList, document.body);
      const validateElements = document.querySelectorAll('.todo-list');

      expect(validateElements.length)
        .toBe(1);
    });
  });
});
