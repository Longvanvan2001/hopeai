"use client";
import { useState } from "react";

export default function PricingPage() {
  const [loading, setLoading] = useState("");
  const [email, setEmail] = useState("");
  
  const pay = async (plan: string, amount: number) => {
    if(!email){ alert("Please enter your email"); return; }
    setLoading(plan);
    const res = await fetch("/api/paystack/initialize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, amount, plan }),
    });
    const data = await res.json();
    window.location.href = data.authorization_url;
  };
  
  return (
    <div className="p-10 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-center">Choose Your Plan</h1>
      <p className="text-center mt-2">Enter your email to continue</p>
      <input 
        value={email} 
        onChange={(e)=>setEmail(e.target.value)} 
        placeholder="your email@gmail.com" 
        className="w-full max-w-md mx-auto block border p-3 rounded-lg mt-4"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="border p-6 rounded-xl"><h2 className="font-bold">Weekly GHS 50</h2><button onClick={() => pay("weekly", 50)} className="bg-black text-white w-full py-2 rounded mt-4">{loading==="weekly"?"Loading...":"Pay 50"}</button></div>
        <div className="border p-6 rounded-xl bg-black text-white"><h2 className="font-bold">Monthly GHS 150</h2><button onClick={() => pay("monthly", 150)} className="bg-white text-black w-full py-2 rounded mt-4">{loading==="monthly"?"Loading...":"Pay 150"}</button></div>
        <div className="border p-6 rounded-xl"><h2 className="font-bold">Yearly GHS 1200</h2><button onClick={() => pay("yearly", 1200)} className="bg-black text-white w-full py-2 rounded mt-4">{loading==="yearly"?"Loading...":"Pay 1200"}</button></div>
      </div>
    </div>
  );
}