"use client";
import { useState, useRef, useEffect } from "react";

type Msg = { role: "user" | "ai"; text: string };

export default function CompanionPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    { role: "ai", text: "Hey there 👋 I'm Hope, your caring companion.\n\nI'm here to listen without judgment. Whether you're feeling stressed, anxious, happy, or just need someone to talk to - I'm here for you, 24/7.\n\nHow are you feeling right now?" }
  ]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMessage = input;
    setMessages(prev => [...prev, { role: "user", text: userMessage }]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/companion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });
      const data = await res.json();
      const aiText = data.reply || data.message || data.content || "I'm here with you. Tell me more about what's on your mind.";
      setMessages(prev => [...prev, { role: "ai", text: aiText }]);
    } catch {
      setMessages(prev => [...prev, { role: "ai", text: "I'm still here with you, even if my connection is slow. Take a deep breath. What's on your heart?" }]);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-[90vh] bg-[#f8fafc]">
      <div className="bg-white border-b px-6 py-4 flex items-center gap-3 shadow-sm">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white font-bold">H</div>
        <div>
          <h1 className="font-bold text-gray-900">Hope</h1>
          <p className="text-xs text-green-600 font-medium">● Online • Private & Safe</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 max-w-3xl mx-auto w-full">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user"? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] px-5 py-3.5 rounded-[20px] text-[15px] leading-[1.6] whitespace-pre-wrap shadow-sm
              ${m.role === "user"
              ? "bg-blue-600 text-white rounded-br-[6px]"
                : "bg-white text-gray-800 border border-gray-100 rounded-bl-[6px]"}`}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-100 px-5 py-3.5 rounded-[20px] rounded-bl-[6px] text-gray-500 text-sm">Hope is thinking...</div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="bg-white border-t p-4">
        <div className="max-w-3xl mx-auto flex gap-3 items-center">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendMessage()}
            placeholder="Share how you feel..."
            className="flex-1 px-5 py-3.5 rounded-full bg-gray-100 text-gray-900 placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          />
          <button
            onClick={sendMessage}
            disabled={loading ||!input.trim()}
            className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 disabled:opacity-40 transition-all shadow-md"
          >
            ↑
          </button>
        </div>
        <p className="text-[11px] text-center text-gray-400 mt-3">Hope is an AI companion, not a medical professional. If you are in crisis, please contact a trusted person or local helpline.</p>
      </div>
    </div>
  );
}