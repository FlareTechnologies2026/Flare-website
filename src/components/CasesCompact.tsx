import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { CaseStudy } from '@/lib/caseStore'

interface Props {
  items: CaseStudy[]
  dark?: boolean
}

export default function CasesCompact({ items, dark }: Props) {
  if (!items.length) return null

  return (
    <div className={`cases-compact${dark ? ' cases-compact-dark' : ''}`}>
      {items.map((c) => (
        <Link key={c.id} href={`/${c.link}/`} className="case-compact">
          <div className="case-compact-top">
            {c.logo ? (
              <div className="case-compact-logo">
                <Image
                  src={c.logo}
                  alt={`${c.client} logo`}
                  width={48}
                  height={16}
                  style={{ objectFit: 'contain' }}
                />
              </div>
            ) : (
              <span className="case-compact-dot" aria-hidden="true" />
            )}
            <span className="case-compact-client">{c.client}</span>
          </div>
          <p className="case-compact-title">{c.title}</p>
        </Link>
      ))}
    </div>
  )
}
