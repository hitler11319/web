// 入口點

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';  // 載入 我們 App.js 這隻 Component
import Test from './Test';
import API from './API';
import ToDoList from './ToDoList/ToDoList';
import * as serviceWorker from './serviceWorker';  // 相關網頁的設定檔 (含 location )

// render 出來 (<App /> 就是我們上面的這個 APP， 而那個 App 如果你去看 App.js 的話就會知道，他其實是一個html) ， 後面的就是你要渲染到哪個物件上
// 用 Function Component 寫的
ReactDOM.render(<App />, document.getElementById('root')); 

// 測試的 (用 Class component 寫的)
ReactDOM.render(<Test />, document.getElementById('test')); 

// 有傳入 props的 (這邊就是傳入 count 參數 ，值的部份要用大括號包起來喔)
ReactDOM.render(<API count= {3} />, document.getElementById('api')); 

ReactDOM.render(<ToDoList />, document.getElementById('todoList')); 

/* 

    上面的例子還有一種：
    const Message = () => <div>Hello<div>
    <Message />

    跟上面很像吧， 這個 <Message /> 就是 上面的 <div>Hello<div>
*/

/* 新建物件
    const reactElement = <h1 className='title'>Hello React!</h1>
    // 經 Bable 編譯會等同於
    React.createElement('h1', { className: 'title' }, 'Hello React!')
*/

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
