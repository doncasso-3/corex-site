import type { Domain } from '@/types/diagnostic'

export const DOMAIN_VERDICTS: Record<Domain, { headline: string; body: string }> = {
  attention: {
    headline: 'ATTENTION OUTPUT',
    body: "Your attention is your most expensive resource — and right now it's leaking. You're spending cognitive capital on context switches, recovery time, and distraction tax. Every interrupted session costs more than the interruption itself. This isn't a willpower problem. It's an architecture problem.",
  },
  execution: {
    headline: 'EXECUTION RATE',
    body: "The gap between what you intend and what you produce is where potential dies. You have the capability — the system to convert it is missing. Tasks stall, projects drift, and the list grows faster than output. Execution is a skill. It can be trained. Right now it's running on improvisation.",
  },
  recovery: {
    headline: 'RECOVERY SPEED',
    body: "You're treating recovery as a reward for finishing — not a requirement for performing. The output degradation you're experiencing is a recovery debt problem. High performers don't push harder when they're depleted. They recover faster. Your system has no real reset protocol.",
  },
  clarity: {
    headline: 'SIGNAL CLARITY',
    body: "Mental noise is a performance tax. Every cycle spent on rumination, second-guessing, or unresolved ambiguity is a cycle not spent on output. Clarity isn't the absence of uncertainty — it's the ability to act cleanly in spite of it. Your signal-to-noise ratio needs work.",
  },
  identity: {
    headline: 'IDENTITY STABILITY',
    body: "Your performance is tied too closely to external conditions — outcomes, feedback, circumstances. When those shift, so does your state. A stable identity doesn't mean ignoring reality. It means your operating baseline doesn't depend on things outside your control. Right now it does.",
  },
  load: {
    headline: 'LOAD CAPACITY',
    body: "You're running at or above system capacity. The cognitive overhead of managing too many open loops is degrading your performance across everything. You're not failing because of effort. You're failing because the architecture can't carry the load you've accepted. Something has to come off the stack.",
  },
  direction: {
    headline: 'DIRECTION LOCK',
    body: "Activity without direction is just movement. You're working hard — but the vector is unclear. Without a locked direction, your effort disperses across whatever is urgent, visible, or in front of you. Hard work on the wrong target is its own kind of failure. You need a single point of orientation.",
  },
  discipline: {
    headline: 'SYSTEM DISCIPLINE',
    body: "Discipline isn't motivation. It's the removal of the decision to act from the emotional state of the moment. Your system still runs on how you feel. When you feel like it, output is high. When you don't, the system degrades. That's not a system — that's managed chaos. The gap between your intentions and your actions is the size of this problem.",
  },
}
