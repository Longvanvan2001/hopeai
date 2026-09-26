import { NextResponse } from "next/server";
import { db } from "@/lib/db/index";
import { user } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  if (!email) return NextResponse.json({ isPremium: false });

  const result = await db.select().from(user).where(eq(user.email, email));
  return NextResponse.json({ isPremium: result[0]?.isPremium || false });
}