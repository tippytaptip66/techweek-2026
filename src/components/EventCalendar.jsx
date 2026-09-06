const EVENT_START = 12
const EVENT_END = 16
const MONTH = 9 
const YEAR = 2026
const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

function buildWeeks() {
  const first = new Date(YEAR, MONTH, 1)
  const startOffset = first.getDay() // 0=Sun
  const daysInMonth = new Date(YEAR, MONTH + 1, 0).getDate()

  const cells = []
  for (let i = 0; i < startOffset; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)

  const weeks = []
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7))
  return weeks
}

export default function EventCalendar() {
  const weeks = buildWeeks()
  const today = new Date()
  const isCurrentMonth = today.getFullYear() === YEAR && today.getMonth() === MONTH
  const todayDate = isCurrentMonth ? today.getDate() : null

  return (
    <div className="cal-wrap">
      <div className="cal-card">
        <div className="cal-header">
          <span className="cal-month">October</span>
          <span className="cal-year">2026</span>
        </div>

        <div className="cal-grid cal-weekdays">
          {WEEKDAYS.map((w, i) => (
            <span key={i}>{w}</span>
          ))}
        </div>

        {weeks.map((week, wi) => (
          <div className="cal-grid" key={wi}>
            {week.map((day, di) => {
              if (!day) return <span key={di} className="cal-cell empty" />
              const inRange = day >= EVENT_START && day <= EVENT_END
              const isStart = day === EVENT_START
              const isToday = day === todayDate
              return (
                <span
                  key={di}
                  className={
                    'cal-cell' +
                    (inRange ? ' in-range' : '') +
                    (isStart ? ' start' : '') +
                    (isToday ? ' today' : '')
                  }
                >
                  {day}
                </span>
              )
            })}
          </div>
        ))}

       
        
        </div>
      </div>
    
  )
}
