'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Props {
  visible: boolean
}

export default function CTABlock({ visible }: Props) {
  const [hovered, setHovered] = useState(false)

  return (
    <div style={{
      textAlign: 'center', width: '100%', maxWidth: '560px',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(12px)',
      transition: 'opacity 300ms ease-out 300ms, transform 300ms ease-out 300ms',
    }}>
      <div style={{
        fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
        fontWeight: 200, fontSize: '20px',
        color: '#FFFFFF', marginBottom: '28px',
        lineHeight: 1.4,
      }}>
        Your C-Max can be trained. Command OS is the protocol.
      </div>

      <Link href="/waitlist"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'inline-block',
          border: '1px solid #0033CC',
          borderRadius: '2px',
          padding: '14px 32px',
          fontFamily: "'Inter', sans-serif",
          fontWeight: 500, fontSize: '12px',
          letterSpacing: '0.15em', textTransform: 'uppercase',
          color: hovered ? '#FFFFFF' : '#0033CC',
          background: hovered ? 'rgba(0,51,204,0.08)' : 'transparent',
          textDecoration: 'none',
          transition: 'color 0.15s ease-out, background 0.15s ease-out',
        }}
      >
        GET COMMAND OS — FREE →
      </Link>

      <div style={{ marginTop: '16px' }}>
        <a href="mailto:corexlab@gmail.com"
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '11px', letterSpacing: '0.15em',
            color: '#666666', textDecoration: 'none',
          }}
        >
          BOOK A 1:1 INSTALL SESSION — $500 →
        </a>
      </div>
    </div>
  )
}
