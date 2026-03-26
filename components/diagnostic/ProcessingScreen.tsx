'use client'

import { useEffect, useState, useRef } from 'react'
import { useDiagnostic } from '@/context/DiagnosticContext'
import { DOMAIN_LABELS, DOMAIN_ORDER } from '@/lib/diagnostic/questions'

const SIZE    = 280
const CX      = SIZE / 2
const CY      = SIZE / 2
const RADIUS  = 120
const RINGS   = [RADIUS * 0.33, RADIUS * 0.66, RADIUS]
const ANGLES  = DOMAIN_ORDER.map((_, i) => ((i * 45 - 90) * Math.PI) / 180)

function ProcessingRadar({ scores }: { scores: Record<string, { normalized: number }> }) {
  const polyPoints = DOMAIN_ORDER
    .map((d, i) => {
      const r = RADIUS * ((scores[d]?.normalized ?? 0) / 100)
      return `${CX + r * Math.cos(ANGLES[i])},${CY + r * Math.sin(ANGLES[i])}`
    })
    .join(' ')

  const octPoints = (r: number) =>
    ANGLES.map(a => `${CX + r * Math.cos(a)},${CY + r * Math.sin(a)}`).join(' ')

  return (
    <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}
      style={{ animation: 'radarScaleIn 0.6s ease-out forwards' }}>
      {RINGS.map(r => (
        <polygon key={r} points={octPoints(r)}
          fill="none" stroke="#1A1A1A" strokeWidth="1" />
      ))}
      {ANGLES.map((a, i) => (
        <line key={i} x1={CX} y1={CY}
          x2={CX + RADIUS * Math.cos(a)} y2={CY + RADIUS * Math.sin(a)}
          stroke="#1A1A1A" strokeWidth="0.8" />
      ))}
      <polygon points={polyPoints}
        fill="rgba(0,51,204,0.12)" stroke="#0033CC" strokeWidth="1"
        style={{ animation: 'radarFillIn 1s ease-out 0.4s both' }} />
      <circle cx={CX} cy={CY} r="3" fill="rgba(0,51,204,0.8)" />
      <style>{`
        @keyframes radarScaleIn { from { opacity:0; transform:scale(0.4) } to { opacity:1; transform:scale(1) } }
        @keyframes radarFillIn  { from { opacity:0 } to { opacity:1 } }
      `}</style>
    </svg>
  )
}

export default function ProcessingScreen() {
  const { result, completeProcessing } = useDiagnostic()
  const [visibleLines,  setVisibleLines]  = useState(0)
  const [showProgress,  setShowProgress]  = useState(false)
  const [progressWidth, setProgressWidth] = useState(0)
  const done = useRef(false)

  useEffect(() => {
    if (done.current) return
    done.current = true

    // Stagger log lines 300ms apart
    DOMAIN_ORDER.forEach((_, i) => {
      setTimeout(() => setVisibleLines(i + 1), 200 + i * 300)
    })

    // Show progress bar 400ms after last line
    const lastLine = 200 + (DOMAIN_ORDER.length - 1) * 300
    setTimeout(() => setShowProgress(true), lastLine + 400)

    // Animate progress bar
    setTimeout(() => setProgressWidth(100), lastLine + 450)

    // Complete
    setTimeout(() => completeProcessing(), lastLine + 400 + 900)
  }, [completeProcessing])

  return (
    <div style={{
      position: 'relative', zIndex: 2,
      minHeight: '100vh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: '48px', padding: '40px 24px',
    }}>
      {/* Radar — only when result is ready */}
      {result && <ProcessingRadar scores={result.scores} />}

      {/* Log lines */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '320px' }}>
        {DOMAIN_ORDER.map((domain, i) => (
          <div key={domain} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            gap: '40px',
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '11px', letterSpacing: '0.2em',
            color: '#666666', textTransform: 'uppercase',
            opacity: i < visibleLines ? 1 : 0,
            transform: i < visibleLines ? 'translateY(0)' : 'translateY(4px)',
            transition: 'opacity 0.25s ease-out, transform 0.25s ease-out',
          }}>
            <span>● {DOMAIN_LABELS[domain]}</span>
            <span style={{ color: '#3D3D3D' }}>[COMPLETE]</span>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      {showProgress && (
        <div style={{ width: '320px' }}>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '11px', letterSpacing: '0.2em',
            color: '#666666', marginBottom: '12px',
            animation: 'procFadeIn 0.3s ease-out',
          }}>
            CALCULATING C-MAX...
          </div>
          <div style={{
            height: '1px', background: '#1A1A1A', overflow: 'hidden',
            animation: 'procFadeIn 0.3s ease-out',
          }}>
            <div style={{
              height: '100%', background: '#0033CC',
              width: `${progressWidth}%`,
              transition: 'width 800ms ease-out',
            }} />
          </div>
        </div>
      )}

      <style>{`
        @keyframes procFadeIn { from { opacity:0 } to { opacity:1 } }
      `}</style>
    </div>
  )
}
