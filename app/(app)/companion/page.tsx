"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

type Msg = { role: "user" | "assistant"; text: string };

export default function CompanionPage() {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", text: "Hey there 👋 I'm Hope, your caring companion. I'm here to listen without judgment." }
  ]);
  const [loading, setLoading] = useState(false);
  const [chatCount, setChatCount] = useState(0);
  const [limitReached, setLimitReached] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  useEffect(() => {
    const saved = localStorage.getItem("hope_chat_count");
    const savedDate = localStorage.getItem("hope_chat_date");
    const today = new Date().toDateString();
    if (savedDate!== today) {
      localStorage.setItem("hope_chat_date", today);
      localStorage.setItem("hope_chat_count", "0");
      setChatCount(0);
    } else if (saved) {
      const c = parseInt(saved);
      setChatCount(c);
      if (c >= 10) setLimitReached(true);
    }
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    if (chatCount >= 10) {
      setLimitReached(true);
      return;
    }

    const userText = input.trim();
    setInput("");
    const newMessages: Msg[] = [...messages, { role: "user", text: userText }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const historyForAPI = newMessages.slice(-8).map(m => ({
        role: m.role,
        content: m.text
      }));

      const res = await fetch("/api/companion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userText,
          history: historyForAPI.slice(0, -1),
        }),
      });

      const data = await res.json();
      const aiReply = data.reply || data.text || "I'm here with you, tell me more?";

      setMessages(prev => [...prev, { role: "assistant", text: aiReply }]);

      const newCount = chatCount + 1;
      setChatCount(newCount);
      localStorage.setItem("hope_chat_count", newCount.toString());
      if (newCount >= 10) setLimitReached(true);

    } catch (e) {
      console.error(e);
      setMessages(prev => [...prev, { role: "assistant", text: "I'm here - had a small hiccup, want to try again?" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[85vh] max-w-2xl mx-auto p-4 bg-white text-black">
      <div className="flex justify-between items-center p-3 bg-gray-100 rounded-lg mb-2 border">
        <h1 className="font-bold text-black">Hope Companion</h1>
        <span className="text-sm text-gray-700">{chatCount}/10 chats today</span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 mb-4 p-2">
        {messages.map((m, i) => (
          <div key={i} className={`p-3 rounded-lg max-w-[80%] text-[15px] leading-relaxed ${m.role === "user"? "bg-blue-600 text-white ml-auto" : "bg-gray-200 text-black border border-gray-300 mr-auto"}`}>
            {m.text}
          </div>
        ))}
        {loading && <div className="bg-gray-200 text-black border p-3 rounded-lg w-fit text-sm">Hope is thinking...</div>}
        <div ref={bottomRef} />
      </div>

      {limitReached && (
        <div className="border-2 border-orange-400 bg-orange-50 p-4 rounded-lg text-center mb-3">
          <p className="font-bold text-orange-700">You have reached 10 chats today</p>
          <p className="text-sm mb-3 text-black">Free limit reached. Upgrade for unlimited 24/7 support</p>
          <button onClick={() => router.push("/pricing")} className="bg-orange-500 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-orange-600">
            Upgrade to Premium - $8
          </button>
        </div>
      )}

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder={limitReached? "Upgrade to continue..." : "Type your message..."}
          disabled={limitReached || loading}
          className="flex-1 border border-gray-400 rounded-full px-4 py-3 focus:outline-none text-black bg-white disabled:bg-gray-100"
        />
        <button onClick={sendMessage} disabled={loading || limitReached ||!input.trim()} className="bg-black text-white px-6 py-3 rounded-full font-bold disabled:bg-gray-400">
          Send
        </button>
      </div>
    </div>
  );
}