import Link from 'next/link'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { HeartPulse, Wind, MessageCircleHeart, Sparkles } from 'lucide-react'

const FEATURES = [
  {
    icon: HeartPulse,
    title: 'Mood tracking',
    body: 'Check in daily and watch gentle patterns emerge over time — no judgment, just awareness.',
  },
  {
    icon: Wind,
    title: 'Calming exercises',
    body: 'Guided breathing, 5-4-3-2-1 grounding, a meditation timer, and a gratitude journal.',
  },
  {
    icon: MessageCircleHeart,
    title: 'AI companion',
    body: 'Talk things through anytime with a warm, always-available companion that listens.',
  },
]

export default async function LandingPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (session?.user) redirect('/dashboard')

  return (
    <div className="flex min-h-svh flex-col">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-2.5">
          <Logo className="size-9" />
          <span className="font-display text-xl font-bold tracking-tight">
            HopeAI
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost">
            <Link href="/sign-in">Sign in</Link>
          </Button>
          <Button asChild>
            <Link href="/sign-up">Get started</Link>
          </Button>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6">
        <section className="flex flex-col items-center gap-6 py-16 text-center md:py-24">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground">
            <Sparkles className="size-4 text-primary" />
            Your gentle mental health companion
          </span>
          <h1 className="max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight text-balance md:text-6xl">
            A calmer mind, one small check-in at a time
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground text-pretty">
            HopeAI helps you understand your feelings, find calm in hard
            moments, and feel a little lighter every day.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="text-base">
              <Link href="/sign-up">Start for free</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-base">
              <Link href="/sign-in">I have an account</Link>
            </Button>
          </div>
        </section>

        <section className="grid gap-5 pb-20 md:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="flex flex-col gap-3 rounded-3xl border border-border bg-card p-7"
            >
              <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                <Icon className="size-6" />
              </span>
              <h2 className="font-display text-xl font-semibold">{title}</h2>
              <p className="leading-relaxed text-muted-foreground text-pretty">
                {body}
              </p>
            </div>
          ))}
        </section>
      </main>

      {/* PRICING - MONEY MAKING */}
      <section className="py-16 text-center bg-gray-50 mx-4 rounded-2xl my-8">
        <h2 className="text-3xl font-bold mb-4">Support HopeAI 💙</h2>
        <p className="mb-6 text-gray-600">Help keep mental health free for Ghana</p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <div className="border p-6 rounded-xl bg-white">
            <h3 className="font-bold">Free</h3>
            <p className="text-sm">$0/month</p>
            <p className="text-xs">10 chats/day</p>
          </div>
          <div className="border-2 border-blue-600 p-6 rounded-xl bg-blue-50">
            <h3 className="font-bold">Premium - $5/mo</h3>
            <p className="text-sm">Unlimited chats + voice</p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-full mt-3">Subscribe</button>
          </div>
        </div>
      </section>

      <footer className="mx-auto w-full max-w-6xl px-6 py-8 text-sm text-muted-foreground">
        <p className="text-pretty">
          HopeAI offers support and reflection, not medical care. In a crisis,
          call or text 112 (Ghana) or your local emergency number.
        </p>
      </footer>
  )
}
