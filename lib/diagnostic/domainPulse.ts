import type { Domain } from '@/types/diagnostic'

export interface PulseConfig {
  pattern: 'scatter' | 'linear' | 'breathe' | 'static' | 'drift' | 'compress' | 'scanline' | 'gridpulse'
  speed: 'fast' | 'medium' | 'slow'
  density: 'low' | 'medium' | 'high'
}

export const domainPulse: Record<Domain, PulseConfig> = {
  attention:  { pattern: 'scatter',   speed: 'fast',   density: 'medium' },
  execution:  { pattern: 'linear',    speed: 'medium', density: 'low'    },
  recovery:   { pattern: 'breathe',   speed: 'slow',   density: 'medium' },
  clarity:    { pattern: 'static',    speed: 'fast',   density: 'high'   },
  identity:   { pattern: 'drift',     speed: 'slow',   density: 'low'    },
  load:       { pattern: 'compress',  speed: 'medium', density: 'high'   },
  direction:  { pattern: 'scanline',  speed: 'slow',   density: 'low'    },
  discipline: { pattern: 'gridpulse', speed: 'medium', density: 'medium' },
}

export const SPEED_MS: Record<PulseConfig['speed'], number> = {
  fast:   3000,
  medium: 5000,
  slow:   8000,
}
