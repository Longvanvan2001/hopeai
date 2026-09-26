"use server";
import { db } from "@/lib/db";
import { chatMessage, user } from "@/lib/db/schema";
import { eq, count, gte, and } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function getChatHistory() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return [];

  const rows = await db.query.chatMessage.findMany({
    where: eq(chatMessage.userId, session.user.id),
    orderBy: (m, { asc }) => [asc(m.createdAt)],
  });

  return rows.map(r => ({ role: r.role as "user" | "ai" | "assistant", text: r.content, createdAt: r.createdAt }));
}

export async function getTodayChatCount() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [result] = await db
   .select({ value: count() })
   .from(chatMessage)
   .where(and(eq(chatMessage.userId, session.user.id), gte(chatMessage.createdAt, today)));

  return result.value;
}

export async function sendChatMessage(text: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return { error: "Not logged in" };

  const userData = await db.query.user.findFirst({
    where: eq(user.id, session.user.id)
  });

  // Check limit: 10 chats = 20 messages (user + ai) for free users
  if (!userData?.isPremium) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [chatCount] = await db
     .select({ value: count() })
     .from(chatMessage)
     .where(and(eq(chatMessage.userId, session.user.id), gte(chatMessage.createdAt, today)));

    if (chatCount.value >= 20) {
      return { limitReached: true };
    }
  }

  // Save user message
  await db.insert(chatMessage).values({
    userId: session.user.id,
    role: "user",
    content: text,
  });

  // Get chat history for context
  const history = await getChatHistory();
  const formattedHistory = history.slice(-6).map(h => ({
    role: h.role === "ai"? "assistant" : h.role,
    content: h.text
  }));

  // Call companion API brain (the human file you just fixed)
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/companion`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text, history: formattedHistory }),
    });

    const data = await res.json();
    const aiReply = data.reply || "I'm here with you. Want to tell me a bit more?";

    // Save AI reply
    await db.insert(chatMessage).values({
      userId: session.user.id,
      role: "ai",
      content: aiReply,
    });

    return { text: aiReply };

  } catch (err) {
    console.error("Chat error:", err);
    const fallbackReply = "I'm here with you. It looks like I had a small hiccup, but I didn't go anywhere. What were you saying?";

    await db.insert(chatMessage).values({
      userId: session.user.id,
      role: "ai",
      content: fallbackReply,
    });

    return { text: fallbackReply };
  }
}