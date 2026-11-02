'use client'
import { useEffect } from 'react'

const CALENDLY_URL = 'https://calendly.com/flaretechnologies-marketing/stratergy-call'

export default function CalendlyButton() {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.head.appendChild(script)
    return () => { document.head.removeChild(script) }
  }, [])

  const openCalendly = () => {
    // @ts-expect-error Calendly is loaded via external script
    if (window.Calendly) {
      // @ts-expect-error Calendly is loaded via external script
      window.Calendly.initPopupWidget({ url: CALENDLY_URL })
    }
  }

  return (
    <>
      <link rel="stylesheet" href="https://assets.calendly.com/assets/external/widget.css" />
      <button
        onClick={openCalendly}
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
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(250,77,18,.45)',
          transition: 'background .2s, box-shadow .2s, transform .12s',
          whiteSpace: 'nowrap',
        }}
        onMouseEnter={e => {
          const el = e.currentTarget
          el.style.background = 'var(--primary-600)'
          el.style.boxShadow = '0 6px 28px rgba(250,77,18,.55)'
        }}
        onMouseLeave={e => {
          const el = e.currentTarget
          el.style.background = 'var(--primary-500)'
          el.style.boxShadow = '0 4px 20px rgba(250,77,18,.45)'
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        Book a call
      </button>
    </>
  )
}
