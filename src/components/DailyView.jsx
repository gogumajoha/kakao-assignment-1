function DailyView({ selectedDate, onMoveDay }) {
  return (
    <section className="daily-view">
      <button
        type="button"
        className="day-nav-button"
        onClick={() => onMoveDay(-1)}
      >
        ◀ 이전 날
      </button>

      <div className="selected-date">
        <span className="selected-date-label">선택 날짜</span>
        <h2 className="selected-date-text">{selectedDate}</h2>
      </div>

      <button
        type="button"
        className="day-nav-button"
        onClick={() => onMoveDay(1)}
      >
        다음 날 ▶
      </button>
    </section>
  )
}

export default DailyView
