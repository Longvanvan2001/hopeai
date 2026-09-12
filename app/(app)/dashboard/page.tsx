"use client"

import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">Welcome back 💙</h1>
      <p className="text-gray-500 mb-8">Your safe space overview</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-blue-50 p-5 rounded-2xl">
          <h3 className="font-semibold">Mood Today</h3>
          <p className="text-2xl mt-2">🙂 Okay</p>
        </div>
        <div className="bg-green-50 p-5 rounded-2xl">
          <h3 className="font-semibold">Streak</h3>
          <p className="text-2xl mt-2">3 days</p>
        </div>
      </div>

      <h2 className="font-bold text-xl mb-4">Go to</h2>
      <div className="grid grid-cols-2 gap-3">
        <Link href="/companion" className="border p-4 rounded-xl">💬 AI Companion</Link>
        <Link href="/exercises" className="border p-4 rounded-xl">🌬️ Exercises</Link>
        <Link href="/mood" className="border p-4 rounded-xl">📊 Mood</Link>
        <Link href="/therapists" className="border p-4 rounded-xl">🧑‍⚕️ Therapists</Link>
      </div>
    </div>
  )
}