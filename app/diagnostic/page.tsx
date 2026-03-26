'use client'

import { DiagnosticProvider, useDiagnostic } from '@/context/DiagnosticContext'
import AmbientBackground from '@/components/diagnostic/AmbientBackground'
import HookScreen from '@/components/diagnostic/HookScreen'

function DiagnosticContent() {
  const { phase, activeDomain } = useDiagnostic()

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#000000' }}>
      <AmbientBackground activeDomain={activeDomain} />

      {phase === 'hook' && <HookScreen />}

      {/* Sessions 3 & 4 will add: question, processing, results phases */}
    </div>
  )
}

export default function DiagnosticPage() {
  return (
    <DiagnosticProvider>
      <DiagnosticContent />
    </DiagnosticProvider>
  )
}
