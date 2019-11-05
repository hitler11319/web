import React from 'react'
import TodoItem from './TodoItem'

function TodoList({ todoMap, onChangeChecked, onDeleteTodo }) {
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
        Object.keys(todoMap).map((todoId, i) =>
          <TodoItem
            key={i}
            item={todoMap[todoId]}
            id = {todoId}
            onChecked={onChangeChecked}
            onDelete={onDeleteTodo}
          />
        )
      }
    </div>
  );
}

export default TodoList;