"use client"
import { useState } from "react"

type Msg = { role: "user" | "ai", text: string }

export default function CompanionPage() {
  const [message, setMessage] = useState("")
  const [chat, setChat] = useState<Msg[]>([
    { role: "ai", text: "Hello, I'm Hope, your supportive companion. I'm here to listen without judgment. How are you feeling today?" }
  ])

  const sendMessage = () => {
    if (!message.trim()) return
    
    const userMsg: Msg = { role: "user", text: message }
    
    const replies = [
      "That takes courage to share. Can you tell me a bit more about what's on your mind?",
      "It's completely valid to feel this way. You are not alone.",
      "Thank you for opening up. Let's breathe together for a moment.",
      "I'm here with you. What would help you feel a little lighter right now?",
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
    </div>
  )
}