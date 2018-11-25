import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

// 我們所設定的東西（NewToDo是我們的函式，但是要註意的是)和{}這種之間都要有空白不然會有紅字）
// 連註解和文字間也要有空白
export class AppComponent {
  title = 'todomvc';
  AppTitle = 'My Angular First Web';
  placeholderText = 'What need to do?';
  NewToDo(element) {
      alert(element.value);
  }
}
