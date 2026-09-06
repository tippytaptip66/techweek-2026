
const BG_VIDEO = '/videos/techweek-bg.mp4'

export default function FocusSection() {
  return (
    <section className="strip-panel">
      <div className="strip-bar">
        <span className="eyebrow">Oct 12–16, 2026</span>
        <span className="eyebrow">Scroll for more ⌄</span>
      </div>
      <div className="focus-media">
        <video className="bg-video" src={BG_VIDEO} autoPlay muted loop playsInline />
        <div className="circuit-bg" />
        <div className="overlay-copy">
          <div className="left">
            <h3>Learn from the best.</h3>
          </div>
          <div className="right">
            <h3>Compete for real prizes.</h3>
          </div>
        </div>
      </div>
    </section>
  )
}
