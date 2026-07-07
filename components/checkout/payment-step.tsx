import * as React from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PaymentStepProps {
  paymentMethod: "cod" | "card" | "mobile"
  setPaymentMethod: (method: "cod" | "card" | "mobile") => void
  cardDetails: {
    number: string
    expiry: string
    cvc: string
  }
  onCardChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  mobileNumber: string
  setMobileNumber: (val: string) => void
  onSubmit: (e: React.FormEvent) => void
  onBack: () => void
}

export function PaymentStep({
  paymentMethod,
  setPaymentMethod,
  cardDetails,
  onCardChange,
  mobileNumber,
  setMobileNumber,
  onSubmit,
  onBack,
}: PaymentStepProps) {
  return (
    <form onSubmit={onSubmit} className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/80 p-6 sm:p-8 shadow-[0_1px_6px_rgba(0,0,0,0.02)] rounded-2xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-zinc-955 dark:text-white tracking-tight">Payment Method</h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">Choose how you would like to pay for your order.</p>
        </div>
        <button type="button" onClick={onBack} className="text-zinc-500 hover:text-zinc-955 dark:hover:text-white flex items-center gap-1 text-xs font-semibold uppercase tracking-wider cursor-pointer">
          <ArrowLeft className="h-3.5 w-3.5" /> Back
        </button>
      </div>

      {/* Selection Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {([
          { id: "cod", title: "Cash on Delivery", subtitle: "Pay at your door" },
          { id: "card", title: "Credit Card", subtitle: "Visa / Mastercard" },
          { id: "mobile", title: "Mobile Banking", subtitle: "bKash / Nagad" }
        ] as const).map((method) => (
          <div 
            key={method.id}
            onClick={() => setPaymentMethod(method.id)}
            className={`border rounded-2xl p-4.5 cursor-pointer flex flex-col justify-between h-28 transition-all select-none ${
              paymentMethod === method.id 
                ? "border-[#df4a4a] bg-[#df4a4a]/5 dark:bg-[#df4a4a]/10" 
                : "border-zinc-150 dark:border-zinc-800 hover:border-zinc-350 dark:hover:border-zinc-700"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">{method.title}</span>
              <div className={`h-4.5 w-4.5 rounded-full border flex items-center justify-center ${
                paymentMethod === method.id ? "border-[#df4a4a]" : "border-zinc-300"
              }`}>
                {paymentMethod === method.id && <div className="h-2.5 w-2.5 rounded-full bg-[#df4a4a]" />}
              </div>
            </div>
            <span className="text-[11px] text-zinc-500 dark:text-zinc-450 font-light">{method.subtitle}</span>
          </div>
        ))}
      </div>

      {/* Conditional Fields based on method */}
      {paymentMethod === "card" && (
        <div className="space-y-4 border border-zinc-150 dark:border-zinc-800 p-4.5 rounded-2xl animate-scaleIn bg-zinc-50/50 dark:bg-zinc-900/30">
          <div className="space-y-1.5">
            <label className="block text-[10px] font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">Card Number</label>
            <input 
              type="text" 
              required 
              name="number" 
              value={cardDetails.number} 
              onChange={onCardChange}
              placeholder="4111 2222 3333 4444"
              className="w-full border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-950 text-sm text-zinc-900 dark:text-white px-4 py-3 rounded-xl outline-none focus:border-zinc-900 dark:focus:border-zinc-400 transition"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">Expiry Date</label>
              <input 
                type="text" 
                required 
                name="expiry" 
                value={cardDetails.expiry} 
                onChange={onCardChange}
                placeholder="MM/YY"
                className="w-full border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-950 text-sm text-zinc-900 dark:text-white px-4 py-3 rounded-xl outline-none focus:border-zinc-900 dark:focus:border-zinc-400 transition"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">CVC</label>
              <input 
                type="password" 
                required 
                maxLength={3} 
                name="cvc" 
                value={cardDetails.cvc} 
                onChange={onCardChange}
                placeholder="123"
                className="w-full border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-955 text-sm text-zinc-900 dark:text-white px-4 py-3 rounded-xl outline-none focus:border-zinc-900 dark:focus:border-zinc-400 transition"
              />
            </div>
          </div>
        </div>
      )}

      {paymentMethod === "mobile" && (
        <div className="space-y-4 border border-zinc-150 dark:border-zinc-800 p-4.5 rounded-2xl animate-scaleIn bg-zinc-50/50 dark:bg-zinc-900/30">
          <div className="space-y-1.5">
            <label className="block text-[10px] font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">bKash or Nagad Wallet Number</label>
            <input 
              type="tel" 
              required 
              placeholder="017XXXXXXXX"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              className="w-full border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-950 text-sm text-zinc-900 dark:text-white px-4 py-3 rounded-xl outline-none focus:border-zinc-900 dark:focus:border-zinc-400 transition"
            />
          </div>
        </div>
      )}

      {paymentMethod === "cod" && (
        <div className="border border-zinc-150 dark:border-zinc-800 p-4.5 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/30">
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-light">
            Pay with cash upon delivery. A delivery partner will collect the payment when the package is delivered to your address.
          </p>
        </div>
      )}

      <div className="pt-4">
        <Button 
          type="submit"
          className="w-full py-6 text-sm bg-zinc-950 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200 rounded-xl font-bold uppercase tracking-wider"
        >
          Complete Order & Place Request
        </Button>
      </div>
    </form>
  )
}
