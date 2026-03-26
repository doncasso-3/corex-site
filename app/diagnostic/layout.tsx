import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'C-MAX Diagnostic — Core X Lab',
  description: 'A clinical performance diagnostic. 28 questions. Measure your cognitive output.',
}

export default function DiagnosticLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#000000',
      color: '#FFFFFF',
      overflow: 'hidden',
      fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
    }}>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=IBM+Plex+Mono:wght@400&display=swap"
        rel="stylesheet"
      />
      {children}
    </div>
  )
}
