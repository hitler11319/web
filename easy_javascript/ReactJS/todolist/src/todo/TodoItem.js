import React from 'react'

function TodoItem({ item, id, onChecked, onDelete }) {
  const itemStyle = {
    borderRadius: '5px',
    padding: '10px 10px',
    border: '1px solid #aaa',
    margin: '5px 0',
    display: 'flex',
    justifyContent: 'space-between'
  }
  
  // 取出參數
  const { isCompleted, title } = item;

  return (
    <div style={itemStyle} className="col-md-12">
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={() => onChecked(id)}
      />
      <div>{title}</div>
      <button
        type="button"
        className="btn btn-danger"
        onClick={() => onDelete(id)}
      >
        X
      </button>
    </div>
  );
}

export default TodoItem;