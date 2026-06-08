import {
  formatDate,
  formatShortDate,
  getDayName,
  getWeekDates,
  parseDate,
} from '../utils/date'

function WeekView({ weekStartDate, selectedDate, todos, onSelectDate, onMoveWeek }) {
  const weekDates = getWeekDates(parseDate(weekStartDate))
  const todayString = formatDate(new Date())

  const countByDate = (dateString) =>
    todos.filter((todo) => todo.date === dateString).length

  const rangeStart = formatDate(weekDates[0])
  const rangeEnd = formatDate(weekDates[6])

  return (
    <section className="week-view">
      <div className="week-navigation">
        <button
          type="button"
          className="week-nav-button"
          onClick={() => onMoveWeek(-1)}
        >
          ◀ 이전 주
        </button>

        <h2 className="week-range-text">
          {rangeStart} ~ {rangeEnd}
        </h2>

        <button
          type="button"
          className="week-nav-button"
          onClick={() => onMoveWeek(1)}
        >
          다음 주 ▶
        </button>
      </div>

      <div className="week-calendar">
        {weekDates.map((date) => {
          const dateString = formatDate(date)
          const isToday = dateString === todayString
          const isSelected = dateString === selectedDate

          const className = [
            'week-day-card',
            isToday ? 'today' : '',
            isSelected ? 'selected-day' : '',
          ]
            .filter(Boolean)
            .join(' ')

          return (
            <button
              type="button"
              key={dateString}
              className={className}
              onClick={() => onSelectDate(dateString)}
            >
              <span className="week-day-name">{getDayName(date)}</span>
              <span className="week-day-date">{formatShortDate(date)}</span>
              <span className="todo-count">{countByDate(dateString)}</span>
            </button>
          )
        })}
      </div>
    </section>
  )
}

export default WeekView
