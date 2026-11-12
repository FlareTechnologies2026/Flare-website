'use client'

import React, { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import type { PageData } from '@/lib/types'
import type { Vacancy } from '@/lib/vacancyStore'
import HeroInner from './HeroInner'
import Sections from './Sections'
import FaqSection from './FaqSection'
import RelatedSection from './RelatedSection'
import CtaBand from './CtaBand'

interface Props {
  page: PageData
  vacancies: Vacancy[]
}

const TYPE_COLOURS: Record<string, string> = {
  'Full-time':  '#14B6BF',
  'Part-time':  '#6E4CAA',
  'Contract':   '#F5B70F',
  'Internship': '#5FC85B',
}

// ── Apply modal ────────────────────────────────────────────────────────────────
interface ApplyModalProps {
  vacancy: Vacancy
  onClose: () => void
}

function ApplyModal({ vacancy, onClose }: ApplyModalProps) {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const fileRef  = useRef<HTMLInputElement>(null)

  const [name, setName]           = useState('')
  const [email, setEmail]         = useState('')
  const [phone, setPhone]         = useState('')
  const [coverNote, setCoverNote] = useState('')
  const [fileName, setFileName]   = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError]         = useState('')

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) { setFileName(''); return }
    if (f.type !== 'application/pdf') {
      setError('Only PDF files are accepted.')
      e.target.value = ''
      setFileName('')
      return
    }
    if (f.size > 5 * 1024 * 1024) {
      setError('Resume must be under 5 MB.')
      e.target.value = ''
      setFileName('')
      return
    }
    setError('')
    setFileName(f.name)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Client-side validation
    if (!name.trim()) { setError('Please enter your full name.'); return }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { setError('Please enter a valid email address.'); return }
    const file = fileRef.current?.files?.[0]
    if (!file) { setError('Please attach your resume as a PDF.'); return }

    setSubmitting(true)
    const fd = new FormData()
    fd.append('name', name.trim())
    fd.append('email', email.trim())
    fd.append('phone', phone.trim())
    fd.append('cover_note', coverNote.trim())
    fd.append('vacancy_id', vacancy.id)
    fd.append('vacancy_title', vacancy.title)
    fd.append('resume', file)
    // Honeypot
    fd.append('bot-field', '')

    try {
      const res = await fetch('/api/apply', { method: 'POST', body: fd })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(json.error || 'Something went wrong. Please try again.')
        setSubmitting(false)
        return
      }
      // Success — redirect to job-application thank-you
      router.push('/thank-you-application')
    } catch {
      setError('Network error. Please check your connection and try again.')
      setSubmitting(false)
    }
  }

  return (
    /* Backdrop */
    <div
      className="apply-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={`Apply for ${vacancy.title}`}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="apply-modal">
        {/* Header */}
        <div className="apply-modal-header">
          <div>
            <p className="apply-modal-role-label">Applying for</p>
            <h2 className="apply-modal-title">{vacancy.title}</h2>
            {(vacancy.department || vacancy.location) && (
              <p className="apply-modal-sub">
                {[vacancy.department, vacancy.location].filter(Boolean).join(' · ')}
              </p>
            )}
          </div>
          <button
            className="apply-modal-close"
            onClick={onClose}
            aria-label="Close application form"
            type="button"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="apply-form"
          noValidate
        >
          {/* Hidden honeypot */}
          <div style={{ display: 'none' }}>
            <label>Don&apos;t fill this: <input name="bot-field" /></label>
          </div>

          {error && (
            <div className="apply-error" role="alert">
              {error}
            </div>
          )}

          <div className="apply-row-2">
            <div className="field">
              <label htmlFor="ap-name">Full name <span aria-hidden="true" className="apply-req">*</span></label>
              <input
                id="ap-name"
                type="text"
                placeholder="Adity Singh"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                autoComplete="name"
              />
            </div>
            <div className="field">
              <label htmlFor="ap-email">Email address <span aria-hidden="true" className="apply-req">*</span></label>
              <input
                id="ap-email"
                type="email"
                placeholder="adity@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="ap-phone">Phone number <span className="apply-opt">(optional)</span></label>
            <input
              id="ap-phone"
              type="tel"
              placeholder="+91 98765 43210"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              autoComplete="tel"
            />
          </div>

          <div className="field">
            <label htmlFor="ap-cover">Cover note <span className="apply-opt">(optional)</span></label>
            <textarea
              id="ap-cover"
              rows={4}
              placeholder="Tell us why you're a great fit, what you're excited about, or anything else we should know."
              value={coverNote}
              onChange={e => setCoverNote(e.target.value)}
              maxLength={2000}
            />
            <p className="apply-char-count">{coverNote.length}/2000</p>
          </div>

          {/* Resume upload */}
          <div className="field">
            <label>Resume / CV <span aria-hidden="true" className="apply-req">*</span></label>
            <input
              ref={fileRef}
              type="file"
              accept=".pdf,application/pdf"
              id="ap-resume"
              onChange={handleFile}
              style={{ display: 'none' }}
            />
            <label htmlFor="ap-resume" className="apply-file-label">
              <span className="apply-file-text">
                {fileName ? fileName : 'Click to upload PDF (max 5 MB)'}
              </span>
              {fileName && <span className="apply-file-clear" onClick={e => { e.preventDefault(); setFileName(''); if (fileRef.current) fileRef.current.value = '' }}>✕</span>}
            </label>
            <p className="apply-hint">PDF only · Max 5 MB</p>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block btn-lg apply-submit-btn"
            disabled={submitting}
          >
            {submitting ? 'Submitting…' : 'Submit application'}
          </button>

          <p className="apply-privacy">
            Your information is stored securely and used only for this application.
          </p>
        </form>
      </div>
    </div>
  )
}

// ── Vacancy Card ───────────────────────────────────────────────────────────────
function VacancyCard({ v, onApply }: { v: Vacancy; onApply: (v: Vacancy) => void }) {
  const tagColour = TYPE_COLOURS[v.type] || '#8A95A3'
  const [expanded, setExpanded] = useState(false)

  const hasDetails = v.responsibilities || v.qualifications || v.nice_to_have || v.benefits

  return (
    <article className="vacancy-card">
      <div className="vacancy-card-header">
        <div>
          <h3 className="vacancy-title">{v.title}</h3>
          <div className="vacancy-meta">
            {v.department && <span className="vacancy-dept">{v.department}</span>}
            {v.location && (
              <>
                {v.department && <span className="vacancy-sep">·</span>}
                <span className="vacancy-loc">{v.location}</span>
              </>
            )}
          </div>
        </div>
        {v.type && (
          <span
            className="vacancy-type-badge"
            style={{ background: `${tagColour}22`, color: tagColour, border: `1px solid ${tagColour}44` }}
          >
            {v.type}
          </span>
        )}
      </div>

      <div className="vacancy-tags">
        {v.experience && <span className="vacancy-tag">{v.experience}</span>}
        {v.salary     && <span className="vacancy-tag">{v.salary}</span>}
      </div>

      {v.about_role && <p className="vacancy-about">{v.about_role}</p>}

      {/* Expandable details */}
      {hasDetails && (
        <>
          {expanded && (
            <div className="vacancy-details">
              {v.responsibilities && (
                <div className="vacancy-section">
                  <h4 className="vacancy-section-title">What you&apos;ll do</h4>
                  <div className="vacancy-section-body">
                    {v.responsibilities.split('\n').filter(Boolean).map((line, i) => (
                      <p key={i} className="vacancy-bullet">{line.replace(/^[-•*]\s*/, '')}</p>
                    ))}
                  </div>
                </div>
              )}
              {v.qualifications && (
                <div className="vacancy-section">
                  <h4 className="vacancy-section-title">What we&apos;re looking for</h4>
                  <div className="vacancy-section-body">
                    {v.qualifications.split('\n').filter(Boolean).map((line, i) => (
                      <p key={i} className="vacancy-bullet">{line.replace(/^[-•*]\s*/, '')}</p>
                    ))}
                  </div>
                </div>
              )}
              {v.nice_to_have && (
                <div className="vacancy-section">
                  <h4 className="vacancy-section-title">Nice to have</h4>
                  <div className="vacancy-section-body">
                    {v.nice_to_have.split('\n').filter(Boolean).map((line, i) => (
                      <p key={i} className="vacancy-bullet">{line.replace(/^[-•*]\s*/, '')}</p>
                    ))}
                  </div>
                </div>
              )}
              {v.benefits && (
                <div className="vacancy-section">
                  <h4 className="vacancy-section-title">What you get</h4>
                  <div className="vacancy-section-body">
                    {v.benefits.split('\n').filter(Boolean).map((line, i) => (
                      <p key={i} className="vacancy-bullet">{line.replace(/^[-•*]\s*/, '')}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          <button
            className="vacancy-toggle"
            onClick={() => setExpanded(x => !x)}
            aria-expanded={expanded}
            type="button"
          >
            {expanded ? 'Show less ↑' : 'See full job details ↓'}
          </button>
        </>
      )}

      <div className="vacancy-apply">
        <button
          className="btn btn-primary"
          onClick={() => onApply(v)}
          type="button"
        >
          Apply now
        </button>
      </div>
    </article>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function CareersClient({ page, vacancies }: Props) {
  const [applyTarget, setApplyTarget] = useState<Vacancy | null>(null)

  return (
    <>
      <HeroInner page={page} />
      {page.sections && <Sections sections={page.sections} />}

      {/* Open Vacancies */}
      <section className="section" id="open-roles">
        <div className="wrap">
          <div className="vacancies-header">
            <h2>Open roles</h2>
            {vacancies.length > 0 && (
              <span className="vacancies-count">
                {vacancies.length} open {vacancies.length === 1 ? 'position' : 'positions'}
              </span>
            )}
          </div>

          {vacancies.length === 0 ? (
            <div className="vacancies-empty">
              <p>
                No open roles right now. We hire for growth, outreach, sales, design and
                engineering — send your CV to{' '}
                <a href="mailto:marketing@flaretechnologies.in">marketing@flaretechnologies.in</a>{' '}
                and we&apos;ll keep you in mind.
              </p>
            </div>
          ) : (
            <div className="vacancies-list">
              {vacancies.map(v => (
                <VacancyCard key={v.id} v={v} onApply={setApplyTarget} />
              ))}
            </div>
          )}
        </div>
      </section>

      {page.faqs    && <FaqSection    faqs={page.faqs} />}
      {page.related && <RelatedSection related={page.related} />}
      <CtaBand />

      {/* Apply modal */}
      {applyTarget && (
        <ApplyModal
          vacancy={applyTarget}
          onClose={() => setApplyTarget(null)}
        />
      )}
    </>
  )
}
