import PaystackButton from "@/components/PaystackButton";

export default async function LandingPage() {
  return (
    <div className="min-h-screen">
      <section className="mx-auto w-full max-w-6xl px-6 py-12">
        <h1 className="text-4xl font-bold text-center">HopeAI - Your Support Companion</h1>
        <p className="text-center mt-4 text-muted-foreground">Support and reflection, not medical care.</p>

        <div className="grid md:grid-cols-2 gap-6 mt-12 max-w-3xl mx-auto">
          <div className="border p-6 rounded-xl bg-white">
            <h3 className="font-bold">Free</h3>
            <p className="text-sm">$0/month</p>
            <p className="text-xs">10 chats/day, mood tracking, exercises</p>
          </div>

          <div className="border-2 border-blue-600 p-6 rounded-xl bg-blue-50">
            <h3 className="font-bold">Premium - 20 GHS/mo</h3>
            <p className="text-sm">Unlimited chats + voice + reports</p>
            
            <div className="mt-4">
              <PaystackButton />
            </div>

            <p className="text-xs mt-3 text-gray-600">HopeAI is a Ghana wellness platform: AI emotional support, mood tracking & counselor booking. Digital subscription service.</p>
            <p className="text-xs mt-1 text-gray-500">Contact: hello@hopeai.com.gh | Accra, Ghana</p>
            <p className="text-xs mt-1 text-gray-500">Terms & Privacy: Personal use only. Not medical diagnosis.</p>
          </div>
        </div>
      </section>

      <footer className="mx-auto w-full max-w-6xl px-8 py-8 text-sm text-muted-foreground">
        <p className="text-pretty text-center">
          HopeAI offers support and reflection, not medical care. In a crisis, call or text 112 (Ghana) or your local emergency number.
        </p>
        <p className="text-center mt-2">© 2026 HopeAI - Wellness & Support Platform Ghana</p>
      </footer>
    </div>
  );
}