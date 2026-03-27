'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

interface SiteHeaderProps {
  right?: React.ReactNode
  scrollHide?: boolean
}

export default function SiteHeader({ right, scrollHide = true }: SiteHeaderProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (!scrollHide) return
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      if (y < 10) setVisible(true)
      else if (y > lastY) setVisible(false)
      else setVisible(true)
      lastY = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [scrollHide])

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0,
      height: '52px', zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 28px',
      borderBottom: '1px solid #111',
      background: 'rgba(0,0,0,0.6)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      transform: visible ? 'translateY(0)' : 'translateY(-100%)',
      transition: 'transform 0.3s ease',
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
          fontSize: '11px',
          letterSpacing: '0.22em',
          color: 'rgba(255,255,255,0.45)',
        }}>
          CORE X LAB
        </span>
      </Link>

      {right && (
        <div style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: '10px',
          letterSpacing: '0.15em',
          color: 'rgba(255,255,255,0.25)',
        }}>
          {right}
        </div>
      )}
    </header>
  )
}
