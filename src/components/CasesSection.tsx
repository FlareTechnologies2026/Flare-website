import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { CASES } from '@/lib/content'
import type { CaseStudy } from '@/lib/caseStore'

interface Props {
  limit?: number
  items?: CaseStudy[]
}

export default function CasesSection({ limit, items }: Props) {
  const source = items && items.length > 0 ? items : CASES.map((c, i) => ({ id: `static-${i}`, ...c }))
  const list = limit ? source.slice(0, limit) : source
  return (
    <div className="cases">
      {list.map((c, i) => (
        <article key={c.id ?? i} className="case">
          {/* Sector + client name row with optional logo */}
          <div className="case-header">
            {c.logo && (
              <div className="case-logo">
                <Image
                  src={c.logo}
                  alt={`${c.client} logo`}
                  width={160}
                  height={40}
                  style={{ objectFit: 'contain' }}
                />
              </div>
            )}
            <p className="case-sector">{c.sector} · {c.client}</p>
          </div>

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
