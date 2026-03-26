'use client'

import { useEffect, useState } from 'react'
import { useDiagnostic } from '@/context/DiagnosticContext'

// Octagon radar wireframe — 8 axes, 3 rings, slow rotation
function IdleRadar() {
  const SIZE   = 180
  const CX     = SIZE / 2
  const CY     = SIZE / 2
  const RADII  = [27, 54, 81]
  const angles = Array.from({ length: 8 }, (_, i) => ((i * 45 - 90) * Math.PI) / 180)

  const octagonPoints = (r: number) =>
    angles.map(a => `${CX + r * Math.cos(a)},${CY + r * Math.sin(a)}`).join(' ')

  return (
    <div style={{ position: 'relative', width: SIZE, height: SIZE }}>
      <svg
        width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}
        style={{ animation: 'radarSpin 24s linear infinite', display: 'block' }}
      >
        {/* Rings */}
        {RADII.map(r => (
          <polygon
            key={r}
            points={octagonPoints(r)}
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="0.8"
          />
        ))}
        {/* Axes */}
        {angles.map((a, i) => (
          <line
            key={i}
            x1={CX} y1={CY}
            x2={CX + RADII[2] * Math.cos(a)}
            y2={CY + RADII[2] * Math.sin(a)}
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="0.8"
          />
        ))}
        {/* Center dot */}
        <circle cx={CX} cy={CY} r="2" fill="rgba(255,255,255,0.2)" />
      </svg>
    </div>
  )
}

export default function HookScreen() {
  const { startDiagnostic } = useDiagnostic()
  const [hovered, setHovered] = useState(false)

  // UTM tracking
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const source = new URLSearchParams(window.location.search).get('utm_source') ?? 'direct'
      sessionStorage.setItem('cmax_source', source)
    }
  }, [])

  return (
    <div style={{
      position: 'relative', zIndex: 2,
      minHeight: '100vh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '40px 24px',
      textAlign: 'center',
    }}>
      {/* Radar + SYSTEM IDLE */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
        <IdleRadar />
        <div style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: '10px', letterSpacing: '0.2em',
          color: '#666666',
          animation: 'idlePulse 2.4s ease-in-out infinite',
        }}>
          ● SYSTEM IDLE
        </div>
      </div>

      {/* 48px gap */}
      <div style={{ height: 48 }} />

      {/* CORE X LAB */}
      <div style={{
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: '10px', letterSpacing: '0.2em',
        color: '#666666', textTransform: 'uppercase',
      }}>
        CORE X LAB
      </div>

      {/* 16px gap */}
      <div style={{ height: 16 }} />

      {/* C-MAX / COGNITIVE / DIAGNOSTIC */}
      <div style={{ lineHeight: 1.0 }}>
        <div style={{ fontSize: 'clamp(48px, 10vw, 72px)', fontWeight: 200, color: '#FFFFFF', letterSpacing: '-0.01em' }}>
          C-MAX
        </div>
        <div style={{ fontSize: 'clamp(48px, 10vw, 72px)', fontWeight: 200, color: '#FFFFFF', letterSpacing: '-0.01em' }}>
          COGNITIVE
        </div>
        <div style={{ fontSize: 'clamp(48px, 10vw, 72px)', fontWeight: 200, color: '#666666', letterSpacing: '-0.01em' }}>
          DIAGNOSTIC
        </div>
      </div>

      {/* 32px gap */}
      <div style={{ height: 32 }} />

      {/* Sub-copy */}
      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontWeight: 300, fontSize: '16px',
        color: '#CCCCCC', lineHeight: 1.6,
        maxWidth: '420px', margin: 0,
      }}>
        Most people have never measured their cognitive output. They operate on assumption.
      </p>

      {/* 48px gap */}
      <div style={{ height: 48 }} />

      {/* CTA Button */}
      <button
        onClick={startDiagnostic}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: 'transparent',
          border: `1px solid ${hovered ? '#0033CC' : '#FFFFFF'}`,
          borderRadius: '2px',
          color: hovered ? '#0033CC' : '#FFFFFF',
          fontFamily: "'Inter', sans-serif",
          fontWeight: 500, fontSize: '12px',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          padding: '16px 40px',
          cursor: 'pointer',
          transition: 'border-color 0.2s ease-out, color 0.2s ease-out',
        }}
      >
        RUN DIAGNOSTIC →
      </button>

      {/* 20px gap */}
      <div style={{ height: 20 }} />

      {/* Meta */}
      <div style={{
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: '10px', letterSpacing: '0.1em',
        color: '#666666',
      }}>
        28 QUESTIONS &nbsp;·&nbsp; 4 MINUTES &nbsp;·&nbsp; NO ACCOUNT REQUIRED
      </div>

      <style>{`
        @keyframes radarSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes idlePulse {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
