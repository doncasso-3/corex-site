'use client'

import { useEffect, useRef } from 'react'
import type { Domain } from '@/types/diagnostic'
import { domainPulse, SPEED_MS } from '@/lib/diagnostic/domainPulse'

interface Props {
  activeDomain?: Domain | null
}

export default function AmbientBackground({ activeDomain }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef  = useRef<number>(0)
  const timeRef   = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    const pulse = activeDomain ? domainPulse[activeDomain] : null
    const speed = pulse ? SPEED_MS[pulse.speed] : 8000

    let last = performance.now()

    const draw = (now: number) => {
      const dt = now - last
      last = now
      timeRef.current += dt

      const t = timeRef.current / speed
      const W = canvas.width
      const H = canvas.height

      ctx.clearRect(0, 0, W, H)

      const pattern = pulse?.pattern ?? 'breathe'
      const density = pulse?.density ?? 'medium'
      const count   = density === 'low' ? 12 : density === 'medium' ? 24 : 40

      // Draw particles based on domain pattern
      for (let i = 0; i < count; i++) {
        const seed  = i * 137.508
        const phase = (seed % 1000) / 1000

        let x = 0, y = 0, alpha = 0, size = 1

        switch (pattern) {
          case 'scatter': {
            const angle = (phase * Math.PI * 2) + t * Math.PI * 2
            const r     = (0.1 + (phase * 0.8)) * Math.min(W, H) * 0.5
            x     = W / 2 + Math.cos(angle) * r * (0.5 + 0.5 * Math.sin(t * 3.7 + seed))
            y     = H / 2 + Math.sin(angle) * r * (0.5 + 0.5 * Math.cos(t * 2.9 + seed))
            alpha = 0.06 + 0.06 * Math.sin(t * 4 + phase * Math.PI * 2)
            size  = 1 + Math.abs(Math.sin(t * 5 + seed)) * 1.5
            break
          }
          case 'linear': {
            x     = (phase + t * 0.3) % 1 * W
            y     = (seed % H)
            alpha = 0.04 + 0.04 * Math.abs(Math.sin(t + phase))
            size  = 1
            break
          }
          case 'breathe': {
            const breathe = 0.6 + 0.4 * Math.sin(t * Math.PI * 2 + phase * Math.PI * 2)
            x     = W * (0.1 + phase * 0.8)
            y     = H * ((i / count) * 0.8 + 0.1)
            alpha = 0.03 * breathe + 0.03
            size  = 1.5 * breathe
            break
          }
          case 'static': {
            x     = W * (0.05 + (seed % 100) / 100 * 0.9)
            y     = H * (0.05 + ((seed * 7) % 100) / 100 * 0.9)
            alpha = 0.04 + 0.04 * Math.abs(Math.sin(t * 8 + phase * Math.PI * 2))
            size  = 0.8
            break
          }
          case 'drift': {
            x     = (W * phase + Math.sin(t * 0.5 + phase * 10) * 60)
            y     = (H * ((seed * 3) % 100 / 100) + t * 10) % H
            alpha = 0.04
            size  = 1
            break
          }
          case 'compress': {
            const cx = W / 2 + Math.cos(phase * Math.PI * 2 + t) * W * 0.3
            const cy = H / 2 + Math.sin(phase * Math.PI * 2 + t * 0.7) * H * 0.3
            const compress = 0.5 + 0.5 * Math.sin(t * Math.PI * 2 * 1.5)
            x     = W / 2 + (cx - W / 2) * compress
            y     = H / 2 + (cy - H / 2) * compress
            alpha = 0.05 + 0.04 * compress
            size  = 1.2
            break
          }
          case 'scanline': {
            const scanY = ((t * 0.4) % 1) * H
            x     = W * phase
            y     = (scanY + (seed % 80)) % H
            alpha = 0.03 + 0.05 * Math.max(0, 1 - Math.abs(y - scanY) / 80)
            size  = 1
            break
          }
          case 'gridpulse': {
            const cols = 8, rows = 6
            const col  = i % cols
            const row  = Math.floor(i / cols) % rows
            x     = (col / (cols - 1)) * W * 0.9 + W * 0.05
            y     = (row / (rows - 1)) * H * 0.9 + H * 0.05
            alpha = 0.04 + 0.04 * Math.abs(Math.sin(t * Math.PI * 2 + (col + row) * 0.5))
            size  = 1.5
            break
          }
        }

        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${alpha})`
        ctx.fill()
      }

      frameRef.current = requestAnimationFrame(draw)
    }

    frameRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [activeDomain])

  return (
    <>
      {/* Particle layer */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed', inset: 0, zIndex: 0,
          pointerEvents: 'none', opacity: 1,
        }}
      />

      {/* SVG noise grain overlay */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none', opacity: 0.04 }}>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <filter id="cmax-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch">
              <animate attributeName="baseFrequency" dur="8s" values="0.65;0.68;0.65" repeatCount="indefinite"/>
            </feTurbulence>
            <feColorMatrix type="saturate" values="0"/>
          </filter>
          <rect width="100%" height="100%" filter="url(#cmax-noise)"/>
        </svg>
      </div>
    </>
  )
}
