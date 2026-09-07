import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { AppNav } from '@/components/app-nav'

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect('/sign-in')

  return (
    <div className="flex min-h-svh bg-background">
      <AppNav name={session.user.name} />
      <div className="flex-1 pb-24 md:pb-0">{children}</div>
    </div>
  )
}
