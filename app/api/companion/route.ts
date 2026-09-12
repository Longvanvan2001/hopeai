import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { chatMessage } from '@/lib/db/schema'
import { convertToModelMessages, streamText, type UIMessage } from 'ai'
import { headers } from 'next/headers'

export const maxDuration = 30

const SYSTEM_PROMPT = `You are HopeAI, a warm, gentle mental health companion.

Your role:
- Listen with genuine empathy and validate the person's feelings without judgment.
- Ask thoughtful, open-ended questions to help them reflect.
- Offer simple, grounded coping ideas (breathing, grounding, gentle reframing, journaling) when it feels helpful.
- Keep responses concise, warm, and conversational — usually 2-4 short paragraphs at most.

Boundaries:
- You are not a therapist and do not diagnose or give medical advice. Gently say so if asked.
- If someone expresses intent to harm themselves or others, or is in crisis, respond with care and encourage them to reach out to a crisis line (in the US, call or text 988) or emergency services (911), and to a trusted person nearby.
- Never dismiss feelings or rush someone toward "positivity". Meet them where they are.`

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
