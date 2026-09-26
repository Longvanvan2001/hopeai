"use client";
import { useState, useEffect } from "react";

export default function ExercisesPage() {
  const [active, setActive] = useState<string | null>(null);
  const [phase, setPhase] = useState("Inhale 4s");
  const [medTime, setMedTime] = useState(300);
  const [running, setRunning] = useState(false);
  const [grat, setGrat] = useState("");
  const [list, setList] = useState<string[]>([]);
  const [step, setStep] = useState(0);

  const steps = [
    "Name 5 things you can SEE",
    "Name 4 things you can TOUCH",
    "Name 3 things you can HEAR",
    "Name 2 things you can SMELL",
    "Name 1 thing you can TASTE",
  ];

  useEffect(() => {
    if (active!== "breathing") return;
    const cycle = ["Inhale 4s", "Hold 4s", "Exhale 6s"];
    let i = 0;
    const id = setInterval(() => { i = (i+1)%3; setPhase(cycle[i]); }, 4000);
    return () => clearInterval(id);
  }, [active]);

  useEffect(() => {
    if (!running || active!== "meditation") return;
    const id = setInterval(() => setMedTime(s => s <= 1? (setRunning(false),0) : s-1), 1000);
    return () => clearInterval(id);
  }, [running, active]);

  if (active) {
    return (
      <div className="p-8 max-w-2xl mx-auto text-white bg-[#121212] min-h-screen">
        <button onClick={() => { setActive(null); setStep(0); }} className="text-sm underline opacity-70">← Back to Exercises</button>
        {active === "breathing" && (
          <div className="text-center mt-20">
            <div className="w-48 h-48 mx-auto rounded-full bg-white/10 flex items-center justify-center text-xl font-bold animate-pulse">{phase}</div>
            <p className="mt-8 opacity-70">Breathe with the circle. You are safe right now.</p>
          </div>
        )}
        {active === "grounding" && (
          <div className="text-center mt-20">
            <h2 className="text-2xl font-bold">{steps[step]}</h2>
            <input placeholder="Type here..." className="mt-6 w-full bg-white/10 border border-white/20 rounded-full px-4 py-3 text-white" />
            <button onClick={() => setStep(s => Math.min(s+1,4))} className="mt-6 bg-white text-black px-8 py-3 rounded-full font-bold">Next</button>
            <p className="mt-4 text-sm opacity-50">{step+1}/5</p>
          </div>
        )}
        {active === "meditation" && (
          <div className="text-center mt-20">
            <h2 className="text-6xl font-bold">{Math.floor(medTime/60)}:{String(medTime%60).padStart(2,"0")}</h2>
            <p className="mt-4 opacity-60">Just breathe. No need to do anything else.</p>
            <button onClick={() => setRunning(!running)} className="mt-8 bg-white text-black px-10 py-3 rounded-full font-bold">{running?"Pause":"Start"}</button>
            <button onClick={() => { setMedTime(300); setRunning(false); }} className="block mx-auto text-sm underline mt-4 opacity-70">Reset</button>
          </div>
        )}
        {active === "gratitude" && (
          <div className="mt-10">
            <h2 className="text-xl font-bold">What are you grateful for today?</h2>
            <div className="flex gap-2 mt-4"><input value={grat} onChange={e=>setGrat(e.target.value)} placeholder="Something small..." className="flex-1 bg-white/10 border border-white/20 rounded-full px-4 py-3 text-white" /><button onClick={()=>{if(grat.trim()){setList([grat,...list]);setGrat("");}}} className="bg-white text-black px-6 rounded-full font-bold">Add</button></div>
            <div className="mt-6 space-y-2">{list.map((g,i)=><div key={i} className="bg-white/10 p-3 rounded-lg">🙏 {g}</div>)}</div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-8 bg-[#121212] min-h-screen text-white">
      <h1 className="text-2xl font-bold">Calming exercises</h1>
      <p className="opacity-60 mb-6">Take a few minutes for yourself, whatever feels right.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
        <button onClick={() => setActive("breathing")} className="text-left bg-white/10 border border-white/10 p-5 rounded-xl hover:bg-white/20"><p className="font-bold">Guided breathing</p><p className="text-sm opacity-70 mt-1">Follow a calming box-breathing rhythm to settle your body.</p><p className="text-xs mt-4 opacity-50">2-5 min</p></button>
        <button onClick={() => setActive("grounding")} className="text-left bg-white/10 border border-white/10 p-5 rounded-xl hover:bg-white/20"><p className="font-bold">Grounding (5-4-3-2-1)</p><p className="text-sm opacity-70 mt-1">Use your senses to come back to the present moment.</p><p className="text-xs mt-4 opacity-50">3-5 min</p></button>
        <button onClick={() => setActive("meditation")} className="text-left bg-white/10 border border-white/10 p-5 rounded-xl hover:bg-white/20"><p className="font-bold">Meditation timer</p><p className="text-sm opacity-70 mt-1">Sit quietly with a gentle timer and soft chime.</p><p className="text-xs mt-4 opacity-50">You choose</p></button>
        <button onClick={() => setActive("gratitude")} className="text-left bg-white/10 border border-white/10 p-5 rounded-xl hover:bg-white/20"><p className="font-bold">Gratitude journal</p><p className="text-sm opacity-70 mt-1">Note small good things to shift your perspective.</p><p className="text-xs mt-4 opacity-50">2-3 min</p></button>
      </div>
    </div>
  );
}