export type Domain =
  | 'attention'
  | 'execution'
  | 'recovery'
  | 'clarity'
  | 'identity'
  | 'load'
  | 'direction'
  | 'discipline'

export interface AnswerOption {
  text: string
  value: 1 | 3 | 5
}

export interface Question {
  id: string
  domain: Domain
  text: string
  options: AnswerOption[]
}

export interface DomainScore {
  domain: Domain
  raw: number
  max: number
  normalized: number
}

export interface DiagnosticResult {
  scores: Record<Domain, DomainScore>
  cmax: number
  classification: Classification
  weakest: Domain
}

export interface Classification {
  label: 'ELITE' | 'OPERATIONAL' | 'FRAGMENTED' | 'REACTIVE' | 'CRITICAL'
  read: string
}

export type DiagnosticPhase =
  | 'hook'
  | 'question'
  | 'processing'
  | 'results-gated'
  | 'results-unlocked'
