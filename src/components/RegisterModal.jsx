import { useEffect, useState } from 'react'

const TRACKS = [
  'Workshops',
  'Exhibits',
  'Keynote',
  'Awards Night',
  'Networking',
  'Competitions',
  'Robotics Demo',
]

const EMPTY_FORM = { name: '', email: '', track: '', agree: false }

export default function RegisterModal({ open, onClose }) {
  const [step, setStep] = useState('form') 
  const [form, setForm] = useState(EMPTY_FORM)

  
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  const canSubmit = form.name.trim() && form.email.trim() && form.track && form.agree

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!canSubmit) return
   
    setStep('success')
  }

  const handleClose = () => {
    onClose()
    
    setTimeout(() => {
      setStep('form')
      setForm(EMPTY_FORM)
    }, 250)
  }

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <button className="modal-close" onClick={handleClose} aria-label="Close">
          ✕
        </button>

        {step === 'form' ? (
          <>
            <div className="modal-eyebrow eyebrow">Tech Week 2026</div>
            <h3 className="modal-title">Reserve your seat</h3>
            <p className="modal-sub">Lock in your spot — seats are limited per track.</p>

            <form className="modal-form" onSubmit={handleSubmit}>
              <label className="field">
                <span>Full name</span>
                <input
                  type="text"
                  placeholder="Elmer Bacoro"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </label>

              <label className="field">
                <span>Email address</span>
                <input
                  type="email"
                  placeholder="you@ccc.edu.ph"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </label>

              <label className="field">
                <span>Track</span>
                <select
                  value={form.track}
                  onChange={(e) => setForm({ ...form, track: e.target.value })}
                  required
                >
                  <option value="" disabled>Choose a track</option>
                  {TRACKS.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </label>

              <label className="toggle-row">
                <span>I agree to the event terms &amp; code of conduct</span>
                <span className="switch">
                  <input
                    type="checkbox"
                    checked={form.agree}
                    onChange={(e) => setForm({ ...form, agree: e.target.checked })}
                  />
                  <span className="switch-dot" />
                </span>
              </label>

              <button type="submit" className="modal-submit" disabled={!canSubmit}>
                Reserve my seat
              </button>
            </form>
          </>
        ) : (
          <div className="modal-success">
            <div className="success-badge">✓</div>
            <h3 className="modal-title">You're in, {form.name.split(' ')[0]}!</h3>
            <p className="modal-sub">
              We've saved you a seat for the <strong>{form.track}</strong> track. Check{' '}
              <strong>{form.email}</strong> for your confirmation and schedule.
            </p>
            <button className="modal-submit" onClick={handleClose}>
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
