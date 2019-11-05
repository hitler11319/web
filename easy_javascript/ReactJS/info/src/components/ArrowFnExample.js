import React from "react";

class ArrowFnExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { number: 0 };
  }

  clickBtnA() {
    this.setState({ number: this.state.number + 1 });
  }

  clickBtnB = () => {
    this.setState({ number: this.state.number + 1 });
  };

  render() {
    return (
      <div>
        <button onClick={this.clickBtnA}>function()</button>
        <button onClick={this.clickBtnB}>() => {}</button>
      </div>
    );
  }
}

export default ArrowFnExample;
