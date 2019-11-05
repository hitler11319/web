import React from "react";

class StateExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { number: 0 };
  }
  onClickBtn = () => {
    this.setState({ number: this.state.number + 1 });
  };

  render() {
    return (
      <div>
        <p>
          開啟 React Developer Tools，找到 StateExample 組件並且觀察組件的 state
          變化
        </p>
        <button onClick={this.onClickBtn}>
          Click Me <br />
          this.state = {this.state.number}
        </button>
      </div>
    );
  }
}

export default StateExample;
