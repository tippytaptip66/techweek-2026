export default function Footer() {
  return (
    <footer className="footer">
      <div className="wordmark">TECHWEEK</div>
      <p className="copyright">College of Computer Studies · St. Timothy University</p>
      <div className="divider" />
      <div className="socials">
        <a href="#" aria-label="Instagram">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
          </svg>
        </a>
        <a href="#" aria-label="YouTube">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
            <path d="M10.5 9.5v5l4.5-2.5z" fill="currentColor" stroke="none" />
          </svg>
        </a>
        <a href="#" aria-label="Twitter / X">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22 5.9c-.7.3-1.5.6-2.3.7.8-.5 1.4-1.3 1.7-2.3-.8.5-1.6.8-2.6 1a4 4 0 0 0-6.9 3.7A11.5 11.5 0 0 1 3.4 4.6a4.1 4.1 0 0 0 1.3 5.4c-.7 0-1.3-.2-1.9-.5v.1c0 2 1.4 3.6 3.2 4a4 4 0 0 1-1.8.1c.5 1.6 2 2.8 3.8 2.8A8 8 0 0 1 2 18.4a11.4 11.4 0 0 0 6.2 1.8c7.4 0 11.5-6.2 11.5-11.5v-.5c.8-.6 1.5-1.3 2-2.1z" />
          </svg>
        </a>
        <a href="#" aria-label="LinkedIn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2 3.77-2 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.6c0-1.34-.02-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96V21H9z" />
          </svg>
        </a>
      </div>
    </footer>
  )
}
