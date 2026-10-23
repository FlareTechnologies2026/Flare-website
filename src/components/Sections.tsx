import React from 'react'
import { md } from '@/lib/markdown'
import { SYSTEM_STEPS, BUILD_STEPS_MD } from '@/lib/content'

function StepsHtml() {
  return (
    <ol className="system-steps">
      {SYSTEM_STEPS.map(([title, desc], i) => (
        <li key={i}>
          <span className="n" aria-hidden="true">{i + 1}</span>
          <div>
            <h3>{title}</h3>
            <p>{desc}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}

function SectionBody({ body }: { body: string }) {
  if (body === 'STEPS') return <StepsHtml />
  if (body === 'BUILD_STEPS') return <div dangerouslySetInnerHTML={{ __html: md(BUILD_STEPS_MD) }} />
  return <div dangerouslySetInnerHTML={{ __html: md(body) }} />
}

interface Props {
  sections: [string, string][]
}

export default function Sections({ sections }: Props) {
  if (!sections.length) return null
  return (
    <>
      {sections.map(([heading, body], i) => {
        const wide = body.includes('|') || body === 'STEPS'
        if (wide) {
          return (
            <section key={i} className="section alt">
              <div className="wrap wide">
                <h2>{heading}</h2>
                <SectionBody body={body} />
              </div>
            </section>
          )
        }
        return (
          <section key={i} className="section rule">
            <div className="wrap two-col">
              <h2>{heading}</h2>
              <div className="prose">
                <SectionBody body={body} />
              </div>
            </div>
          </section>
        )
      })}
    </>
  )
}
