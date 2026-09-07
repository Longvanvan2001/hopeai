'use client'

import { useTransition } from 'react'
import { deleteMood } from '@/app/actions/mood'
import { moodByLevel } from '@/lib/moods'
import { MoodFace } from '@/components/mood-face'
import { Trash2 } from 'lucide-react'

type Entry = {
  id: number
  mood: number
  note: string | null
  createdAt: Date
}

export function MoodHistory({ entries }: { entries: Entry[] }) {
  const [pending, startTransition] = useTransition()

  if (entries.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
        No check-ins yet. Your history will show up here.
      </p>
    )
  }

  return (
    <ul className="flex flex-col gap-3">
      {entries.map((entry) => {
        const mood = moodByLevel(entry.mood)
        return (
          <li
            key={entry.id}
            className="flex items-start gap-4 rounded-2xl border border-border bg-card p-4"
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <MoodFace face={mood.face} className="size-7" />
            </span>
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium">{mood.label}</span>
                <time className="text-xs text-muted-foreground">
                  {new Date(entry.createdAt).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                  })}
                </time>
              </div>
              {entry.note && (
                <p className="text-sm text-muted-foreground text-pretty">
                  {entry.note}
                </p>
              )}
            </div>
            <button
              onClick={() =>
                startTransition(() => deleteMood(entry.id).catch(() => {}))
              }
              disabled={pending}
              aria-label="Delete entry"
              className="shrink-0 rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 className="size-4" />
            </button>
          </li>
        )
      })}
    </ul>
  )
}
