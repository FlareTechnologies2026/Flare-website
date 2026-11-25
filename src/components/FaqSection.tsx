import React from 'react'

interface Props {
  faqs: [string, string][]
  firstOpen?: boolean
}

export default function FaqSection({ faqs, firstOpen }: Props) {
  if (!faqs.length) return null
  return (
    <section className="section faq-section" aria-labelledby="faq-h">
      <div className="wrap narrow">
        <h2 id="faq-h">Frequently asked questions</h2>
        {faqs.map(([q, a], i) => (
          <details key={i} className="faq" open={firstOpen && i === 0 ? true : undefined}>
            <summary><h3>{q}</h3></summary>
            <div className="faq-a"><p>{a}</p></div>
          </details>
        ))}
      </div>
    </section>
  )
}
