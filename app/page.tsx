import Link from "next/link";
import PaystackButton from "@/components/PaystackButton";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <header className="mx-auto w-full max-w-6xl px-6 py-4 flex justify-between items-center">
        <h2 className="font-bold text-xl">HopeAI - Mental Wellness</h2>
        <div className="flex gap-3">
          <Link href="/sign-in" className="px-4 py-2 border rounded-lg text-sm">Log In</Link>
          <Link href="/sign-up" className="px-4 py-2 bg-black text-white rounded-lg text-sm">Sign Up</Link>
        </div>
      </header>

      <section className="mx-auto w-full max-w-6xl px-6 py-12 text-center">
        <h1 className="text-5xl font-bold">HopeAI - Your Support Companion</h1>
        <p className="mt-4 text-gray-600">Support and reflection, not medical care. Your 24/7 wellness partner in Ghana.</p>
        <div className="mt-6 flex justify-center gap-4">
          <Link href="/sign-up" className="px-6 py-3 bg-blue-600 text-white rounded-full">Get Started Free</Link>
          <Link href="/sign-in" className="px-6 py-3 border rounded-full">Log In</Link>
        </div>
      </section>

      <section className="mx-auto w-full max-w-3xl px-6 py-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border p-6 rounded-xl bg-white">
            <h3 className="font-bold">Free</h3>
            <p className="text-2xl font-bold">$0/month</p>
            <p className="text-sm text-gray-600 mt-2">10 chats/day + Mood tracking</p>
            <Link href="/sign-up" className="mt-4 block text-center border py-2 rounded-lg">Start Free</Link>
          </div>
          <div className="border-2 border-blue-600 p-6 rounded-xl bg-blue-50">
            <h3 className="font-bold">Premium - 20 GHS/mo</h3>
            <div className="mt-4"><PaystackButton /></div>
            <div className="mt-4 text-xs text-gray-600 border-t pt-3">
              <p><strong>Business:</strong> HopeAI Ghana digital wellness platform - AI support, mood tracking, counselor booking. Digital subscription.</p>
              <p className="mt-1"><strong>Contact:</strong> hello@hopeai.com.gh | Accra, Ghana</p>
            </div>
          </div>
        </div>
      </section>

      {/* PAYSTACK VERIFICATION - Business Info */}
<div className="mx-auto max-w-3xl px-6 py-6 mt-8 border rounded-xl bg-white text-xs text-gray-600">
  <h4 className="font-bold text-sm text-black mb-2">Business Information for Paystack Verification</h4>
  <p><strong>Business Name:</strong> HopeAI</p>
  <p><strong>What we do:</strong> HopeAI is a Ghana-based digital wellness platform providing AI emotional support chat, mood tracking, breathing exercises, and booking with licensed counselors. We sell a digital Premium subscription (20 GHS/month) for unlimited chats.</p>
  <p><strong>Contact:</strong> hello@hopeai.com.gh | Accra, Greater Accra, Ghana</p>
  <p><strong>Website:</strong> https://hopeai-eight.vercel.app/</p>
</div>
      <footer className="mx-auto max-w-6xl px-8 py-8 text-center text-sm border-t mt-12">
        HopeAI offers support and reflection, not medical care. In crisis, call 112 (Ghana).
      </footer>
    </div>
  );
}