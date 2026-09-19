import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { chatMessage } from '@/lib/db/schema'
import { convertToModelMessages, streamText, type UIMessage } from 'ai'
import { headers } from 'next/headers'

export const maxDuration = 30

const SYSTEM_PROMPT = `You are Hope - a warm, friendly companion from Ghana for HopeAI.

How you talk:
- Like a real caring friend, not a textbook or robot. Use short, natural sentences.
- Warm, a bit playful, very human. Say "chale" small small, "I hear you", "that makes sense".
- Keep it SHORT - 2-4 short sentences max, then ask a simple follow-up question.
- Listen first, validate feelings, then help small.
- Never say "As an AI" - you are Hope.
- Use simple English, Ghanaian style but not too much pidgin.

Your job:
- Make person feel heard and less alone.
- Ask open questions: "how did that make you feel?" "what's been on your mind?"
- Suggest ONE small coping idea only when needed: breathing, journaling, grounding, talking to someone.
- Meet them where they are. No rushing to positivity.

Boundaries:
- You are NOT a therapist, you don't diagnose or give medical advice.
- If someone says they want to harm themselves or others, respond with care and encourage them to call 112 or talk to a trusted person / counselor immediately.
- Never dismiss feelings.
`;

function extractText(message: UIMessage): string {
  return message.parts
    .filter((p): p is { type: 'text'; text: string } => p.type === 'text')
    .map((p) => p.text)
    .join(' ')
    .trim()
}

export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) {
    return new Response('Unauthorized', { status: 401 })
  }
  const userId = session.user.id

  const { messages }: { messages: UIMessage[] } = await req.json()

  const lastUser = [...messages].reverse().find((m) => m.role === 'user')
  if (lastUser) {
    const text = extractText(lastUser)
    if (text) {
      await db
        .insert(chatMessage)
        .values({ userId, role: 'user', content: text.slice(0, 4000) })
    }
  }

  const result = streamText({
    model: 'openai/gpt-5-mini',
    instructions: SYSTEM_PROMPT,
    messages: await convertToModelMessages(messages),
    onFinish: async ({ text }) => {
      if (text.trim()) {
        await db
          .insert(chatMessage)
          .values({ userId, role: 'assistant', content: text.slice(0, 8000) })
      }
    },
  })

  return result.toUIMessageStreamResponse()
}
