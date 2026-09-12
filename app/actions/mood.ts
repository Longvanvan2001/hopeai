'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { moodEntry } from '@/lib/db/schema'
import { and, desc, eq, gte } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

export async function logMood(mood: number, note: string) {
  const userId = await getUserId()
  if (!Number.isInteger(mood) || mood < 1 || mood > 5) {
    throw new Error('Invalid mood value')
  }
  await db.insert(moodEntry).values({
    userId,
    mood,
    note: note.trim() ? note.trim().slice(0, 1000) : null,
  })
  revalidatePath('/dashboard')
  revalidatePath('/mood')
}

export async function getRecentMoods(days = 30) {
  const userId = await getUserId()
  const since = new Date()
  since.setDate(since.getDate() - days)
  return db
    .select()
    .from(moodEntry)
    .where(and(eq(moodEntry.userId, userId), gte(moodEntry.createdAt, since)))
    .orderBy(desc(moodEntry.createdAt))
}

export async function deleteMood(id: number) {
  const userId = await getUserId()
  await db
    .delete(moodEntry)
    .where(and(eq(moodEntry.id, id), eq(moodEntry.userId, userId)))
  revalidatePath('/mood')
  revalidatePath('/dashboard')
}
