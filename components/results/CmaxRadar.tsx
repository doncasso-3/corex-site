'use client'

import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis,
  ResponsiveContainer, type PolarAngleAxisProps,
} from 'recharts'
import { DOMAIN_ORDER, DOMAIN_LABELS } from '@/lib/diagnostic/questions'
import type { DiagnosticResult } from '@/types/diagnostic'

interface Props {
  result: DiagnosticResult
  revealed: boolean        // false = gated (no score labels), true = unlocked
  revealIndex?: number     // animate axes in one by one when revealing
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTick(props: any) {
  const { x, y, payload } = props
  return (
    <text x={x} y={y} textAnchor="middle" dominantBaseline="central"
      style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '9px',
               letterSpacing: '0.15em', fill: '#666666' }}>
      {payload.value}
    </text>
  )
}

export default function CmaxRadar({ result, revealed, revealIndex = 8 }: Props) {
  const data = DOMAIN_ORDER.map((domain, i) => ({
    subject: SHORT_LABELS[domain],
    value: revealed && i < revealIndex ? result.scores[domain]?.normalized ?? 0 : 0,
    fullMark: 100,
  }))

  return (
    <ResponsiveContainer width="100%" height={280}>
      <RadarChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <PolarGrid stroke="#1A1A1A" />
        <PolarAngleAxis
          dataKey="subject"
          tick={CustomTick as PolarAngleAxisProps['tick']}
        />
        <Radar
          name="C-MAX"
          dataKey="value"
          stroke="#0033CC"
          fill="#0033CC"
          fillOpacity={0.1}
          strokeWidth={1}
        />
      </RadarChart>
    </ResponsiveContainer>
  )
}
