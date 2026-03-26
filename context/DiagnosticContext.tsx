'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { Domain, DiagnosticResult, DiagnosticPhase } from '@/types/diagnostic'
import { QUESTIONS } from '@/lib/diagnostic/questions'
import { calculateResults } from '@/lib/diagnostic/scoring'

interface DiagnosticState {
  phase: DiagnosticPhase
  currentIndex: number
  answers: Record<string, number>
  activeDomain: Domain | null
  result: DiagnosticResult | null
  completedDomains: Domain[]
}

interface DiagnosticActions {
  startDiagnostic: () => void
  answerQuestion: (questionId: string, value: number) => void
  submitEmail: (email: string) => Promise<boolean>
  reset: () => void
}

type DiagnosticContextValue = DiagnosticState & DiagnosticActions

const DiagnosticContext = createContext<DiagnosticContextValue | null>(null)

export function DiagnosticProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase]                       = useState<DiagnosticPhase>('hook')
  const [currentIndex, setCurrentIndex]         = useState(0)
  const [answers, setAnswers]                   = useState<Record<string, number>>({})
  const [activeDomain, setActiveDomain]         = useState<Domain | null>(null)
  const [result, setResult]                     = useState<DiagnosticResult | null>(null)
  const [completedDomains, setCompletedDomains] = useState<Domain[]>([])

  const startDiagnostic = useCallback(() => {
    setPhase('question')
    setCurrentIndex(0)
    setActiveDomain(QUESTIONS[0].domain)
  }, [])

  const answerQuestion = useCallback((questionId: string, value: number) => {
    const newAnswers = { ...answers, [questionId]: value }
    setAnswers(newAnswers)

    const nextIndex = currentIndex + 1

    if (nextIndex >= QUESTIONS.length) {
      // All done — go to processing
      const res = calculateResults(newAnswers)
      setResult(res)
      setPhase('processing')
      return
    }

    const currentDomain = QUESTIONS[currentIndex].domain
    const nextDomain    = QUESTIONS[nextIndex].domain

    if (nextDomain !== currentDomain) {
      // Domain boundary — mark current domain complete
      setCompletedDomains(prev => [...prev, currentDomain])
    }

    setCurrentIndex(nextIndex)
    setActiveDomain(nextDomain)
  }, [answers, currentIndex])

  const submitEmail = useCallback(async (email: string): Promise<boolean> => {
    if (!result) return false
    try {
      const res = await fetch('/api/cmax-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          scores: result.scores,
          cmax: result.cmax,
          weakest: result.weakest,
          source: sessionStorage.getItem('cmax_source') ?? 'direct',
        }),
      })
      if (res.ok) {
        setPhase('results-unlocked')
        return true
      }
      return false
    } catch {
      return false
    }
  }, [result])

  const reset = useCallback(() => {
    setPhase('hook')
    setCurrentIndex(0)
    setAnswers({})
    setActiveDomain(null)
    setResult(null)
    setCompletedDomains([])
  }, [])

  return (
    <DiagnosticContext.Provider value={{
      phase, currentIndex, answers, activeDomain, result, completedDomains,
      startDiagnostic, answerQuestion, submitEmail, reset,
    }}>
      {children}
    </DiagnosticContext.Provider>
  )
}

export function useDiagnostic() {
  const ctx = useContext(DiagnosticContext)
  if (!ctx) throw new Error('useDiagnostic must be used within DiagnosticProvider')
  return ctx
}
