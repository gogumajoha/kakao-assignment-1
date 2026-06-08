const DAY_NAMES = ['일', '월', '화', '수', '목', '금', '토']

// YYYY-MM-DD (로컬 시간 기준)
export function formatDate(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// "YYYY-MM-DD" -> Date
export function parseDate(dateString) {
  const [year, month, day] = dateString.split('-').map(Number)
  return new Date(year, month - 1, day)
}

// MM/DD
export function formatShortDate(date) {
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${month}/${day}`
}

export function getDayName(date) {
  return DAY_NAMES[date.getDay()]
}

// 해당 날짜가 속한 주의 월요일
export function getStartOfWeek(date) {
  const result = new Date(date)
  const day = result.getDay()
  const diff = day === 0 ? -6 : 1 - day
  result.setDate(result.getDate() + diff)
  result.setHours(0, 0, 0, 0)
  return result
}

// 월요일부터 7일치 Date 배열
export function getWeekDates(startDate) {
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + index)
    return date
  })
}

// "YYYY-MM-DD"에 일수를 더한 "YYYY-MM-DD"
export function addDays(dateString, amount) {
  const date = parseDate(dateString)
  date.setDate(date.getDate() + amount)
  return formatDate(date)
}
