// Service的概念

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  title = 'todomvc';
  AppTitle = 'TodoMVC';
  placeholderText = 'What needs to be done?';
  background = 'yellow';
  todoValue;  // 變數
  state;  // 變數
  todos = [];  // 變數
  constructor() {}

  // 新增資料（push）
  newTodo(element) {
    this.todos.push({
      isCompleted: false,
      label: element.value
    });
  }

  // 變成相反的狀態
  toggleComplete(todo) {
    todo.isCompleted = !todo.isCompleted;
  }

  // 把所有的狀態變成true
  completeAll() {
    this.todos.forEach(todo => (todo.isCompleted = true));
  }

  // 刪除資料
  removeAll(idx, todo) {
    // 方法1
    // this.todos.splice(this.todos.indexOf(todo), 1);
    // 方法2(實務上常用)
    // this.todos = this.todos.filter(_todo => _todo !== todo);
    // 方法3
    this.todos.splice(idx, 1);
    // 刪除全部
    // this.todos.length = 0;
  }

  // 用get 的就是property的概念（所以可以直接在前端用dataService.itemLeft呼叫）
  get itemLeft() {
    return this.todos.filter(x => x.isCompleted === false).length;
  }

  // 把所有狀態變成false
  clearComplete() {
    this.todos = this.todos.filter(todo => todo.isCompleted === false);
  }
}
