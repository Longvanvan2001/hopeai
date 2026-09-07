'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const PHASES = [
  { label: 'Breathe in', seconds: 4 },
  { label: 'Hold', seconds: 4 },
  { label: 'Breathe out', seconds: 4 },
  { label: 'Hold', seconds: 4 },
]

export function BreathingExercise() {
  const [running, setRunning] = useState(false)
  const [phaseIndex, setPhaseIndex] = useState(0)
  const [count, setCount] = useState(PHASES[0].seconds)
  const [cycles, setCycles] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!running) return
    intervalRef.current = setInterval(() => {
      setCount((prev) => {
        if (prev > 1) return prev - 1
        setPhaseIndex((pi) => {
          const next = (pi + 1) % PHASES.length
          if (next === 0) setCycles((c) => c + 1)
          setCount(PHASES[next].seconds)
          return next
        })
        return PHASES[(phaseIndex + 1) % PHASES.length].seconds
      })
    }, 1000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [running, phaseIndex])

  function toggle() {
    if (running) {
      setRunning(false)
    } else {
      setPhaseIndex(0)
      setCount(PHASES[0].seconds)
      setRunning(true)
    }
  }

  function reset() {
    setRunning(false)
    setPhaseIndex(0)
    setCount(PHASES[0].seconds)
    setCycles(0)
  }

  const phase = PHASES[phaseIndex]
  const expanding = phase.label === 'Breathe in'
  const holding = phase.label === 'Hold'
  const scale = running
    ? expanding
      ? 'scale-100'
      : holding
        ? 'scale-90'
        : 'scale-50'
    : 'scale-75'

  return (
    <div className="flex flex-col items-center gap-8 rounded-3xl border border-border bg-card p-8">
      <div className="flex h-64 w-64 items-center justify-center">
        <div
          className={cn(
            'absolute size-56 rounded-full bg-primary/10 transition-transform duration-[4000ms] ease-in-out',
            scale,
          )}
        />
        <div
          className={cn(
            'absolute size-40 rounded-full bg-primary/20 transition-transform duration-[4000ms] ease-in-out',
            scale,
          )}
        />
        <div className="z-10 flex flex-col items-center gap-1 text-center">
          <span className="font-display text-xl font-semibold">
            {running ? phase.label : 'Ready?'}
          </span>
          {running && (
            <span className="text-4xl font-bold tabular-nums text-primary">
              {count}
            </span>
          )}
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        {cycles} {cycles === 1 ? 'round' : 'rounds'} completed
      </p>

      <div className="flex gap-3">
        <Button onClick={toggle} size="lg">
          {running ? 'Pause' : cycles > 0 ? 'Resume' : 'Begin'}
        </Button>
        <Button onClick={reset} size="lg" variant="outline">
          Reset
        </Button>
      </div>
    </div>
  )
}
