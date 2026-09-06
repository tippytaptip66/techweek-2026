import { IconCode, IconChip, IconTrophy, IconMic, IconAward, IconUsers } from './icons.jsx'

const ROW_1 = [
  { icon: IconCode, name: 'Workshops', sub: '12 sessions', pct: 0.75, alt: false },
  { icon: IconChip, name: 'Exhibits', sub: '40+ booths', pct: 0.5, alt: true },
  { icon: IconTrophy, name: 'Hackathon', sub: '24 hours', pct: 0.9, alt: false },
]

const ROW_2 = [
  { icon: IconMic, name: 'Keynotes', sub: '5 speakers', pct: 0.4, alt: true },
  { icon: IconAward, name: 'Awards Night', sub: 'Closing gala', pct: 0.65, alt: false },
  { icon: IconUsers, name: 'Networking', sub: 'Open mixers', pct: 0.3, alt: true },
]

function ringPath(pct) {
  const c = 2 * Math.PI * 80
  return `${c * pct} ${c}`
}

function Badge({ item }) {
  const Icon = item.icon
  const stroke = item.alt ? 'var(--accent2)' : 'var(--accent)'
  return (
    <div className="badge-ring">
      <svg className="ring-progress" viewBox="0 0 176 176">
        <circle cx="88" cy="88" r="80" fill="none" stroke="var(--line)" strokeWidth="2" />
        <circle
          cx="88"
          cy="88"
          r="80"
          fill="none"
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={ringPath(item.pct)}
        />
      </svg>
      <span className={`icon${item.alt ? ' alt' : ''}`}>
        <Icon />
      </span>
      <span className="name">{item.name}</span>
      <span className="sub">{item.sub}</span>
    </div>
  )
}

function Row({ items, reverse }) {
  const doubled = [...items, ...items, ...items]
  return (
    <div className="rings-section">
      <div className={`marquee-row${reverse ? ' reverse' : ''}`}>
        {doubled.map((item, i) => (
          <Badge key={i} item={item} />
        ))}
      </div>
    </div>
  )
}

export default function RingsMarquee() {
  return (
    <>
      <Row items={ROW_1} />
      <div className="rings-copy">
        <h2>Every track keeps you posted on what's next.</h2>
        <p>
          Real-time schedules and live updates make sure you never miss a session, workshop, or
          competition.
        </p>
      </div>
      <Row items={ROW_2} reverse />
    </>
  )
}
