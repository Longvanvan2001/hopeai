import { cn } from '@/lib/utils'

// A gentle heart-in-hand mark: cupped hand cradling a heart, for a
// supportive mental-health feel.
export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'flex items-center justify-center rounded-2xl bg-primary text-primary-foreground',
        className,
      )}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="size-[62%]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 20.5c-4.5-2.6-7-5.4-7-8.4a3.2 3.2 0 0 1 5.7-2 3.2 3.2 0 0 1 5.7 2c0 .5-.07 1-.2 1.4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17.5 14.5v4M15.5 16.5h4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}
