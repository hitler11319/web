import React from "react";

class ApiExample extends React.Component {
  addTodo = todo => {
    fetch("https://5db91ed6177b350014ac8050.mockapi.io/api/users/1/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title: todo })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      });
  };

  render() {
    return (
      <div>
        <input type="text" ref={input => (this.todo = input)} />
        <button type="button" onClick={() => this.addTodo(this.todo.value)}>
          Click
        </button>
      </div>
    );
  }
}

export default ApiExample;
