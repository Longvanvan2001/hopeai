"use client"
export default function CrisisSupport({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
        <h2 className="text-xl font-bold text-gray-800 mb-2">You are not alone 💙</h2>
        <p className="text-gray-600 text-sm mb-4">
          It sounds like you're going through a really tough time. You deserve support. Please consider reaching out:
        </p>
        
        <div className="space-y-3 text-sm">
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="font-semibold">Ghana - Mental Health Authority</p>
            <p>Call: 0800 678 678 (Toll free)</p>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg">
            <p className="font-semibold">International - Befrienders</p>
            <p>https://findahelpline.org/countries/gh</p>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <p className="font-semibold">Talk to someone you trust</p>
            <p>Friend, family, or counselor nearby</p>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button onClick={onClose} className="flex-1 bg-gray-100 py-2 rounded-xl text-sm">
            Continue with Hope
          </button>
          <a href="tel:0800678678" className="flex-1 bg-blue-600 text-white py-2 rounded-xl text-sm text-center">
            Call Now
          </a>
        </div>
      </div>
    </div>
  )
}