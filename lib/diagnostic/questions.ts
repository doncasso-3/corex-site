import type { Question } from '@/types/diagnostic'

export const QUESTIONS: Question[] = [
  // ATTENTION (4 questions)
  {
    id: 'att-1',
    domain: 'attention',
    text: 'When working on a demanding task, how long can you stay locked in before your focus breaks?',
    options: [
      { text: 'Under 10 minutes — I drift constantly', value: 1 },
      { text: '10–25 minutes with some effort', value: 3 },
      { text: '45+ minutes without conscious effort', value: 5 },
    ],
  },
  {
    id: 'att-2',
    domain: 'attention',
    text: 'You sit down to do deep work. Your phone is across the room. What happens?',
    options: [
      { text: 'I get up and check it within 15 minutes', value: 1 },
      { text: 'I resist but feel the pull the whole time', value: 3 },
      { text: "I forget it exists until I'm done", value: 5 },
    ],
  },
  {
    id: 'att-3',
    domain: 'attention',
    text: 'How often do you finish a work session having done exactly what you planned?',
    options: [
      { text: 'Rarely — I end up on unrelated things', value: 1 },
      { text: 'Sometimes — maybe half the time', value: 3 },
      { text: 'Most of the time — I stay on target', value: 5 },
    ],
  },
  {
    id: 'att-4',
    domain: 'attention',
    text: 'After an interruption, how long does it take you to get back into deep focus?',
    options: [
      { text: '20+ minutes — sometimes I never get back', value: 1 },
      { text: '5–15 minutes with effort', value: 3 },
      { text: 'Under 3 minutes — I re-enter quickly', value: 5 },
    ],
  },

  // EXECUTION (4 questions)
  {
    id: 'exe-1',
    domain: 'execution',
    text: 'You have a task you\'ve been avoiding for 3+ days. What is actually happening?',
    options: [
      { text: "I don't know — it just stays on the list", value: 1 },
      { text: "I know why but can't seem to start", value: 3 },
      { text: 'I would have already broken it down and started', value: 5 },
    ],
  },
  {
    id: 'exe-2',
    domain: 'execution',
    text: 'How do you handle a complex project with no clear next step?',
    options: [
      { text: 'I stall or wait for clarity to arrive', value: 1 },
      { text: 'I eventually figure it out but it takes time', value: 3 },
      { text: 'I manufacture a first action and move', value: 5 },
    ],
  },
  {
    id: 'exe-3',
    domain: 'execution',
    text: 'At the end of a typical day, how much of your intended output actually happened?',
    options: [
      { text: 'Under 40% — reactive all day', value: 1 },
      { text: '40–70% — decent but inconsistent', value: 3 },
      { text: '80%+ — I finish what I start', value: 5 },
    ],
  },
  {
    id: 'exe-4',
    domain: 'execution',
    text: 'When you commit to something personally — a habit, a goal — what typically happens?',
    options: [
      { text: 'It fades within 2 weeks', value: 1 },
      { text: 'I maintain it for a while then drift', value: 3 },
      { text: 'I follow through until I consciously change it', value: 5 },
    ],
  },

  // RECOVERY (3 questions)
  {
    id: 'rec-1',
    domain: 'recovery',
    text: 'After a hard day, what does your evening actually look like?',
    options: [
      { text: 'Scrolling, low-effort content, no real reset', value: 1 },
      { text: 'Some downtime but still wired or restless', value: 3 },
      { text: 'Intentional decompression — I actually recover', value: 5 },
    ],
  },
  {
    id: 'rec-2',
    domain: 'recovery',
    text: 'How do you perform on day 5 of a hard week compared to day 1?',
    options: [
      { text: 'Significantly worse — I run out of fuel', value: 1 },
      { text: 'Somewhat degraded but I push through', value: 3 },
      { text: 'Mostly consistent — I manage my load', value: 5 },
    ],
  },
  {
    id: 'rec-3',
    domain: 'recovery',
    text: 'When you take time off, what happens to your mind?',
    options: [
      { text: "I can't fully disconnect — work thoughts persist", value: 1 },
      { text: 'I partially disconnect after a day or two', value: 3 },
      { text: 'I switch off cleanly and come back sharper', value: 5 },
    ],
  },

  // CLARITY (3 questions)
  {
    id: 'cla-1',
    domain: 'clarity',
    text: 'If someone asked you right now: what is the single most important thing you\'re working toward — how would you answer?',
    options: [
      { text: "I'd hesitate — it's not that clear", value: 1 },
      { text: "I have a rough answer but it's not sharp", value: 3 },
      { text: 'One sentence, no hesitation', value: 5 },
    ],
  },
  {
    id: 'cla-2',
    domain: 'clarity',
    text: 'When you make a major decision, what does your process look like?',
    options: [
      { text: 'Mostly gut feeling, anxiety, or delay', value: 1 },
      { text: 'I weigh things but often second-guess myself', value: 3 },
      { text: 'Clear criteria, low regret, I commit fast', value: 5 },
    ],
  },
  {
    id: 'cla-3',
    domain: 'clarity',
    text: 'How often does mental noise — anxiety, overthinking, rumination — interfere with your output?',
    options: [
      { text: 'Daily — it costs me real time', value: 1 },
      { text: 'A few times a week, manageable', value: 3 },
      { text: 'Rarely — I notice it but it doesn\'t run me', value: 5 },
    ],
  },

  // IDENTITY (3 questions)
  {
    id: 'ide-1',
    domain: 'identity',
    text: 'When your performance drops — a bad week, a failure — what is your internal narrative?',
    options: [
      { text: 'I spiral or take it as evidence of something deeper', value: 1 },
      { text: 'I recover but it takes longer than it should', value: 3 },
      { text: 'I diagnose it, adjust, and move — no spiral', value: 5 },
    ],
  },
  {
    id: 'ide-2',
    domain: 'identity',
    text: 'How much does external validation — praise, metrics, other people\'s opinions — affect your daily motivation?',
    options: [
      { text: "A lot — I track it and it affects my state", value: 1 },
      { text: 'Some — I prefer approval but function without it', value: 3 },
      { text: 'Minimal — I operate from internal standards', value: 5 },
    ],
  },
  {
    id: 'ide-3',
    domain: 'identity',
    text: 'In high-pressure situations — a pitch, a confrontation, a deadline — how do you show up?',
    options: [
      { text: 'I contract — I become less than my best', value: 1 },
      { text: 'Variable — sometimes on, sometimes off', value: 3 },
      { text: 'I tend to elevate — pressure is a signal', value: 5 },
    ],
  },

  // LOAD (4 questions)
  {
    id: 'loa-1',
    domain: 'load',
    text: 'How many active commitments — projects, responsibilities, obligations — are you currently running?',
    options: [
      { text: 'Too many — I\'ve lost count', value: 1 },
      { text: 'More than I\'d like but I\'m managing', value: 3 },
      { text: 'Exactly what I can execute well', value: 5 },
    ],
  },
  {
    id: 'loa-2',
    domain: 'load',
    text: 'When a new opportunity appears, what is your default response?',
    options: [
      { text: 'I say yes and figure out how to fit it in', value: 1 },
      { text: 'I hesitate but usually end up saying yes', value: 3 },
      { text: 'I evaluate against current capacity and often decline', value: 5 },
    ],
  },
  {
    id: 'loa-3',
    domain: 'load',
    text: 'How would you describe your cognitive state at 3pm on a typical workday?',
    options: [
      { text: 'Depleted — running on fumes', value: 1 },
      { text: 'Tired but functional', value: 3 },
      { text: 'Still sharp — I manage my energy well', value: 5 },
    ],
  },
  {
    id: 'loa-4',
    domain: 'load',
    text: 'How often do things fall through the cracks because you\'re carrying too much?',
    options: [
      { text: 'Regularly — it creates real problems', value: 1 },
      { text: 'Occasionally — minor things slip', value: 3 },
      { text: 'Rarely — my system handles the load', value: 5 },
    ],
  },

  // DIRECTION (4 questions)
  {
    id: 'dir-1',
    domain: 'direction',
    text: 'When you sit down to work in the morning, how do you decide what to do first?',
    options: [
      { text: 'I respond to whatever is most urgent or loudest', value: 1 },
      { text: 'I have a rough plan but often deviate', value: 3 },
      { text: 'I follow a pre-set priority system', value: 5 },
    ],
  },
  {
    id: 'dir-2',
    domain: 'direction',
    text: 'Looking at the last 90 days — are you closer to what matters most to you?',
    options: [
      { text: "Hard to say — I've been busy but not sure on what", value: 1 },
      { text: 'Somewhat — some progress, some drift', value: 3 },
      { text: 'Yes — I can trace the movement directly', value: 5 },
    ],
  },
  {
    id: 'dir-3',
    domain: 'direction',
    text: 'How often do you feel like you\'re working hard but not getting anywhere meaningful?',
    options: [
      { text: 'Often — high effort, unclear return', value: 1 },
      { text: 'Sometimes — certain weeks feel wasted', value: 3 },
      { text: 'Rarely — my effort connects to direction', value: 5 },
    ],
  },
  {
    id: 'dir-4',
    domain: 'direction',
    text: 'Do you have a 12-month target that shapes your daily decisions?',
    options: [
      { text: 'No — I operate month to month at best', value: 1 },
      { text: 'Loosely — something in mind but not guiding', value: 3 },
      { text: 'Yes — it filters what I say yes and no to', value: 5 },
    ],
  },

  // DISCIPLINE (3 questions)
  {
    id: 'dis-1',
    domain: 'discipline',
    text: 'How consistent are your non-negotiable daily behaviors — sleep, movement, nutrition?',
    options: [
      { text: 'Inconsistent — they shift based on mood or schedule', value: 1 },
      { text: 'Mostly consistent with regular gaps', value: 3 },
      { text: 'Locked in — they run regardless of how I feel', value: 5 },
    ],
  },
  {
    id: 'dis-2',
    domain: 'discipline',
    text: 'When you don\'t feel like doing the work — low energy, low motivation — what happens?',
    options: [
      { text: 'I usually skip it or do a low-effort version', value: 1 },
      { text: 'I push through sometimes, not always', value: 3 },
      { text: 'I do it anyway — feeling is not a gating condition', value: 5 },
    ],
  },
  {
    id: 'dis-3',
    domain: 'discipline',
    text: 'How would you describe the relationship between your intentions and your actions over the last 30 days?',
    options: [
      { text: 'Large gap — I intend more than I do', value: 1 },
      { text: 'Medium gap — close but not tight', value: 3 },
      { text: 'Tight — I execute close to what I commit to', value: 5 },
    ],
  },
]

export const DOMAIN_LABELS: Record<string, string> = {
  attention:  'ATTENTION OUTPUT',
  execution:  'EXECUTION RATE',
  recovery:   'RECOVERY SPEED',
  clarity:    'SIGNAL CLARITY',
  identity:   'IDENTITY STABILITY',
  load:       'LOAD CAPACITY',
  direction:  'DIRECTION LOCK',
  discipline: 'SYSTEM DISCIPLINE',
}

export const DOMAIN_ORDER = [
  'attention',
  'execution',
  'recovery',
  'clarity',
  'identity',
  'load',
  'direction',
  'discipline',
] as const
