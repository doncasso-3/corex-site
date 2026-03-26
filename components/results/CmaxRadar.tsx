'use client'

import { DOMAIN_ORDER } from '@/lib/diagnostic/questions'
import type { DiagnosticResult } from '@/types/diagnostic'

interface Props {
  result: DiagnosticResult
  revealed: boolean      // false = gated (dim labels, zero fill)
  revealIndex?: number   // stagger axes in one-by-one on unlock
}

const SHORT_LABELS: Record<string, string> = {
  attention:  'ATTENTION',
  execution:  'EXECUTION',
  recovery:   'RECOVERY',
  clarity:    'CLARITY',
  identity:   'IDENTITY',
  load:       'LOAD',
  direction:  'DIRECTION',
  discipline: 'DISCIPLINE',
}

const SIZE         = 280
const CX           = SIZE / 2
const CY           = SIZE / 2
const RADIUS       = 98
const LABEL_OFFSET = RADIUS + 20
const RINGS        = [RADIUS * 0.33, RADIUS * 0.66, RADIUS]
const ANGLES       = DOMAIN_ORDER.map((_, i) => ((i * 45 - 90) * Math.PI) / 180)

function oct(r: number) {
  return ANGLES.map(a => `${CX + r * Math.cos(a)},${CY + r * Math.sin(a)}`).join(' ')
}

export default function CmaxRadar({ result, revealed, revealIndex = 8 }: Props) {
  // Build polygon points — only include axes that have been revealed
  const polyPoints = DOMAIN_ORDER.map((d, i) => {
    const score = revealed && i < revealIndex ? (result.scores[d]?.normalized ?? 0) : 0
    const r     = RADIUS * (score / 100)
    return `${CX + r * Math.cos(ANGLES[i])},${CY + r * Math.sin(ANGLES[i])}`
  }).join(' ')

  return (
    <svg width="100%" height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
      {/* Grid rings */}
      {RINGS.map(r => (
        <polygon key={r} points={oct(r)}
          fill="none" stroke="#1A1A1A" strokeWidth="1" />
      ))}

      {/* Axis spokes */}
      {ANGLES.map((a, i) => (
        <line key={i}
          x1={CX} y1={CY}
          x2={CX + RADIUS * Math.cos(a)}
          y2={CY + RADIUS * Math.sin(a)}
          stroke="#1A1A1A" strokeWidth="0.8"
        />
      ))}

      {/* Score fill */}
      <polygon points={polyPoints}
        fill="rgba(0,51,204,0.10)" stroke="#0033CC" strokeWidth="1"
        style={{ transition: 'all 300ms ease-out' }}
      />

      {/* Center dot */}
      <circle cx={CX} cy={CY} r="2.5" fill="rgba(0,51,204,0.7)" />

      {/* Axis labels — dim when gated, bright as each axis reveals */}
      {DOMAIN_ORDER.map((domain, i) => {
        const a       = ANGLES[i]
        const lx      = CX + LABEL_OFFSET * Math.cos(a)
        const ly      = CY + LABEL_OFFSET * Math.sin(a)
        const visible = revealed && i < revealIndex
        return (
          <text key={domain}
            x={lx} y={ly}
            textAnchor="middle" dominantBaseline="central"
            style={{
              fontFamily:   "'IBM Plex Mono', monospace",
              fontSize:     '8px',
              letterSpacing:'0.1em',
              fill:          visible ? '#666666' : '#2A2A2A',
              transition:   `fill 300ms ease-out ${i * 80}ms`,
            }}>
            {SHORT_LABELS[domain]}
          </text>
        )
      })}

      {/* Score dots — appear as each axis is revealed */}
      {revealed && DOMAIN_ORDER.map((d, i) => {
        if (i >= revealIndex) return null
        const score = result.scores[d]?.normalized ?? 0
        const r     = RADIUS * (score / 100)
        if (r < 1) return null
        return (
          <circle key={d}
            cx={CX + r * Math.cos(ANGLES[i])}
            cy={CY + r * Math.sin(ANGLES[i])}
            r="2.5" fill="#0033CC"
            style={{ opacity: 1, transition: `opacity 300ms ease-out ${i * 80}ms` }}
          />
        )
      })}
    </svg>
  )
}
