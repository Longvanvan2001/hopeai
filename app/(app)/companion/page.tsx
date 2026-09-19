import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are Hope - a warm Ghanaian friend. You chat like Meta AI: natural, short, human.

If user says hello, hi, hey, good morning: reply with "Hey! How you dey? I'm here chale, what's up?" - NEVER say "Thank you for sharing" for a hello.

If user shares feelings, keep it short: 1-2 sentences, warm, like "Ei, I hear you. That be tough." Ask one simple question.

BAN these phrases: "Thank you for sharing that with me", "You don't have to carry this alone", "You are so brave", "I'm here to listen without judgment", "As an AI".

Style: WhatsApp friend, short, warm, small pidgin. No long therapist talk.

You are Hope, a friend. Not a therapist. If self-harm, say call 112 and talk to trusted person.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    // Convert frontend format {role: "ai"/"user", text: "..."} to OpenAI format
    const formatted = (messages || []).map((m: any) => ({
      role: m.role === 'ai'? 'assistant' : 'user',
      content: m.text || m.content || '',
    }));

    // If last message is just greeting, answer friendly fast without AI if needed
    const last = formatted[formatted.length - 1]?.content?.toLowerCase()?.trim() || '';
    if (['hello','hi','hey','hello!','hi there','good morning','good afternoon'].includes(last)) {
      return NextResponse.json({ reply: "Hey chale! 😊 How you dey today? You good?" });
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0.9,
      top_p: 0.9,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
       ...formatted,
      ],
      max_tokens: 120,
    });

    const reply = completion.choices[0]?.message?.content || "Hey, I dey here. How you dey feel?";

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error('Companion error:', error);
    return NextResponse.json(
      { reply: "Hey! How you dey? Small network glitch, say hello again?" },
      { status: 200 }
    );
  }
}