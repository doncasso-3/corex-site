'use client'

import { useDiagnostic } from '@/context/DiagnosticContext'
import { QUESTIONS } from '@/lib/diagnostic/questions'

export default function ProgressLine() {
  const { currentIndex } = useDiagnostic()
  const pct = (currentIndex / QUESTIONS.length) * 100

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0,
      height: '2px', zIndex: 200,
      background: '#111111',
    }}>
      <div style={{
        height: '100%',
        width: `${pct}%`,
        background: '#0033CC',
        transition: 'width 200ms ease-out',
      }} />
    </div>
  )
}
