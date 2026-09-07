'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'
import { Logo } from '@/components/logo'
import { cn } from '@/lib/utils'
import { Home, HeartPulse, Wind, MessageCircleHeart, LogOut } from 'lucide-react'

const LINKS = [
  { href: '/dashboard', label: 'Home', icon: Home },
  { href: '/mood', label: 'Mood', icon: HeartPulse },
  { href: '/exercises', label: 'Calm', icon: Wind },
  { href: '/companion', label: 'Companion', icon: MessageCircleHeart },
]

export function AppNav({ name }: { name: string }) {
  const pathname = usePathname()
  const router = useRouter()

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(href + '/')
  }

  async function handleSignOut() {
    await authClient.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-svh w-64 shrink-0 flex-col border-r border-border bg-sidebar px-4 py-6 md:flex">
        <Link href="/dashboard" className="mb-8 flex items-center gap-2.5 px-2">
          <Logo className="size-9" />
          <span className="font-display text-xl font-bold tracking-tight">
            HopeAI
          </span>
        </Link>
        <nav className="flex flex-1 flex-col gap-1">
          {LINKS.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                isActive(href)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
              )}
            >
              <Icon className="size-5" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
          <p className="truncate px-3 text-sm font-medium">{name}</p>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <LogOut className="size-5" />
            Sign out
          </button>
        </div>
      </aside>

      {/* Mobile bottom bar */}
      <nav className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-around border-t border-border bg-sidebar/95 px-2 py-2 backdrop-blur md:hidden">
        {LINKS.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex flex-1 flex-col items-center gap-1 rounded-lg py-1.5 text-xs font-medium transition-colors',
              isActive(href)
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            <Icon className="size-5" />
            {label}
          </Link>
        ))}
        <button
          onClick={handleSignOut}
          className="flex flex-1 flex-col items-center gap-1 rounded-lg py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <LogOut className="size-5" />
          Sign out
        </button>
      </nav>
    </>
  )
}
