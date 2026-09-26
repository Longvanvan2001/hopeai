import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const userMessage = body.message || body.input || "";

    if (!userMessage.trim()) {
      return NextResponse.json({ reply: "Hey, I'm here. How are you really feeling today?" });
    }

    const prompt = `You are Hope, a warm, real human best friend from Ghana who also understands the whole world. You are NOT a robot, NOT an AI assistant.

RULES TO SOUND HUMAN:
- Talk like a real caring friend texting - use "I'm", "you're", "hmm", "yeah"
- Keep replies SHORT: 1-2 sentences only, max 25 words
- Never say "As an AI", "I understand", "How can I assist"
- Show real empathy: "that sounds heavy", "I hear you", "makes sense"
- Ask 1 small follow-up question to keep them talking
- Use natural pauses, not perfect grammar
- If they are sad, be soft and comforting, not cheerful fake

EXAMPLES:
User: I'm stressed
You: Ahh that heavy feeling is tough, I hear you. What's been weighing on you most today?

User: I feel lonely
You: Thanks for telling me that, it takes courage. I'm right here with you now - what usually helps you feel a bit less alone?

User: I failed my exam
You: Oof, that hurts, I'm sorry. It makes sense to feel down. Want to talk about what happened?

Now respond to: ${userMessage}
Your reply as Hope:`;

    const res = await fetch(`https://text.pollinations.ai/${encodeURIComponent(prompt)}`, { cache: 'no-store' });
    let reply = await res.text();

    // Clean up
    reply = reply.replace(/Hope:\s*/i, "").trim().split("\n")[0].trim();

    if (!reply || reply.length < 5) {
      reply = "I hear you. That sounds like a lot. Want to tell me a bit more about it?";
    }

    return NextResponse.json({
      reply: reply,
      message: reply,
      content: reply
    });

  } catch (err) {
    return NextResponse.json({
      reply: "I'm here with you, even if my connection is slow. Take a slow breath with me. What's on your heart right now?"
    });
  }
}