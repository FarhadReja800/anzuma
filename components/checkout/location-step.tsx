import * as React from "react"
import { ArrowLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface LocationStepProps {
  shippingInfo: {
    name: string
    email: string
    phone: string
    address: string
    city: string
    postalCode: string
  }
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.FormEvent) => void
  onBack: () => void
}

export function LocationStep({ shippingInfo, onInputChange, onSubmit, onBack }: LocationStepProps) {
  return (
    <form onSubmit={onSubmit} className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/80 p-6 sm:p-8 shadow-[0_1px_6px_rgba(0,0,0,0.02)] rounded-2xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-zinc-955 dark:text-white tracking-tight">Delivery Location</h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">Specify where you would like your order delivered.</p>
        </div>
        <button type="button" onClick={onBack} className="text-zinc-500 hover:text-zinc-950 dark:hover:text-white flex items-center gap-1 text-xs font-semibold uppercase tracking-wider cursor-pointer">
          <ArrowLeft className="h-3.5 w-3.5" /> Back
        </button>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">Full Name</label>
            <input 
              type="text" 
              required 
              name="name" 
              value={shippingInfo.name} 
              onChange={onInputChange}
              placeholder="John Doe"
              className="w-full border border-zinc-200 dark:border-zinc-800 bg-transparent text-sm text-zinc-900 dark:text-white px-4 py-3 rounded-xl outline-none focus:border-zinc-900 dark:focus:border-zinc-400 transition"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">Email Address</label>
            <input 
              type="email" 
              required 
              name="email" 
              value={shippingInfo.email} 
              onChange={onInputChange}
              placeholder="johndoe@example.com"
              className="w-full border border-zinc-200 dark:border-zinc-800 bg-transparent text-sm text-zinc-900 dark:text-white px-4 py-3 rounded-xl outline-none focus:border-zinc-900 dark:focus:border-zinc-400 transition"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">Phone Number</label>
          <input 
            type="tel" 
            required 
            name="phone" 
            value={shippingInfo.phone} 
            onChange={onInputChange}
            placeholder="+880 1XXXXXXXXX"
            className="w-full border border-zinc-200 dark:border-zinc-800 bg-transparent text-sm text-zinc-900 dark:text-white px-4 py-3 rounded-xl outline-none focus:border-zinc-900 dark:focus:border-zinc-400 transition"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">Street Address</label>
          <input 
            type="text" 
            required 
            name="address" 
            value={shippingInfo.address} 
            onChange={onInputChange}
            placeholder="Apartment, suite, street name"
            className="w-full border border-zinc-200 dark:border-zinc-800 bg-transparent text-sm text-zinc-900 dark:text-white px-4 py-3 rounded-xl outline-none focus:border-zinc-900 dark:focus:border-zinc-400 transition"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">City</label>
            <input 
              type="text" 
              required 
              name="city" 
              value={shippingInfo.city} 
              onChange={onInputChange}
              placeholder="Dhaka"
              className="w-full border border-zinc-200 dark:border-zinc-800 bg-transparent text-sm text-zinc-900 dark:text-white px-4 py-3 rounded-xl outline-none focus:border-zinc-900 dark:focus:border-zinc-400 transition"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">Postal Code</label>
            <input 
              type="text" 
              required 
              name="postalCode" 
              value={shippingInfo.postalCode} 
              onChange={onInputChange}
              placeholder="1212"
              className="w-full border border-zinc-200 dark:border-zinc-800 bg-transparent text-sm text-zinc-900 dark:text-white px-4 py-3 rounded-xl outline-none focus:border-zinc-900 dark:focus:border-zinc-400 transition"
            />
          </div>
        </div>
      </div>

      <div className="pt-4">
        <Button 
          type="submit"
          className="w-full py-6 text-sm bg-zinc-950 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200 rounded-xl font-bold uppercase tracking-wider"
        >
          Proceed to Payment <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </form>
  )
}
