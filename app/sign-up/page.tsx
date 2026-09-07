import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import Link from 'next/link'
import { auth } from '@/lib/auth'
import { AuthForm } from '@/components/auth-form'
import { Logo } from '@/components/logo'

export default async function SignUpPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (session?.user) redirect('/dashboard')

  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-8 px-6 py-12">
      <Link href="/" className="flex items-center gap-2.5">
        <Logo className="size-9" />
        <span className="font-display text-2xl font-bold tracking-tight">
          HopeAI
        </span>
      </Link>
      <div className="w-full max-w-sm rounded-3xl border border-border bg-card p-7 shadow-sm">
        <div className="mb-6 flex flex-col gap-1.5 text-center">
          <h1 className="font-display text-2xl font-bold">
            Start feeling lighter
          </h1>
          <p className="text-sm text-muted-foreground text-pretty">
            Create a free account to track your mood and talk things through.
          </p>
        </div>
        <AuthForm mode="sign-up" />
      </div>
    </main>
  )
}
