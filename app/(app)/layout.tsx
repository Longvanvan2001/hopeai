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
      <div className="flex-1 pb-24 md:pb-8">{children}</div>

      {/* Emergency SOS Button - Shows on all pages */}
      <a
        href="tel:112"
        className="fixed bottom-20 md:bottom-6 right-4 bg-red-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg font-bold text-sm hover:bg-red-700 z-50"
        title="Emergency Call 112"
      >
        SOS
      </a>
    </div>
  )
}