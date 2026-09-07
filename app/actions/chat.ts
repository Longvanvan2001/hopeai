'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { chatMessage } from '@/lib/db/schema'
import { asc, eq } from 'drizzle-orm'
import { headers } from 'next/headers'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

export async function getChatHistory() {
  const userId = await getUserId()
  return db
    .select()
    .from(chatMessage)
    .where(eq(chatMessage.userId, userId))
    .orderBy(asc(chatMessage.createdAt))
    .limit(200)
}
