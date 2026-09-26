import { NextResponse } from "next/server";
import { db } from "@/lib/db/index";
import { user } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const { reference } = await req.json();
    
    if (!reference) {
      return NextResponse.json({ success: false, message: "No reference" }, { status: 400 });
    }

    const secret = process.env.PAYSTACK_SECRET_KEY;
    
    const res = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: { 
        Authorization: `Bearer ${secret}`,
        "Content-Type": "application/json"
      },
    });
    
    const data = await res.json();
    console.log("Paystack verify:", data);

    if (data.data?.status === "success") {
      const email = data.data.customer.email;

      await db.update(user)
        .set({ 
          isPremium: true,
        })
        .where(eq(user.email, email));

      console.log("Upgraded to premium:", email);

      return NextResponse.json({ 
        success: true, 
        message: "Premium upgraded!",
        email: email 
      });
    }

    return NextResponse.json({ success: false, message: "Payment not successful" });

  } catch (err) {
    console.error("Verify error:", err);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}