import React from "react";
import StateExample from "./components/StateExample";
import LifecyclesExample from "./components/LifecyclesExample";
import FunctionComponent from "./components/FunctionComponent";
import ApiExample from "./components/ApiExample";
import ArrowFnExample from "./components/ArrowFnExample";
import CountExample from "./components/CountExample";
import Todo from './components/Todo';
import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hideExample2: false,
      example2Count: 0,
      dummyDataList: [
        { name: "John", gender: "male", age: 20 },
        { name: "Mary", gender: "female", age: 25 },
        { name: "Pete", gender: "male", age: 40 }
      ]
    };
  }

  toggleExample2 = () => {
    this.setState({
      hideExample2: !this.state.hideExample2
    });
  };

  onClickCountExample2 = () => {
    this.setState({
      example2Count: this.state.example2Count + 1
    });
  };

  render() {
    return (
      <div className="App">
        <h5>Example 1: State</h5>
        <StateExample />
        <hr />
        <h5>Example 2: Lifecycles</h5>
        <p>
          這個組件會在 componentDidMount() 裡呼叫 API，並且將得到的資料存在組件
          state 中。
          <br />
          開啟 Chrome Developer Tool Console，觀察印出來的內容
        </p>
        <button onClick={this.toggleExample2}>
          Click 觀察 componentWillUnmount()
        </button>
        <br />
        <button onClick={this.onClickCountExample2}>
          Click 觀察 componentDidUpdate()
        </button>
        {!this.state.hideExample2 && (
          <LifecyclesExample count={this.state.example2Count} />
        )}
        <hr />
        <h5>Example 3: map()</h5>
        <p>map() 非常適合用來 render 陣列資料</p>
        {this.state.dummyDataList.map((d, i) => (
          <div>
            {i + 1}. name: {d.name}, gender: {d.gender}, age: {d.age}
          </div>
        ))}
        <hr />
        <h5> Example 4: Function Component</h5>
        <FunctionComponent msg="I'm a function component" />
        <hr />
        <h5>Example 5: AJAX Example</h5>
        <ApiExample />
        <h5>Arrow Function Example</h5>
        <ArrowFnExample />

        <h5>計算</h5>
        <CountExample />

        <h6>ToDoList 基本款(沒帶任何動態)</h6>
        <Todo />
      </div>
    );
  }
}

export default App;
