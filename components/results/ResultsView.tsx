'use client'

import { useEffect, useState, useRef } from 'react'
import { useDiagnostic } from '@/context/DiagnosticContext'
import CmaxRadar         from './CmaxRadar'
import EmailGate         from './EmailGate'
import WeakestDomainCard from './WeakestDomainCard'
import CTABlock          from './CTABlock'

function useCountUp(target: number, duration = 1500) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    let raf: number
    const start = performance.now()
    const step = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(Math.round(eased * target))
      if (t < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [target, duration])
  return value
}

export default function ResultsView() {
  const { phase, result } = useDiagnostic()
  const unlocked  = phase === 'results-unlocked'

  // Reveal sequence state
  const [revealIndex,     setRevealIndex]     = useState(0)   // radar axis stagger
  const [showWeakest,     setShowWeakest]     = useState(false)
  const [showCTA,         setShowCTA]         = useState(false)
  const revealDone = useRef(false)

  const displayScore = useCountUp(result?.cmax ?? 0, 1500)

  // On unlock, run reveal sequence
  useEffect(() => {
    if (!unlocked || revealDone.current) return
    revealDone.current = true

    // 1. Blur dissolves (CSS handles it)
    // 2. Domain scores stagger onto radar — 100ms each
    const domains = 8
    for (let i = 1; i <= domains; i++) {
      setTimeout(() => setRevealIndex(i), 600 + i * 100)
    }
    // 3. Weakest domain card slides up
    setTimeout(() => setShowWeakest(true), 600 + domains * 100 + 400)
    // 4. CTA fades in
    setTimeout(() => setShowCTA(true), 600 + domains * 100 + 800)
  }, [unlocked])

  // Shouldn't happen — context sets result before phase transitions — but guard defensively
  if (!result) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: '11px', color: '#3D3D3D', letterSpacing: '0.2em' }}>
        LOADING...
      </span>
    </div>
  )

  const { classification, weakest } = result

  return (
    <div style={{
      position: 'relative', zIndex: 2,
      minHeight: '100vh',
      padding: '80px 32px 60px',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', gap: '48px',
    }}>

      {/* Two-column: score left, radar right */}
      <div style={{
        display: 'flex', flexWrap: 'wrap',
        gap: '48px', width: '100%', maxWidth: '860px',
        alignItems: 'flex-start', justifyContent: 'center',
      }}>

        {/* LEFT — score + verdict */}
        <div style={{ flex: '1 1 300px', minWidth: '260px' }}>
          {/* Label */}
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '10px', letterSpacing: '0.2em',
            color: '#666666', marginBottom: '8px',
          }}>
            C-MAX SCORE
          </div>

          {/* Count-up score */}
          <div style={{
            fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
            fontWeight: 200, fontSize: '96px',
            color: '#0033CC', letterSpacing: '-0.02em',
            lineHeight: 1,
          }}>
            {displayScore}
          </div>

          {/* Classification */}
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '13px', letterSpacing: '0.25em',
            color: '#FFFFFF', marginTop: '12px', marginBottom: '20px',
          }}>
            {classification.label}
          </div>

          {/* Verdict — blurred until unlocked */}
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300, fontSize: '15px',
            color: '#CCCCCC', lineHeight: 1.7,
            maxWidth: '380px',
            filter: unlocked ? 'blur(0px)' : 'blur(6px)',
            transition: 'filter 600ms ease-out',
            userSelect: unlocked ? 'auto' : 'none',
          }}>
            {classification.read}
          </p>
        </div>

        {/* RIGHT — radar */}
        <div style={{ flex: '1 1 280px', maxWidth: '320px' }}>
          <CmaxRadar
            result={result}
            revealed={unlocked}
            revealIndex={revealIndex}
          />
        </div>
      </div>

      {/* Email gate (gated) or results (unlocked) */}
      {!unlocked && <EmailGate />}

      {unlocked && (
        <>
          <WeakestDomainCard domain={weakest} visible={showWeakest} />
          <CTABlock visible={showCTA} />
        </>
      )}
    </div>
  )
}
