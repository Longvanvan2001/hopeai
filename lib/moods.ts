export type MoodLevel = 1 | 2 | 3 | 4 | 5

export const MOODS: {
  level: MoodLevel
  label: string
  face: string
  color: string
}[] = [
  { level: 1, label: 'Struggling', face: 'sad', color: 'var(--chart-5)' },
  { level: 2, label: 'Low', face: 'down', color: 'var(--chart-4)' },
  { level: 3, label: 'Okay', face: 'neutral', color: 'var(--chart-3)' },
  { level: 4, label: 'Good', face: 'happy', color: 'var(--chart-2)' },
  { level: 5, label: 'Great', face: 'joyful', color: 'var(--chart-1)' },
]

export function moodByLevel(level: number) {
  return MOODS.find((m) => m.level === level) ?? MOODS[2]
}
