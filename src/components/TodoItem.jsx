import { useState } from 'react'

function TodoItem({ todo, onToggle, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)

  const startEditing = () => {
    setEditText(todo.text)
    setIsEditing(true)
  }

  const cancelEditing = () => {
    setIsEditing(false)
  }

  const saveEditing = () => {
    const trimmed = editText.trim()

    if (trimmed === '') {
      return
    }

    onEdit(todo.id, trimmed)
    setIsEditing(false)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      saveEditing()
    }
    if (event.key === 'Escape') {
      cancelEditing()
    }
  }

  if (isEditing) {
    return (
      <li className="todo-item">
        <input
          type="text"
          className="todo-edit-input"
          value={editText}
          onChange={(event) => setEditText(event.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
        <div className="todo-actions">
          <button
            type="button"
            className="action-button save-button"
            onClick={saveEditing}
          >
            저장
          </button>
          <button
            type="button"
            className="action-button cancel-button"
            onClick={cancelEditing}
          >
            취소
          </button>
        </div>
      </li>
    )
  }

  return (
    <li className="todo-item">
      <span
        className={`todo-content${todo.isCompleted ? ' completed' : ''}`}
      >
        {todo.text}
      </span>
      <div className="todo-actions">
        <button
          type="button"
          className="action-button complete-button"
          onClick={() => onToggle(todo.id)}
        >
          {todo.isCompleted ? '취소' : '완료'}
        </button>
        <button
          type="button"
          className="action-button edit-button"
          onClick={startEditing}
        >
          수정
        </button>
        <button
          type="button"
          className="action-button delete-button"
          onClick={() => onDelete(todo.id)}
        >
          삭제
        </button>
      </div>
    </li>
  )
}

export default TodoItem
