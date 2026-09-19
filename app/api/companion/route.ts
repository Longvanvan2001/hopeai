import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ reply: "Configuration error: API key is missing. Please add it in Vercel." });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `You are Hope, a kind, empathetic mental health companion. Speak in clear, correct, professional, warm English. Never use pidgin, slang like chale, masa, dey, how you dey. User says: ${message}` }] }],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.log(data);
      return NextResponse.json({ reply: "Sorry, I'm having trouble connecting right now. Please try again in a moment." });
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm here to listen. Could you tell me more?";

    return NextResponse.json({ reply });
  } catch (error) {
    return NextResponse.json({ reply: "Sorry, I'm having trouble connecting. Please try again." });
  }
}