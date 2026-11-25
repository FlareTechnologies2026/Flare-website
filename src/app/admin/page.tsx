'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import type { CaseStudy } from '@/lib/caseStore'
import type { BlogPost, ContentBlock } from '@/lib/blogStore'
import type { Vacancy } from '@/lib/vacancyStore'
import type { Application } from '@/lib/applicationStore'

/* ─── Form shape types ─────────────────────────────────────────────────────── */
interface CaseForm {
  sector: string; client: string; logo: string; title: string
  body: string; stats: [string, string][]; link: string
}
const emptyCaseForm: CaseForm = {
  sector: '', client: '', logo: '', title: '', body: '', stats: [['', '']], link: '',
}

interface BlogForm {
  slug: string; title: string; excerpt: string; blocks: ContentBlock[]
  coverImage: string; author: string; publishedAt: string; category: string
  metaTitle: string; metaDesc: string; ogImage: string; published: boolean
}
const emptyBlogForm: BlogForm = {
  slug: '', title: '', excerpt: '',
  blocks: [{ type: 'section', heading: '', body: '' }],
  coverImage: '', author: 'Flare Technologies',
  publishedAt: new Date().toISOString().split('T')[0],
  category: 'B2B Marketing', metaTitle: '', metaDesc: '', ogImage: '', published: false,
}

interface VacancyForm {
  title: string; department: string; location: string; type: string
  experience: string; salary: string; about_role: string
  responsibilities: string; qualifications: string; nice_to_have: string
  benefits: string; apply_link: string; open: boolean
}
const emptyVacancyForm: VacancyForm = {
  title: '', department: '', location: '', type: 'Full-time',
  experience: '', salary: '', about_role: '', responsibilities: '',
  qualifications: '', nice_to_have: '', benefits: '',
  apply_link: 'mailto:marketing@flaretechnologies.in', open: true,
}

/* ─── Shared style constants ───────────────────────────────────────────────── */
const inp: React.CSSProperties = {
  width: '100%', padding: '10px 14px', background: '#151A20',
  border: '1px solid #353D47', borderRadius: 8, color: '#fff',
  fontSize: 15, marginBottom: 8, outline: 'none', boxSizing: 'border-box',
}
const lbl: React.CSSProperties  = { display: 'block', fontSize: 13, fontWeight: 600, color: '#B2BBC6', marginBottom: 6 }
const hint: React.CSSProperties = { fontSize: 12, color: '#8A95A3', marginBottom: 16 }
const card: React.CSSProperties = { background: '#151A20', border: '1px solid #353D47', borderRadius: 12, padding: 24 }
const btnP: React.CSSProperties = { padding: '10px 20px', background: '#F4140C', color: '#fff', border: 'none', borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: 'pointer' }
const btnG: React.CSSProperties = { padding: '10px 20px', background: 'transparent', color: '#B2BBC6', border: '1px solid #353D47', borderRadius: 8, fontSize: 15, cursor: 'pointer' }
const btnSm: React.CSSProperties = { padding: '6px 12px', background: 'transparent', color: '#B2BBC6', border: '1px solid #353D47', borderRadius: 6, fontSize: 13, cursor: 'pointer' }
const btnDng: React.CSSProperties = { padding: '6px 12px', background: 'transparent', color: '#F4140C', border: '1px solid rgba(244,20,12,.3)', borderRadius: 6, fontSize: 13, cursor: 'pointer' }

function slugify(str: string) {
  return str.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

/* ══════════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════════════════════════ */
export default function AdminPage() {
  /* auth */
  const [authed, setAuthed]       = useState(false)
  const [checking, setChecking]   = useState(true)
  const [password, setPassword]   = useState('')
  const [loginError, setLoginErr] = useState('')

  /* shared */
  const [tab, setTab]       = useState<'cases' | 'blog' | 'vacancies' | 'applications'>('cases')
  const [saving, setSaving] = useState(false)
  const [message, setMsg]   = useState('')

  /* cases */
  const [cases, setCases]           = useState<CaseStudy[]>([])
  const [editingCase, setEditCase]  = useState<CaseStudy | null>(null)
  const [caseForm, setCaseForm]     = useState<CaseForm>(emptyCaseForm)

  /* blog */
  const [posts, setPosts]           = useState<BlogPost[]>([])
  const [editingPost, setEditPost]  = useState<BlogPost | null>(null)
  const [blogForm, setBlogForm]     = useState<BlogForm>(emptyBlogForm)
  const [uploadingImg, setUploading]= useState(false)
  const [coverImgName, setCoverName]= useState('')
  const [ogImgName, setOgName]      = useState('')
  const fileInputRef                = useRef<HTMLInputElement>(null)

  /* vacancies */
  const [vacancies, setVacancies]        = useState<Vacancy[]>([])
  const [editingVacancy, setEditVacancy] = useState<Vacancy | null>(null)
  const [vacancyForm, setVacancyForm]    = useState<VacancyForm>(emptyVacancyForm)

  /* applications */
  const [applications, setApps]       = useState<Application[]>([])
  const [viewingResume, setViewResume] = useState<Application | null>(null)
  const [appFilter, setAppFilter]     = useState('all')
  const [deletingApp, setDeletingApp] = useState<string | null>(null)

  /* ── auth check ── */
  useEffect(() => {
    fetch('/api/admin/check')
      .then(r => setAuthed(r.ok))
      .catch(() => setAuthed(false))
      .finally(() => setChecking(false))
  }, [])

  /* ── loaders ── */
  const loadCases = useCallback(async () => {
    const r = await fetch('/api/cases'); if (r.ok) setCases(await r.json())
  }, [])
  const loadPosts = useCallback(async () => {
    const r = await fetch('/api/blog'); if (r.ok) setPosts(await r.json())
  }, [])
  const loadVacancies = useCallback(async () => {
    const r = await fetch('/api/vacancies'); if (r.ok) setVacancies(await r.json())
  }, [])
  const loadApps = useCallback(async () => {
    const r = await fetch('/api/applications'); if (r.ok) setApps(await r.json())
  }, [])

  useEffect(() => {
    if (authed) { loadCases(); loadPosts(); loadVacancies(); loadApps() }
  }, [authed, loadCases, loadPosts, loadVacancies, loadApps])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); setLoginErr('')
    const r = await fetch('/api/admin/login', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (r.ok) { setAuthed(true); setPassword('') } else setLoginErr('Wrong password.')
  }

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    setAuthed(false); setCases([]); setPosts([]); setVacancies([]); setApps([])
  }

  /* ── image upload (blog) ── */
  const handleImageUpload = async (file: File, target: 'cover' | 'og') => {
    setUploading(true)
    const fd = new FormData()
    fd.append('file', file)
    const name = target === 'cover' ? coverImgName : ogImgName
    if (name) fd.append('filename', slugify(name))
    try {
      const r = await fetch('/api/upload', { method: 'POST', body: fd })
      if (r.ok) {
        const { url } = await r.json()
        if (target === 'cover') setBlogForm(f => ({ ...f, coverImage: url }))
        else setBlogForm(f => ({ ...f, ogImage: url }))
      } else { const e = await r.json(); alert(e.error || 'Upload failed') }
    } catch { alert('Upload failed') }
    setUploading(false)
  }

  /* ── case handlers ── */
  const startNewCase  = () => { setEditCase(null); setCaseForm(emptyCaseForm); setMsg('') }
  const startEditCase = (c: CaseStudy) => {
    setEditCase(c)
    setCaseForm({ sector: c.sector, client: c.client, logo: c.logo || '', title: c.title, body: c.body, stats: c.stats.length ? c.stats : [['', '']], link: c.link })
    setMsg(''); window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const addStat    = () => setCaseForm(f => ({ ...f, stats: [...f.stats, ['', '']] }))
  const removeStat = (i: number) => setCaseForm(f => ({ ...f, stats: f.stats.filter((_, x) => x !== i) }))
  const updateStat = (i: number, pos: 0 | 1, val: string) =>
    setCaseForm(f => ({ ...f, stats: f.stats.map((s, x) => x === i ? (pos === 0 ? [val, s[1]] : [s[0], val]) : s) as [string, string][] }))

  const handleSaveCase = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true); setMsg('')
    const payload = { ...caseForm, stats: caseForm.stats.filter(([a, b]) => a || b), logo: caseForm.logo || undefined }
    try {
      const r = editingCase
        ? await fetch(`/api/cases/${editingCase.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
        : await fetch('/api/cases', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      if (r.ok) { setMsg(editingCase ? 'Updated.' : 'Added.'); setEditCase(null); setCaseForm(emptyCaseForm); await loadCases() }
      else { const e = await r.json(); setMsg(e.error || 'Error.') }
    } catch { setMsg('Network error.') }
    setSaving(false)
  }
  const handleDeleteCase = async (id: string) => {
    if (!confirm('Delete this case study?')) return
    const r = await fetch(`/api/cases/${id}`, { method: 'DELETE' })
    if (r.ok) { await loadCases(); setMsg('Deleted.') }
  }

  /* ── blog handlers ── */
  const startNewPost  = () => { setEditPost(null); setBlogForm(emptyBlogForm); setMsg('') }
  const startEditPost = (p: BlogPost) => {
    setEditPost(p)
    setBlogForm({
      slug: p.slug, title: p.title, excerpt: p.excerpt,
      blocks: p.blocks?.length ? p.blocks : [{ type: 'section', heading: '', body: '' }],
      coverImage: p.coverImage || '', author: p.author,
      publishedAt: p.publishedAt.split('T')[0], category: p.category,
      metaTitle: p.metaTitle || '', metaDesc: p.metaDesc || '',
      ogImage: p.ogImage || '', published: p.published,
    })
    setMsg(''); window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const handleTitleChange = (val: string) =>
    setBlogForm(f => ({
      ...f, title: val,
      slug: !f.slug || f.slug === slugify(f.title) ? slugify(val) : f.slug,
      metaTitle: !f.metaTitle || f.metaTitle === f.title ? val : f.metaTitle,
    }))
  const addBlock = (type: 'section' | 'faq') => {
    const b: ContentBlock = type === 'section' ? { type: 'section', heading: '', body: '' } : { type: 'faq', question: '', answer: '' }
    setBlogForm(f => ({ ...f, blocks: [...f.blocks, b] }))
  }
  const removeBlock = (i: number) => setBlogForm(f => ({ ...f, blocks: f.blocks.filter((_, x) => x !== i) }))
  const updateBlock = (i: number, field: string, val: string) =>
    setBlogForm(f => ({ ...f, blocks: f.blocks.map((b, x) => x === i ? { ...b, [field]: val } : b) }))
  const moveBlock = (i: number, dir: -1 | 1) => {
    const j = i + dir
    setBlogForm(f => { const b = [...f.blocks]; [b[i], b[j]] = [b[j], b[i]]; return { ...f, blocks: b } })
  }
  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true); setMsg('')
    const cleanBlocks = blogForm.blocks.filter(b => b.type === 'section' ? (b.heading || b.body) : (b.question || b.answer))
    const payload = { ...blogForm, blocks: cleanBlocks, coverImage: blogForm.coverImage || undefined, ogImage: blogForm.ogImage || undefined, metaTitle: blogForm.metaTitle || blogForm.title, metaDesc: blogForm.metaDesc || blogForm.excerpt, publishedAt: new Date(blogForm.publishedAt).toISOString() }
    try {
      const r = editingPost
        ? await fetch(`/api/blog/${editingPost.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
        : await fetch('/api/blog', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      if (r.ok) { setMsg(editingPost ? 'Updated.' : 'Published!'); setEditPost(null); setBlogForm(emptyBlogForm); await loadPosts() }
      else { const e = await r.json(); setMsg(e.error || 'Error.') }
    } catch { setMsg('Network error.') }
    setSaving(false)
  }
  const handleDeletePost = async (id: string) => {
    if (!confirm('Delete this post?')) return
    const r = await fetch(`/api/blog/${id}`, { method: 'DELETE' })
    if (r.ok) { await loadPosts(); setMsg('Deleted.') }
  }

  /* ── vacancy handlers ── */
  const startNewVacancy  = () => { setEditVacancy(null); setVacancyForm(emptyVacancyForm); setMsg('') }
  const startEditVacancy = (v: Vacancy) => {
    setEditVacancy(v)
    setVacancyForm({ title: v.title, department: v.department, location: v.location, type: v.type, experience: v.experience, salary: v.salary, about_role: v.about_role, responsibilities: v.responsibilities, qualifications: v.qualifications, nice_to_have: v.nice_to_have, benefits: v.benefits, apply_link: v.apply_link, open: v.open })
    setMsg(''); window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const handleSaveVacancy = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true); setMsg('')
    try {
      const r = editingVacancy
        ? await fetch(`/api/vacancies/${editingVacancy.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(vacancyForm) })
        : await fetch('/api/vacancies', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(vacancyForm) })
      if (r.ok) { setMsg(editingVacancy ? 'Updated.' : 'Posted.'); setEditVacancy(null); setVacancyForm(emptyVacancyForm); await loadVacancies() }
      else { const e = await r.json(); setMsg(e.error || 'Error.') }
    } catch { setMsg('Network error.') }
    setSaving(false)
  }
  const handleDeleteVacancy = async (id: string) => {
    if (!confirm('Delete this vacancy?')) return
    const r = await fetch(`/api/vacancies/${id}`, { method: 'DELETE' })
    if (r.ok) { await loadVacancies(); setMsg('Deleted.') }
  }

  /* ── application handlers ── */
  const handleDeleteApp = async (id: string) => {
    if (!confirm('Delete this application? This cannot be undone.')) return
    setDeletingApp(id)
    const r = await fetch(`/api/applications/${id}`, { method: 'DELETE' })
    if (r.ok) { await loadApps(); setMsg('Application deleted.'); if (viewingResume?.id === id) setViewResume(null) }
    setDeletingApp(null)
  }

  /* ── loading / login screens ── */
  if (checking) return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#0B0E12', color: '#fff' }}>
      <p>Loading…</p>
    </div>
  )
  if (!authed) return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#0B0E12' }}>
      <form onSubmit={handleLogin} style={{ width: 360, maxWidth: '90vw' }}>
        <div style={{ marginBottom: 32, textAlign: 'center' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🔒</div>
          <h1 style={{ color: '#fff', fontSize: 24, marginBottom: 8 }}>Admin Access</h1>
          <p style={{ color: '#8A95A3', fontSize: 14 }}>Enter your password to continue.</p>
        </div>
        {loginError && <div style={{ background: 'rgba(244,20,12,.12)', border: '1px solid rgba(244,20,12,.3)', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 14, color: '#F4140C' }}>{loginError}</div>}
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} autoFocus style={inp} />
        <button type="submit" style={{ ...btnP, width: '100%', marginTop: 8 }}>Log in</button>
      </form>
    </div>
  )

  /* ══════ DASHBOARD ══════ */
  const filteredApps = appFilter === 'all' ? applications : applications.filter(a => a.vacancy_id === appFilter)
  const uniqueRoles  = Array.from(new Map(applications.map(a => [a.vacancy_id, a.vacancy_title])).entries())

  return (
    <div style={{ minHeight: '100vh', background: '#0B0E12', color: '#fff' }}>
      {/* ── PDF viewer overlay ── */}
      {viewingResume && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.85)', zIndex: 9999, display: 'flex', flexDirection: 'column' }}>
          {/* toolbar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px', background: '#151A20', borderBottom: '1px solid #353D47', flexShrink: 0 }}>
            <div>
              <p style={{ margin: 0, fontWeight: 700, fontSize: 15, color: '#fff' }}>{viewingResume.name}</p>
              <p style={{ margin: 0, fontSize: 13, color: '#8A95A3' }}>{viewingResume.vacancy_title} · {viewingResume.email}</p>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <a
                href={viewingResume.resume_url}
                download={viewingResume.resume_filename}
                style={{ ...btnSm, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, color: '#B2BBC6' }}
              >
                ⬇ Download
              </a>
              <button onClick={() => setViewResume(null)} style={{ ...btnDng, fontSize: 14 }}>✕ Close</button>
            </div>
          </div>
          {/* iframe PDF viewer */}
          <iframe
            src={`${viewingResume.resume_url}#toolbar=1&navpanes=0`}
            style={{ flex: 1, border: 'none', width: '100%' }}
            title={`Resume — ${viewingResume.name}`}
          />
        </div>
      )}

      <div style={{ maxWidth: 1040, margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h1 style={{ fontSize: 24, margin: 0 }}>Flare Admin</h1>
          <button onClick={handleLogout} style={btnG}>Log out</button>
        </div>

        {/* tabs */}
        <div style={{ display: 'flex', gap: 2, marginBottom: 32, borderBottom: '1px solid #353D47', overflowX: 'auto' }}>
          {(['cases', 'blog', 'vacancies', 'applications'] as const).map(t => (
            <button key={t} onClick={() => { setTab(t); setMsg('') }} style={{
              padding: '10px 18px', background: 'none', border: 'none', whiteSpace: 'nowrap',
              borderBottom: tab === t ? '2px solid #FA4D12' : '2px solid transparent',
              color: tab === t ? '#fff' : '#8A95A3', fontSize: 14, fontWeight: 600,
              cursor: 'pointer', marginBottom: -1, flexShrink: 0,
            }}>
              {t === 'cases' ? '📊 Case Studies'
                : t === 'blog' ? '✍️ Blog Posts'
                : t === 'vacancies' ? '💼 Vacancies'
                : `📥 Applications${applications.length ? ` (${applications.length})` : ''}`}
            </button>
          ))}
        </div>

        {message && (
          <div style={{ background: 'rgba(52,194,131,.12)', border: '1px solid #34C283', borderRadius: 8, padding: '12px 16px', marginBottom: 24, fontSize: 14, color: '#34C283' }}>
            {message}
          </div>
        )}

        {/* ══ CASE STUDIES ══ */}
        {tab === 'cases' && (
          <>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
              <button onClick={startNewCase} style={btnP}>+ New case study</button>
            </div>
            <form onSubmit={handleSaveCase} style={{ ...card, marginBottom: 32 }}>
              <h2 style={{ fontSize: 18, marginBottom: 20 }}>{editingCase ? `Edit: ${editingCase.client}` : 'Add a new case study'}</h2>
              <label style={lbl}>Sector / Industry</label>
              <input value={caseForm.sector} onChange={e => setCaseForm(f => ({ ...f, sector: e.target.value }))} placeholder="e.g. AI cybersecurity SaaS" style={inp} />
              <label style={lbl}>Client name</label>
              <input value={caseForm.client} onChange={e => setCaseForm(f => ({ ...f, client: e.target.value }))} placeholder="e.g. SlashLLM" style={inp} />
              <label style={lbl}>Logo path (optional)</label>
              <input value={caseForm.logo} onChange={e => setCaseForm(f => ({ ...f, logo: e.target.value }))} placeholder="/assets/slashllm.png" style={inp} />
              <p style={hint}>Path relative to /public. Leave blank for no logo.</p>
              <label style={lbl}>Title</label>
              <input value={caseForm.title} onChange={e => setCaseForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. 260+ qualified leads in 45 days" style={inp} />
              <label style={lbl}>Description</label>
              <textarea value={caseForm.body} onChange={e => setCaseForm(f => ({ ...f, body: e.target.value }))} rows={4} placeholder="Describe the work and results…" style={{ ...inp, resize: 'vertical' }} />
              <label style={lbl}>Service link (slug)</label>
              <input value={caseForm.link} onChange={e => setCaseForm(f => ({ ...f, link: e.target.value }))} placeholder="b2b-lead-generation-agency" style={inp} />
              <p style={hint}>Page this links to (without leading slash).</p>
              <label style={lbl}>Stats</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 8 }}>
                {caseForm.stats.map((stat, i) => (
                  <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <input value={stat[0]} onChange={e => updateStat(i, 0, e.target.value)} placeholder="260+" style={{ ...inp, flex: 1 }} />
                    <input value={stat[1]} onChange={e => updateStat(i, 1, e.target.value)} placeholder="qualified leads" style={{ ...inp, flex: 1.5 }} />
                    {caseForm.stats.length > 1 && <button type="button" onClick={() => removeStat(i)} style={btnSm}>✕</button>}
                  </div>
                ))}
              </div>
              <button type="button" onClick={addStat} style={btnSm}>+ Add stat</button>
              <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                <button type="submit" disabled={saving} style={btnP}>{saving ? 'Saving…' : editingCase ? 'Update' : 'Add'}</button>
                {editingCase && <button type="button" onClick={startNewCase} style={btnG}>Cancel</button>}
              </div>
            </form>
            <h2 style={{ fontSize: 18, marginBottom: 16 }}>Existing ({cases.length})</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {cases.map(c => (
                <div key={c.id} style={{ ...card, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: 15, margin: 0 }}>{c.client} — {c.sector}</p>
                    <p style={{ color: '#8A95A3', fontSize: 13, margin: '4px 0 0' }}>{c.title}</p>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => startEditCase(c)} style={btnSm}>Edit</button>
                    <button onClick={() => handleDeleteCase(c.id)} style={btnDng}>Delete</button>
                  </div>
                </div>
              ))}
              {cases.length === 0 && <p style={{ color: '#8A95A3', fontSize: 14 }}>No case studies yet.</p>}
            </div>
          </>
        )}

        {/* ══ BLOG ══ */}
        {tab === 'blog' && (
          <>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
              <button onClick={startNewPost} style={btnP}>+ New blog post</button>
            </div>
            <form onSubmit={handleSaveBlog} style={{ ...card, marginBottom: 32 }}>
              <h2 style={{ fontSize: 18, marginBottom: 24 }}>{editingPost ? `Editing: ${editingPost.title}` : 'Write a new blog post'}</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={lbl}>Post title</label>
                  <input value={blogForm.title} onChange={e => handleTitleChange(e.target.value)} placeholder="e.g. How to generate B2B leads" style={inp} required />
                </div>
                <div>
                  <label style={lbl}>URL slug</label>
                  <input value={blogForm.slug} onChange={e => setBlogForm(f => ({ ...f, slug: e.target.value }))} placeholder="how-to-generate-b2b-leads" style={inp} required />
                  <p style={hint}>Auto-filled from title · /blog/your-slug/</p>
                </div>
              </div>
              <label style={lbl}>Excerpt</label>
              <textarea value={blogForm.excerpt} onChange={e => setBlogForm(f => ({ ...f, excerpt: e.target.value }))} rows={2} placeholder="1–2 sentence summary." style={{ ...inp, resize: 'vertical' }} required />
              <label style={lbl}>Cover image</label>
              <input value={coverImgName} onChange={e => setCoverName(e.target.value)} placeholder="Image name for SEO e.g. b2b-lead-india" style={{ ...inp, marginBottom: 8 }} />
              <p style={hint}>Name your image (no spaces, no .jpg). Then upload below.</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => { const f = e.target.files?.[0]; if (f) handleImageUpload(f, 'cover') }} />
                <button type="button" onClick={() => fileInputRef.current?.click()} style={{ ...btnG, fontSize: 14, padding: '8px 16px' }} disabled={uploadingImg}>{uploadingImg ? 'Uploading…' : '📷 Upload image'}</button>
                {blogForm.coverImage && <span style={{ fontSize: 13, color: '#34C283' }}>✓ Uploaded <button type="button" onClick={() => setBlogForm(f => ({ ...f, coverImage: '' }))} style={{ background: 'none', border: 'none', color: '#F4140C', cursor: 'pointer', marginLeft: 6 }}>✕</button></span>}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                <div><label style={lbl}>Author</label><input value={blogForm.author} onChange={e => setBlogForm(f => ({ ...f, author: e.target.value }))} style={inp} /></div>
                <div><label style={lbl}>Category</label><input value={blogForm.category} onChange={e => setBlogForm(f => ({ ...f, category: e.target.value }))} style={inp} /></div>
                <div><label style={lbl}>Publish date</label><input type="date" value={blogForm.publishedAt} onChange={e => setBlogForm(f => ({ ...f, publishedAt: e.target.value }))} style={inp} /></div>
              </div>
              {/* content blocks */}
              <div style={{ borderTop: '1px solid #353D47', paddingTop: 24, marginTop: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <label style={{ ...lbl, marginBottom: 0, fontSize: 15 }}>Content blocks</label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button type="button" onClick={() => addBlock('section')} style={btnSm}>+ Section</button>
                    <button type="button" onClick={() => addBlock('faq')} style={btnSm}>+ FAQ</button>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {blogForm.blocks.map((block, i) => (
                    <div key={i} style={{ background: '#0B0E12', border: '1px solid #353D47', borderRadius: 10, padding: 16 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: block.type === 'faq' ? '#F5B70F' : '#14B6BF', textTransform: 'uppercase', letterSpacing: 1 }}>{block.type === 'faq' ? '❓ FAQ' : '📝 Section'}</span>
                        <div style={{ display: 'flex', gap: 4 }}>
                          {i > 0 && <button type="button" onClick={() => moveBlock(i, -1)} style={btnSm}>↑</button>}
                          {i < blogForm.blocks.length - 1 && <button type="button" onClick={() => moveBlock(i, 1)} style={btnSm}>↓</button>}
                          <button type="button" onClick={() => removeBlock(i)} style={btnDng}>✕</button>
                        </div>
                      </div>
                      {block.type === 'section' && (<>
                        <label style={lbl}>Heading (optional)</label>
                        <input value={block.heading} onChange={e => updateBlock(i, 'heading', e.target.value)} style={inp} />
                        <label style={lbl}>Content</label>
                        <textarea value={block.body} onChange={e => updateBlock(i, 'body', e.target.value)} rows={5} style={{ ...inp, resize: 'vertical' }} />
                      </>)}
                      {block.type === 'faq' && (<>
                        <label style={lbl}>Question</label>
                        <input value={block.question} onChange={e => updateBlock(i, 'question', e.target.value)} style={inp} />
                        <label style={lbl}>Answer</label>
                        <textarea value={block.answer} onChange={e => updateBlock(i, 'answer', e.target.value)} rows={3} style={{ ...inp, resize: 'vertical' }} />
                      </>)}
                    </div>
                  ))}
                </div>
              </div>
              {/* SEO */}
              <div style={{ background: '#0B0E12', border: '1px solid #353D47', borderRadius: 10, padding: 20, marginTop: 24 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#FA4D12', margin: '0 0 16px' }}>🔍 SEO Settings</p>
                <label style={lbl}>Meta title <span style={{ color: '#646F7E', fontWeight: 400 }}>(under 60 chars)</span></label>
                <input value={blogForm.metaTitle} onChange={e => setBlogForm(f => ({ ...f, metaTitle: e.target.value }))} placeholder="Leave blank to use title" style={inp} />
                <label style={lbl}>Meta description <span style={{ color: '#646F7E', fontWeight: 400 }}>(under 160 chars)</span></label>
                <textarea value={blogForm.metaDesc} onChange={e => setBlogForm(f => ({ ...f, metaDesc: e.target.value }))} rows={2} placeholder="Leave blank to use excerpt" style={{ ...inp, resize: 'vertical' }} />
                <label style={lbl}>OG image for social sharing</label>
                <input value={ogImgName} onChange={e => setOgName(e.target.value)} placeholder="Image name e.g. b2b-leads-og" style={{ ...inp, marginBottom: 8 }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <input type="file" accept="image/*" id="og-upload" style={{ display: 'none' }} onChange={e => { const f = e.target.files?.[0]; if (f) handleImageUpload(f, 'og') }} />
                  <label htmlFor="og-upload" style={{ ...btnG, fontSize: 14, padding: '8px 16px', cursor: 'pointer' }}>{uploadingImg ? 'Uploading…' : '📷 Upload OG image'}</label>
                  {blogForm.ogImage && <span style={{ fontSize: 13, color: '#34C283' }}>✓ Uploaded <button type="button" onClick={() => setBlogForm(f => ({ ...f, ogImage: '' }))} style={{ background: 'none', border: 'none', color: '#F4140C', cursor: 'pointer', marginLeft: 6 }}>✕</button></span>}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 24 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: 15, color: '#fff' }}>
                  <input type="checkbox" checked={blogForm.published} onChange={e => setBlogForm(f => ({ ...f, published: e.target.checked }))} style={{ width: 18, height: 18, accentColor: '#34C283' }} />
                  Publish (make live on /blog/)
                </label>
              </div>
              <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
                <button type="submit" disabled={saving} style={btnP}>{saving ? 'Saving…' : editingPost ? 'Update' : blogForm.published ? 'Publish' : 'Save draft'}</button>
                {editingPost && <button type="button" onClick={startNewPost} style={btnG}>Cancel</button>}
              </div>
            </form>
            <h2 style={{ fontSize: 18, marginBottom: 16 }}>All posts ({posts.length})</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {posts.map(p => (
                <div key={p.id} style={{ ...card, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                      <p style={{ fontWeight: 600, fontSize: 15, margin: 0 }}>{p.title}</p>
                      <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 999, background: p.published ? 'rgba(52,194,131,.15)' : 'rgba(138,149,163,.15)', color: p.published ? '#34C283' : '#8A95A3', fontWeight: 600 }}>{p.published ? 'Live' : 'Draft'}</span>
                    </div>
                    <p style={{ color: '#8A95A3', fontSize: 13, margin: 0 }}>/blog/{p.slug}/ · {p.category}</p>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => startEditPost(p)} style={btnSm}>Edit</button>
                    <button onClick={() => handleDeletePost(p.id)} style={btnDng}>Delete</button>
                  </div>
                </div>
              ))}
              {posts.length === 0 && <p style={{ color: '#8A95A3', fontSize: 14 }}>No posts yet.</p>}
            </div>
          </>
        )}

        {/* ══ VACANCIES ══ */}
        {tab === 'vacancies' && (
          <>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
              <button onClick={startNewVacancy} style={btnP}>+ Post a vacancy</button>
            </div>
            <form onSubmit={handleSaveVacancy} style={{ ...card, marginBottom: 32 }}>
              <h2 style={{ fontSize: 18, marginBottom: 24 }}>{editingVacancy ? `Editing: ${editingVacancy.title}` : 'Post a new vacancy'}</h2>
              <label style={lbl}>Job title <span style={{ color: '#F4140C' }}>*</span></label>
              <input value={vacancyForm.title} onChange={e => setVacancyForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. Growth Marketing Executive" style={inp} required />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                <div><label style={lbl}>Department</label><input value={vacancyForm.department} onChange={e => setVacancyForm(f => ({ ...f, department: e.target.value }))} placeholder="e.g. Growth" style={inp} /></div>
                <div><label style={lbl}>Location</label><input value={vacancyForm.location} onChange={e => setVacancyForm(f => ({ ...f, location: e.target.value }))} placeholder="e.g. Bengaluru / Remote" style={inp} /></div>
                <div>
                  <label style={lbl}>Employment type</label>
                  <select value={vacancyForm.type} onChange={e => setVacancyForm(f => ({ ...f, type: e.target.value }))} style={inp}>
                    <option value="">Select type</option>
                    <option>Full-time</option><option>Part-time</option><option>Contract</option><option>Internship</option>
                  </select>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div><label style={lbl}>Experience required</label><input value={vacancyForm.experience} onChange={e => setVacancyForm(f => ({ ...f, experience: e.target.value }))} placeholder="e.g. 1–3 years" style={inp} /></div>
                <div><label style={lbl}>Salary range</label><input value={vacancyForm.salary} onChange={e => setVacancyForm(f => ({ ...f, salary: e.target.value }))} placeholder="e.g. ₹4–6 LPA" style={inp} /></div>
              </div>
              <label style={lbl}>About the role</label>
              <textarea value={vacancyForm.about_role} onChange={e => setVacancyForm(f => ({ ...f, about_role: e.target.value }))} rows={3} placeholder="2–3 sentences about the role." style={{ ...inp, resize: 'vertical' }} />
              <label style={lbl}>What you&apos;ll do</label>
              <textarea value={vacancyForm.responsibilities} onChange={e => setVacancyForm(f => ({ ...f, responsibilities: e.target.value }))} rows={6} placeholder={"- Run outreach campaigns\n- Track reply rates weekly"} style={{ ...inp, resize: 'vertical' }} />
              <p style={hint}>One item per line.</p>
              <label style={lbl}>What we&apos;re looking for</label>
              <textarea value={vacancyForm.qualifications} onChange={e => setVacancyForm(f => ({ ...f, qualifications: e.target.value }))} rows={5} placeholder={"- Strong written English\n- Understanding of B2B sales"} style={{ ...inp, resize: 'vertical' }} />
              <p style={hint}>Leave blank to hide section.</p>
              <label style={lbl}>Nice to have</label>
              <textarea value={vacancyForm.nice_to_have} onChange={e => setVacancyForm(f => ({ ...f, nice_to_have: e.target.value }))} rows={4} placeholder={"- Sales Navigator experience"} style={{ ...inp, resize: 'vertical' }} />
              <p style={hint}>Bonus skills — not required.</p>
              <label style={lbl}>What you get</label>
              <textarea value={vacancyForm.benefits} onChange={e => setVacancyForm(f => ({ ...f, benefits: e.target.value }))} rows={4} placeholder={"- Real client work from day one\n- Fast growth in a small team"} style={{ ...inp, resize: 'vertical' }} />
              <p style={hint}>Leave blank to hide section.</p>
              <label style={lbl}>Apply link or email</label>
              <input value={vacancyForm.apply_link} onChange={e => setVacancyForm(f => ({ ...f, apply_link: e.target.value }))} placeholder="mailto:marketing@flaretechnologies.in" style={inp} />
              <p style={hint}>Use mailto: for email, or paste a form URL.</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: 15, color: '#fff' }}>
                  <input type="checkbox" checked={vacancyForm.open} onChange={e => setVacancyForm(f => ({ ...f, open: e.target.checked }))} style={{ width: 18, height: 18, accentColor: '#34C283' }} />
                  List on careers page
                </label>
              </div>
              <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                <button type="submit" disabled={saving} style={btnP}>{saving ? 'Saving…' : editingVacancy ? 'Update' : vacancyForm.open ? 'Post vacancy' : 'Save (hidden)'}</button>
                {editingVacancy && <button type="button" onClick={startNewVacancy} style={btnG}>Cancel</button>}
              </div>
            </form>
            <h2 style={{ fontSize: 18, marginBottom: 16 }}>All vacancies ({vacancies.length})</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {vacancies.map(v => (
                <div key={v.id} style={{ ...card, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                      <p style={{ fontWeight: 600, fontSize: 15, margin: 0 }}>{v.title}</p>
                      <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 999, background: v.open ? 'rgba(52,194,131,.15)' : 'rgba(138,149,163,.15)', color: v.open ? '#34C283' : '#8A95A3', fontWeight: 600 }}>{v.open ? 'Live' : 'Hidden'}</span>
                    </div>
                    <p style={{ color: '#8A95A3', fontSize: 13, margin: 0 }}>{[v.department, v.location, v.type, v.experience].filter(Boolean).join(' · ')}</p>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => startEditVacancy(v)} style={btnSm}>Edit</button>
                    <button onClick={() => handleDeleteVacancy(v.id)} style={btnDng}>Delete</button>
                  </div>
                </div>
              ))}
              {vacancies.length === 0 && <p style={{ color: '#8A95A3', fontSize: 14 }}>No vacancies yet.</p>}
            </div>
          </>
        )}

        {/* ══ APPLICATIONS ══ */}
        {tab === 'applications' && (
          <>
            {/* filter bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 14, color: '#8A95A3', fontWeight: 600 }}>Filter by role:</span>
              <button
                onClick={() => setAppFilter('all')}
                style={{ ...btnSm, borderColor: appFilter === 'all' ? '#FA4D12' : '#353D47', color: appFilter === 'all' ? '#fff' : '#B2BBC6' }}
              >
                All ({applications.length})
              </button>
              {uniqueRoles.map(([vid, vtitle]) => {
                const count = applications.filter(a => a.vacancy_id === vid).length
                return (
                  <button key={vid} onClick={() => setAppFilter(vid)} style={{ ...btnSm, borderColor: appFilter === vid ? '#FA4D12' : '#353D47', color: appFilter === vid ? '#fff' : '#B2BBC6' }}>
                    {vtitle} ({count})
                  </button>
                )
              })}
            </div>

            {filteredApps.length === 0 ? (
              <p style={{ color: '#8A95A3', fontSize: 14 }}>No applications yet.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {filteredApps.map(app => (
                  <div key={app.id} style={{ ...card, display: 'grid', gridTemplateColumns: '1fr auto', gap: 16, alignItems: 'start' }}>
                    {/* left: applicant info */}
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8, flexWrap: 'wrap' }}>
                        <p style={{ fontWeight: 700, fontSize: 16, margin: 0, color: '#fff' }}>{app.name}</p>
                        <span style={{ fontSize: 12, padding: '2px 10px', borderRadius: 999, background: 'rgba(20,182,191,.15)', color: '#14B6BF', fontWeight: 600, border: '1px solid rgba(20,182,191,.3)' }}>
                          {app.vacancy_title}
                        </span>
                      </div>
                      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 8 }}>
                        <a href={`mailto:${app.email}`} style={{ fontSize: 13, color: '#8A95A3', textDecoration: 'none' }}>✉ {app.email}</a>
                        {app.phone && <span style={{ fontSize: 13, color: '#8A95A3' }}>📞 {app.phone}</span>}
                        <span style={{ fontSize: 13, color: '#646F7E' }}>🕐 {new Date(app.applied_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      </div>
                      {app.cover_note && (
                        <p style={{ fontSize: 14, color: '#B2BBC6', lineHeight: 1.6, margin: '8px 0 0', borderLeft: '3px solid #353D47', paddingLeft: 12 }}>
                          {app.cover_note.length > 300 ? app.cover_note.slice(0, 300) + '…' : app.cover_note}
                        </p>
                      )}
                    </div>
                    {/* right: actions */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 140 }}>
                      <button
                        onClick={() => setViewResume(app)}
                        style={{ ...btnSm, background: 'rgba(20,182,191,.12)', borderColor: 'rgba(20,182,191,.3)', color: '#14B6BF', display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center' }}
                      >
                        👁 View PDF
                      </button>
                      <a
                        href={app.resume_url}
                        download={app.resume_filename}
                        style={{ ...btnSm, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center', color: '#B2BBC6' }}
                      >
                        ⬇ Download
                      </a>
                      <button
                        onClick={() => handleDeleteApp(app.id)}
                        disabled={deletingApp === app.id}
                        style={{ ...btnDng, display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center' }}
                      >
                        {deletingApp === app.id ? '…' : '🗑 Delete'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

      </div>
    </div>
  )
}
