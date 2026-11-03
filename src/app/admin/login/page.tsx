'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const r = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (r.ok) {
      router.push('/admin/')
      router.refresh()
    } else {
      setError('Wrong password. Try again.')
    }
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#0B0E12' }}>
      <form onSubmit={handleLogin} style={{ width: 360, maxWidth: '90vw' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 44, marginBottom: 12 }}>🔒</div>
          <h1 style={{ color: '#fff', fontSize: 24, marginBottom: 8, fontFamily: 'var(--font-display, sans-serif)' }}>Admin Access</h1>
          <p style={{ color: '#8A95A3', fontSize: 14, margin: 0 }}>Flare Technologies · Restricted area</p>
        </div>

        {error && (
          <div style={{ background: 'rgba(244,20,12,.12)', border: '1px solid rgba(244,20,12,.4)', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 14, color: '#F4140C' }}>
            {error}
          </div>
        )}

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          autoFocus
          required
          style={{
            width: '100%', padding: '12px 14px', background: '#151A20',
            border: '1px solid #353D47', borderRadius: 8, color: '#fff',
            fontSize: 16, marginBottom: 12, outline: 'none', boxSizing: 'border-box',
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%', padding: '12px 20px', background: '#FA4D12',
            color: '#fff', border: 'none', borderRadius: 8,
            fontSize: 16, fontWeight: 600, cursor: 'pointer',
          }}
        >
          {loading ? 'Logging in…' : 'Log in'}
        </button>
      </form>
    </div>
  )
}
