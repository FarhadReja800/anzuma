import * as React from "react"
import Link from "next/link"
import { CheckCircle2 } from "lucide-react"

interface SuccessStepProps {
  orderId: string
  email: string
  address: string
  city: string
  paymentMethod: "cod" | "card" | "mobile"
}

export function SuccessStep({
  orderId,
  email,
  address,
  city,
  paymentMethod,
}: SuccessStepProps) {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/80 p-8 sm:p-10 shadow-[0_1px_6px_rgba(0,0,0,0.02)] rounded-2xl text-center space-y-6 animate-scaleIn">
      <div className="h-16 w-16 bg-emerald-50 dark:bg-emerald-955/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
        <CheckCircle2 className="h-10 w-10" />
      </div>
      
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-zinc-950 dark:text-white tracking-tight">Order Placed Successfully!</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">Thank you for your purchase. We are now preparing your order.</p>
      </div>

      <div className="bg-zinc-50 dark:bg-zinc-950 p-4.5 rounded-2xl inline-block max-w-sm mx-auto w-full text-left space-y-3.5 border border-zinc-100 dark:border-zinc-900">
        <div className="flex justify-between text-xs">
          <span className="text-zinc-500">Order ID:</span>
          <span className="font-mono font-bold text-zinc-955 dark:text-white uppercase">{orderId}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-zinc-500">Billing Email:</span>
          <span className="font-semibold text-zinc-955 dark:text-white">{email}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-zinc-500">Delivery Address:</span>
          <span className="font-semibold text-zinc-955 dark:text-white max-w-48 text-right truncate">{address}, {city}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-zinc-500">Payment:</span>
          <span className="font-semibold text-zinc-955 dark:text-white capitalize">{paymentMethod === "cod" ? "Cash on Delivery" : paymentMethod === "card" ? "Credit Card" : "Mobile Banking"}</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto pt-4">
        <Link 
          href={`/order-tracking?orderId=${orderId}&email=${email}`} 
          className="flex-grow py-3 text-center bg-[#df4a4a] text-white hover:bg-[#c73e3e] text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-xl transition duration-300"
        >
          Track Shipment
        </Link>
        <Link 
          href="/dashboard" 
          className="flex-grow py-3 text-center bg-zinc-950 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-xl transition duration-300"
        >
          View Dashboard
        </Link>
        <Link 
          href="/" 
          className="flex-grow py-3 text-center border border-zinc-200 hover:border-zinc-900 dark:border-zinc-800 dark:hover:border-zinc-200 text-zinc-955 dark:text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-xl transition duration-300"
        >
          Home
        </Link>
      </div>
    </div>
  )
}
export default SuccessStep
