// Reducer (邏輯處理中心，純JS function)
// 單純是個 收參數 + 傳回新的 state 回去的形式

// 和 todoReducer.js 不一樣喔
// 因為不是匯出物件 => 所以就是各別要用的就引入
//import {FETCH_USER_LIST, FETCH_USER_LIST_SUCCESS, FETCH_USER_LIST_FAILURE} from './userActions';   //引入

// 一次 import 全部 變成一個 物件
import * as types from './userActions';

// 定義初使物件(以防 得到的 state 是 空的話，要回傳這個 初使物件 回去)
const initialState = {
      userList : [],
      errorMessage : '',
      isLoading : false
}

// 開始編寫 (這邊比較像 Controller ， 依據收的的 type 做 其應做的事)
// 參數固定就是這2個 (state 和 action)
// 而 state = initialState 是代表 ，如果 state 是空的 ，就代入 initialState
function reducer(state = initialState, action)  {

      const {userList} = state;  // 傳入的參數 (跟原本的 this.state很像)

      // 依據 type
      switch(action.type){
            case types.FETCH_USER_LIST :                 
                  return {
                         ...state,
                         isLoading : true
                        };

            case types.FETCH_USER_LIST_SUCCESS:
                  const data = action.data;  // data 本身已經是 [] 型態了
                  return { 
                        ...state,
                        isLoading : false,
                        userList : data
                  }; 

            case types.FETCH_USER_LIST_FAILURE:
                  return { 
                        ...state,
                        isLoading : false,
                        errorMessage : action.error
                  }; 

            default:
                  return state  //傳回 state
      }
}

// 匯出
export default reducer