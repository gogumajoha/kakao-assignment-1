import { useEffect, useState } from 'react'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import FilterTabs from './components/FilterTabs'
import DailyView from './components/DailyView'
import WeekView from './components/WeekView'
import { addDays, formatDate, getStartOfWeek } from './utils/date'
import './App.css'

const STORAGE_KEYS = {
  todos: 'todoItems',
  selectedDate: 'selectedDate',
  weekStartDate: 'weekStartDate',
}

function loadStored(key, fallback) {
  const stored = localStorage.getItem(key)

  if (stored === null) {
    return fallback
  }

  try {
    return JSON.parse(stored)
  } catch {
    return fallback
  }
}

function App() {
  const [todos, setTodos] = useState(() => loadStored(STORAGE_KEYS.todos, []))
  const [filter, setFilter] = useState('all')
  const [selectedDate, setSelectedDate] = useState(() =>
    loadStored(STORAGE_KEYS.selectedDate, formatDate(new Date())),
  )
  const [weekStartDate, setWeekStartDate] = useState(() =>
    loadStored(STORAGE_KEYS.weekStartDate, formatDate(getStartOfWeek(new Date()))),
  )

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.todos, JSON.stringify(todos))
  }, [todos])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.selectedDate, JSON.stringify(selectedDate))
  }, [selectedDate])

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.weekStartDate,
      JSON.stringify(weekStartDate),
    )
  }, [weekStartDate])

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      isCompleted: false,
      date: selectedDate,
    }
    setTodos((prev) => [...prev, newTodo])
  }

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo,
      ),
    )
  }

  const editTodo = (id, text) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text } : todo)),
    )
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const moveWeek = (offset) => {
    setWeekStartDate((prev) => addDays(prev, offset * 7))
  }

  const moveDay = (offset) => {
    setSelectedDate((prev) => addDays(prev, offset))
  }

  const visibleTodos = todos
    .filter((todo) => todo.date === selectedDate)
    .filter((todo) => {
      if (filter === 'active') return !todo.isCompleted
      if (filter === 'completed') return todo.isCompleted
      return true
    })

  return (
    <main className="app">
      <header className="app-header">
        <span className="brand-flag">kakao tech campus</span>
        <h1>Todo Planner</h1>
        <p className="app-description">오늘도 알차게, 주간 Todo 관리</p>
      </header>

      <WeekView
        weekStartDate={weekStartDate}
        selectedDate={selectedDate}
        todos={todos}
        onSelectDate={setSelectedDate}
        onMoveWeek={moveWeek}
      />

      <DailyView selectedDate={selectedDate} onMoveDay={moveDay} />

      <TodoInput onAdd={addTodo} />

      <FilterTabs filter={filter} onChange={setFilter} />

      <TodoList
        todos={visibleTodos}
        onToggle={toggleTodo}
        onEdit={editTodo}
        onDelete={deleteTodo}
      />
    </main>
  )
}

export default App
