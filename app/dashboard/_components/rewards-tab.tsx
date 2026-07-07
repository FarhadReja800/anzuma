import * as React from "react"
import { Trophy, Check, Copy } from "lucide-react"
import { DashboardUser } from "./types"

interface RewardsTabProps {
  user: DashboardUser
  copiedVoucher: string | null
  handleCopyVoucher: (code: string) => void
}

export function RewardsTab({
  user,
  copiedVoucher,
  handleCopyVoucher
}: RewardsTabProps) {
  return (
    <div className="space-y-8 animate-fadeInFast">
      <div>
        <h2 className="text-xl font-normal tracking-tight font-serif text-zinc-900 dark:text-white">
          VIP Loyalty & Perks
        </h2>
        <p className="text-[11px] text-zinc-400 mt-1 uppercase tracking-widest font-semibold">
          Upgrade tiers to unlock bigger discounts & priority features
        </p>
      </div>

      {/* Loyalty Progress gauge */}
      <div className="border border-zinc-150 dark:border-zinc-805 p-6 sm:p-8 bg-white dark:bg-zinc-900 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="font-bold text-sm text-zinc-900 dark:text-white uppercase tracking-wide">
              Membership Tier status: <span className="text-[#df4a4a]">{user.tier} Member</span>
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5 font-semibold">Currently at 1,250 points. Earn 250 points more to unlock Platinum Tier.</p>
          </div>
          <div className="text-right">
            <span className="text-xs font-extrabold text-[#df4a4a] bg-[#df4a4a]/5 border border-[#df4a4a]/15 px-3 py-1 uppercase tracking-widest">
              Gold Perks Active
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-[10px] font-bold text-zinc-400">
            <span>BRONZE (0 pt)</span>
            <span>SILVER (500 pt)</span>
            <span className="text-zinc-900 dark:text-white">GOLD (1,000 pt)</span>
            <span>PLATINUM (1,500 pt)</span>
          </div>
          
          <div className="h-3 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden relative border dark:border-zinc-700/50">
            <div 
              className="h-full bg-gradient-to-r from-amber-500 to-[#df4a4a] rounded-full transition-all duration-1000"
              style={{ width: "83.3%" }}
            />
            <div className="absolute left-[83.3%] top-1/2 -translate-y-1/2 -translate-x-1/2 h-5 w-5 bg-white border-4 border-[#df4a4a] rounded-full shadow-md animate-pulse" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400">
          Unlockable Voucher Offers
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { code: "ARZUMA50", desc: "Get 50% discount on all Sweatshirts collection items.", details: "Gold & Platinum member priority voucher", tier: "Gold Only" },
            { code: "FREESHIP", desc: "Free express priority shipping worldwide with no minimum cart spend.", details: "Applies to clothing & outerwear", tier: "Silver & Above" },
            { code: "VIP15", desc: "Enjoy 15% extra off your overall shopping cart total at checkout.", details: "One-time usage per customer", tier: "Bronze & Above" }
          ].map((v) => (
            <div 
              key={v.code}
              className="border border-zinc-150 dark:border-zinc-805 bg-white dark:bg-zinc-900 flex flex-col justify-between"
            >
              <div className="p-6 border-b border-dashed border-zinc-200 dark:border-zinc-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold uppercase bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 px-2 py-0.5 tracking-wider">
                    {v.tier}
                  </span>
                  <Trophy className="h-4.5 w-4.5 text-[#df4a4a]" />
                </div>
                <h4 className="font-extrabold text-sm text-zinc-900 dark:text-white uppercase tracking-wide">
                  {v.code}
                </h4>
                <p className="text-xs text-zinc-550 dark:text-zinc-400 leading-relaxed font-medium">
                  {v.desc}
                </p>
              </div>

              <div className="px-6 py-4 bg-zinc-50 dark:bg-zinc-950/40 flex items-center justify-between">
                <span className="text-[10px] text-zinc-455 dark:text-zinc-500 font-semibold">{v.details}</span>
                
                <button
                  onClick={() => handleCopyVoucher(v.code)}
                  className="flex items-center gap-1 text-[10px] font-bold text-[#df4a4a] hover:underline uppercase tracking-wider cursor-pointer"
                >
                  {copiedVoucher === v.code ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Claim</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
