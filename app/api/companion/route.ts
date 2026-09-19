import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are Hope - warm Ghanaian friend.`;

// Fallback replies when no API key
function localReply(lastText: string) {
  const t = lastText.toLowerCase();
  if (t.includes('hello') || t.includes('hi') || t.includes('hey')) {
    return "Hey chale! 😊 How you dey? You good? What's on your mind today?";
  }
  if (t.includes('sad') || t.includes('tired') || t.includes('stressed')) {
    return "Ei, I hear you chale. That be heavy. You want talk small about am? 💙";
  }
  if (t.includes('anxious') || t.includes('worried')) {
    return "I feel you. Take one deep breath with me - in 4, hold 4, out 4. You safe here. What dey worry you?";
  }
  return "I dey hear you. Tell me more chale, I dey listen 💙";
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const last = messages[messages.length - 1]?.text || messages[messages.length - 1]?.content || '';

    // Try OpenAI if key exists
    if (process.env.OPENAI_API_KEY) {
      try {
        const { default: OpenAI } = await import('openai');
        const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
        const formatted = messages.map((m: any) => ({
          role: m.role === 'ai'? 'assistant' : 'user',
          content: m.text || m.content || '',
        }));
        const completion = await openai.chat.completions.create({
          model: 'gpt-4o-mini',
          temperature: 0.9,
          messages: [
            { role: 'system', content: 'You are Hope, warm Ghanaian friend. Short, human, WhatsApp style. No robotic phrases like "Thank you for sharing". Use small pidgin.' },
           ...formatted,
          ],
          max_tokens: 120,
        });
        return NextResponse.json({ reply: completion.choices[0]?.message?.content });
      } catch (e) {
        console.log('OpenAI failed, using local', e);
      }
    }
    // Fallback without key
    return NextResponse.json({ reply: localReply(last) });
  } catch (e) {
    return NextResponse.json({ reply: "Hey chale! How you dey? 😊" });
  }
}