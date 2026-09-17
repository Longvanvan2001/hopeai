"use client"
import { useState } from "react"
import CrisisSupport from "../../component/CrisisSupport"
type Msg = { role: "user" | "ai", text: string }

export default function CompanionPage() {
  const [message, setMessage] = useState("")
  const [chat, setChat] = useState<Msg[]>([
    { role: "ai", text: "Hello, I'm Hope, your supportive companion. I'm here to listen without judgment. How are you feeling today?" }
  ])
  const [showCrisis, setShowCrisis] = useState(false)
const sendMessage = () => {
  if (!message.trim()) return

  const lower = message.toLowerCase()
  if (lower.includes("cris") || lower.includes("want to die") || lower.includes("kill myself") || lower.includes("suicide")) {
    setShowCrisis(true)
    setMessage("")
    return
  }

  if (lower.includes("recommend") || lower.includes("help me out")) {
    const userMsg: Msg = { role: "user", text: message }
    const aiMsg: Msg = {
      role: "ai",
      text: "I got you. Here are 3 things that really help:\n\n1. Box breathing - in 4s, hold 4s, out 4s, hold 4s for 2 mins\n2. Write 5 mins - just dump what you feel\n3. Walk 10 mins outside with calm music\n\nWhich one do you want to try now?"
    }
    setChat([...chat, userMsg, aiMsg])
    setMessage("")
    return
  }

  const userMsg: Msg = { role: "user", text: message }

  const replies = [
    "I hear you. That sounds heavy. Want to tell me a little more about what's making you feel this way?",
    "Thank you for sharing that with me. You don't have to carry this alone.",
    "That makes complete sense. It's okay to feel this way. What has been on your mind the most today?",
    "I'm really here with you. Take your time - there is no rush. How is your body feeling right now?",
    "You are so brave for opening up. Want to try a small 1-minute reset together, or do you want to keep talking?",
    "I get it. Sometimes just saying it out loud helps. I'm listening without any judgment.",
  ]

  const aiMsg: Msg = { role: "ai", text: replies[Math.floor(Math.random() * replies.length)] }

  setChat([...chat, userMsg, aiMsg])
  setMessage("")
}
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">AI Companion 💙</h1>
      
      <div className="border rounded-xl h-96 overflow-y-auto p-4 mb-4 bg-white space-y-3">
        {chat.map((c, i) => (
          <div key={i} className={c.role === "user" ? "text-right" : "text-left"}>
            <span className={`inline-block px-4 py-2 rounded-2xl text-sm ${c.role === "user" ? "bg-blue-600 text-white" : "bg-zinc-100 text-black"}`}>
              {c.text}
            </span>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="How are you feeling?"
          className="flex-1 border rounded-full px-4 py-2 text-black"
        />
        <button onClick={sendMessage} className="bg-blue-600 text-white rounded-full px-6 py-2">
          Send
        </button>
      </div>
            <button
        onClick={() => setShowCrisis(true)}
        className="fixed bottom-24 right-4 bg-red-600 text-white w-14 h-14 rounded-full font-bold shadow-lg z-40 flex items-center justify-center"
      >
        SOS
      </button>
          {showCrisis && <CrisisSupport onClose={() => setShowCrisis(false)} />}
    </div>
  )
}
  
