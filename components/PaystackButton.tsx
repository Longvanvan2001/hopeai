"use client"
import { useState } from "react"

export default function PaystackButton() {
  const [loading, setLoading] = useState(false)

  const payWithPaystack = () => {
    setLoading(true)
    // @ts-ignore
    const handler = window.PaystackPop.setup({
      key: "pk_test_xxxxxxxxxxxxxxxx", // YOU WILL CHANGE THIS LATER
      email: "user@hopeai.com",
      amount: 2000 * 100, // 20 GHS in kobo
      currency: "GHS",
      ref: "HOPEAI-" + Math.floor(Math.random() * 1000000000),
      callback: function(response: any) {
        alert("Payment success! Ref: " + response.reference + " - You are now Premium! 🎉")
        setLoading(false)
      },
      onClose: function() {
        alert("Payment closed")
        setLoading(false)
      }
    })
    handler.openIframe()
  }

  return (
    <>
      <script src="https://js.paystack.co/v1/inline.js"></script>
      <button 
        onClick={payWithPaystack}
        disabled={loading}
        className="bg-green-600 text-white px-8 py-3 rounded-full font-bold hover:bg-green-700"
      >
        {loading ? "Loading..." : "Pay 20 GHS with Mobile Money"}
      </button>
    </>
  )
}