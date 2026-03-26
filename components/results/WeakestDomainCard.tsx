'use client'

import { DOMAIN_LABELS } from '@/lib/diagnostic/questions'
import { DOMAIN_VERDICTS } from '@/lib/diagnostic/verdicts'
import type { Domain } from '@/types/diagnostic'

interface Props {
  domain: Domain
  visible: boolean
}

export default function WeakestDomainCard({ domain, visible }: Props) {
  const verdict = DOMAIN_VERDICTS[domain]

  return (
    <div style={{
      border: '1px solid #0033CC',
      borderRadius: '2px',
      padding: '28px 32px',
      maxWidth: '560px',
      width: '100%',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(20px)',
      transition: 'opacity 400ms ease-out, transform 400ms ease-out',
    }}>
      <div style={{
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: '10px', letterSpacing: '0.2em',
        color: '#666666', marginBottom: '12px',
      }}>
        PRIMARY FAILURE POINT
      </div>

      <div style={{
        fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
        fontWeight: 200, fontSize: '32px',
        color: '#FFFFFF', letterSpacing: '-0.01em',
        marginBottom: '16px',
      }}>
        {DOMAIN_LABELS[domain]}
      </div>

      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontWeight: 300, fontSize: '15px',
        color: '#CCCCCC', lineHeight: 1.7,
        margin: 0,
      }}>
        {verdict.body}
      </p>
    </div>
  )
}
