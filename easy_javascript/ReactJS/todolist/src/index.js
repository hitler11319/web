import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';   // 引入 redux 
import {Provider} from 'react-redux';  // 要把 Reducer 注入到所有的 裡面用的
import thunkMiddleware from 'redux-thunk';  // 引用 中間層
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';

// 引入 Reducer
import todoReducer from './todo/todoReducer';
import userReducer from './user/userReducer';

// 寫完Action 和 Reducer 再來就是要來 Create Store
// 流程是 Action -> Store -> Reducer (傳回一個state) -> Stroe (把 得到的 state 更改原本的 state) -> 更新UI
// 所以這邊就是 Store 的 create (先把所有的 Reducer 結合在一起，再 Create)
// 這邊先 結合所有的 Reducer
const reducers = combineReducers({
      todo : todoReducer,
      user : userReducer
})

// 中間層 (做 async 的 function 或是 log)
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// 建立 Stroe ， createStore(reducers, middleware) => middleware是中間層
const store = createStore(
      reducers,
      composeEnhancer(applyMiddleware(thunkMiddleware))  // 如果暫時不開中間層，可以把這行註解，把下一行取消註解
      //window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__  && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// 用 Provider 包住 App 這樣就可以讓 所有 裡面的都吃到 Reducer 了
// 要記得 注入 store
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
