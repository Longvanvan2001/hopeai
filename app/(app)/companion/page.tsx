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
    <div className="flex flex-col h-screen max-w-3xl mx-auto p-4">
      <div className="border-b pb-3 mb-4">
        <h1 className="text-2xl font-bold">Hope - Your Companion</h1>
        <p className="text-sm text-green-600">Online - listening</p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((m, i) => (
          <div key={i} className={`p-3 rounded-lg ${m.role === "user"? "bg-blue-100 ml-auto max-w-[80%]" : "bg-gray-100 mr-auto max-w-[80%]"}`}>
            {m.content}
          </div>
        ))}
        {loading && <div className="text-gray-400 text-sm">Hope is typing...</div>}
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="How are you feeling today?"
          className="flex-1 border rounded-lg p-3"
        />
        <button onClick={sendMessage} className="bg-black text-white px-6 rounded-lg">
          Send
        </button>
      </div>
    </div>
  );
}