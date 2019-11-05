// 製作 Action (Action 裡像個 object ， 但裡面一定要有 type 屬性)
// 用昨天的TodoList =>　會有 新增 刪除 修改

// 一、宣告 Action 
const CHANGE_INPUT = 'CHANGE_INPUT';
const ADD_TODO = 'ADD_TODO';
const DELETE_TODO = 'DELETE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';

// 二、寫 Action creater (一個接收參數，再回傳的 function)
// ({}) 用 () 包起來 代表直接回傳 (不用寫 return)
const changeInput = (value) => ({
      type : CHANGE_INPUT,  // 一定要有 type 屬性
      value : value  // 傳什麼，接收也要用相同名字 (這邊可以簡寫成下面)
})

const addTodo = () => ({
      type : ADD_TODO,
})

const deleteTodo = (id) => ({
      type : DELETE_TODO,
      id : id
})

const toggleTodo = (id) => ({
      type : TOGGLE_TODO,
      id : id
})

// 三、包裝起來
const actionCreators = {
      changeInput,
      addTodo,
      deleteTodo,
      toggleTodo
}

// 四、匯出 (default 的只能一個，但是 const 的就可以很多了)
export const types = {
      CHANGE_INPUT,
      ADD_TODO,
      DELETE_TODO,
      TOGGLE_TODO
}

export default actionCreators