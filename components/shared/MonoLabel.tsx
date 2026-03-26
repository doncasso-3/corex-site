import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  dim?: boolean
  spacing?: string
}

export default function MonoLabel({ children, dim, spacing = '0.2em' }: Props) {
  return (
    <div style={{
      fontFamily: "'IBM Plex Mono', monospace",
      fontSize: '10px', letterSpacing: spacing,
      color: dim ? '#3D3D3D' : '#666666',
      textTransform: 'uppercase',
    }}>
      {children}
    </div>
  )
}
