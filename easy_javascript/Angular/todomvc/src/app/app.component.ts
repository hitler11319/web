/*

component.ts就是Controller
component.html就是View
data.service.ts就是Service
之概念

*/

import { Component } from '@angular/core';
import { DataService } from './data.service';  // 使用service

@Component({
  selector: 'app-root',  // namespace概念
  templateUrl: './app.component.html',  // 真實路徑
  styleUrls: ['./app.component.css']  // css路徑
})

// 我們所設定的東西（NewToDo是我們的函式，但是要註意的是)和{}這種之間都要有空白不然會有紅字）
// 連註解和文字間也要有空白
export class AppComponent {
  title = 'todomvc';
  AppTitle = 'My Angular First Web';
  placeholderText = 'What need to do?';
  background = 'yellow';
  todoValue;

  // 宣告 dataService = new DataService
  constructor(public dataService: DataService) {}

  // 以下皆像controller一樣，指定完路徑就呼叫service實作
  NewToDo(inputElement) {
    // console.log(inputElement.value);
    // this.todos.push(inputElement.value);
    alert(inputElement.value);
    this.dataService.newTodo(inputElement);
  }
  toggleComplete(todo) {
    this.dataService.toggleComplete(todo);
  }
  completeAll() {
    this.dataService.completeAll();
  }
  removeAll(idx, todo) {
    this.dataService.removeAll(idx, todo);
  }
}
