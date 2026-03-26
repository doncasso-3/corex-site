'use client'

import { useState, useEffect, useCallback } from 'react'
import { useDiagnostic } from '@/context/DiagnosticContext'
import { QUESTIONS, DOMAIN_LABELS } from '@/lib/diagnostic/questions'
import AnswerOption from './AnswerOption'

export default function QuestionCard() {
  const { currentIndex, answerQuestion } = useDiagnostic()
  const question = QUESTIONS[currentIndex]

  const [displayText,    setDisplayText]    = useState('')
  const [typingDone,     setTypingDone]     = useState(false)
  const [visibleAnswers, setVisibleAnswers] = useState(0)
  const [answered,       setAnswered]       = useState(false)

  const domainQs    = QUESTIONS.filter(q => q.domain === question.domain)
  const domainIndex = domainQs.findIndex(q => q.id === question.id)
  const domainLabel = DOMAIN_LABELS[question.domain]

  // Reset + type in on question change
  useEffect(() => {
    setDisplayText('')
    setTypingDone(false)
    setVisibleAnswers(0)
    setAnswered(false)

    let i = 0
    let active = true
    const text = question.text

    const typeNext = () => {
      if (!active) return
      if (i <= text.length) {
        setDisplayText(text.slice(0, i))
        i++
        setTimeout(typeNext, 40)
      } else {
        setTypingDone(true)
      }
    }

    const t = setTimeout(typeNext, 120)
    return () => { active = false; clearTimeout(t) }
  }, [question.id]) // eslint-disable-line react-hooks/exhaustive-deps

  // Stagger answers after typing completes
  useEffect(() => {
    if (!typingDone) return
    let count = 0
    let active = true

    const stagger = () => {
      if (!active) return
      if (count < question.options.length) {
        count++
        setVisibleAnswers(count)
        setTimeout(stagger, 80)
      }
    }
    const t = setTimeout(stagger, 80)
    return () => { active = false; clearTimeout(t) }
  }, [typingDone, question.options.length])

  const handleAnswer = useCallback((value: number) => {
    if (answered) return
    setAnswered(true)
    setTimeout(() => answerQuestion(question.id, value), 150)
  }, [answered, question.id, answerQuestion])

  return (
    <div style={{ maxWidth: '600px', width: '100%', padding: '0 24px' }}>

      {/* Domain label + question position */}
      <div style={{
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: '10px', letterSpacing: '0.2em',
        color: '#666666', textTransform: 'uppercase',
        marginBottom: '32px',
      }}>
        {domainLabel} — QUESTION {domainIndex + 1} OF {domainQs.length}
      </div>

      {/* Typing question */}
      <div style={{
        fontFamily: "'Inter', sans-serif",
        fontWeight: 300, fontSize: '22px',
        color: '#FFFFFF', lineHeight: 1.5,
        letterSpacing: '-0.01em',
        minHeight: '110px', marginBottom: '48px',
      }}>
        &ldquo;{displayText}&rdquo;
        {!typingDone && (
          <span style={{
            display: 'inline-block', width: '2px', height: '1em',
            background: '#FFFFFF', marginLeft: '2px',
            verticalAlign: 'text-bottom',
            animation: 'cursorBlink 0.65s step-end infinite',
          }} />
        )}
      </div>

      {/* Answer options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {question.options.map((opt, i) => (
          <AnswerOption
            key={`${question.id}-${i}`}
            text={opt.text}
            value={opt.value}
            onSelect={handleAnswer}
            visible={i < visibleAnswers}
          />
        ))}
      </div>

      <style>{`
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </div>
  )
}
