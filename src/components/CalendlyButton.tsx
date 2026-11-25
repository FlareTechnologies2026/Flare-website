'use client'

const BOOKING_URL = 'https://koalendar.com/e/strategy-call-43'

export default function CalendlyButton() {
  return (
    <a
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Book a strategy call"
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '28px',
        zIndex: 999,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '0 20px',
        height: '50px',
        borderRadius: '999px',
        background: 'var(--primary-500)',
        color: '#fff',
        font: '600 15px/1 var(--font-body)',
        textDecoration: 'none',
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0 4px 20px rgba(250,77,18,.45)',
        whiteSpace: 'nowrap',
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
      Book a call
    </a>
  )
}
