'use client'

import { createContext, useContext, useState, useCallback, useRef, type ReactNode } from 'react'
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
  completeProcessing: () => void
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

  // Refs hold the latest values so callbacks never go stale
  const answersRef      = useRef<Record<string, number>>({})
  const currentIndexRef = useRef(0)
  const resultRef       = useRef<DiagnosticResult | null>(null)

  const startDiagnostic = useCallback(() => {
    answersRef.current      = {}
    currentIndexRef.current = 0
    setPhase('question')
    setCurrentIndex(0)
    setAnswers({})
    setActiveDomain(QUESTIONS[0].domain)
  }, [])

  // Empty deps — reads from refs so it never captures stale state
  const answerQuestion = useCallback((questionId: string, value: number) => {
    const newAnswers = { ...answersRef.current, [questionId]: value }
    answersRef.current = newAnswers
    setAnswers(newAnswers)

    const idx       = currentIndexRef.current
    const nextIndex = idx + 1

    if (nextIndex >= QUESTIONS.length) {
      // All done — compute result and go to processing
      const res = calculateResults(newAnswers)
      resultRef.current = res
      setResult(res)
      setPhase('processing')
      return
    }

    const currentDomain = QUESTIONS[idx].domain
    const nextDomain    = QUESTIONS[nextIndex].domain

    if (nextDomain !== currentDomain) {
      setCompletedDomains(prev => [...prev, currentDomain])
    }

    currentIndexRef.current = nextIndex
    setCurrentIndex(nextIndex)
    setActiveDomain(nextDomain)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const completeProcessing = useCallback(() => {
    setPhase('results-gated')
  }, [])

  const submitEmail = useCallback(async (email: string): Promise<boolean> => {
    const res = resultRef.current
    if (!res) return false
    try {
      const response = await fetch('/api/cmax-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          scores: res.scores,
          cmax:   res.cmax,
          weakest: res.weakest,
          source: sessionStorage.getItem('cmax_source') ?? 'direct',
        }),
      })
      if (response.ok) {
        setPhase('results-unlocked')
        return true
      }
      return false
    } catch {
      return false
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const reset = useCallback(() => {
    answersRef.current      = {}
    currentIndexRef.current = 0
    resultRef.current       = null
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
      startDiagnostic, answerQuestion, completeProcessing, submitEmail, reset,
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
