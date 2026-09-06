const SCHEDULE = [
  { time: '9:00', title: 'Opening Keynote', tag: 'Main Hall' },
  { time: '11:00', title: 'AI Workshop', tag: 'Room 204' },
  { time: '1:00', title: 'Hackathon Kickoff', tag: 'Lab 3' },
]

const PHONE_CARDS = [
  { t: 'Hackathon Finals', s: 'Today · 6:00 PM', color: 'var(--accent)' },
  { t: 'Robotics Demo', s: 'Tomorrow · 2:00 PM', color: 'var(--accent2)' },
  { t: 'Awards Night', s: 'Fri · 7:00 PM', color: 'var(--pink)' },
]

const MORE_ITEMS = [
  'Live leaderboard',
  'Sponsor booths',
  'Career fair',
  'Alumni panel',
  'Esports arena',
  'Robotics demo',
]

export default function SyncSection() {
  return (
    <>
      <section className="sync-section">
        <div className="sync-copy">
          <h2>Your schedule syncs across every device.</h2>
          <p>
            Save sessions on the web and check them on your phone at the event — no app download,
            no account required.
          </p>
        </div>

        <div className="sync-devices">
          <div className="laptop-mock">
            <div className="dots">
              <span /><span /><span />
            </div>
            {SCHEDULE.map((row) => (
              <div className="row" key={row.title}>
                <span className="time">{row.time}</span>
                <span className="title">{row.title}</span>
                <span className="tag">{row.tag}</span>
              </div>
            ))}
          </div>

          <div className="phone-mock">
            <div className="ph-header">Tech Week 2026</div>
            {PHONE_CARDS.map((c) => (
              <div className="ph-card" key={c.t}>
                <span className="dot" style={{ background: c.color }} />
                <div className="t">{c.t}</div>
                <div className="s">{c.s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="more-way">
        <h4>And more is coming.</h4>
        <div className="track">
          <div className="items">
            {[...MORE_ITEMS, ...MORE_ITEMS].map((item, i) => (
              <span key={i}>{item} &nbsp;·&nbsp;</span>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
