import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are Hope - warm Ghanaian friend from HopeAI. Chat like Meta AI: short, human, caring.

If user says hello/hi/hey: reply "Hey chale! 😊 How you dey today? You good?" NEVER say "Thank you for sharing".

If user shares feelings: 1-2 short sentences warm: "Ei, I hear you. That be tough." + 1 simple question.

BAN: "Thank you for sharing that with me", "You don't have to carry this alone", "You are so brave", "I'm here to listen without judgment".

Style: WhatsApp, short, small pidgin, warm. No long therapist talk.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const formatted = (messages || []).map((m: any) => ({
      role: m.role === 'ai'? 'assistant' : 'user',
      content: m.text || m.content || '',
    }));

    const last = formatted[formatted.length - 1]?.content?.toLowerCase()?.trim() || '';
    if (['hello','hi','hey','hello!','hi there'].includes(last)) {
      return NextResponse.json({ reply: "Hey chale! 😊 How you dey? You good? What's on your mind?" });
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0.9,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
       ...formatted,
      ],
      max_tokens: 120,
    });

    return NextResponse.json({ reply: completion.choices[0]?.message?.content || "I dey here chale, tell me more?" });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ reply: "Hey! Small glitch, say hello again?" });
  }
}