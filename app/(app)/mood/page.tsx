import { getRecentMoods } from '@/app/actions/mood'
import { PageHeader } from '@/components/page-header'
import { MoodLogger } from '@/components/mood-logger'
import { MoodChart } from '@/components/mood-chart'
import { MoodHistory } from '@/components/mood-history'

export default async function MoodPage() {
  const entries = await getRecentMoods(30)

  const chartData = [...entries]
    .reverse()
    .map((e) => ({
      date: new Date(e.createdAt).toISOString(),
      label: new Date(e.createdAt).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
      }),
      mood: e.mood,
    }))

  const average =
    entries.length > 0
      ? (entries.reduce((sum, e) => sum + e.mood, 0) / entries.length).toFixed(1)
      : '—'

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col gap-8 px-6 py-8">
      <PageHeader
        title="Mood tracker"
        subtitle="Check in with how you're feeling and notice your patterns."
      />

      <section className="rounded-3xl border border-border bg-card p-6">
        <h2 className="mb-4 font-display text-lg font-semibold">
          How are you right now?
        </h2>
        <MoodLogger />
      </section>

      <section className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold">Last 30 days</h2>
          <span className="text-sm text-muted-foreground">
            Avg{' '}
            <span className="font-semibold text-foreground">{average}</span> / 5
          </span>
        </div>
        <MoodChart data={chartData} />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-display text-lg font-semibold">History</h2>
        <MoodHistory entries={entries} />
      </section>
    </main>
  )
}
