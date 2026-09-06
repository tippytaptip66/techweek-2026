import { useState } from 'react'
import RegisterModal from './RegisterModal.jsx'

export default function CTASection() {
  const [open, setOpen] = useState(false)

  return (
    <section className="cta-section">
      <div className="eyebrow">Tech Week 2026 · CCS</div>
      <h2>Seats are filling up fast. Save yours today.</h2>
      <button className="cta-button" onClick={() => setOpen(true)}>
        Reserve your seat
      </button>

      <RegisterModal open={open} onClose={() => setOpen(false)} />
    </section>
  )
}
