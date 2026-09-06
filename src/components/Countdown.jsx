import { Fragment, useEffect, useState } from 'react'

const TARGET = new Date('2026-10-12T09:00:00')

function getTimeLeft() {
  const diff = TARGET.getTime() - Date.now()
  const clamped = Math.max(diff, 0)
  const days = Math.floor(clamped / (1000 * 60 * 60 * 24))
  const hours = Math.floor((clamped / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((clamped / (1000 * 60)) % 60)
  const seconds = Math.floor((clamped / 1000) % 60)
  return { days, hours, minutes, seconds, done: diff <= 0 }
}

function pad(n) {
  return String(n).padStart(2, '0')
}

export default function Countdown() {
  const [time, setTime] = useState(getTimeLeft)

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  if (time.done) {
    return (
      <div className="countdown-wrap">
        <div className="countdown-live">Tech Week 2026 is live →</div>
      </div>
    )
  }

  const units = [
    { label: 'Days', value: time.days },
    { label: 'Hours', value: time.hours },
    { label: 'Min', value: time.minutes },
    { label: 'Sec', value: time.seconds },
  ]

  return (
    <div className="countdown-wrap">
      <div className="eyebrow countdown-caption">Counting down to Oct 12, 2026</div>
      <div className="countdown">
        {units.map((u, i) => (
          <Fragment key={u.label}>
            <div className="countdown-block">
              <span className="countdown-num">{pad(u.value)}</span>
              <span className="countdown-label">{u.label}</span>
            </div>
            {i < units.length - 1 && <span className="countdown-sep">:</span>}
          </Fragment>
        ))}
      </div>
    </div>
  )
}
