import React from "react";
import "../App.css";

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: "React!" };
  }

  render() {
    const style = {
      padding: "10px",
      borderRadius: "25px",
      border: "none",
      marginRight: "20px"
    };
    const listStyle = { border: "1px solid #333", height: "700px" };
    const itemStyle = {
      borderRadius: "5px",
      padding: "20px 10px",
      margin: "20px",
      boxShadow: "rgba(0, 0, 0, 0.3) 0px 0px 10px 0px",
      display: "flex",
      justifyContent: "space-between"
    };
    return (
      <div style={{ width: "500px", margin: "0 auto" }}>
        <div
          style={{
            backgroundColor: "lightblue",
            padding: "10px",
            margin: "10px"
          }}
        >
          <input type="text" style={style} />
          <button style={style}>Submit</button>
        </div>

        <div style={listStyle}>
          <div style={itemStyle}>
            <input type="checkbox" />
            <div>This is a todo item</div>
            <button type="button">Remove</button>
          </div>
          <div style={itemStyle}>
            <input type="checkbox" />
            <div>This is a todo item</div>
            <button type="button">Remove</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Todo;
