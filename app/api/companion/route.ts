import { NextRequest, NextResponse } from 'next/server';

function humanReply(lastText: string, history: any[]) {
  const t = lastText.toLowerCase().trim();

  if (t === 'hello' || t === 'hi' || t === 'hey' || t.includes('hello') || t.includes('hi there')) {
    const hellos = [
      "Hey chale! 😊 How you dey? I dey here, make we chat?",
      "Chale you do! How body? What's on your mind today?",
      "Hey hey! Long time 😅 How you dey feel today?",
    ];
    return hellos[Math.floor(Math.random()*hellos.length)];
  }
  if (t.includes('your name')) {
    return "I'm Hope 💙 - your small friend from HopeAI. I dey Accra for your phone inside, ready to listen. You be? What's your name?";
  }
  if (t.includes('how are you')) {
    return "I dey okay o! I just dey think about you. How YOU dey? You sleep well last night?";
  }
  if (t.includes('sad') || t.includes('depress') || t.includes('down') || t.includes('tired')) {
    return "Ei chale, sorry. That feeling be heavy. 😔 No be easy. You want tell me small what happen? I dey listen, no judgement.";
  }
  if (t.includes('anxious') || t.includes('worried') || t.includes('stress')) {
    return "I hear you. Chest dey tight small? Make we breathe together - breathe in 4 seconds... hold... breathe out. You safe here chale. What dey stress you?";
  }
  if (t.includes('lonely') || t.includes('alone')) {
    return "You no dey alone o, I'm here. 💙 For real, loneliness dey pain. You get someone for house you fit chat with today?";
  }
  // default - varied and human like me
  const defaults = [
    "Hmm, I hear you chale. Tell me more, how that make you feel?",
    "Ei, for real? That be something o. What you think you go do about am?",
    "I dey listen o. Continue, I dey with you 💙",
    "Chale I feel you. You been dey hold this for long?",
  ];
  return defaults[Math.floor(Math.random()*defaults.length)];
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const last = messages[messages.length - 1]?.text || '';

    // Try OpenAI if key exists
    if (process.env.OPENAI_API_KEY) {
      try {
        const { default: OpenAI } = await import('openai');
        const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
        const formatted = messages.map((m: any) => ({
          role: m.role === 'ai'? 'assistant' : 'user',
          content: m.text || '',
        }));
        const completion = await openai.chat.completions.create({
          model: 'gpt-4o-mini',
          temperature: 0.95,
          messages: [
            { role: 'system', content: `You are Hope, Ghanaian bestie. Talk like WhatsApp: short, warm, human, small pidgin, like Meta AI. Never say "Thank you for sharing". Be varied, curious, friendly.` },
          ...formatted,
          ],
          max_tokens: 150,
        });
        return NextResponse.json({ reply: completion.choices[0]?.message?.content });
      } catch {}
    }
    return NextResponse.json({ reply: humanReply(last, messages) });
  } catch {
    return NextResponse.json({ reply: "Hey chale! How you dey? 😊" });
  }
}