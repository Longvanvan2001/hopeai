import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { reference } = await req.json();
    const secret = process.env.PAYSTACK_SECRET_KEY;
    
    const res = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: { Authorization: `Bearer ${secret}` },
    });
    const data = await res.json();
    
    if (data.data?.status === "success") {
      return NextResponse.json({ 
        success: true, 
        amount: data.data.amount / 100,
        currency: data.data.currency 
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        message: data.data?.gateway_response || "Payment failed" 
      });
    }
  } catch (e: any) {
    return NextResponse.json({ success: false, message: e.message }, { status: 500 });
  }
}