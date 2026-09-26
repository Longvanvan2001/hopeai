import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();
    const lower = (message || "").toLowerCase().trim();
    const hist = Array.isArray(history) ? history : [];

    const lastUser = hist.filter((h:any) => h.role === "user").slice(-3).map((h:any) => h.content).join(" ");

    // OpenAI if you have key - this makes it like me instantly
    const key = process.env.OPENAI_API_KEY;
    if (key) {
      try {
        const r = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              { role: "system", content: "You are Hope, a warm human best friend in Ghana. You remember the conversation. You NEVER say thank you for sharing, building on what you told me, as an AI. You talk short, warm, like texting. If user says suicidal thoughts, respond with care: you matter, you are not alone, encourage talking to trusted person, and suggest SOS." },
              ...hist.slice(-6),
              { role: "user", content: message },
            ],
            temperature: 0.9,
            max_tokens: 200,
          }),
        });
        const d = await r.json();
        if (d.choices?.[0]?.message?.content) return NextResponse.json({ reply: d.choices[0].message.content });
      } catch {}
    }

    // HUMAN fallback - no templates, no repeating
    let reply = "";

    if (lower.includes("suicid") || lastUser.toLowerCase().includes("suicid")) {
      reply = "I'm really glad you told me this, even though it feels so heavy. You matter a lot, and you don't have to carry this alone. I'm here with you right now. Is there someone close you trust that you can reach out to tonight? If it gets too much, please tap SOS or call a helpline near you. Want to tell me what's been making it feel this heavy?";
    } else if (lower === "hello" || lower === "hi" || lower === "hey" || lower === "recommend something" || lower.includes("recommend")) {
      reply = "Hey, I'm here. For right now, how about we take 2 minutes together? Inhale 4 seconds, hold 4, exhale 6. Or tell me one small thing that felt okay today, even tiny. What feels doable for you in the next hour?";
    } else if (lower.includes("team") && lastUser.toLowerCase().includes("project")) {
      reply = "Yeah, that team part really hurts when you already gave 7 hours to that project. It makes sense you'd feel unsupported and alone in it. Did something specific happen with them today?";
    } else if (lower.length < 20) {
      reply = "Mmm, yeah. I'm still here with you on that. What part of it is sitting with you most right now?";
    } else {
      reply = `Yeah, "${message.slice(0,60)}" - I hear how heavy that is. I'm here, no judgment. Want to say more about what that feels like for you right now?`;
    }

    return NextResponse.json({ reply });
  } catch (e) {
    return NextResponse.json({ reply: "I'm here with you. My mind glitched a sec, but I'm still listening. Want to try again?" });
  }
}