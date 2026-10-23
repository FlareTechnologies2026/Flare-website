import React from 'react'
import Link from 'next/link'
import { CASES } from '@/lib/content'

interface Props {
  limit?: number
}

export default function CasesSection({ limit }: Props) {
  const items = limit ? CASES.slice(0, limit) : CASES
  return (
    <div className="cases">
      {items.map((c, i) => (
        <article key={i} className="case">
          <p className="case-sector">{c.sector} · {c.client}</p>
          <h3>{c.title}</h3>
          <p>{c.body}</p>
          <ul className="case-stats">
            {c.stats.map(([a, b], j) => (
              <li key={j}>
                <strong>{a}</strong>
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <Link className="text-link" href={`/${c.link}/`}>See the service behind it</Link>
        </article>
      ))}
    </div>
  )
}
