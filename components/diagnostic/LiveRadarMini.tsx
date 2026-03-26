'use client'

import { useDiagnostic } from '@/context/DiagnosticContext'
import { DOMAIN_ORDER } from '@/lib/diagnostic/questions'
import type { Domain } from '@/types/diagnostic'

const SIZE   = 120
const CX     = SIZE / 2
const CY     = SIZE / 2
const RADIUS = 50
const RINGS  = [RADIUS * 0.33, RADIUS * 0.66, RADIUS]
const ANGLES = DOMAIN_ORDER.map((_, i) => ((i * 45 - 90) * Math.PI) / 180)

function octagonPoints(r: number) {
  return ANGLES.map(a => `${CX + r * Math.cos(a)},${CY + r * Math.sin(a)}`).join(' ')
}

export default function LiveRadarMini() {
  const { completedDomains, activeDomain, result } = useDiagnostic()

  return (
    <div style={{
      position: 'fixed', top: 56, right: 20,
      zIndex: 30, opacity: 0.4, pointerEvents: 'none',
    }}>
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
        {/* Concentric rings */}
        {RINGS.map(r => (
          <polygon key={r} points={octagonPoints(r)}
            fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.6" />
        ))}

        {/* Axis lines */}
        {ANGLES.map((a, i) => (
          <line key={i}
            x1={CX} y1={CY}
            x2={CX + RADIUS * Math.cos(a)} y2={CY + RADIUS * Math.sin(a)}
            stroke="rgba(255,255,255,0.07)" strokeWidth="0.6" />
        ))}

        {/* Filled axes for completed domains */}
        {DOMAIN_ORDER.map((domain: Domain, i: number) => {
          const isCompleted = completedDomains.includes(domain)
          const isActive    = activeDomain === domain
          if (!isCompleted && !isActive) return null

          const score  = result?.scores[domain]?.normalized ?? 50
          const fillR  = isCompleted ? RADIUS * (score / 100) : RADIUS * 0.25
          const a      = ANGLES[i]

          return (
            <line key={domain}
              x1={CX} y1={CY}
              x2={CX + fillR * Math.cos(a)} y2={CY + fillR * Math.sin(a)}
              stroke={isActive ? 'rgba(0,51,204,0.7)' : 'rgba(0,51,204,0.45)'}
              strokeWidth={isActive ? 1.5 : 1}
            />
          )
        })}

        {/* Center dot */}
        <circle cx={CX} cy={CY} r="2" fill="rgba(0,51,204,0.8)" />
      </svg>
    </div>
  )
}
