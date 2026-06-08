const FILTERS = [
  { key: 'all', label: '전체' },
  { key: 'active', label: '진행 중' },
  { key: 'completed', label: '완료' },
]

function FilterTabs({ filter, onChange }) {
  return (
    <section className="filter-tabs">
      {FILTERS.map(({ key, label }) => (
        <button
          key={key}
          type="button"
          className={`filter-button${filter === key ? ' active' : ''}`}
          onClick={() => onChange(key)}
        >
          {label}
        </button>
      ))}
    </section>
  )
}

export default FilterTabs
