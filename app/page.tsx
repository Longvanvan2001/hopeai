"use client";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="flex justify-between items-center px-6 md:px-10 py-4 border-b">
        <div className="font-bold text-xl flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">H</div>
          HopeAI
        </div>
        <div className="flex gap-3 items-center">
          <Link href="/sign-in" className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-black">Log In</Link>
          <Link href="/sign-up" className="px-5 py-2.5 bg-black text-white rounded-full text-sm font-bold hover:bg-gray-800">Get Started Free</Link>
        </div>
      </nav>

      <div className="text-center px-6 py-20 md:py-28 max-w-3xl mx-auto">
        <p className="inline-block px-4 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-bold mb-6">Private • Safe • For Ghana & The World</p>
        <h1 className="text-4xl md:text-5xl font-black leading-tight text-black">Your gentle companion for every moment</h1>
        <p className="mt-6 text-lg text-gray-600">
          Support and reflection, not medical care. Your 24/7 wellness partner in Ghana and beyond.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/sign-up" className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold text-base shadow-lg hover:bg-blue-700">Create Free Account →</Link>
          <Link href="/sign-in" className="px-8 py-4 bg-gray-100 text-black rounded-full font-bold text-base hover:bg-gray-200">Log In</Link>
        </div>
        <p className="mt-4 text-xs text-gray-400">No credit card needed • Private & secure</p>
      </div>
    </div>
  );
}