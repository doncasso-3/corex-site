'use client'

import { useState } from 'react'
import { useDiagnostic } from '@/context/DiagnosticContext'

export default function EmailGate() {
  const { submitEmail } = useDiagnostic()
  const [email,   setEmail]   = useState('')
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    setError('')
    const ok = await submitEmail(email.trim())
    if (!ok) {
      setError('Something went wrong. Try again.')
      setLoading(false)
    }
    // On success, context sets phase to 'results-unlocked' — component unmounts
  }

  return (
    <div style={{
      width: '100%', maxWidth: '400px', margin: '0 auto',
      animation: 'egFadeIn 0.4s ease-out 1.5s both',
    }}>
      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontWeight: 300, fontSize: '15px',
        color: '#CCCCCC', lineHeight: 1.6,
        textAlign: 'center', marginBottom: '24px',
      }}>
        Unlock your full diagnostic report.
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Your email address"
          required
          disabled={loading}
          style={{
            background: 'transparent',
            border: '1px solid #3D3D3D',
            borderRadius: '2px',
            padding: '14px 16px',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300, fontSize: '15px',
            color: '#FFFFFF',
            outline: 'none',
            width: '100%',
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            background: loading ? 'rgba(0,51,204,0.6)' : '#0033CC',
            border: 'none', borderRadius: '2px',
            padding: '14px 24px',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500, fontSize: '12px',
            letterSpacing: '0.15em', textTransform: 'uppercase',
            color: '#FFFFFF', cursor: loading ? 'default' : 'pointer',
            transition: 'background 0.2s ease-out',
          }}
        >
          {loading ? 'PROCESSING...' : 'UNLOCK RESULTS →'}
        </button>
      </form>

      {error && (
        <div style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: '10px', color: '#666666',
          textAlign: 'center', marginTop: '8px',
        }}>
          {error}
        </div>
      )}

      <div style={{
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: '10px', letterSpacing: '0.1em',
        color: '#666666', textAlign: 'center',
        marginTop: '12px',
      }}>
        NO SPAM. ONE EMAIL. FULL REPORT.
      </div>

      <style>{`
        @keyframes egFadeIn { from { opacity:0; transform:translateY(8px) } to { opacity:1; transform:translateY(0) } }
        input::placeholder { color: #3D3D3D; }
        input:focus { border-color: #666666; }
      `}</style>
    </div>
  )
}
