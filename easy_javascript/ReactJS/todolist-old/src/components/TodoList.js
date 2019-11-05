import React from 'react'
import TodoItem from './TodoItem'

function TodoList({ todos, onChangeChecked, onDeleteTodo }) {
  const listStyle = {
    border: '1px solid #333',
    height: '80%',
    position: 'relative',
    padding: '10px',
    overflowY: 'scroll'
  }
  return (
    <div style={listStyle}>
      {
        todos.map((todo, i) =>
          <TodoItem
            key={i}
            item={todo}
            onChecked={onChangeChecked}
            onDelete={onDeleteTodo}
          />
        )
      }
    </div>
  )
}

export default TodoList;