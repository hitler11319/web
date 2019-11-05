// Component

import React from 'react';      // 引用 React 
import logo from './logo.svg';  // 讀取 logo 的檔案
import './App.css';  // 讀取 css

// 一些注意的規則
// class 需寫為 className 以避開 JavaScript 保留字 class。 => 所以下面的class才會寫成className
// Self-closing tag 結尾必須有 / ，例如 <img /> 與 <input /> 與 <br /> 就是平常可以單結束的，就要直接加上 / 
/*
  行內樣式以 style={ styleObj } 表示，styleObj 是含有樣式 key:value 的物件
○ 例如 style={{ color: 'blue', fontSize: '20px' }}
○ 樣式屬性名含有 - 的需寫成駝峰式，例如 margin-left → marginLeft
○ 樣式屬性值以 string 表示
*/
// 要執行js 的話 用個 { } 裡面就可以寫你要的js

// Component 有分為 Class Component 和 Function Component
// 這裡很明顯就是 Function Component (只有一個函式 寫 return 你的 html) => 所以實務上較常使用的是 Class Component
/*
Class Component 
● 繼承 React.Component 子類別的類別
● 擁有 state 與生命週期方法
● 在 constructor() 方法裡初始化組件
● 在 render() 方法裡定義回傳的 React Element
class ClassComp extends React.Component {
  render() {
    return (<h1>Hello React!<h1/>)
  }
}

Function Component
● 單純的 JavaScript function
● 接受傳入的參數(props)並且回傳 React
Element
● 沒有 state 與生命週期方法
function FunctionComp() {
  return (<h1>Hello React!<h1/>)
}
*/

// Function Component的 props 傳入寫法：
// function App(props) -> 只要傳入 資料 => 就可以用 props.msg 取得囉
function App() {

  // 這裡是 js 函式，所以可以自行加變數
  const style_a = { color: 'red', fontSize: '20px' };

  const person = 'John';
  const gender = 'male'
  const greeting = () => (alert(`Hello ${ person }!` ));

  const tmpArr = ['a', 'b', 'c'];

  // 載入其他Component 的話，就類似 index.js 的寫法 
  // 先載入 再用 < 載入的名稱 /> 就會出現他的 render 產生的html 語法
  // 這邊寫 另一種較簡單的 (寫完這行後，就在下面使用 <TestDiv /> 即可)
  const TestDiv = () => (<div>Hello</div>)

  // 一樣可以給參數
  const TestDiv2 = (props) => (<div>Hello {props.gender == 'M' ? 'Mr.' : 'Ms.'}  {props.name}</div>)

  return (
    <div className="App">
      <header className="App-header">
        <TestDiv />
        <TestDiv2 name={'王小明'} gender = {'M'} />
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <p style={style_a}>這是JSX的Style的寫法</p>
      </header>

      <div id='AppBody'>
        {
          // 在這邊 用 大括號包起來 的 就是 執行 js
          // key 最好要有比較好
          tmpArr.map((char, index) => (
            <li key = { index }>{ char }</li>
          ))
        }

        { 
          // 上面的函式 (註解現在都的這麼寫了 哭哭 )
          // 因為這裡面是js 所以 <!----> 這個是沒用的，但直接在function 裡寫 // 他又讀不了
          // 所以只能用 大括號 先包起來告訴他我是js 再用 // 了

          // 這下面其實也可以寫到 像上面一樣的迴圈裡
        }
        <button onClick={ greeting }>
          { gender === 'male' ? `Hello, Mr. ${ person }!` : `Hello, Ms. ${person}`}
        </button>

      </div>
    </div>
  );

}

// 上面的是 Function Component => 我們可以改寫他成 Class Component
// 詳細可以看 Test.js
/*
  class App extends React.Component {

    // 初使化
    constructor(props){
      // 先呼叫 父類別
      super(props);

      this.state = {title : 'React'}
    }

    render() {
      上面的 那隻 return 拿過來放這邊
    }
  }
*/

// 匯出 App 這隻 function 才能給其他地方引用
// 只能匯出一個而已
export default App;
