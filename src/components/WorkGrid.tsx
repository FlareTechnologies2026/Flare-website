import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { PROJECTS, CASES } from '@/lib/content'

// Build a lookup of client name → logo path from CASES
const CLIENT_LOGOS: Record<string, string> = {}
for (const c of CASES) {
  if (c.logo) {
    // Match on primary client name (before comma if multiple)
    const primary = c.client.split(',')[0].trim()
    CLIENT_LOGOS[primary] = c.logo
  }
}

// Specific project → logo overrides
const PROJECT_LOGOS: Record<string, string> = {
  'Coca-Cola B2B Beverage App': '/assets/cocacola.png',
  'CSG Advisory': '/assets/csg.png',
  'AI Launchpad': '/assets/ailaunchpad.png',
}

export default function WorkGrid() {
  // Group by category
  const grouped: Record<string, string[]> = {}
  for (const [name, cat] of PROJECTS) {
    if (!grouped[cat]) grouped[cat] = []
    grouped[cat].push(name)
  }

  return (
    <div className="work-grid">
      {Object.entries(grouped).map(([cat, names]) => (
        <div key={cat} className="work-cat">
          <h2>{cat}</h2>
          <ul>
            {names.map(name => {
              const logo = PROJECT_LOGOS[name] ?? CLIENT_LOGOS[name]
              return (
                <li key={name} className="work-item">
                  {logo ? (
                    <Image
                      src={logo}
                      alt={`${name} logo`}
                      width={120}
                      height={40}
                      className="work-item-logo"
                      style={{ objectFit: 'contain' }}
                    />
                  ) : (
                    <span className="work-item-dot" aria-hidden="true" />
                  )}
                  <span className="work-item-name">{name}</span>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </div>
  )
}
