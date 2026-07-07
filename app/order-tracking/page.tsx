"use client"

import * as React from "react"
import { PackageSearch, CheckCircle2, Circle } from "lucide-react"

// ---------- Mock order data ----------
interface MockOrder {
  email: string
  product: string
  date: string
  status: number
}

const MOCK_ORDERS: Record<string, MockOrder> = {
  "ORD-12345": {
    email: "user@example.com",
    product: "Basic High-Neck Puff Jacket (Black, M)",
    date: "June 30, 2026",
    status: 3
  },
  "ORD-67890": {
    email: "john@gmail.com",
    product: "Tailored Wide-Leg Trousers (Beige, L)",
    date: "July 2, 2026",
    status: 2
  },
  "ORD-11111": {
    email: "demo@arzuma.com",
    product: "Classic Leather Crossbody Bag",
    date: "July 5, 2026",
    status: 4
  }
}

const STEPS = [
  { label: "Order Placed", description: "Your order has been received." },
  { label: "Processing", description: "We are preparing your items." },
  { label: "Shipped", description: "Your order has left our warehouse." },
  { label: "In Transit", description: "Your package is on its way." },
  { label: "Delivered", description: "Your order has been delivered." }
]

export default function OrderTrackingPage() {
  const [orderId, setOrderId] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [result, setResult] = React.useState<null | "found" | "not-found">(null)
  const [orderData, setOrderData] = React.useState<MockOrder | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)

  // Auto-fill and track from search query parameters on mount
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      const qOrderId = params.get("orderId") || ""
      const qEmail = params.get("email") || ""
      if (qOrderId && qEmail) {
        // Defer synchronous state updates to the next event loop tick to avoid cascading renders
        const initialTimer = setTimeout(() => {
          setOrderId(qOrderId)
          setEmail(qEmail)
          setIsLoading(true)
          setResult(null)
          setOrderData(null)
        }, 0)

        const fetchTimer = setTimeout(() => {
          const key = qOrderId.trim().toUpperCase()
          const customOrders = JSON.parse(localStorage.getItem("custom_orders") || "{}")
          const order = customOrders[key] || MOCK_ORDERS[key]
          if (order && order.email.toLowerCase() === qEmail.trim().toLowerCase()) {
            setOrderData(order)
            setResult("found")
          } else {
            setResult("not-found")
          }
          setIsLoading(false)
        }, 900)

        return () => {
          clearTimeout(initialTimer)
          clearTimeout(fetchTimer)
        }
      }
    }
  }, [])

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setResult(null)
    setOrderData(null)

    // Simulate async look-up with a short delay
    setTimeout(() => {
      const key = orderId.trim().toUpperCase()
      const customOrders = JSON.parse(localStorage.getItem("custom_orders") || "{}")
      const order = customOrders[key] || MOCK_ORDERS[key]
      if (order && order.email.toLowerCase() === email.trim().toLowerCase()) {
        setOrderData(order)
        setResult("found")
      } else {
        setResult("not-found")
      }
      setIsLoading(false)
    }, 900)
  }

  return (
    <div className="flex-1 bg-[#fbfbfb] dark:bg-zinc-950 font-sans min-h-[calc(100vh-112px)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">

        {/* Page Heading */}
        <div className="mb-10">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#df4a4a] block mb-2">
            Customer Support
          </span>
          <h1 className="text-3xl sm:text-4xl font-normal text-zinc-900 dark:text-white tracking-tight mb-4 font-serif">
            Track Your Order
          </h1>
        </div>

        {/* Instruction Box */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-6 sm:p-8 mb-8 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
          <p className="text-[13px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
            To track your order please enter your Order ID in the box below and press the{" "}
            <span className="font-semibold text-zinc-900 dark:text-white">&ldquo;Track&rdquo;</span>{" "}
            button. This was given to you on your receipt and in the confirmation email you should have received.
          </p>
          <p className="text-[12px] text-zinc-400 dark:text-zinc-500 mt-3 italic">
            Demo Order IDs:{" "}
            <span className="font-mono font-semibold text-zinc-600 dark:text-zinc-400">ORD-12345</span>
            {" "}(email: user@example.com),{" "}
            <span className="font-mono font-semibold text-zinc-600 dark:text-zinc-400">ORD-67890</span>
            {" "}(email: john@gmail.com),{" "}
            <span className="font-mono font-semibold text-zinc-600 dark:text-zinc-400">ORD-11111</span>
            {" "}(email: demo@arzuma.com)
          </p>
        </div>

        {/* Tracking Form */}
        <form
          onSubmit={handleTrack}
          className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-6 sm:p-8 shadow-[0_1px_8px_rgba(0,0,0,0.04)] space-y-5"
        >
          {/* Order ID Field */}
          <div className="space-y-1.5">
            <label
              htmlFor="order-id-input"
              className="block text-[12px] font-semibold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider"
            >
              Order ID
            </label>
            <input
              id="order-id-input"
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="Found in your order confirmation email."
              required
              className="w-full border border-zinc-200 dark:border-zinc-700 bg-transparent text-[13px] text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-600 px-4 py-3 outline-none focus:border-zinc-900 dark:focus:border-zinc-400 transition-colors rounded-none"
            />
          </div>

          {/* Billing Email Field */}
          <div className="space-y-1.5">
            <label
              htmlFor="billing-email-input"
              className="block text-[12px] font-semibold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider"
            >
              <span className="text-[#df4a4a]">Billing</span> email
            </label>
            <input
              id="billing-email-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email you used during checkout."
              required
              className="w-full border border-zinc-200 dark:border-zinc-700 bg-transparent text-[13px] text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-600 px-4 py-3 outline-none focus:border-zinc-900 dark:focus:border-zinc-400 transition-colors rounded-none"
            />
          </div>

          {/* Track Button */}
          <div className="pt-1">
            <button
              id="track-order-btn"
              type="submit"
              disabled={isLoading}
              className="px-7 py-2.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 text-[12px] font-bold uppercase tracking-widest border border-zinc-300 dark:border-zinc-700 transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed rounded-none"
            >
              {isLoading ? "Tracking..." : "Track"}
            </button>
          </div>
        </form>

        {/* Not Found */}
        {result === "not-found" && (
          <div
            id="order-not-found-msg"
            className="mt-6 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50 px-6 py-4"
          >
            <p className="text-[13px] font-semibold text-red-700 dark:text-red-400">
              No order found.
            </p>
            <p className="text-[12px] text-red-500 dark:text-red-500 mt-1">
              Please check your Order ID and billing email and try again.
            </p>
          </div>
        )}

        {/* Found — Premium Visual Timeline */}
        {result === "found" && orderData && (
          <div
            id="order-result-section"
            className="mt-8 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-6 sm:p-8 shadow-[0_1px_8px_rgba(0,0,0,0.04)] space-y-8"
            style={{ animation: "fadeInUp 0.35s ease both" }}
          >
            {/* Order Summary */}
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 border border-[#df4a4a] text-[#df4a4a] flex items-center justify-center shrink-0">
                <PackageSearch className="h-5 w-5" />
              </div>
              <div className="space-y-0.5">
                <h2 className="text-sm font-bold text-zinc-900 dark:text-white tracking-wide uppercase">
                  Order {orderId.toUpperCase()}
                </h2>
                <p className="text-[12px] text-zinc-500 dark:text-zinc-400">{orderData.product}</p>
                <p className="text-[11px] text-zinc-400 dark:text-zinc-500">Placed on {orderData.date}</p>
              </div>
            </div>

            {/* Tracking Timeline */}
            <div className="border-t border-zinc-100 dark:border-zinc-800 pt-6">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-500 mb-6">
                Shipment Status
              </h3>

              <div className="relative">
                {/* Vertical track line */}
                <div className="absolute left-[9px] top-2 bottom-2 w-px bg-zinc-200 dark:bg-zinc-700" />

                <ol className="space-y-0">
                  {STEPS.map((step, idx) => {
                    const isCompleted = idx <= orderData.status
                    const isCurrent = idx === orderData.status
                    return (
                      <li
                        key={step.label}
                        className="relative flex items-start gap-4 pb-6 last:pb-0"
                      >
                        {/* Step Icon */}
                        <div className="relative z-10 shrink-0 mt-0.5">
                          {isCompleted ? (
                            <CheckCircle2
                              className={`h-[18px] w-[18px] ${
                                isCurrent
                                  ? "text-[#df4a4a]"
                                  : "text-zinc-400 dark:text-zinc-500"
                              }`}
                              strokeWidth={2}
                            />
                          ) : (
                            <Circle
                              className="h-[18px] w-[18px] text-zinc-200 dark:text-zinc-700"
                              strokeWidth={2}
                            />
                          )}
                        </div>

                        {/* Step Text */}
                        <div>
                          <p
                            className={`text-[12px] font-bold uppercase tracking-wider leading-none ${
                              isCurrent
                                ? "text-[#df4a4a]"
                                : isCompleted
                                ? "text-zinc-700 dark:text-zinc-300"
                                : "text-zinc-300 dark:text-zinc-600"
                            }`}
                          >
                            {step.label}
                            {isCurrent && (
                              <span className="ml-2 text-[9px] font-bold uppercase tracking-widest bg-[#df4a4a] text-white px-1.5 py-0.5 rounded-full align-middle">
                                Current
                              </span>
                            )}
                          </p>
                          <p
                            className={`text-[11px] mt-0.5 ${
                              isCompleted
                                ? "text-zinc-500 dark:text-zinc-400"
                                : "text-zinc-300 dark:text-zinc-600"
                            }`}
                          >
                            {step.description}
                          </p>
                        </div>
                      </li>
                    )
                  })}
                </ol>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
