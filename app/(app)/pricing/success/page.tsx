"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function SuccessPage() {
  const params = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState("Verifying...");
  const reference = params.get("reference");

  useEffect(() => {
    if (!reference) { setStatus("No reference found"); return; }

    fetch("/api/paystack/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reference }),
    })
     .then((r) => r.json())
     .then((data) => {
        if (data.success) {
          setStatus(`Success! Paid ₵${data.amount}. Redirecting...`);
          setTimeout(() => router.push("/dashboard"), 2000);
        } else {
          setStatus("Failed: " + data.message);
        }
      });
  }, [reference]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow text-center">
        <h1 className="text-2xl font-bold mb-4">{status}</h1>
        <p>Reference: {reference}</p>
      </div>
    </div>
  );
}