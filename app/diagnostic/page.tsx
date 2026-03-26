'use client'

import { DiagnosticProvider } from '@/context/DiagnosticContext'
import DiagnosticShell from '@/components/diagnostic/DiagnosticShell'

export default function DiagnosticPage() {
  return (
    <DiagnosticProvider>
      <DiagnosticShell />
    </DiagnosticProvider>
  )
}
