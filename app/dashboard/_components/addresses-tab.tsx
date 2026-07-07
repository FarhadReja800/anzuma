import * as React from "react"
import { MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Address } from "./types"

interface AddressesTabProps {
  billingAddress: Address
  shippingAddress: Address
  billingForm: Address
  shippingForm: Address
  setBillingForm: React.Dispatch<React.SetStateAction<Address>>
  setShippingForm: React.Dispatch<React.SetStateAction<Address>>
  isEditingBilling: boolean
  isEditingShipping: boolean
  setIsEditingBilling: (val: boolean) => void
  setIsEditingShipping: (val: boolean) => void
  handleSaveBilling: (e: React.FormEvent) => void
  handleSaveShipping: (e: React.FormEvent) => void
}

export function AddressesTab({
  billingAddress,
  shippingAddress,
  billingForm,
  shippingForm,
  setBillingForm,
  setShippingForm,
  isEditingBilling,
  isEditingShipping,
  setIsEditingBilling,
  setIsEditingShipping,
  handleSaveBilling,
  handleSaveShipping
}: AddressesTabProps) {
  return (
    <div className="space-y-6 animate-fadeInFast">
      <div>
        <h2 className="text-xl font-normal tracking-tight font-serif text-zinc-900 dark:text-white">
          Stored Address Book
        </h2>
        <p className="text-[11px] text-zinc-400 mt-1 uppercase tracking-widest font-semibold">
          Set billing and delivery endpoints for smooth checkout
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Billing Address Card */}
        <div className="border border-zinc-150 dark:border-zinc-805 p-6 bg-white dark:bg-zinc-900 shadow-sm relative">
          <div className="flex items-center justify-between border-b pb-4 mb-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4.5 w-4.5 text-[#df4a4a]" />
              <h3 className="font-bold text-xs uppercase tracking-widest text-zinc-900 dark:text-white">
                Billing Address
              </h3>
            </div>
            {!isEditingBilling && (
              <button 
                onClick={() => {
                  setBillingForm(billingAddress)
                  setIsEditingBilling(true)
                }}
                className="text-[10px] font-bold text-[#df4a4a] hover:underline uppercase tracking-wider cursor-pointer"
              >
                Change
              </button>
            )}
          </div>

          {isEditingBilling ? (
            <form onSubmit={handleSaveBilling} className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="text-[9px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Recipient Name</label>
                <input 
                  type="text" 
                  required
                  value={billingForm.name} 
                  onChange={e => setBillingForm({ ...billingForm, name: e.target.value })}
                  className="w-full border border-zinc-200 dark:border-zinc-700 bg-transparent px-3 py-2 outline-none focus:border-zinc-900 dark:focus:border-zinc-400 text-xs font-normal"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Street Address</label>
                <input 
                  type="text" 
                  required
                  value={billingForm.street} 
                  onChange={e => setBillingForm({ ...billingForm, street: e.target.value })}
                  className="w-full border border-zinc-200 dark:border-zinc-700 bg-transparent px-3 py-2 outline-none focus:border-zinc-900 dark:focus:border-zinc-400 text-xs font-normal"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">City</label>
                  <input 
                    type="text" 
                    required
                    value={billingForm.city} 
                    onChange={e => setBillingForm({ ...billingForm, city: e.target.value })}
                    className="w-full border border-zinc-200 dark:border-zinc-700 bg-transparent px-3 py-2 outline-none focus:border-zinc-900 text-xs font-normal"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Division/State</label>
                  <input 
                    type="text" 
                    required
                    value={billingForm.state} 
                    onChange={e => setBillingForm({ ...billingForm, state: e.target.value })}
                    className="w-full border border-zinc-200 dark:border-zinc-700 bg-transparent px-3 py-2 outline-none focus:border-zinc-900 text-xs font-normal"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Zip Code</label>
                  <input 
                    type="text" 
                    required
                    value={billingForm.zip} 
                    onChange={e => setBillingForm({ ...billingForm, zip: e.target.value })}
                    className="w-full border border-zinc-200 dark:border-zinc-700 bg-transparent px-3 py-2 outline-none focus:border-zinc-900 text-xs font-normal"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Country</label>
                  <input 
                    type="text" 
                    required
                    value={billingForm.country} 
                    onChange={e => setBillingForm({ ...billingForm, country: e.target.value })}
                    className="w-full border border-zinc-200 dark:border-zinc-700 bg-transparent px-3 py-2 outline-none focus:border-zinc-900 text-xs font-normal"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Phone</label>
                <input 
                  type="text" 
                  required
                  value={billingForm.phone} 
                  onChange={e => setBillingForm({ ...billingForm, phone: e.target.value })}
                  className="w-full border border-zinc-200 dark:border-zinc-700 bg-transparent px-3 py-2 outline-none focus:border-zinc-900 text-xs font-normal"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <Button type="submit" className="h-8 rounded-none text-[10px] font-bold uppercase px-4 bg-zinc-955 text-white cursor-pointer">
                  Save Address
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsEditingBilling(false)}
                  className="h-8 rounded-none text-[10px] font-bold uppercase px-4 border-zinc-200 cursor-pointer"
                >
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <div className="text-xs space-y-3 leading-relaxed">
              <p className="font-bold text-zinc-950 dark:text-white uppercase">{billingAddress.name}</p>
              <div className="text-zinc-600 dark:text-zinc-400 font-medium">
                <p>{billingAddress.street}</p>
                <p>{billingAddress.city}, {billingAddress.state} {billingAddress.zip}</p>
                <p>{billingAddress.country}</p>
              </div>
              <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 text-[10px] text-zinc-400 flex items-center gap-1.5 font-semibold">
                <Phone className="h-3 w-3 text-[#df4a4a]" />
                <span>Phone: {billingAddress.phone}</span>
              </div>
            </div>
          )}
        </div>

        {/* Shipping Address Card */}
        <div className="border border-zinc-150 dark:border-zinc-805 p-6 bg-white dark:bg-zinc-900 shadow-sm relative">
          <div className="flex items-center justify-between border-b pb-4 mb-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4.5 w-4.5 text-blue-500" />
              <h3 className="font-bold text-xs uppercase tracking-widest text-zinc-900 dark:text-white">
                Shipping Address
              </h3>
            </div>
            {!isEditingShipping && (
              <button 
                onClick={() => {
                  setShippingForm(shippingAddress)
                  setIsEditingShipping(true)
                }}
                className="text-[10px] font-bold text-[#df4a4a] hover:underline uppercase tracking-wider cursor-pointer"
              >
                Change
              </button>
            )}
          </div>

          {isEditingShipping ? (
            <form onSubmit={handleSaveShipping} className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="text-[9px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Recipient Name</label>
                <input 
                  type="text" 
                  required
                  value={shippingForm.name} 
                  onChange={e => setShippingForm({ ...shippingForm, name: e.target.value })}
                  className="w-full border border-zinc-200 dark:border-zinc-700 bg-transparent px-3 py-2 outline-none focus:border-zinc-900 text-xs font-normal"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Street Address</label>
                <input 
                  type="text" 
                  required
                  value={shippingForm.street} 
                  onChange={e => setShippingForm({ ...shippingForm, street: e.target.value })}
                  className="w-full border border-zinc-200 dark:border-zinc-700 bg-transparent px-3 py-2 outline-none focus:border-zinc-900 text-xs font-normal"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">City</label>
                  <input 
                    type="text" 
                    required
                    value={shippingForm.city} 
                    onChange={e => setShippingForm({ ...shippingForm, city: e.target.value })}
                    className="w-full border border-zinc-200 dark:border-zinc-700 bg-transparent px-3 py-2 outline-none focus:border-zinc-900 text-xs font-normal"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Division/State</label>
                  <input 
                    type="text" 
                    required
                    value={shippingForm.state} 
                    onChange={e => setShippingForm({ ...shippingForm, state: e.target.value })}
                    className="w-full border border-zinc-200 dark:border-zinc-700 bg-transparent px-3 py-2 outline-none focus:border-zinc-900 text-xs font-normal"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Zip Code</label>
                  <input 
                    type="text" 
                    required
                    value={shippingForm.zip} 
                    onChange={e => setShippingForm({ ...shippingForm, zip: e.target.value })}
                    className="w-full border border-zinc-200 dark:border-zinc-700 bg-transparent px-3 py-2 outline-none focus:border-zinc-900 text-xs font-normal"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Country</label>
                  <input 
                    type="text" 
                    required
                    value={shippingForm.country} 
                    onChange={e => setShippingForm({ ...shippingForm, country: e.target.value })}
                    className="w-full border border-zinc-200 dark:border-zinc-700 bg-transparent px-3 py-2 outline-none focus:border-zinc-900 text-xs font-normal"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Phone</label>
                <input 
                  type="text" 
                  required
                  value={shippingForm.phone} 
                  onChange={e => setShippingForm({ ...shippingForm, phone: e.target.value })}
                  className="w-full border border-zinc-200 dark:border-zinc-700 bg-transparent px-3 py-2 outline-none focus:border-zinc-900 text-xs font-normal"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <Button type="submit" className="h-8 rounded-none text-[10px] font-bold uppercase px-4 bg-zinc-955 text-white cursor-pointer">
                  Save Address
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsEditingShipping(false)}
                  className="h-8 rounded-none text-[10px] font-bold uppercase px-4 border-zinc-200 cursor-pointer"
                >
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <div className="text-xs space-y-3 leading-relaxed">
              <p className="font-bold text-zinc-950 dark:text-white uppercase">{shippingAddress.name}</p>
              <div className="text-zinc-600 dark:text-zinc-400 font-medium">
                <p>{shippingAddress.street}</p>
                <p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.zip}</p>
                <p>{shippingAddress.country}</p>
              </div>
              <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 text-[10px] text-zinc-400 flex items-center gap-1.5 font-semibold">
                <Phone className="h-3 w-3 text-[#df4a4a]" />
                <span>Phone: {shippingAddress.phone}</span>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
