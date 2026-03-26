'use client'

import { useEffect, useState } from 'react'
import { DOMAIN_LABELS } from '@/lib/diagnostic/questions'
import type { Domain } from '@/types/diagnostic'

interface Props {
  fromDomain: Domain
  toDomain:   Domain
  onComplete: () => void
}

export default function DomainTransition({ fromDomain, toDomain, onComplete }: Props) {
  const [stage, setStage] = useState<'complete' | 'loading'>('complete')

  useEffect(() => {
    const t1 = setTimeout(() => setStage('loading'), 800)
    const t2 = setTimeout(() => onComplete(), 1600)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [onComplete])

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 60,
      background: '#0A0A0A',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: '12px',
    }}>
      <div key={stage} style={{
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: '11px', letterSpacing: '0.25em',
        color: '#666666', textTransform: 'uppercase',
        animation: 'dtFadeIn 0.3s ease-out',
      }}>
        {stage === 'complete'
          ? `● ${DOMAIN_LABELS[fromDomain]} SCAN COMPLETE`
          : `LOADING: ${DOMAIN_LABELS[toDomain]}`
        }
      </div>

      {stage === 'loading' && (
        <div style={{
          width: '120px', height: '1px',
          background: '#1A1A1A', overflow: 'hidden',
          marginTop: '8px',
        }}>
          <div style={{
            height: '100%', background: '#0033CC',
            animation: 'dtProgress 0.8s ease-out forwards',
          }} />
        </div>
      )}

      <style>{`
        @keyframes dtFadeIn   { from { opacity:0 } to { opacity:1 } }
        @keyframes dtProgress { from { width:0% } to { width:100% } }
      `}</style>
    </div>
  )
}
