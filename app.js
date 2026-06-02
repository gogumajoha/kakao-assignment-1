// =========================
// LocalStorage Key
// =========================
const TODO_STORAGE_KEY = "todoItems";

// =========================
// State
// =========================

// LocalStorage에서 Todo 불러오기
const todoItems = loadTodoItems();

// 상태 필터
let currentFilter = "all";

// 현재 선택 날짜
let selectedDate = new Date();

// 현재 보고 있는 주
let currentWeekDate = new Date();

// =========================
// DOM Elements
// =========================

const todoInput = document.getElementById("todoInput");
const addTodoButton = document.getElementById("addTodoButton");
const todoList = document.getElementById("todoList");
const messageText = document.getElementById("messageText");

const filterButtons = document.querySelectorAll(".filter-button");

const previousWeekButton = document.getElementById("previousWeekButton");

const nextWeekButton = document.getElementById("nextWeekButton");

const weekCalendar = document.getElementById("weekCalendar");

const selectedDateText = document.getElementById("selectedDateText");

const weekRangeText = document.getElementById("weekRangeText");

const totalTodoCount = document.getElementById("totalTodoCount");

const activeTodoCount = document.getElementById("activeTodoCount");

const completedTodoCount = document.getElementById("completedTodoCount");

const emptyState = document.getElementById("emptyState");

// =========================
// LocalStorage
// =========================

/**
 * Todo 저장
 */
function saveTodoItems() {
  localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todoItems));
}

/**
 * Todo 불러오기
 */
function loadTodoItems() {
  const storedTodoItems = localStorage.getItem(TODO_STORAGE_KEY);

  if (!storedTodoItems) {
    return [];
  }

  try {
    return JSON.parse(storedTodoItems);
  } catch (error) {
    console.error(error);
    return [];
  }
}

// =========================
// Date Utils
// =========================

/**
 * YYYY-MM-DD
 */
function formatDate(date) {
  return date.toISOString().split("T")[0];
}

/**
 * MM/DD
 */
function formatShortDate(date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");

  const day = String(date.getDate()).padStart(2, "0");

  return `${month}/${day}`;
}

/**
 * 요일
 */
function getDayName(date) {
  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];

  return dayNames[date.getDay()];
}

/**
 * 이번 주 월요일
 */
function getStartOfWeek(date) {
  const weekStartDate = new Date(date);

  const day = weekStartDate.getDay();

  const diff = day === 0 ? -6 : 1 - day;

  weekStartDate.setDate(weekStartDate.getDate() + diff);

  weekStartDate.setHours(0, 0, 0, 0);

  return weekStartDate;
}

/**
 * 월~일 생성
 */
function getWeekDates(date) {
  const monday = getStartOfWeek(date);

  const weekDates = [];

  for (let index = 0; index < 7; index++) {
    const weekDate = new Date(monday);

    weekDate.setDate(monday.getDate() + index);

    weekDates.push(weekDate);
  }

  return weekDates;
}

// =========================
// Statistics
// =========================

/**
 * 날짜별 Todo 개수
 */
function getTodoCountByDate(targetDate) {
  return todoItems.filter((todoItem) => todoItem.date === targetDate).length;
}

/**
 * 통계 업데이트
 */
function updateStatistics() {
  const selectedDateString = formatDate(selectedDate);

  const currentDateTodos = todoItems.filter(
    (todoItem) => todoItem.date === selectedDateString,
  );

  totalTodoCount.textContent = currentDateTodos.length;

  activeTodoCount.textContent = currentDateTodos.filter(
    (todoItem) => !todoItem.isCompleted,
  ).length;

  completedTodoCount.textContent = currentDateTodos.filter(
    (todoItem) => todoItem.isCompleted,
  ).length;
}

// =========================
// Week View
// =========================

/**
 * 선택 날짜 표시
 */
function updateSelectedDateText() {
  selectedDateText.textContent = formatDate(selectedDate);
}

/**
 * 주 범위 표시
 */
function updateWeekRangeText() {
  const weekDates = getWeekDates(currentWeekDate);

  const startDate = formatDate(weekDates[0]);

  const endDate = formatDate(weekDates[6]);

  weekRangeText.textContent = `${startDate} ~ ${endDate}`;
}

/**
 * 주간 캘린더 렌더링
 */
function renderWeekCalendar() {
  weekCalendar.innerHTML = "";

  const weekDates = getWeekDates(currentWeekDate);

  weekDates.forEach((date) => {
    const dateString = formatDate(date);

    const dateCard = document.createElement("div");

    dateCard.classList.add("week-day-card");

    // 오늘
    if (dateString === formatDate(new Date())) {
      dateCard.classList.add("today");
    }

    // 선택 날짜
    if (dateString === formatDate(selectedDate)) {
      dateCard.classList.add("selected-day");
    }

    dateCard.innerHTML = `
        <span class="week-day-name">
          ${getDayName(date)}
        </span>

        <span class="week-day-date">
          ${formatShortDate(date)}
        </span>

        <span class="todo-count">
          ${getTodoCountByDate(dateString)}
        </span>
      `;

    dateCard.addEventListener("click", () => {
      selectedDate = new Date(date);

      updateSelectedDateText();

      renderWeekCalendar();

      renderTodoList();

      updateStatistics();
    });

    weekCalendar.appendChild(dateCard);
  });

  updateWeekRangeText();
}

// =========================
// Todo Render
// =========================

function renderTodoList() {
  todoList.innerHTML = "";

  const selectedDateString = formatDate(selectedDate);

  let filteredTodoItems = todoItems.filter(
    (todoItem) => todoItem.date === selectedDateString,
  );

  if (currentFilter === "active") {
    filteredTodoItems = filteredTodoItems.filter(
      (todoItem) => !todoItem.isCompleted,
    );
  }

  if (currentFilter === "completed") {
    filteredTodoItems = filteredTodoItems.filter(
      (todoItem) => todoItem.isCompleted,
    );
  }

  emptyState.style.display = filteredTodoItems.length === 0 ? "block" : "none";

  filteredTodoItems.forEach((todoItem) => {
    const listItem = document.createElement("li");

    listItem.classList.add("todo-item");

    const todoContent = document.createElement("span");

    todoContent.classList.add("todo-content");

    todoContent.textContent = todoItem.text;

    if (todoItem.isCompleted) {
      todoContent.classList.add("completed");
    }

    const actionContainer = document.createElement("div");

    actionContainer.classList.add("todo-actions");

    const completeButton = document.createElement("button");

    completeButton.textContent = "완료";

    completeButton.classList.add("action-button", "complete-button");

    completeButton.addEventListener("click", () => {
      toggleTodoCompletion(todoItem.id);
    });

    const editButton = document.createElement("button");

    editButton.textContent = "수정";

    editButton.classList.add("action-button", "edit-button");

    editButton.addEventListener("click", () => {
      editTodo(todoItem.id);
    });

    const deleteButton = document.createElement("button");

    deleteButton.textContent = "삭제";

    deleteButton.classList.add("action-button", "delete-button");

    deleteButton.addEventListener("click", () => {
      deleteTodo(todoItem.id);
    });

    actionContainer.append(completeButton, editButton, deleteButton);

    listItem.append(todoContent, actionContainer);

    todoList.appendChild(listItem);
  });
}

// =========================
// CRUD
// =========================

function addTodo() {
  const todoText = todoInput.value.trim();

  if (todoText === "") {
    messageText.textContent = "할 일을 입력해주세요.";
    return;
  }

  messageText.textContent = "";

  const newTodo = {
    id: Date.now(),
    text: todoText,
    isCompleted: false,
    date: formatDate(selectedDate),
  };

  todoItems.push(newTodo);

  saveTodoItems();

  todoInput.value = "";

  renderTodoList();

  renderWeekCalendar();

  updateStatistics();
}

function editTodo(todoId) {
  const selectedTodo = todoItems.find((todoItem) => todoItem.id === todoId);

  if (!selectedTodo) {
    return;
  }

  const updatedText = prompt("수정할 내용을 입력하세요.", selectedTodo.text);

  if (updatedText === null || updatedText.trim() === "") {
    return;
  }

  selectedTodo.text = updatedText.trim();

  saveTodoItems();

  renderTodoList();
}

function deleteTodo(todoId) {
  const todoIndex = todoItems.findIndex((todoItem) => todoItem.id === todoId);

  if (todoIndex === -1) {
    return;
  }

  todoItems.splice(todoIndex, 1);

  saveTodoItems();

  renderTodoList();

  renderWeekCalendar();

  updateStatistics();
}

function toggleTodoCompletion(todoId) {
  const selectedTodo = todoItems.find((todoItem) => todoItem.id === todoId);

  if (!selectedTodo) {
    return;
  }

  selectedTodo.isCompleted = !selectedTodo.isCompleted;

  saveTodoItems();

  renderTodoList();

  updateStatistics();
}

// =========================
// Filter
// =========================

function changeFilter(filterType) {
  currentFilter = filterType;

  filterButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.filter === filterType);
  });

  renderTodoList();
}

// =========================
// Week Navigation
// =========================

function moveWeek(weekOffset) {
  currentWeekDate.setDate(currentWeekDate.getDate() + weekOffset * 7);

  renderWeekCalendar();
}

// =========================
// Events
// =========================

addTodoButton.addEventListener("click", addTodo);

todoInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTodo();
  }
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    changeFilter(button.dataset.filter);
  });
});

previousWeekButton.addEventListener("click", () => {
  moveWeek(-1);
});

nextWeekButton.addEventListener("click", () => {
  moveWeek(1);
});

// =========================
// Initial Render
// =========================

updateSelectedDateText();

renderWeekCalendar();

renderTodoList();

updateStatistics();
