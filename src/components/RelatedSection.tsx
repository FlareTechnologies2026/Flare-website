import React from 'react'
import Link from 'next/link'
import { BY_SLUG, MENU_LABEL } from '@/lib/content'

interface Props {
  related: string[]
}

export default function RelatedSection({ related }: Props) {
  const items = related.filter(s => s in BY_SLUG)
  if (!items.length) return null

  return (
    <section className="section related" aria-labelledby="rel-h">
      <div className="wrap">
        <h2 id="rel-h">Related services</h2>
        <ul className="rel-list">
          {items.map(slug => {
            const p = BY_SLUG[slug]
            return (
              <li key={slug}>
                <Link href={`/${slug}/`}>
                  <span className="rel-t">{MENU_LABEL[slug] ?? p.h1}</span>
                  <span className="rel-d">{p.desc}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
