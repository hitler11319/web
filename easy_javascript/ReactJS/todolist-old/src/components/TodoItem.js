import React from 'react'

function TodoItem({ item, onChecked, onDelete }) {
  const itemStyle = {
    borderRadius: '5px',
    padding: '10px 10px',
    border: '1px solid #aaa',
    margin: '5px 0',
    display: 'flex',
    justifyContent: 'space-between'
  }
  const { isCompleted, title } = item;

  return (
    <div style={itemStyle} className="col-md-12">
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={() => onChecked(item)}
      />
      <div>{title}</div>
      <button
        type="button"
        className="btn btn-danger"
        onClick={() => onDelete(item.id)}
      >
        X
      </button>
    </div>
  )
}

export default TodoItem;