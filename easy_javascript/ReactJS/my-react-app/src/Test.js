// Component

import React from 'react';      // 引用 React 
import logo from './logo.svg';  // 讀取 logo 的檔案
import './App.css';  // 讀取 css

// 寫個 Class Component
class Test extends React.Component {

        // 初使化
        constructor(props){
          // 先呼叫 父類別
          super(props);
    
          // this.state 只能用 setState({title : 'ReactA', value : 'kkk'}}) 來改變
          // 看 API.js
          this.state = {title : 'React'}

          // 如果要影響 父親的 state 的話，那就把父親的state 傳下來， 再用 setState去改變他
        }
    
        // 固定寫這個函式 => 產生出你要呈現的 html
        render() {
          // return ( html 語法中，一定要有個最外層的容器包起來，不能 好幾個散掉的 )
          return (<div></div>);
        }
}

// 匯出 App 這隻 function 才能給其他地方引用
// 只能匯出一個而已
export default Test;
