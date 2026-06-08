import { useState } from 'react'

function TodoInput({ onAdd }) {
  const [text, setText] = useState('')
  const [message, setMessage] = useState('')

  const handleAdd = () => {
    const trimmed = text.trim()

    if (trimmed === '') {
      setMessage('할 일을 입력해주세요.')
      return
    }

    onAdd(trimmed)
    setText('')
    setMessage('')
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleAdd()
    }
  }

  return (
    <section className="todo-input-section">
      <div className="todo-input-row">
        <input
          type="text"
          className="todo-input"
          placeholder="할 일을 입력하세요"
          value={text}
          onChange={(event) => setText(event.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button type="button" className="add-button" onClick={handleAdd}>
          추가
        </button>
      </div>

      {message && <p className="message-text">{message}</p>}
    </section>
  )
}

export default TodoInput
