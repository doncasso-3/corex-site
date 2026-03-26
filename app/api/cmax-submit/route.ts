import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, scores, cmax, weakest, source } = body

    if (!email || !scores || cmax === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // ── Supabase write ──────────────────────────────────────────────
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { error: dbError } = await supabase
      .from('cmax_submissions')
      .upsert({
        email,
        source: source ?? 'direct',
        score_attention:  scores.attention?.normalized  ?? 0,
        score_execution:  scores.execution?.normalized  ?? 0,
        score_recovery:   scores.recovery?.normalized   ?? 0,
        score_clarity:    scores.clarity?.normalized    ?? 0,
        score_identity:   scores.identity?.normalized   ?? 0,
        score_load:       scores.load?.normalized       ?? 0,
        score_direction:  scores.direction?.normalized  ?? 0,
        score_discipline: scores.discipline?.normalized ?? 0,
        cmax_score:       cmax,
        weakest_domain:   weakest,
      }, { onConflict: 'email' })

    if (dbError) {
      console.error('[cmax-submit] Supabase error:', dbError.message)
      // Don't block results on DB failure
    }

    // ── Kit (ConvertKit) API v4 ─────────────────────────────────────
    try {
      const kitRes = await fetch('https://api.kit.com/v4/subscribers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Kit-Api-Key': process.env.KIT_API_KEY!,
        },
        body: JSON.stringify({
          email_address: email,
          state: 'active',
          fields: {
            cmax_score:    String(cmax),
            weakest_domain: weakest,
            source:        source ?? 'direct',
          },
        }),
      })

      if (kitRes.ok) {
        // Add to form/sequence
        await fetch(`https://api.kit.com/v4/forms/${process.env.KIT_FORM_ID}/subscribers`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Kit-Api-Key': process.env.KIT_API_KEY!,
          },
          body: JSON.stringify({ email_address: email }),
        })
      }
    } catch (kitErr) {
      console.error('[cmax-submit] Kit error:', kitErr)
      // Silent — never block results on email provider failure
    }

    return NextResponse.json({ ok: true }, { status: 200 })
  } catch (err) {
    console.error('[cmax-submit] Unexpected error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
