"use client";
import { useState } from "react";

export default function CompanionPage() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! I'm Hope, I'm here to listen. How are you feeling today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch (e) {
      setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, I'm having trouble connecting. Please try again." }]);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto p-4 bg-[#0a0a0a] text-white">
      <div className="border-b border-gray-800 pb-3 mb-4">
        <h1 className="text-2xl font-bold text-white">Hope - Your Companion</h1>
        <p className="text-sm text-green-400">Online - listening</p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((m, i) => (
          <div key={i} className={`p-4 rounded-2xl max-w-[80%] leading-relaxed ${
            m.role === "user" 
              ? "bg-blue-600 text-white ml-auto" 
              : "bg-zinc-800 text-white mr-auto border border-zinc-700"
          }`}>
            {m.content}
          </div>
        ))}
        {loading && <div className="text-gray-400 text-sm ml-2">Hope is typing...</div>}
      </div>

      <div className="flex gap-2 border-t border-gray-800 pt-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="How are you feeling today?"
          className="flex-1 bg-zinc-900 border border-zinc-700 rounded-full px-5 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
        />
        <button onClick={sendMessage} className="bg-white text-black px-8 rounded-full font-semibold hover:bg-gray-200">
          Send
        </button>
      </div>
    </div>
  );
}