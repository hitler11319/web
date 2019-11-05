// Component

import React from 'react';      // 引用 React 
import ItemList from './ItemList';

// 寫個 Class Component
// 這邊的 TodoList (我自己做的) 不知有何錯誤，且我的實作方法有違 ReactJS的精神(單向資料傳輸)，
// 我在ItemList.js中還對父親做事 => 變成雙向的
// 故這邊的就不要看了 => 改看 todolist-old 那個資料夾裡的內容
class ToDoList extends React.Component {

        // 初使化
        constructor(props){
          // 先呼叫 父類別
          super(props);
    
          this.state = {
                input : "",  //盡量不要用 單引號
                itemList : []
          }
        }

        onChangeInput = (e) => {
              const value = e.target.value;
              this.setState({input : value});             
        }
        // 函式名盡量不要用大寫開頭
        onSubmit = () => {
              if (!this.state.input.trim()){return;}

              const len = this.state.itemList.length;

              const old = this.state.itemList;
              const tmp = {
                  id : len,
                  isFinish : false,
                  name : this.state.input
              }
              // ...old 的用法就是只 old 的陣列全部資料
              // 例如： old = [1, 2, 3]
              // 那 ...old 會自動把 1, 2, 3 加入進去
              const newList = [...old, tmp];

              this.setState({itemList : newList, input : ""})

              /*
                  push 會改到原本的，建議用下方
                  const old = this.state.itemList
                  const tmp = {
                        id : len,
                        isFinish : false,
                        name : this.state.input
                  }
                  this.setState({input : '', itemList : [...old, tmp]})
              */
        }
    
        // 固定寫這個函式 => 產生出你要呈現的 html
        // 每次值變了就會 render => 所以在 submit 中 把 input改變了
        render() {
              const {input} = this.state;
          return (
                <div>
                      <input type="text" value={input} onChange={(e) => this.onChangeInput(e)} />
                      <button type="button" onClick={() => this.onSubmit()}>Submit</button>

                      <ItemList list={this.state.itemList} />
                </div>
          );
        }
}

// 匯出 App 這隻 function 才能給其他地方引用
// 只能匯出一個而已
export default ToDoList;
