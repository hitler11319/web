import React, { Component } from "react";

class CountExample extends Component {
  constructor(props) {
    super(props);
    this.state = { number: 0 };
  }

  onClickLeftBtn = () => {
    this.setState({ number: this.state.number - 1 });
  };

  onClickRightBtn = () => {
    this.setState({ number: this.state.number + 1 });
  };

  render() {
    const { number } = this.state;
    const btnStyle = {
      fontSize: "30px",
      padding: "10px",
      margin: "10px"
    };
    return (
      <div>
        <button style={btnStyle} onClick={this.onClickLeftBtn}>
          -1
        </button>
        <span style={{ fontSize: "30px" }}>{number}</span>
        <button style={btnStyle} onClick={this.onClickRightBtn}>
          +1
        </button>
      </div>
    );
  }
}

export default CountExample;
