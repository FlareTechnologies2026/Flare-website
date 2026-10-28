'use client'

import { useState, useEffect, useCallback } from 'react'
import type { CaseStudy } from '@/lib/caseStore'

interface FormData {
  sector: string
  client: string
  logo: string
  title: string
  body: string
  stats: [string, string][]
  link: string
}

const emptyForm: FormData = {
  sector: '',
  client: '',
  logo: '',
  title: '',
  body: '',
  stats: [['', '']],
  link: '',
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [checking, setChecking] = useState(true)
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  const [cases, setCases] = useState<CaseStudy[]>([])
  const [editing, setEditing] = useState<CaseStudy | null>(null)
  const [form, setForm] = useState<FormData>(emptyForm)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  // Check if already logged in via a dedicated auth-check endpoint
  useEffect(() => {
    fetch('/api/admin/check')
      .then(r => {
        if (r.ok) {
          setAuthed(true)
          return fetch('/api/cases').then(res => res.json())
        }
        throw new Error('not authed')
      })
      .then((data: CaseStudy[]) => setCases(data))
      .catch(() => setAuthed(false))
      .finally(() => setChecking(false))
  }, [])

  const loadCases = useCallback(async () => {
    const r = await fetch('/api/cases')
    if (r.ok) setCases(await r.json())
  }, [])

  // Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')
    const r = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (r.ok) {
      setAuthed(true)
      setPassword('')
      const data = await fetch('/api/cases')
      if (data.ok) setCases(await data.json())
    } else {
      setLoginError('Wrong password. Try again.')
    }
  }

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    setAuthed(false)
    setCases([])
  }

  // Start editing an existing case
  const startEdit = (c: CaseStudy) => {
    setEditing(c)
    setForm({
      sector: c.sector,
      client: c.client,
      logo: c.logo || '',
      title: c.title,
      body: c.body,
      stats: c.stats.length ? c.stats : [['', '']],
      link: c.link,
    })
    setMessage('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Start creating a new case
  const startNew = () => {
    setEditing(null)
    setForm(emptyForm)
    setMessage('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Add a stat row
  const addStat = () => {
    setForm(f => ({ ...f, stats: [...f.stats, ['', '']] }))
  }

  // Remove a stat row
  const removeStat = (idx: number) => {
    setForm(f => ({
      ...f,
      stats: f.stats.filter((_, i) => i !== idx),
    }))
  }

  // Update a stat row
  const updateStat = (idx: number, pos: 0 | 1, val: string) => {
    setForm(f => ({
      ...f,
      stats: f.stats.map((s, i) => (i === idx ? { ...s, [pos]: val } : s)),
    }))
  }

  // Save (create or update)
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage('')

    // Clean up empty stats
    const cleanStats = form.stats.filter(([a, b]) => a || b)

    const payload = {
      sector: form.sector,
      client: form.client,
      logo: form.logo || undefined,
      title: form.title,
      body: form.body,
      stats: cleanStats,
      link: form.link,
    }

    try {
      let r: Response
      if (editing) {
        r = await fetch(`/api/cases/${editing.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      } else {
        r = await fetch('/api/cases', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      }

      if (r.ok) {
        setMessage(editing ? 'Case study updated.' : 'Case study added.')
        setEditing(null)
        setForm(emptyForm)
        await loadCases()
      } else {
        const err = await r.json()
        setMessage(err.error || 'Something went wrong.')
      }
    } catch {
      setMessage('Network error. Try again.')
    }
    setSaving(false)
  }

  // Delete a case
  const handleDelete = async (id: string) => {
    if (!confirm('Delete this case study? This cannot be undone.')) return
    const r = await fetch(`/api/cases/${id}`, { method: 'DELETE' })
    if (r.ok) {
      await loadCases()
      setMessage('Case study deleted.')
    }
  }

  // ── Loading state ──
  if (checking) {
    return (
      <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#0B0E12', color: '#fff' }}>
        <p>Loading…</p>
      </div>
    )
  }

  // ── Login screen ──
  if (!authed) {
    return (
      <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#0B0E12' }}>
        <form onSubmit={handleLogin} style={{ width: 340, maxWidth: '90vw' }}>
          <h1 style={{ color: '#fff', fontSize: 24, marginBottom: 8 }}>Admin Login</h1>
          <p style={{ color: '#8A95A3', fontSize: 14, marginBottom: 24 }}>Enter your password to manage case studies.</p>
          {loginError && <p style={{ color: '#F4140C', fontSize: 14, marginBottom: 12 }}>{loginError}</p>}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoFocus
            style={inputStyle}
          />
          <button type="submit" style={btnPrimary}>Log in</button>
        </form>
      </div>
    )
  }

  // ── Admin dashboard ──
  return (
    <div style={{ minHeight: '100vh', background: '#0B0E12', color: '#fff' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <h1 style={{ fontSize: 24, margin: 0 }}>Case Studies Admin</h1>
          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={startNew} style={btnPrimary}>+ New case study</button>
            <button onClick={handleLogout} style={btnGhost}>Log out</button>
          </div>
        </div>

        {message && (
          <div style={{ background: 'rgba(52,194,131,.12)', border: '1px solid #34C283', borderRadius: 8, padding: '12px 16px', marginBottom: 24, fontSize: 14, color: '#34C283' }}>
            {message}
          </div>
        )}

        {/* Form (create / edit) */}
        <form onSubmit={handleSave} style={{ ...cardStyle, marginBottom: 32 }}>
          <h2 style={{ fontSize: 18, marginBottom: 20 }}>
            {editing ? `Edit: ${editing.client}` : 'Add a new case study'}
          </h2>

          <label style={labelStyle}>Sector / Industry</label>
          <input
            value={form.sector}
            onChange={e => setForm(f => ({ ...f, sector: e.target.value }))}
            placeholder="e.g. AI cybersecurity SaaS"
            style={inputStyle}
          />

          <label style={labelStyle}>Client name</label>
          <input
            value={form.client}
            onChange={e => setForm(f => ({ ...f, client: e.target.value }))}
            placeholder="e.g. SlashLLM"
            style={inputStyle}
          />

          <label style={labelStyle}>Logo path (optional)</label>
          <input
            value={form.logo}
            onChange={e => setForm(f => ({ ...f, logo: e.target.value }))}
            placeholder="/assets/slashllm.png"
            style={inputStyle}
          />
          <p style={hintStyle}>Path relative to /public. Leave blank for no logo.</p>

          <label style={labelStyle}>Title</label>
          <input
            value={form.title}
            onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
            placeholder="e.g. 260+ qualified leads in 45 days"
            style={inputStyle}
          />

          <label style={labelStyle}>Description</label>
          <textarea
            value={form.body}
            onChange={e => setForm(f => ({ ...f, body: e.target.value }))}
            placeholder="Describe the work and results…"
            rows={4}
            style={{ ...inputStyle, resize: 'vertical' }}
          />

          <label style={labelStyle}>Service link (slug)</label>
          <input
            value={form.link}
            onChange={e => setForm(f => ({ ...f, link: e.target.value }))}
            placeholder="b2b-lead-generation-agency"
            style={inputStyle}
          />
          <p style={hintStyle}>The page this case study links to (without leading slash).</p>

          {/* Stats editor */}
          <label style={labelStyle}>Stats</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 8 }}>
            {form.stats.map((stat, idx) => (
              <div key={idx} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <input
                  value={stat[0]}
                  onChange={e => updateStat(idx, 0, e.target.value)}
                  placeholder="260+"
                  style={{ ...inputStyle, flex: 1 }}
                />
                <input
                  value={stat[1]}
                  onChange={e => updateStat(idx, 1, e.target.value)}
                  placeholder="qualified leads"
                  style={{ ...inputStyle, flex: 1.5 }}
                />
                {form.stats.length > 1 && (
                  <button type="button" onClick={() => removeStat(idx)} style={btnGhostSmall}>✕</button>
                )}
              </div>
            ))}
          </div>
          <button type="button" onClick={addStat} style={btnGhostSmall}>+ Add stat</button>

          {/* Save / cancel */}
          <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
            <button type="submit" disabled={saving} style={btnPrimary}>
              {saving ? 'Saving…' : editing ? 'Update case study' : 'Add case study'}
            </button>
            {editing && (
              <button type="button" onClick={startNew} style={btnGhost}>Cancel edit</button>
            )}
          </div>
        </form>

        {/* Existing case studies list */}
        <h2 style={{ fontSize: 18, marginBottom: 16 }}>Existing case studies ({cases.length})</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {cases.map(c => (
            <div key={c.id} style={{ ...cardStyle, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontWeight: 600, fontSize: 15 }}>{c.client} — {c.sector}</p>
                <p style={{ color: '#8A95A3', fontSize: 13, marginTop: 4 }}>{c.title}</p>
              </div>
              <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                <button onClick={() => startEdit(c)} style={btnGhostSmall}>Edit</button>
                <button onClick={() => handleDelete(c.id)} style={btnDangerSmall}>Delete</button>
              </div>
            </div>
          ))}
          {cases.length === 0 && (
            <p style={{ color: '#8A95A3', fontSize: 14 }}>No case studies yet. Add one above.</p>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Inline styles (keeps admin self-contained) ──
const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 14px',
  background: '#151A20',
  border: '1px solid #353D47',
  borderRadius: 8,
  color: '#fff',
  fontSize: 15,
  marginBottom: 8,
  outline: 'none',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 13,
  fontWeight: 600,
  color: '#B2BBC6',
  marginBottom: 6,
}

const hintStyle: React.CSSProperties = {
  fontSize: 12,
  color: '#8A95A3',
  marginBottom: 16,
}

const cardStyle: React.CSSProperties = {
  background: '#151A20',
  border: '1px solid #353D47',
  borderRadius: 12,
  padding: 24,
}

const btnPrimary: React.CSSProperties = {
  padding: '10px 20px',
  background: '#F4140C',
  color: '#fff',
  border: 'none',
  borderRadius: 8,
  fontSize: 15,
  fontWeight: 600,
  cursor: 'pointer',
}

const btnGhost: React.CSSProperties = {
  padding: '10px 20px',
  background: 'transparent',
  color: '#B2BBC6',
  border: '1px solid #353D47',
  borderRadius: 8,
  fontSize: 15,
  cursor: 'pointer',
}

const btnGhostSmall: React.CSSProperties = {
  padding: '6px 12px',
  background: 'transparent',
  color: '#B2BBC6',
  border: '1px solid #353D47',
  borderRadius: 6,
  fontSize: 13,
  cursor: 'pointer',
}

const btnDangerSmall: React.CSSProperties = {
  padding: '6px 12px',
  background: 'transparent',
  color: '#F4140C',
  border: '1px solid rgba(244,20,12,.3)',
  borderRadius: 6,
  fontSize: 13,
  cursor: 'pointer',
}
