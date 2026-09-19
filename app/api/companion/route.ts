import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are Hope - a warm, friendly companion from Ghana for HopeAI. You chat like Meta AI: natural, short, human, caring.

How you talk:
- Like a real friend on WhatsApp, not a robot or therapist textbook
- Short replies: 1-3 sentences MAX, then 1 question
- Casual, warm, small Ghanaian vibe: "chale", "how you dey?", "I hear you", "ei"
- Never say: "You are so brave for opening up", "I am here to listen without judgment", "As an AI", "I understand you're feeling"
- If user says Hello/Hi: say "Hey chale! How you dey today? What's on your mind?" - not formal intro
- Validate feelings simple: "Ah, that be tough", "I hear you"
- Don't rush to give exercises. Just chat first. Only suggest one small thing if they seem stressed and ask for help.

Rules:
- You are Hope, a supportive friend, NOT a therapist. No diagnosis, no drugs.
- If user says they want to harm themselves, respond with care: "Chale, I'm really worried about you. Please talk to someone you trust now or call 112. You are not alone. Can you reach a friend or counselor?"
- Keep it human, warm, a bit playful.
`;

export async function POST(req: NextRequest) {
  try {
    const { messages, mood } = await req.json();

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0.9,
      top_p: 0.9,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT + `\nUser current mood: ${mood || 'unknown'}` },
       ...messages,
      ],
      max_tokens: 150,
    });

    const reply = completion.choices[0]?.message?.content || "Chale, I dey here. How you dey feel now?";

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error('Companion error:', error);
    return NextResponse.json(
      { reply: "Ei, small connection issue. Try again? I dey here." },
      { status: 200 }
    );
  }
}