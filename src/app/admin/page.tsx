'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import type { CaseStudy } from '@/lib/caseStore'
import type { BlogPost, ContentBlock } from '@/lib/blogStore'

// ── Case form ──
interface CaseForm {
  sector: string; client: string; logo: string; title: string
  body: string; stats: [string, string][]; link: string
}
const emptyCaseForm: CaseForm = { sector: '', client: '', logo: '', title: '', body: '', stats: [['', '']], link: '' }

// ── Blog form ──
interface BlogForm {
  slug: string; title: string; excerpt: string; blocks: ContentBlock[]
  coverImage: string; author: string; publishedAt: string; category: string
  metaTitle: string; metaDesc: string; ogImage: string; published: boolean
}
const emptyBlogForm: BlogForm = {
  slug: '', title: '', excerpt: '', blocks: [{ type: 'section', heading: '', body: '' }],
  coverImage: '', author: 'Flare Technologies',
  publishedAt: new Date().toISOString().split('T')[0],
  category: 'B2B Marketing', metaTitle: '', metaDesc: '', ogImage: '', published: false,
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [checking, setChecking] = useState(true)
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [tab, setTab] = useState<'cases' | 'blog'>('cases')

  const [cases, setCases] = useState<CaseStudy[]>([])
  const [editingCase, setEditingCase] = useState<CaseStudy | null>(null)
  const [caseForm, setCaseForm] = useState<CaseForm>(emptyCaseForm)

  const [posts, setPosts] = useState<BlogPost[]>([])
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [blogForm, setBlogForm] = useState<BlogForm>(emptyBlogForm)
  const [uploadingImg, setUploadingImg] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  // Always check auth on load — never skip login
  useEffect(() => {
    fetch('/api/admin/check')
      .then(r => { if (r.ok) setAuthed(true); else setAuthed(false) })
      .catch(() => setAuthed(false))
      .finally(() => setChecking(false))
  }, [])

  const loadCases = useCallback(async () => {
    const r = await fetch('/api/cases')
    if (r.ok) setCases(await r.json())
  }, [])

  const loadPosts = useCallback(async () => {
    const r = await fetch('/api/blog')
    if (r.ok) setPosts(await r.json())
  }, [])

  useEffect(() => {
    if (authed) { loadCases(); loadPosts() }
  }, [authed, loadCases, loadPosts])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); setLoginError('')
    const r = await fetch('/api/admin/login', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (r.ok) { setAuthed(true); setPassword('') }
    else setLoginError('Wrong password. Try again.')
  }

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    setAuthed(false); setCases([]); setPosts([])
  }

  // ── Image upload ──
  const [coverImgName, setCoverImgName] = useState('')
  const [ogImgName, setOgImgName] = useState('')

  const handleImageUpload = async (file: File, target: 'cover' | 'og') => {
    setUploadingImg(true)
    const fd = new FormData()
    fd.append('file', file)
    // Use custom name if provided, slugified
    const customName = target === 'cover' ? coverImgName : ogImgName
    if (customName) fd.append('filename', slugify(customName))
    try {
      const r = await fetch('/api/upload', { method: 'POST', body: fd })
      if (r.ok) {
        const { url } = await r.json()
        if (target === 'cover') setBlogForm(f => ({ ...f, coverImage: url }))
        else setBlogForm(f => ({ ...f, ogImage: url }))
      } else {
        const err = await r.json()
        alert(err.error || 'Upload failed')
      }
    } catch { alert('Upload failed') }
    setUploadingImg(false)
  }

  // ── Case Studies ──
  const startEditCase = (c: CaseStudy) => {
    setEditingCase(c)
    setCaseForm({ sector: c.sector, client: c.client, logo: c.logo || '', title: c.title, body: c.body, stats: c.stats.length ? c.stats : [['', '']], link: c.link })
    setMessage(''); window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const startNewCase = () => { setEditingCase(null); setCaseForm(emptyCaseForm); setMessage('') }
  const addStat = () => setCaseForm(f => ({ ...f, stats: [...f.stats, ['', '']] }))
  const removeStat = (i: number) => setCaseForm(f => ({ ...f, stats: f.stats.filter((_, idx) => idx !== i) }))
  const updateStat = (i: number, pos: 0 | 1, val: string) =>
    setCaseForm(f => ({ ...f, stats: f.stats.map((s, idx) => idx === i ? (pos === 0 ? [val, s[1]] : [s[0], val]) : s) as [string, string][] }))

  const handleSaveCase = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true); setMessage('')
    const payload = { ...caseForm, stats: caseForm.stats.filter(([a, b]) => a || b), logo: caseForm.logo || undefined }
    try {
      const r = editingCase
        ? await fetch(`/api/cases/${editingCase.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
        : await fetch('/api/cases', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      if (r.ok) { setMessage(editingCase ? 'Case study updated.' : 'Case study added.'); setEditingCase(null); setCaseForm(emptyCaseForm); await loadCases() }
      else { const err = await r.json(); setMessage(err.error || 'Something went wrong.') }
    } catch { setMessage('Network error.') }
    setSaving(false)
  }

  const handleDeleteCase = async (id: string) => {
    if (!confirm('Delete this case study?')) return
    const r = await fetch(`/api/cases/${id}`, { method: 'DELETE' })
    if (r.ok) { await loadCases(); setMessage('Case study deleted.') }
  }

  // ── Blog content blocks ──
  const addBlock = (type: 'section' | 'faq') => {
    const newBlock: ContentBlock = type === 'section'
      ? { type: 'section', heading: '', body: '' }
      : { type: 'faq', question: '', answer: '' }
    setBlogForm(f => ({ ...f, blocks: [...f.blocks, newBlock] }))
  }

  const removeBlock = (i: number) =>
    setBlogForm(f => ({ ...f, blocks: f.blocks.filter((_, idx) => idx !== i) }))

  const updateBlock = (i: number, field: string, val: string) =>
    setBlogForm(f => ({
      ...f,
      blocks: f.blocks.map((b, idx) => idx === i ? { ...b, [field]: val } : b),
    }))

  const moveBlock = (i: number, dir: -1 | 1) => {
    const j = i + dir
    setBlogForm(f => {
      const blocks = [...f.blocks]
      ;[blocks[i], blocks[j]] = [blocks[j], blocks[i]]
      return { ...f, blocks }
    })
  }

  // ── Blog save/delete ──
  const startEditPost = (p: BlogPost) => {
    setEditingPost(p)
    setBlogForm({
      slug: p.slug, title: p.title, excerpt: p.excerpt,
      blocks: p.blocks?.length ? p.blocks : [{ type: 'section', heading: '', body: '' }],
      coverImage: p.coverImage || '', author: p.author,
      publishedAt: p.publishedAt.split('T')[0], category: p.category,
      metaTitle: p.metaTitle || '', metaDesc: p.metaDesc || '',
      ogImage: p.ogImage || '', published: p.published,
    })
    setMessage(''); window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const startNewPost = () => { setEditingPost(null); setBlogForm(emptyBlogForm); setMessage('') }

  const handleTitleChange = (val: string) => {
    setBlogForm(f => ({
      ...f, title: val,
      slug: !f.slug || f.slug === slugify(f.title) ? slugify(val) : f.slug,
      metaTitle: !f.metaTitle || f.metaTitle === f.title ? val : f.metaTitle,
    }))
  }

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true); setMessage('')
    const cleanBlocks = blogForm.blocks.filter(b =>
      b.type === 'section' ? (b.heading || b.body) : (b.question || b.answer)
    )
    const payload = {
      ...blogForm,
      blocks: cleanBlocks,
      coverImage: blogForm.coverImage || undefined,
      ogImage: blogForm.ogImage || undefined,
      metaTitle: blogForm.metaTitle || blogForm.title,
      metaDesc: blogForm.metaDesc || blogForm.excerpt,
      publishedAt: new Date(blogForm.publishedAt).toISOString(),
    }
    try {
      const r = editingPost
        ? await fetch(`/api/blog/${editingPost.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
        : await fetch('/api/blog', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      if (r.ok) { setMessage(editingPost ? 'Post updated.' : 'Post published!'); setEditingPost(null); setBlogForm(emptyBlogForm); await loadPosts() }
      else { const err = await r.json(); setMessage(err.error || 'Something went wrong.') }
    } catch { setMessage('Network error.') }
    setSaving(false)
  }

  const handleDeletePost = async (id: string) => {
    if (!confirm('Delete this blog post?')) return
    const r = await fetch(`/api/blog/${id}`, { method: 'DELETE' })
    if (r.ok) { await loadPosts(); setMessage('Post deleted.') }
  }

  // ── Loading ──
  if (checking) return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#0B0E12', color: '#fff' }}>
      <p>Loading…</p>
    </div>
  )

  // ── Login — always shown when not authed ──
  if (!authed) return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#0B0E12' }}>
      <form onSubmit={handleLogin} style={{ width: 360, maxWidth: '90vw' }}>
        <div style={{ marginBottom: 32, textAlign: 'center' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🔒</div>
          <h1 style={{ color: '#fff', fontSize: 24, marginBottom: 8 }}>Admin Access</h1>
          <p style={{ color: '#8A95A3', fontSize: 14 }}>Enter your password to continue.</p>
        </div>
        {loginError && (
          <div style={{ background: 'rgba(244,20,12,.12)', border: '1px solid rgba(244,20,12,.3)', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 14, color: '#F4140C' }}>
            {loginError}
          </div>
        )}
        <input
          type="password" placeholder="Password" value={password}
          onChange={e => setPassword(e.target.value)} autoFocus style={inputStyle}
        />
        <button type="submit" style={{ ...btnPrimary, width: '100%', marginTop: 8 }}>Log in</button>
      </form>
    </div>
  )

  // ── Dashboard ──
  return (
    <div style={{ minHeight: '100vh', background: '#0B0E12', color: '#fff' }}>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '40px 24px' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h1 style={{ fontSize: 24, margin: 0 }}>Flare Admin</h1>
          <button onClick={handleLogout} style={btnGhost}>Log out</button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 32, borderBottom: '1px solid #353D47' }}>
          {(['cases', 'blog'] as const).map(t => (
            <button key={t} onClick={() => { setTab(t); setMessage('') }} style={{
              padding: '10px 20px', background: 'none', border: 'none',
              borderBottom: tab === t ? '2px solid #FA4D12' : '2px solid transparent',
              color: tab === t ? '#fff' : '#8A95A3', fontSize: 15, fontWeight: 600,
              cursor: 'pointer', marginBottom: -1,
            }}>
              {t === 'cases' ? '📊 Case Studies' : '✍️ Blog Posts'}
            </button>
          ))}
        </div>

        {message && (
          <div style={{ background: 'rgba(52,194,131,.12)', border: '1px solid #34C283', borderRadius: 8, padding: '12px 16px', marginBottom: 24, fontSize: 14, color: '#34C283' }}>
            {message}
          </div>
        )}

        {/* ── CASE STUDIES ── */}
        {tab === 'cases' && (
          <>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
              <button onClick={startNewCase} style={btnPrimary}>+ New case study</button>
            </div>
            <form onSubmit={handleSaveCase} style={{ ...cardStyle, marginBottom: 32 }}>
              <h2 style={{ fontSize: 18, marginBottom: 20 }}>{editingCase ? `Edit: ${editingCase.client}` : 'Add a new case study'}</h2>
              <label style={labelStyle}>Sector / Industry</label>
              <input value={caseForm.sector} onChange={e => setCaseForm(f => ({ ...f, sector: e.target.value }))} placeholder="e.g. AI cybersecurity SaaS" style={inputStyle} />
              <label style={labelStyle}>Client name</label>
              <input value={caseForm.client} onChange={e => setCaseForm(f => ({ ...f, client: e.target.value }))} placeholder="e.g. SlashLLM" style={inputStyle} />
              <label style={labelStyle}>Logo path (optional)</label>
              <input value={caseForm.logo} onChange={e => setCaseForm(f => ({ ...f, logo: e.target.value }))} placeholder="/assets/slashllm.png" style={inputStyle} />
              <p style={hintStyle}>Path relative to /public. Leave blank for no logo.</p>
              <label style={labelStyle}>Title</label>
              <input value={caseForm.title} onChange={e => setCaseForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. 260+ qualified leads in 45 days" style={inputStyle} />
              <label style={labelStyle}>Description</label>
              <textarea value={caseForm.body} onChange={e => setCaseForm(f => ({ ...f, body: e.target.value }))} placeholder="Describe the work and results…" rows={4} style={{ ...inputStyle, resize: 'vertical' }} />
              <label style={labelStyle}>Service link (slug)</label>
              <input value={caseForm.link} onChange={e => setCaseForm(f => ({ ...f, link: e.target.value }))} placeholder="b2b-lead-generation-agency" style={inputStyle} />
              <p style={hintStyle}>The page this links to (without leading slash).</p>
              <label style={labelStyle}>Stats</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 8 }}>
                {caseForm.stats.map((stat, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <input value={stat[0]} onChange={e => updateStat(idx, 0, e.target.value)} placeholder="260+" style={{ ...inputStyle, flex: 1 }} />
                    <input value={stat[1]} onChange={e => updateStat(idx, 1, e.target.value)} placeholder="qualified leads" style={{ ...inputStyle, flex: 1.5 }} />
                    {caseForm.stats.length > 1 && <button type="button" onClick={() => removeStat(idx)} style={btnGhostSmall}>✕</button>}
                  </div>
                ))}
              </div>
              <button type="button" onClick={addStat} style={btnGhostSmall}>+ Add stat</button>
              <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                <button type="submit" disabled={saving} style={btnPrimary}>{saving ? 'Saving…' : editingCase ? 'Update' : 'Add case study'}</button>
                {editingCase && <button type="button" onClick={startNewCase} style={btnGhost}>Cancel</button>}
              </div>
            </form>
            <h2 style={{ fontSize: 18, marginBottom: 16 }}>Existing ({cases.length})</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {cases.map(c => (
                <div key={c.id} style={{ ...cardStyle, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: 15 }}>{c.client} — {c.sector}</p>
                    <p style={{ color: '#8A95A3', fontSize: 13, marginTop: 4 }}>{c.title}</p>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => startEditCase(c)} style={btnGhostSmall}>Edit</button>
                    <button onClick={() => handleDeleteCase(c.id)} style={btnDangerSmall}>Delete</button>
                  </div>
                </div>
              ))}
              {cases.length === 0 && <p style={{ color: '#8A95A3', fontSize: 14 }}>No case studies yet.</p>}
            </div>
          </>
        )}

        {/* ── BLOG ── */}
        {tab === 'blog' && (
          <>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
              <button onClick={startNewPost} style={btnPrimary}>+ New blog post</button>
            </div>

            <form onSubmit={handleSaveBlog} style={{ ...cardStyle, marginBottom: 32 }}>
              <h2 style={{ fontSize: 18, marginBottom: 24 }}>{editingPost ? `Editing: ${editingPost.title}` : 'Write a new blog post'}</h2>

              {/* Title + Slug */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={labelStyle}>Post title</label>
                  <input value={blogForm.title} onChange={e => handleTitleChange(e.target.value)} placeholder="e.g. How to generate B2B leads in India" style={inputStyle} required />
                </div>
                <div>
                  <label style={labelStyle}>URL slug</label>
                  <input value={blogForm.slug} onChange={e => setBlogForm(f => ({ ...f, slug: e.target.value }))} placeholder="how-to-generate-b2b-leads" style={inputStyle} required />
                  <p style={hintStyle}>Auto-filled from title · /blog/your-slug/</p>
                </div>
              </div>

              {/* Excerpt */}
              <label style={labelStyle}>Excerpt</label>
              <textarea value={blogForm.excerpt} onChange={e => setBlogForm(f => ({ ...f, excerpt: e.target.value }))} placeholder="1–2 sentence summary shown on the blog index and in Google." rows={2} style={{ ...inputStyle, resize: 'vertical' }} required />

              {/* Cover image upload */}
              <label style={labelStyle}>Cover image</label>
              <input
                value={coverImgName}
                onChange={e => setCoverImgName(e.target.value)}
                placeholder="Image name for SEO e.g. b2b-lead-generation-india"
                style={{ ...inputStyle, marginBottom: 8 }}
              />
              <p style={hintStyle}>Name your image for SEO (no spaces, no .jpg — just the name). Then upload.</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }}
                  onChange={e => { const f = e.target.files?.[0]; if (f) handleImageUpload(f, 'cover') }} />
                <button type="button" onClick={() => fileInputRef.current?.click()}
                  style={{ ...btnGhost, fontSize: 14, padding: '8px 16px' }} disabled={uploadingImg}>
                  {uploadingImg ? 'Uploading…' : '📷 Upload image'}
                </button>
                {blogForm.coverImage && (
                  <span style={{ fontSize: 13, color: '#34C283', wordBreak: 'break-all' }}>
                    ✓ Uploaded
                    <button type="button" onClick={() => setBlogForm(f => ({ ...f, coverImage: '' }))}
                      style={{ background: 'none', border: 'none', color: '#F4140C', cursor: 'pointer', marginLeft: 8 }}>✕</button>
                  </span>
                )}
              </div>

              {/* Author / Category / Date */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                <div>
                  <label style={labelStyle}>Author</label>
                  <input value={blogForm.author} onChange={e => setBlogForm(f => ({ ...f, author: e.target.value }))} placeholder="Flare Technologies" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Category</label>
                  <input value={blogForm.category} onChange={e => setBlogForm(f => ({ ...f, category: e.target.value }))} placeholder="B2B Marketing" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Publish date</label>
                  <input type="date" value={blogForm.publishedAt} onChange={e => setBlogForm(f => ({ ...f, publishedAt: e.target.value }))} style={inputStyle} />
                </div>
              </div>

              {/* Content blocks */}
              <div style={{ borderTop: '1px solid #353D47', paddingTop: 24, marginTop: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <label style={{ ...labelStyle, marginBottom: 0, fontSize: 15 }}>Content blocks</label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button type="button" onClick={() => addBlock('section')} style={btnGhostSmall}>+ Section</button>
                    <button type="button" onClick={() => addBlock('faq')} style={btnGhostSmall}>+ FAQ</button>
                  </div>
                </div>
                <p style={hintStyle}>Add sections (heading + content) and FAQs (question + answer). Drag to reorder using ↑ ↓.</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {blogForm.blocks.map((block, i) => (
                    <div key={i} style={{ background: '#0B0E12', border: '1px solid #353D47', borderRadius: 10, padding: 16 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: block.type === 'faq' ? '#F5B70F' : '#14B6BF', textTransform: 'uppercase', letterSpacing: 1 }}>
                          {block.type === 'faq' ? '❓ FAQ Block' : '📝 Section Block'}
                        </span>
                        <div style={{ display: 'flex', gap: 4 }}>
                          {i > 0 && <button type="button" onClick={() => moveBlock(i, -1)} style={btnGhostSmall}>↑</button>}
                          {i < blogForm.blocks.length - 1 && <button type="button" onClick={() => moveBlock(i, 1)} style={btnGhostSmall}>↓</button>}
                          <button type="button" onClick={() => removeBlock(i)} style={btnDangerSmall}>✕</button>
                        </div>
                      </div>

                      {block.type === 'section' && (
                        <>
                          <label style={labelStyle}>Heading (optional)</label>
                          <input value={block.heading} onChange={e => updateBlock(i, 'heading', e.target.value)} placeholder="e.g. What is B2B lead generation?" style={inputStyle} />
                          <label style={labelStyle}>Content</label>
                          <textarea value={block.body} onChange={e => updateBlock(i, 'body', e.target.value)} placeholder="Write the section content here…" rows={6} style={{ ...inputStyle, resize: 'vertical' }} />
                        </>
                      )}

                      {block.type === 'faq' && (
                        <>
                          <label style={labelStyle}>Question</label>
                          <input value={block.question} onChange={e => updateBlock(i, 'question', e.target.value)} placeholder="e.g. How long does it take to see results?" style={inputStyle} />
                          <label style={labelStyle}>Answer</label>
                          <textarea value={block.answer} onChange={e => updateBlock(i, 'answer', e.target.value)} placeholder="Write the answer here…" rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* SEO */}
              <div style={{ background: '#0B0E12', border: '1px solid #353D47', borderRadius: 10, padding: 20, marginTop: 24 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#FA4D12', marginBottom: 16, margin: '0 0 16px' }}>🔍 SEO Settings</p>
                <label style={labelStyle}>Meta title <span style={{ color: '#646F7E', fontWeight: 400 }}>(shown in Google — keep under 60 chars)</span></label>
                <input value={blogForm.metaTitle} onChange={e => setBlogForm(f => ({ ...f, metaTitle: e.target.value }))} placeholder="Leave blank to use post title" style={inputStyle} />
                <label style={labelStyle}>Meta description <span style={{ color: '#646F7E', fontWeight: 400 }}>(shown in Google — keep under 160 chars)</span></label>
                <textarea value={blogForm.metaDesc} onChange={e => setBlogForm(f => ({ ...f, metaDesc: e.target.value }))} placeholder="Leave blank to use excerpt" rows={2} style={{ ...inputStyle, resize: 'vertical' }} />
                <label style={labelStyle}>OG image for social sharing</label>
                <input
                  value={ogImgName}
                  onChange={e => setOgImgName(e.target.value)}
                  placeholder="Image name for SEO e.g. b2b-lead-generation-og"
                  style={{ ...inputStyle, marginBottom: 8 }}
                />
                <p style={hintStyle}>Name before uploading for better SEO.</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <input type="file" accept="image/*" style={{ display: 'none' }} id="og-upload"
                    onChange={e => { const f = e.target.files?.[0]; if (f) handleImageUpload(f, 'og') }} />
                  <label htmlFor="og-upload" style={{ ...btnGhost, fontSize: 14, padding: '8px 16px', cursor: 'pointer' }}>
                    {uploadingImg ? 'Uploading…' : '📷 Upload OG image'}
                  </label>
                  {blogForm.ogImage && (
                    <span style={{ fontSize: 13, color: '#34C283' }}>
                      ✓ Uploaded
                      <button type="button" onClick={() => setBlogForm(f => ({ ...f, ogImage: '' }))}
                        style={{ background: 'none', border: 'none', color: '#F4140C', cursor: 'pointer', marginLeft: 8 }}>✕</button>
                    </span>
                  )}
                </div>
                <p style={{ ...hintStyle, marginTop: 8 }}>This is what appears when someone shares your blog on WhatsApp or LinkedIn. Leave blank to use cover image.</p>
              </div>

              {/* Publish toggle */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 24 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: 15, color: '#fff' }}>
                  <input type="checkbox" checked={blogForm.published} onChange={e => setBlogForm(f => ({ ...f, published: e.target.checked }))}
                    style={{ width: 18, height: 18, accentColor: '#34C283' }} />
                  Publish this post (make it live on /blog/)
                </label>
              </div>

              <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
                <button type="submit" disabled={saving} style={btnPrimary}>
                  {saving ? 'Saving…' : editingPost ? 'Update post' : blogForm.published ? 'Publish post' : 'Save as draft'}
                </button>
                {editingPost && <button type="button" onClick={startNewPost} style={btnGhost}>Cancel</button>}
              </div>
            </form>

            {/* Posts list */}
            <h2 style={{ fontSize: 18, marginBottom: 16 }}>All posts ({posts.length})</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {posts.map(p => (
                <div key={p.id} style={{ ...cardStyle, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                      <p style={{ fontWeight: 600, fontSize: 15, margin: 0 }}>{p.title}</p>
                      <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 999, background: p.published ? 'rgba(52,194,131,.15)' : 'rgba(138,149,163,.15)', color: p.published ? '#34C283' : '#8A95A3', fontWeight: 600 }}>
                        {p.published ? 'Live' : 'Draft'}
                      </span>
                    </div>
                    <p style={{ color: '#8A95A3', fontSize: 13, margin: 0 }}>/blog/{p.slug}/ · {p.category} · {new Date(p.publishedAt).toLocaleDateString()}</p>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => startEditPost(p)} style={btnGhostSmall}>Edit</button>
                    <button onClick={() => handleDeletePost(p.id)} style={btnDangerSmall}>Delete</button>
                  </div>
                </div>
              ))}
              {posts.length === 0 && <p style={{ color: '#8A95A3', fontSize: 14 }}>No posts yet. Write your first one above.</p>}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function slugify(str: string) {
  return str.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

const inputStyle: React.CSSProperties = { width: '100%', padding: '10px 14px', background: '#151A20', border: '1px solid #353D47', borderRadius: 8, color: '#fff', fontSize: 15, marginBottom: 8, outline: 'none' }
const labelStyle: React.CSSProperties = { display: 'block', fontSize: 13, fontWeight: 600, color: '#B2BBC6', marginBottom: 6 }
const hintStyle: React.CSSProperties = { fontSize: 12, color: '#8A95A3', marginBottom: 16 }
const cardStyle: React.CSSProperties = { background: '#151A20', border: '1px solid #353D47', borderRadius: 12, padding: 24 }
const btnPrimary: React.CSSProperties = { padding: '10px 20px', background: '#F4140C', color: '#fff', border: 'none', borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: 'pointer' }
const btnGhost: React.CSSProperties = { padding: '10px 20px', background: 'transparent', color: '#B2BBC6', border: '1px solid #353D47', borderRadius: 8, fontSize: 15, cursor: 'pointer' }
const btnGhostSmall: React.CSSProperties = { padding: '6px 12px', background: 'transparent', color: '#B2BBC6', border: '1px solid #353D47', borderRadius: 6, fontSize: 13, cursor: 'pointer' }
const btnDangerSmall: React.CSSProperties = { padding: '6px 12px', background: 'transparent', color: '#F4140C', border: '1px solid rgba(244,20,12,.3)', borderRadius: 6, fontSize: 13, cursor: 'pointer' }
