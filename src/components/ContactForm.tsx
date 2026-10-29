'use client'
import React, { useState, useRef } from 'react'

const EMAIL = 'marketing@flaretechnologies.in'
const PHONE = '+91 78991 04311'
const WHATSAPP = 'https://wa.me/917899104311'
const LINKEDIN = 'https://www.linkedin.com/company/flaretechnologiespvtltd/'

export default function ContactForm() {
  const [nameInvalid, setNameInvalid] = useState(false)
  const [emailInvalid, setEmailInvalid] = useState(false)
  const [note, setNote] = useState('')
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const name = nameRef.current?.value.trim() ?? ''
    const email = emailRef.current?.value.trim() ?? ''
    let ok = true
    setNameInvalid(false)
    setEmailInvalid(false)
    if (!name) { setNameInvalid(true); ok = false }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { setEmailInvalid(true); ok = false }
    if (!ok) {
      setNote('Add your name and a valid work email so we can reply.')
      ;(!name ? nameRef : emailRef).current?.focus()
      return
    }
    const form = formRef.current!
    const data = new FormData(form)
    try {
      const r = await fetch('/api/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(data)),
      })
      if (!r.ok) throw new Error(String(r.status))
      form.reset()
      setNote(`Thanks, ${name}. We have your request and will reply within one working day.`)
    } catch {
      setNote(`We could not send the form from this page. Please write to ${EMAIL} and we will reply within one working day.`)
    }
  }

  return (
    <div className="contact-grid">
      <div>
        <h1>Book a strategy call.</h1>
        <p className="lead">Tell us about your business and what you want to grow. In 30 minutes we will look at your current pipeline, tell you which plan fits, and send a written proposal within two working days.</p>
        <ul className="contact-list">
          <li><span>Email</span><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
          <li><span>WhatsApp</span><a href={WHATSAPP}>{PHONE}</a></li>
          <li><span>LinkedIn</span><a href={LINKEDIN} rel="noopener">Flare Technologies</a></li>
          <li><span>Location</span><span>Bengaluru, India</span></li>
        </ul>
      </div>
      <div>
        <form
          id="contact-form"
          ref={formRef}
          name="contact"
          method="POST"
          onSubmit={handleSubmit}
          className="contact-form"
        >
          <div style={{ display: 'none' }}>
            <label>Don&apos;t fill this: <input name="bot-field" /></label>
          </div>
          <div className="field">
            <label htmlFor="c-name">Your name</label>
            <input id="c-name" name="name" type="text" placeholder="Adity Singh" required ref={nameRef} aria-invalid={nameInvalid ? 'true' : undefined} />
          </div>
          <div className="field">
            <label htmlFor="c-email">Work email</label>
            <input id="c-email" name="email" type="email" placeholder="adity@company.com" required ref={emailRef} aria-invalid={emailInvalid ? 'true' : undefined} />
          </div>
          <div className="field">
            <label htmlFor="c-company">Company</label>
            <input id="c-company" name="company" type="text" placeholder="Company name" />
          </div>
          <div className="field">
            <label htmlFor="c-service">What are you looking for?</label>
            <select id="c-service" name="service">
              <option value="">Select a service</option>
              <option>B2B Lead Generation</option>
              <option>LinkedIn Outreach</option>
              <option>Paid Ads</option>
              <option>SEO, AEO &amp; GEO</option>
              <option>Social Media</option>
              <option>Sales Consulting</option>
              <option>Custom Development</option>
              <option>Other / Not sure</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="c-msg">Anything else we should know?</label>
            <textarea id="c-msg" name="message" rows={4} placeholder="Tell us about your target market, what you have tried, or what you want to achieve." />
          </div>
          <button type="submit" className="btn btn-primary btn-block btn-lg">Send request</button>
          {note && <p id="form-note" className="form-note">{note}</p>}
        </form>
      </div>
    </div>
  )
}
