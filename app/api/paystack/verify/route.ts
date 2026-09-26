import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const { reference } = await req.json();
    const secret = process.env.PAYSTACK_SECRET_KEY;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

    const res = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: { Authorization: `Bearer ${secret}` },
    });
    const data = await res.json();

    if (data.data?.status === "success") {
      const email = data.data.customer.email;
      const amount = data.data.amount / 100;

      const supabase = createClient(supabaseUrl, supabaseKey);
      await supabase.from("profiles").update({ 
        is_premium: true,
        plan: amount >= 1200 ? "yearly" : amount >= 150 ? "monthly" : "weekly"
      }).eq("email", email);

      return NextResponse.json({ success: true, amount });
    } else {
      return NextResponse.json({ success: false });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) });
  }
}