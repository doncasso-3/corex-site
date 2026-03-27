'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useDiagnostic } from '@/context/DiagnosticContext'
import { QUESTIONS, DOMAIN_LABELS } from '@/lib/diagnostic/questions'
import type { Domain } from '@/types/diagnostic'

import AmbientBackground  from './AmbientBackground'
import HookScreen         from './HookScreen'
import ProgressLine       from './ProgressLine'
import LiveRadarMini      from './LiveRadarMini'
import QuestionCard       from './QuestionCard'
import DomainTransition   from './DomainTransition'
import ProcessingScreen   from './ProcessingScreen'
import ResultsView        from '@/components/results/ResultsView'

export default function DiagnosticShell() {
  const { phase, activeDomain, currentIndex } = useDiagnostic()

  const prevDomainRef = useRef<Domain | null>(null)
  const [transition, setTransition] = useState<{ from: Domain; to: Domain } | null>(null)
  const [questionVisible, setQuestionVisible] = useState(true)

  // Detect domain boundary
  useEffect(() => {
    if (phase !== 'question') {
      prevDomainRef.current = activeDomain
      return
    }
    if (
      activeDomain &&
      prevDomainRef.current &&
      activeDomain !== prevDomainRef.current &&
      !transition
    ) {
      setTransition({ from: prevDomainRef.current, to: activeDomain })
      setQuestionVisible(false)
    }
    prevDomainRef.current = activeDomain
  }, [activeDomain, phase]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleTransitionComplete = () => {
    setTransition(null)
    setQuestionVisible(true)
  }

  const isQuestion = phase === 'question'

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#000000' }}>
      <AmbientBackground activeDomain={activeDomain} />

      {/* ── HOOK HEADER ──────────────────────── */}
      {phase === 'hook' && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0,
          height: '52px', zIndex: 40,
          display: 'flex', alignItems: 'center',
          padding: '0 28px',
          borderBottom: '1px solid #111',
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(12px)',
        }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <svg width={18} height={18} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="11" y="11" width="14" height="14" rx="2" stroke="white" strokeWidth="2.2" fill="none"/>
              <line x1="11" y1="11" x2="4"  y2="4"  stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
              <line x1="25" y1="11" x2="32" y2="4"  stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
              <line x1="11" y1="25" x2="4"  y2="32" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
              <line x1="25" y1="25" x2="32" y2="32" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
            </svg>
            <span style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '11px', letterSpacing: '0.22em',
              color: 'rgba(255,255,255,0.45)',
            }}>CORE X LAB</span>
          </Link>
        </div>
      )}

      {/* ── HOOK ─────────────────────────────── */}
      {phase === 'hook' && <HookScreen />}

      {/* ── QUESTION FLOW ────────────────────── */}
      {isQuestion && (
        <>
          <ProgressLine />

          {/* Top bar */}
          <div style={{
            position: 'fixed', top: 2, left: 0, right: 0,
            height: '44px', zIndex: 40,
            background: 'rgba(0,0,0,0.92)',
            backdropFilter: 'blur(8px)',
            borderBottom: '1px solid #1A1A1A',
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:'10px', letterSpacing:'0.2em', color:'#3D3D3D' }}>
                CORE X
              </span>
              <span style={{ color:'#1A1A1A' }}>|</span>
              <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:'10px', letterSpacing:'0.2em', color:'#666666' }}>
                C-MAX DIAGNOSTIC
              </span>
            </div>

            {activeDomain && (
              <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:'10px', letterSpacing:'0.2em', color:'#3D3D3D', textTransform:'uppercase' }}>
                {DOMAIN_LABELS[activeDomain]}
              </span>
            )}

            <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:'10px', letterSpacing:'0.15em', color:'#3D3D3D' }}>
              {currentIndex + 1} / {QUESTIONS.length}
            </span>
          </div>

          <LiveRadarMini />

          {/* Question content */}
          <div style={{
            position: 'relative', zIndex: 2,
            minHeight: '100vh',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            paddingTop: '80px', paddingBottom: '48px',
            opacity: questionVisible ? 1 : 0,
            transition: 'opacity 0.25s ease-out',
          }}>
            <QuestionCard />
          </div>

          {/* Domain transition overlay */}
          {transition && (
            <DomainTransition
              fromDomain={transition.from}
              toDomain={transition.to}
              onComplete={handleTransitionComplete}
            />
          )}
        </>
      )}

      {/* ── PROCESSING ───────────────────────── */}
      {phase === 'processing' && <ProcessingScreen />}

      {/* ── RESULTS ──────────────────────────── */}
      {(phase === 'results-gated' || phase === 'results-unlocked') && (
        <ResultsView />
      )}
    </div>
  )
}
