import Link from 'next/link'
import { PageHeader } from '@/components/page-header'
import { Wind, Hand, Timer, NotebookPen } from 'lucide-react'

const EXERCISES = [
  {
    href: '/exercises/breathing',
    icon: Wind,
    title: 'Guided breathing',
    body: 'Follow a calming box-breathing rhythm to settle your body.',
    minutes: '2-5 min',
  },
  {
    href: '/exercises/grounding',
    icon: Hand,
    title: 'Grounding (5-4-3-2-1)',
    body: 'Use your senses to come back to the present moment.',
    minutes: '3-5 min',
  },
  {
    href: '/exercises/meditation',
    icon: Timer,
    title: 'Meditation timer',
    body: 'Sit quietly with a gentle timer and soft chime.',
    minutes: 'You choose',
  },
  {
    href: '/exercises/gratitude',
    icon: NotebookPen,
    title: 'Gratitude journal',
    body: 'Note small good things to shift your perspective.',
    minutes: '2-3 min',
  },
]

export default function ExercisesPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-6 py-8">
      <PageHeader
        title="Calming exercises"
        subtitle="Take a few minutes for yourself. Pick whatever feels right."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {EXERCISES.map(({ href, icon: Icon, title, body, minutes }) => (
          <Link
            key={href}
            href={href}
            className="group flex flex-col gap-3 rounded-3xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-sm"
          >
            <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/12 text-primary transition-transform group-hover:scale-105">
              <Icon className="size-6" />
            </span>
            <div className="flex flex-col gap-1">
              <h2 className="font-display text-lg font-semibold">{title}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
                {body}
              </p>
            </div>
            <span className="mt-auto text-xs font-medium text-primary">
              {minutes}
            </span>
          </Link>
        ))}
      </div>
    </main>
  )
}
