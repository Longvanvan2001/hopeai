export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1]?.content || "";
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return Response.json({ reply: "Add your API key in.env.local Masa" });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are Hope AI, a Ghanaian assistant. Friendly, wise, helpful. User said: ${lastMessage}. Respond helpfully in Pidgin/English mix if needed.`
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry Masa, try again.";

    return Response.json({ reply });
  } catch (e) {
    console.error(e);
    return Response.json({ reply: "Error Masa, check your internet" });
  }
}