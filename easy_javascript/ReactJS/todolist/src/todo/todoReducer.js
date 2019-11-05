// Reducer (邏輯處理中心，純JS function)
// 單純是個 收參數 + 傳回新的 state 回去的形式

import {types} from './todoActions';   //引入


// 定義初使物件(以防 得到的 state 是 空的話，要回傳這個 初使物件 回去)
// 以這次 ToDoList 為例 就是 this.state 所設定的那樣
// 這就是初使化的state ， 往後的state 就是這樣傳的
const initialState = {
      input : '',
      todoMap : {},
      index : -1
}

// 開始編寫 (這邊比較像 Controller ， 依據收的的 type 做 其應做的事)
// 參數固定就是這2個 (state 和 action)
// 而 state = initialState 是代表 ，如果 state 是空的 ，就代入 initialState
function reducer(state = initialState, action)  {

      const {input, todoMap, index} = state;  // 傳入的參數 (跟原本的 this.state很像)

      // 依據 type
      switch(action.type){
            case types.CHANGE_INPUT :
                  // 這和最下面的default不一樣， default 的是把傳過來的state直接傳回去；這邊的是把 傳過來的state化成新的物件再傳回去
                  return { 
                        ...state,  // 要傳回舊的 + 要改的 => Store 會把他更新
                        input : action.value  // action 就是從 Action 回傳回來的物件
                  };

            case types.ADD_TODO:
                  if (!input.trim()) return state;
                  const newID = index + 1;
                  return { 
                        ...state,  // ... 就是展開其所有的元素出來
                        todoMap: { 
                              ...todoMap,   // 同下面解說(但因為 newID 不在原本 todoMap 的 裡面 => 所以才合併後多出他)
                              [newID]: {
                                    isCompleted: false,
                                    title : input,
                                    id : newID
                              } 
                        },
                        input: '',
                        index: index + 1
                  }; 

            case types.DELETE_TODO:
                  const deleteID = action.id;

                  if (deleteID !== undefined){
                        const newTodo = { ...todoMap }   // 這裡的 todoMap 是最上面 先取得 state的
                        delete newTodo[deleteID]
                        return { 
                              ...state ,
                              todoMap: newTodo
                        }; 
                  }else{
                        return state
                  }

            case types.TOGGLE_TODO:
                  const toggleID = action.id;

                  if (toggleID !== undefined){
                        return { 
                              ...state ,
                              todoMap:{
                                    ...todoMap,
                                    // 同上 用 id 對應到這個物件 => 並做修改即可
                                    [toggleID]: {
                                      ...todoMap[toggleID],  // ...todoMap[toggleID] 會回傳 全部的元素(id, isCompleted, title )，但下面有宣告 isCompleted 這個 => 所以他會自動合併新的
                                                             // => id , title 照舊 ， isCompleted 變新的
                                      isCompleted: !todoMap[toggleID].isCompleted
                                    }
                              }
                        };
                  }else{
                        return state
                  }
 
            default:
                  return state  //傳回 state => 其實也等同於 {...state}
      }
}

// 匯出
export default reducer