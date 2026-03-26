import type { Domain, DomainScore, DiagnosticResult, Classification } from '@/types/diagnostic'
import { QUESTIONS, DOMAIN_ORDER } from './questions'

export function getClassification(score: number): Classification {
  if (score >= 85) return { label: 'ELITE',       read: 'Your system is running. Most people never get here.' }
  if (score >= 70) return { label: 'OPERATIONAL', read: 'Functional but leaking. Specific gaps are costing you.' }
  if (score >= 55) return { label: 'FRAGMENTED',  read: "Capability is there. The architecture isn't. Running on effort, not system." }
  if (score >= 40) return { label: 'REACTIVE',    read: "You're responsive, not directed. The Default OS is running the show." }
  return             { label: 'CRITICAL',     read: "The system is broken. You're surviving, not operating." }
}

export function calculateResults(answers: Record<string, number>): DiagnosticResult {
  const scores = {} as Record<Domain, DomainScore>

  for (const domain of DOMAIN_ORDER) {
    const domainQuestions = QUESTIONS.filter(q => q.domain === domain)
    const maxPossible = domainQuestions.length * 5
    const raw = domainQuestions.reduce((sum, q) => sum + (answers[q.id] ?? 0), 0)
    const normalized = Math.round((raw / maxPossible) * 100)
    scores[domain] = { domain, raw, max: maxPossible, normalized }
  }

  const cmax = Math.round(
    Object.values(scores).reduce((sum, s) => sum + s.normalized, 0) / DOMAIN_ORDER.length
  )

  const weakest = DOMAIN_ORDER.reduce((min, d) =>
    scores[d].normalized < scores[min].normalized ? d : min
  , DOMAIN_ORDER[0])

  return {
    scores,
    cmax,
    classification: getClassification(cmax),
    weakest,
  }
}
