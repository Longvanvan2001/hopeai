"use client"

const therapists = [
  { name: "Dr. Ama Mensah", specialty: "Anxiety & Stress", location: "Accra - Online", available: true },
  { name: "Kwame Osei, LCSW", specialty: "Depression Support", location: "Kumasi - In-person", available: true },
  { name: "Sarah Boateng", specialty: "Youth Counseling", location: "Online Only", available: false },
]

export default function TherapistsPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">Find Support 🧑‍⚕️</h1>
      <p className="text-gray-500 mb-6">Verified therapists near you</p>

      <div className="space-y-4">
        {therapists.map((t, i) => (
          <div key={i} className="border p-5 rounded-2xl flex justify-between items-center">
            <div>
              <h3 className="font-bold">{t.name}</h3>
              <p className="text-sm text-gray-600">{t.specialty}</p>
              <p className="text-xs text-gray-400">{t.location}</p>
            </div>
            <button className={`px-4 py-2 rounded-full text-sm ${t.available ? 'bg-black text-white' : 'bg-gray-200'}`}>
              {t.available ? 'Contact' : 'Busy'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}