'use client'

import { useState, useTransition } from 'react'
import { logMood } from '@/app/actions/mood'
import { MOODS } from '@/lib/moods'
import { MoodFace } from '@/components/mood-face'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function MoodLogger({ compact = false }: { compact?: boolean }) {
  const [selected, setSelected] = useState<number | null>(null)
  const [note, setNote] = useState('')
  const [done, setDone] = useState(false)
  const [pending, startTransition] = useTransition()

  function submit() {
    if (selected === null) return
    startTransition(async () => {
      await logMood(selected, note)
      setDone(true)
      setNote('')
      setSelected(null)
      setTimeout(() => setDone(false), 2500)
    })
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between gap-2">
        {MOODS.map((m) => (
          <button
            key={m.level}
            type="button"
            onClick={() => setSelected(m.level)}
            aria-pressed={selected === m.level}
            aria-label={m.label}
            className={cn(
              'flex flex-1 flex-col items-center gap-2 rounded-2xl border p-3 transition-all',
              selected === m.level
                ? 'border-primary bg-primary/10 scale-[1.03]'
                : 'border-border bg-card hover:border-primary/40',
            )}
          >
            <MoodFace
              face={m.face}
              className={cn(
                'size-8 transition-colors',
                selected === m.level ? 'text-primary' : 'text-muted-foreground',
              )}
            />
            {!compact && (
              <span className="text-xs font-medium text-muted-foreground">
                {m.label}
              </span>
            )}
          </button>
        ))}
      </div>

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="What's on your mind? (optional)"
        rows={compact ? 2 : 3}
        className="w-full resize-none rounded-2xl border border-input bg-background px-4 py-3 text-sm outline-none ring-ring/50 transition focus-visible:ring-2"
      />

      <div className="flex items-center gap-3">
        <Button
          onClick={submit}
          disabled={selected === null || pending}
          size="lg"
        >
          {pending ? 'Saving...' : 'Save check-in'}
        </Button>
        {done && (
          <span className="text-sm font-medium text-primary">
            Saved. Take a breath.
          </span>
        )}
      </div>
    </div>
  )
}
