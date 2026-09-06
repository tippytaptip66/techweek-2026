const common = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }

export function IconCode(props) {
  return (
    <svg {...common} {...props}>
      <path d="M9 8 4 12l5 4" />
      <path d="M15 8l5 4-5 4" />
    </svg>
  )
}

export function IconChip(props) {
  return (
    <svg {...common} {...props}>
      <rect x="7" y="7" width="10" height="10" rx="1.5" />
      <path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" />
    </svg>
  )
}

export function IconTrophy(props) {
  return (
    <svg {...common} {...props}>
      <path d="M7 4h10v5a5 5 0 0 1-10 0V4z" />
      <path d="M7 5H4a3 3 0 0 0 3 5M17 5h3a3 3 0 0 1-3 5" />
      <path d="M12 14v3M9 20h6M10 20l.5-3h3l.5 3" />
    </svg>
  )
}

export function IconMic(props) {
  return (
    <svg {...common} {...props}>
      <rect x="9" y="2.5" width="6" height="11" rx="3" />
      <path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M9 21h6" />
    </svg>
  )
}

export function IconAward(props) {
  return (
    <svg {...common} {...props}>
      <circle cx="12" cy="8.5" r="5.5" />
      <path d="M8.5 13.2 7 21l5-2.5 5 2.5-1.5-7.8" />
    </svg>
  )
}

export function IconUsers(props) {
  return (
    <svg {...common} {...props}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <circle cx="17.5" cy="9" r="2.3" />
      <path d="M15.7 14.2c2.4.4 4.3 2.5 4.3 5.3" />
    </svg>
  )
}

export function IconFlag(props) {
  return (
    <svg {...common} {...props}>
      <path d="M5 21V4" />
      <path d="M5 4h13l-3 4 3 4H5" />
    </svg>
  )
}

export function IconCheck(props) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
      <path d="M5 12.5 10 17l9-10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
