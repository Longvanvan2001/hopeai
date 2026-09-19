'use client';
import { useState } from 'react';

type Msg = { role: 'user' | 'ai'; text: string };

export default function CompanionPage() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: 'ai', text: "Hey chale! I'm Hope 💙 How you dey? What's on your mind today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

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
    <div className="max-w-2xl mx-auto p-4 flex flex-col h-[80vh]">
      <div className="flex-1 overflow-y-auto space-y-3 bg-gray-50 rounded-xl p-4">
        {messages.map((m, i) => (
          <div key={i} className={`p-3 rounded-xl max-w-[80%] ${m.role === 'user'? 'bg-blue-500 text-white ml-auto' : 'bg-white shadow'}`}>
            {m.text}
          </div>
        ))}
        {loading && <div className="text-sm text-gray-400">Hope dey type...</div>}
      </div>
      <div className="flex gap-2 mt-3">
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Type how you dey feel..." className="flex-1 border rounded-full px-4 py-2" />
        <button onClick={send} className="bg-blue-600 text-white px-6 rounded-full">Send</button>
      </div>
    </div>
  );
}