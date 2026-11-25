import React from 'react'
import Link from 'next/link'

const WHATSAPP = 'https://wa.me/917899104311'

interface Props {
  text?: string
}

export default function CtaBand({ text }: Props) {
  const body = text ?? 'Tell us where your pipeline is stuck. In 30 minutes you get a clear plan, and a written proposal within two working days.'
  return (
    <section className="cta-band" aria-labelledby="cta-h">
      <div className="wrap cta-inner">
        <div>
          <h2 id="cta-h">Ready for a pipeline that does not depend on luck?</h2>
          <p>{body}</p>
        </div>
        <div className="cta-actions">
          <Link className="btn btn-primary btn-lg" href="/contact/">Book a strategy call</Link>
          <a className="btn btn-ghost-light" href={WHATSAPP}>Message us on WhatsApp</a>
        </div>
      </div>
    </section>
  )
}
