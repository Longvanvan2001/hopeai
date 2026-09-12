import { cn } from '@/lib/utils'

// Simple line-drawn faces for the five mood levels.
const MOUTHS: Record<string, string> = {
  sad: 'M8.5 16c1-1.6 2.2-2.4 3.5-2.4S14.5 14.4 15.5 16',
  down: 'M8.5 15.2c1-.9 2.2-1.4 3.5-1.4s2.5.5 3.5 1.4',
  neutral: 'M9 15h6',
  happy: 'M8.5 14.2c1 1.2 2.2 1.8 3.5 1.8s2.5-.6 3.5-1.8',
  joyful: 'M8 13.5c1 1.8 2.4 2.7 4 2.7s3-.9 4-2.7',
}

export function MoodFace({
  face,
  className,
}: {
  face: string
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn('size-8', className)}
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="9.5"
        stroke="currentColor"
        strokeWidth="1.6"
        opacity={0.35}
      />
      <circle cx="9" cy="10" r="1.1" fill="currentColor" />
      <circle cx="15" cy="10" r="1.1" fill="currentColor" />
      <path
        d={MOUTHS[face] ?? MOUTHS.neutral}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}
