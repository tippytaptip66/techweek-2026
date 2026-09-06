import { useEffect, useRef, useState } from 'react'
import { IconCode, IconChip, IconTrophy, IconMic, IconAward, IconUsers, IconFlag } from './icons.jsx'

// All 8 tracks live on one ring. The ring "rotates" by shifting every
// node's angle by one step at a time; whichever node lands at the fixed
// spotlight angle (0deg, where the label sits) becomes the selected one —
// it grows, changes color, and its title/eyebrow appear in the label.
const RING_ITEMS = [
  { icon: IconTrophy, label: 'Hackathon' },
  { icon: IconCode, label: 'Workshops' },
  { icon: IconChip, label: 'Exhibits' },
  { icon: IconMic, label: 'Keynote' },
  { icon: IconAward, label: 'Awards' },
  { icon: IconUsers, label: 'Networking' },
  { icon: IconFlag, label: 'Competitions' },
  { icon: IconChip, label: 'Robotics Demo' },
]

const CENTER = { top: 170, left: 160 } // px, center of the .activity-wheel
const RADIUS = 100 // px
const STEP_DEG = 360 / RING_ITEMS.length
const AUTO_ADVANCE_MS = 2800

// Cycles through the ring on a timer, and lets a click jump straight to a
// track (resetting the timer so it doesn't immediately spin away again).
function useRingSelector(count, intervalMs) {
  const [activeIndex, setActiveIndex] = useState(0)
  const timerRef = useRef(null)

  const restartTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setActiveIndex((i) => (i + 1) % count)
    }, intervalMs)
  }

  useEffect(() => {
    restartTimer()
    return () => clearInterval(timerRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const select = (index) => {
    setActiveIndex(index)
    restartTimer()
  }

  return [activeIndex, select]
}

function Sparkline() {
  return (
    <svg viewBox="0 0 300 60" preserveAspectRatio="none">
      <polyline
        points="0,45 10,42 20,40 30,35 40,36 50,28 60,30 70,22 80,24 90,15 100,18 110,10 120,14 130,8 140,12 150,6 160,10 170,5 180,9 190,4 200,7 210,3 220,6 230,2 240,5 250,3 260,6 270,4 280,5 290,3 300,4"
        fill="none"
        stroke="#29e0ff"
        strokeWidth="1.5"
      />
    </svg>
  )
}

export default function StayOnTop() {
  const [activeIndex, selectTrack] = useRingSelector(RING_ITEMS.length, AUTO_ADVANCE_MS)
  const active = RING_ITEMS[activeIndex]

  return (
    <section className="split-section">
      <div className="split-col left">
        <h2>Choose your track, no matter what you're into.</h2>

        <div className="activity-wheel">
          <div
            className="activity-label"
            style={{ top: `${CENTER.top}px`, left: `${CENTER.left + RADIUS + 62}px` }}
          >
            <div className="eyebrow">Track</div>
            <div className="name" key={active.label}>{active.label}</div>
          </div>

          {RING_ITEMS.map((item, i) => {
            const Icon = item.icon
            const angleDeg = i * STEP_DEG - activeIndex * STEP_DEG
            const angleRad = (angleDeg * Math.PI) / 180
            const top = CENTER.top + RADIUS * Math.sin(angleRad)
            const left = CENTER.left + RADIUS * Math.cos(angleRad)
            const isActive = i === activeIndex

            return (
              <button
                key={item.label}
                type="button"
                className={`activity-node${isActive ? ' active' : ''}`}
                style={{ top: `${top}px`, left: `${left}px`, transform: 'translate(-50%,-50%)' }}
                title={item.label}
                aria-label={`Select ${item.label} track`}
                aria-pressed={isActive}
                onClick={() => selectTrack(i)}
              >
                <Icon />
              </button>
            )
          })}
        </div>

        <div className="wheel-dots">
          {RING_ITEMS.map((item, i) => (
            <button
              key={item.label}
              type="button"
              className={i === activeIndex ? 'active' : ''}
              aria-label={`Jump to ${item.label}`}
              onClick={() => selectTrack(i)}
            />
          ))}
        </div>
      </div>

      <div className="split-col">
        <h2>Accurate, live updates from every session.</h2>
        <p className="desc">
          Tech Week runs on a live schedule system, syncing session times, room changes, and
          results straight to your dashboard.
        </p>

        <div className="stats-card">
          <div className="stats-pill-row">
            <div className="stats-pill">
              <span className="num">A</span>
              <span className="level">Advanced</span>
            </div>
            <div className="bars">
              <span /><span /><span /><span />
            </div>
          </div>
          <div className="stats-grid">
            <div className="stat-block time">
              <div className="label">Session Length</div>
              <div className="value">1:30:00</div>
            </div>
            <div className="stat-block time">
              <div className="label">Doors Open</div>
              <div className="value">9:00<span className="unit">AM</span></div>
            </div>
            <div className="stat-block cal">
              <div className="label">Seats Left</div>
              <div className="value">42</div>
            </div>
            <div className="stat-block cal">
              <div className="label">Capacity</div>
              <div className="value">120</div>
            </div>
            <div className="stat-block cal">
              <div className="label">Hype Meter</div>
              <div className="value">98<span className="unit">%</span></div>
            </div>
          </div>
        </div>

        <div className="chart-card">
          <Sparkline />
          <div className="chart-meta">
            <span>Mon</span>
            <span style={{ color: '#29e0ff' }}>REGISTRATIONS THIS WEEK</span>
            <span>Fri</span>
          </div>
          <div className="workout-name">Hackathon Finals</div>
          <div className="workout-sub">Most registered event</div>
        </div>
      </div>
    </section>
  )
}
