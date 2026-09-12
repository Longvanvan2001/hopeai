'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { gratitudeEntry } from '@/lib/db/schema'
import { and, desc, eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

export async function addGratitude(content: string) {
  const userId = await getUserId()
  const trimmed = content.trim()
  if (!trimmed) throw new Error('Entry cannot be empty')
  await db.insert(gratitudeEntry).values({
    userId,
    content: trimmed.slice(0, 500),
  })
  revalidatePath('/exercises/gratitude')
}

export async function getGratitude() {
  const userId = await getUserId()
  return db
    .select()
    .from(gratitudeEntry)
    .where(eq(gratitudeEntry.userId, userId))
    .orderBy(desc(gratitudeEntry.createdAt))
    .limit(50)
}

export async function deleteGratitude(id: number) {
  const userId = await getUserId()
  await db
    .delete(gratitudeEntry)
    .where(and(eq(gratitudeEntry.id, id), eq(gratitudeEntry.userId, userId)))
  revalidatePath('/exercises/gratitude')
}
