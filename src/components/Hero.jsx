import { useState } from "react";

function ChipGraphic() {
  return (
    <div className="hero-chip-wrap">
      <svg viewBox="0 0 320 320" fill="none" aria-label="Circuit chip graphic">
        {/* circuit traces */}
        <g stroke="#1c3a55" strokeWidth="1.5">
          <path d="M160 40V90" />
          <path d="M160 230V280" />
          <path d="M40 160H90" />
          <path d="M230 160H280" />
          <path d="M70 70 110 110" />
          <path d="M250 70 210 110" />
          <path d="M70 250 110 210" />
          <path d="M250 250 210 210" />
        </g>

        {/* pulsing nodes */}
        <circle className="chip-node" cx="160" cy="40" r="4" />
        <circle className="chip-node n2" cx="160" cy="280" r="4" />
        <circle className="chip-node n3" cx="40" cy="160" r="4" />
        <circle className="chip-node n4" cx="280" cy="160" r="4" />
        <circle className="chip-node n2" cx="70" cy="70" r="4" />
        <circle className="chip-node n4" cx="250" cy="70" r="4" />
        <circle className="chip-node n3" cx="70" cy="250" r="4" />
        <circle className="chip-node" cx="250" cy="250" r="4" />

        {/* chip body */}
        <rect x="100" y="100" width="120" height="120" rx="14" fill="#08101e" stroke="#29e0ff" strokeOpacity="0.5" strokeWidth="1.5" />
        <rect x="118" y="118" width="84" height="84" rx="8" fill="none" stroke="#8b7bff" strokeOpacity="0.5" strokeWidth="1.2" />

        {/* glowing core */}
        <g className="chip-core">
          <circle cx="160" cy="160" r="26" fill="#061018" stroke="#29e0ff" strokeWidth="2" />
          <text x="160" y="168" textAnchor="middle" fontFamily="'Apris Medium', Georgia, serif" fontSize="22" fill="#eaf3ff">TW</text>
        </g>
      </svg>
    </div>
  )
}

function Modal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Register for Tech Week</h2>
        <p>Fill out the form to secure your spot in this week of innovation, competition, and discovery.</p>
        <p>Click "Reserve your seat" Below.</p>
        <button onClick={onClose} className="close-btn">Close</button>
      </div>
    </div>
  )
}

export default function Hero() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);

  const closeModal = () => {
    setIsOpen(false);

    // Tween/scroll back to footer
    const footer = document.querySelector("footer");
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero">
      <h1>A week of innovation, competition, and discovery — built for the St. Timothy University tech community.</h1>
      <ChipGraphic />
      <div className="get-app-wrap">
        <button onClick={openModal} className="get-app-pill">Register now</button>
      </div>

      {isOpen && <Modal onClose={closeModal} />}
    </section>
  )
}
