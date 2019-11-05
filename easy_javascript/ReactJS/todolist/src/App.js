import React from 'react';
//import logo from './logo.svg';
import TodoApp from './todo/TodoApp';
import UserList from './user/UserList';
import HooksExample from './HooksExample';
import './App.css';
// 要載入 bootstrap 的部份，只要在最上層用 => 下面的就會有吃到

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render(){
    return (
      <div>
        <HooksExample />

          <br />

          <TodoApp />

          <br />

          <UserList />
      </div>
    )
  }


}

export default App;
