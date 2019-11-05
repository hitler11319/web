import React from 'react';
//import logo from '../logo.svg';
import TodoList from './TodoList';

// 要把 Store 和 Component 做連結要用的
import {connect} from 'react-redux';

// 使用 Action Creator
import actionCreators from './todoActions';

class TodoApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = { input: '', todoMap: {}, index: 0 }
  }

  // 預設就會帶 e 可以寫
  onChangeInput = (e) => {
    // 原本的
    const value = e.target.value;
    this.setState({ input: value })  // 原本的

    // 改寫成 action Creators的方式
    // 用 this.props.dispatch(哪一個action 和傳入其參數)
    this.props.dispatch(actionCreators.changeInput(value));
  }

  onSubmitTodo = () => {
      //const { input, todoMap, index } = this.state
      //if (!input.trim()) return
      //const todo = {
        //isCompleted: false,
        //title: input,
        //id: index
      //}
      //this.setState({
        //todoMap: { ...todoMap, [index]: todo },  // 用 index 為 key 對應到 新加入的 todo
        //input: '',
        //index: index + 1
      //})

      // 用 Action
      this.props.dispatch(actionCreators.addTodo());

      // 如果有2筆會長成這樣
      /*
            {
                  0 : {isCompleted:false, title: 'aaa', id : 0},
                  1 : {isCompleted:false, title: 'bbb', id : 1}
            }
      */
  }

  onChangeChecked = (id) => {
      //const { todoMap } = this.state;

      // 這段等同下面
      // const newTodo = Object.assign({}, todoMap)
      // newTodo[id] = Object.assign({}, todoMap[id])
      // newTodo[id].isCompleted = !newTodo[id].isCompleted

      // 原本的
      //this.setState({
        //todoMap: {
          //...todoMap,
          // 同上 用 id 對應到這個物件 => 並做修改即可
          //[id]: {
            //...todoMap[id],
            //isCompleted: !todoMap[id].isCompleted
          //}
        //}
      //})

      // 用 Action
      this.props.dispatch(actionCreators.toggleTodo(id));
  }

  onDeleteTodo = (id) => {
        console.log(id);
      // 原本的
      //const { todoMap } = this.state;
      //const newTodo = { ...todoMap }
      //delete newTodo[id]  // 刪掉 id 和傳入相同的物件
      //this.setState({ todoMap: newTodo })

      // 用Action 的
      this.props.dispatch(actionCreators.deleteTodo(id));
  }

  render() {
    const style = {
      padding: '10px',
      borderRadius: '25px',
      marginLeft: '10px',
      border: '1px solid #aaa'
    }

    // 原本的寫法
    //const { input, todoMap } = this.state;

    // 改成 用 Action 的寫法
    const {input, todoMap } = this.props.todo  // 這裡的 props.todo 的 todo 是指 index.js 中的 reducers 物件

    return (
      <div style={{ width: '500px', height: '100%', margin: '50px auto', position: 'relative' }}>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            style={style}
            value={input}
            onChange={this.onChangeInput}
            className="col-md-8"
            placeholder="Add a todo item"
          />
          <button
            style={style}
            onClick={this.onSubmitTodo}
            className="col-md-3 btn btn-info"
          >
            Submit
          </button>
        </div>
        <TodoList
          todoMap={todoMap}
          onChangeChecked={this.onChangeChecked}
          onDeleteTodo={this.onDeleteTodo}
        />

      </div >
    );
  }
}

  // 定義 Store 和 Component 做連結要 函式參數
  // 所以這隻 Component 才可以取到 this.props.todo (因為在這邊繫結了)
  const mapStateToProps = (state) => ({
      todo: state.todo // 這裡的 state.todo 是指 index.js 中的 reducers 的 todo
  })

  //const mapDispatchToProps = (dispatch) => ({
      //changeInput: () => dispatch({ type: 'CHANGE_INPUT' }),
      //addTodo: () => dispatch({ type: 'ADD_TODO' }),
      //deleteTodo: () => dispatch({ type: 'DELETE_TODO' }),
      //toggleTodo: () => dispatch({ type: 'TOGGLE_TODO' })
  //})

  // 匯出的部份 要把上面這2隻做連結的也放進去
  // connect(...) 會 return 成一個 function
  // => function(TodoApp)
export default connect(mapStateToProps)(TodoApp);
