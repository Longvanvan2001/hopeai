'use client';
import { useState, useRef, useEffect } from 'react';

type Msg = { role: 'user' | 'ai'; text: string };

export default function CompanionPage() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: 'ai', text: "Hey chale! I'm Hope 💙 How you dey? What's on your mind today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, loading]);

  const send = async () => {
    if (!input.trim()) return;
    const userMsg: Msg = { role: 'user', text: input };
    const newMsgs = [...messages, userMsg];
    setMessages(newMsgs);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('/api/companion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMsgs }),
      });
      const data = await res.json();
      setMessages([...newMsgs, { role: 'ai', text: data.reply }]);
    } catch {
      setMessages([...newMsgs, { role: 'ai', text: "Ei small glitch, try again chale?" }]);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-[85vh] max-w-3xl mx-auto bg-[#f8f7ff] rounded-[24px] shadow-sm border border-white overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b bg-white flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-white font-bold">H</div>
        <div>
          <p className="font-semibold text-gray-900">Hope</p>
          <p className="text-xs text-green-500">● Online - dey listen</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gradient-to-b from-[#f8f7ff] to-white">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user'? 'justify-end' : 'justify-start'}`}>
            {m.role === 'ai' && <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 text-white flex items-center justify-center text-xs mr-2 mt-1 shrink-0">H</div>}
            <div className={`px-4 py-3 rounded-[20px] max-w-[75%] text-[15px] leading-relaxed shadow-sm
              ${m.role === 'user'
               ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-br-[6px]'
                : 'bg-white text-gray-800 rounded-bl-[6px] border border-gray-100'}`}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 text-white flex items-center justify-center text-xs mr-2">H</div>
            <div className="bg-white border border-gray-100 px-4 py-3 rounded-[20px] rounded-bl-[6px] text-sm text-gray-400">Hope dey type...</div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input - NEW DESIGN */}
      <div className="p-4 bg-white border-t">
        <div className="flex items-center gap-3 bg-gray-100 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-violet-200 transition">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            placeholder="Tell me how you dey feel..."
            className="flex-1 bg-transparent outline-none text-[15px] py-2 placeholder:text-gray-400"
          />
          <button onClick={send} disabled={loading} className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-white flex items-center justify-center hover:scale-105 transition disabled:opacity-50">
            ↑
          </button>
        </div>
        <p className="text-[11px] text-center text-gray-400 mt-2">Hope is AI friend, not medical advice. If you dey in crisis call 112</p>
      </div>
    </div>
  );
}