"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { authClient } from "@/lib/auth-client"

export default function DashboardPage() {
  const { data: session } = authClient.useSession()
  const [isPremium, setIsPremium] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function checkPremium() {
      if (session?.user?.email) {
        try {
          const res = await fetch(`/api/user/status?email=${session.user.email}`)
          const data = await res.json()
          setIsPremium(data.isPremium)
        } catch (e) {
          console.log(e)
        }
      }
      setLoading(false)
    }
    checkPremium()
  }, [session])

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">Welcome back 💙</h1>
      <p className="text-gray-500 mb-8">Your safe space overview</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-blue-50 p-5 rounded-2xl">
          <h3 className="font-semibold">Mood</h3>
          <p className="text-2xl mt-2">🙂 Okay</p>
        </div>
        <div className="bg-green-50 p-5 rounded-2xl">
          <h3 className="font-semibold">Streak</h3>
          <p className="text-2xl mt-2">3 days</p>
        </div>
      </div>

      <div className={`p-6 rounded-2xl border-2 ${isPremium? "bg-yellow-50 border-yellow-400" : "bg-red-50 border-red-200"}`}>
        <h3 className="font-bold text-xl">Premium Status</h3>
        {loading? (
          <p>Loading...</p>
        ) : (
          <p className={`text-2xl mt-2 font-bold ${isPremium? "text-green-600" : "text-red-600"}`}>
            {isPremium? "YES ✅ ACTIVE!" : "NO ❌ Not Premium"}
          </p>
        )}
        <p className="mt-2 text-sm">{session?.user?.email}</p>
        {!isPremium && (
          <Link href="/pricing" className="mt-4 inline-block bg-black text-white px-6 py-2 rounded-lg">
            Upgrade Now
          </Link>
        )}
      </div>
    </div>
  )
}