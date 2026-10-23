import React from 'react'
import { PROJECTS } from '@/lib/content'

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
            {names.map(name => <li key={name}>{name}</li>)}
          </ul>
        </div>
      ))}
    </div>
  )
}
