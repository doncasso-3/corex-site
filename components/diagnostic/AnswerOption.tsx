'use client'

import { useState } from 'react'

interface Props {
  text: string
  value: 1 | 3 | 5
  onSelect: (value: number) => void
  visible: boolean
}

export default function AnswerOption({ text, value, onSelect, visible }: Props) {
  const [selected, setSelected] = useState(false)
  const [hovered,  setHovered]  = useState(false)

  const handleClick = () => {
    if (selected) return
    setSelected(true)
    setTimeout(() => onSelect(value), 300)
  }

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: selected
          ? '1px solid #0033CC'
          : hovered
          ? '1px solid rgba(255,255,255,0.2)'
          : '1px solid #1A1A1A',
        background: selected ? 'rgba(0,51,204,0.04)' : 'transparent',
        borderRadius: '2px',
        padding: '18px 24px',
        cursor: selected ? 'default' : 'pointer',
        fontFamily: "'Inter', sans-serif",
        fontWeight: 300,
        fontSize: '16px',
        color: selected ? '#FFFFFF' : '#CCCCCC',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(8px)',
        transition: 'opacity 200ms ease-out, transform 200ms ease-out, border-color 150ms ease-out, background 150ms ease-out',
        userSelect: 'none',
      }}
    >
      {text}
    </div>
  )
}
