interface Props {
  status: string
  pulse?: boolean
  color?: string
  size?: string
}

export default function SystemIndicator({ status, pulse, color = '#666666', size = '10px' }: Props) {
  return (
    <div style={{
      fontFamily: "'IBM Plex Mono', monospace",
      fontSize: size, letterSpacing: '0.2em',
      color, textTransform: 'uppercase',
      animation: pulse ? 'idlePulse 2.4s ease-in-out infinite' : 'none',
    }}>
      ● {status}
    </div>
  )
}
