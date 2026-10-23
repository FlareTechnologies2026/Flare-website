'use client'
import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { GROWTH_MENU, BUILD_MENU, INDUSTRY_MENU, RESOURCE_MENU, MENU_LABEL } from '@/lib/content'

function Dropdown({
  label,
  cols,
  did,
  footer,
}: {
  label: string
  cols: [string, string[]][]
  did: string
  footer?: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLLIElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isHoverable =
    typeof window !== 'undefined'
      ? window.matchMedia('(hover: hover) and (pointer: fine)').matches
      : false

  const handleEnter = () => {
    if (isHoverable) { if (timerRef.current) clearTimeout(timerRef.current); setOpen(true) }
  }
  const handleLeave = () => {
    if (isHoverable) { timerRef.current = setTimeout(() => setOpen(false), 160) }
  }
  const handleClick = () => {
    if (!isHoverable) setOpen(o => !o)
    else setOpen(true)
  }

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('click', handle)
    return () => document.removeEventListener('click', handle)
  }, [])

  return (
    <li className="has-mega" ref={ref} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <button
        className="nav-btn"
        aria-expanded={open ? 'true' : 'false'}
        aria-controls={did}
        onClick={handleClick}
      >
        {label}
        <svg aria-hidden="true" width="10" height="10" viewBox="0 0 10 10">
          <path d="M1 3l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </button>
      <div className={`mega${open ? ' open' : ''}`} id={did} data-cols={cols.length}>
        <div className="mega-inner">
          {cols.map(([heading, items]) => (
            <div className="mega-col" key={heading}>
              <p className="mega-head">{heading}</p>
              <ul>
                {items.map(slug => (
                  <li key={slug}>
                    <Link href={`/${slug}/`}>{MENU_LABEL[slug] ?? slug}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {footer}
      </div>
    </li>
  )
}

export default function Header() {
  const gfoot = (
    <div className="mega-foot">
      <Link href="/growth-system/">How the Growth System works</Link>
      <Link href="/partnerships/">For agencies: white-label partnerships</Link>
      <Link href="/paid-ads/">Paid ads overview</Link>
    </div>
  )

  const [mobileOpen, setMobileOpen] = useState(false)

  const toggleMobile = () => setMobileOpen(o => !o)

  return (
    <header className="site-header">
      <div className="wrap header-row">
        <Link className="brand" href="/" aria-label="Flare Technologies home">
          <Image
            className="logo-dark"
            src="/assets/flare-mark.webp"
            width={94}
            height={40}
            alt="Flare Technologies logo"
          />
          <Image
            className="logo-light"
            src="/assets/flare-mark-light.webp"
            width={94}
            height={40}
            alt=""
            aria-hidden
          />
          <span className="brand-name">Flare Technologies</span>
        </Link>

        <nav className="main-nav" aria-label="Main">
          <ul className="nav-list">
            <Dropdown label="Growth System" cols={GROWTH_MENU} did="m-growth" footer={gfoot} />
            <Dropdown label="Custom Development" cols={BUILD_MENU} did="m-build" />
            <Dropdown label="Industries" cols={INDUSTRY_MENU} did="m-ind" />
            <li>
              <Link className="nav-link" href="/case-studies/">Work</Link>
            </li>
            <Dropdown label="Resources" cols={RESOURCE_MENU} did="m-res" />
            <li>
              <Link className="nav-link" href="/about/">About</Link>
            </li>
          </ul>
        </nav>

        <Link className="btn btn-primary header-cta" href="/contact/">Book a strategy call</Link>

        <button
          className="menu-toggle"
          aria-expanded={mobileOpen ? 'true' : 'false'}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          onClick={toggleMobile}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div className="mobile-nav" id="mobile-nav" hidden={!mobileOpen}>
        <MobileNav />
        <Link className="btn btn-primary btn-block" href="/contact/">Book a strategy call</Link>
      </div>
    </header>
  )
}

function MobileNav() {
  const groups: [string, [string, string[]][]][] = [
    ['Growth System', [['', ['growth-system']], ...GROWTH_MENU]],
    ['Custom Development', BUILD_MENU],
    ['Industries & locations', INDUSTRY_MENU],
    ['Resources', RESOURCE_MENU],
  ]

  return (
    <>
      {groups.map(([g, cols]) => (
        <details key={g}>
          <summary>{g}</summary>
          <ul>
            {cols.flatMap(([, items]) =>
              items.map(slug => (
                <li key={slug}>
                  <Link href={`/${slug}/`}>{MENU_LABEL[slug] ?? slug}</Link>
                </li>
              ))
            )}
          </ul>
        </details>
      ))}
      <Link className="m-link" href="/case-studies/">Work</Link>
      <Link className="m-link" href="/about/">About</Link>
    </>
  )
}
