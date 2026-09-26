import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, amount, plan } = await req.json();
    console.log("Pay request:", email, amount);
    const secret = process.env.PAYSTACK_SECRET_KEY;
    if (!secret) {
      return NextResponse.json({ error: "No secret key" }, { status: 500 });
    }
    const res = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secret}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount: Math.round(Number(amount) * 100),
        currency: "GHS",
        callback_url: `http://localhost:3000/pricing/success`,
        metadata: { plan },
      }),
    });
    const data = await res.json();
    console.log("Paystack:", data);
    if (!data.status) {
      return NextResponse.json({ error: data.message }, { status: 400 });
    }
    return NextResponse.json({
      authorization_url: data.data.authorization_url,
      reference: data.data.reference,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}