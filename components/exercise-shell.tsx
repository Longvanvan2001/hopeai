import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export function ExerciseShell({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <main className="mx-auto flex w-full max-w-xl flex-col gap-8 px-6 py-8">
      <Link
        href="/exercises"
        className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ChevronLeft className="size-4" />
        All exercises
      </Link>
      <h1 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
        {title}
      </h1>
      {children}
    </main>
  )
}
