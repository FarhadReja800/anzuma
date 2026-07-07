import * as React from "react"
import { Button } from "@/components/ui/button"

interface SettingsTabProps {
  profileName: string
  profileEmail: string
  profilePhone: string
  currentPassword: string
  newPassword: string
  showPasswordFields: boolean
  setProfileName: (val: string) => void
  setProfileEmail: (val: string) => void
  setProfilePhone: (val: string) => void
  setCurrentPassword: (val: string) => void
  setNewPassword: (val: string) => void
  setShowPasswordFields: (val: boolean) => void
  handleSaveProfile: (e: React.FormEvent) => void
}

export function SettingsTab({
  profileName,
  profileEmail,
  profilePhone,
  currentPassword,
  newPassword,
  showPasswordFields,
  setProfileName,
  setProfileEmail,
  setProfilePhone,
  setCurrentPassword,
  setNewPassword,
  setShowPasswordFields,
  handleSaveProfile
}: SettingsTabProps) {
  return (
    <div className="space-y-6 animate-fadeInFast">
      <div>
        <h2 className="text-xl font-normal tracking-tight font-serif text-zinc-900 dark:text-white">
          Account Credentials
        </h2>
        <p className="text-[11px] text-zinc-400 mt-1 uppercase tracking-widest font-semibold">
          Manage personal profile options & password security
        </p>
      </div>

      <div className="border border-zinc-150 dark:border-zinc-805 p-6 sm:p-8 bg-white dark:bg-zinc-900 shadow-sm max-w-2xl">
        <form onSubmit={handleSaveProfile} className="space-y-5 text-xs font-semibold">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[9px] uppercase tracking-wider text-zinc-500">Full Name *</label>
              <input 
                type="text" 
                required
                value={profileName}
                onChange={e => setProfileName(e.target.value)}
                className="w-full border border-zinc-200 dark:border-zinc-700 bg-transparent px-3 py-2 outline-none focus:border-zinc-900 text-xs font-normal"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] uppercase tracking-wider text-zinc-500">Phone Number</label>
              <input 
                type="text" 
                value={profilePhone}
                onChange={e => setProfilePhone(e.target.value)}
                className="w-full border border-zinc-200 dark:border-zinc-700 bg-transparent px-3 py-2 outline-none focus:border-zinc-900 text-xs font-normal"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[9px] uppercase tracking-wider text-zinc-500">Email Address *</label>
            <input 
              type="email" 
              required
              value={profileEmail}
              onChange={e => setProfileEmail(e.target.value)}
              className="w-full border border-zinc-200 dark:border-zinc-700 bg-transparent px-3 py-2 outline-none focus:border-zinc-900 text-xs font-normal"
            />
          </div>

          <div className="pt-2 border-t dark:border-zinc-800">
            <button 
              type="button"
              onClick={() => setShowPasswordFields(!showPasswordFields)}
              className="text-[10px] font-bold text-[#df4a4a] hover:underline uppercase tracking-wider flex items-center gap-1 cursor-pointer"
            >
              {showPasswordFields ? "Hide Password Settings" : "Change Security Password"}
            </button>
          </div>

          {showPasswordFields && (
            <div className="space-y-4 animate-slideDown">
              <div className="space-y-1">
                <label className="text-[9px] uppercase tracking-wider text-zinc-500">Current Password *</label>
                <input 
                  type="password" 
                  required={newPassword.length > 0}
                  value={currentPassword}
                  onChange={e => setCurrentPassword(e.target.value)}
                  className="w-full border border-zinc-200 dark:border-zinc-700 bg-transparent px-3 py-2 outline-none focus:border-zinc-900 text-xs font-normal"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] uppercase tracking-wider text-zinc-500">New Password *</label>
                <input 
                  type="password" 
                  required={currentPassword.length > 0}
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  className="w-full border border-zinc-200 dark:border-zinc-700 bg-transparent px-3 py-2 outline-none focus:border-zinc-900 text-xs font-normal"
                />
              </div>
            </div>
          )}

          <div className="pt-4 border-t dark:border-zinc-800 space-y-3.5">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Communication Preferences</h4>
            
            <div className="space-y-2.5">
              {[
                { id: "promo", label: "Receive promotional offers and exclusive coupons" },
                { id: "tracking", label: "Send SMS updates for live parcel shipping logs" },
                { id: "newsletter", label: "Receive weekly newsletters on fresh collections" }
              ].map((pref) => (
                <label key={pref.id} className="flex items-center gap-2 text-xs font-medium text-zinc-755 dark:text-zinc-350 cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    defaultChecked 
                    className="h-4 w-4 border-zinc-250 dark:border-zinc-800 accent-[#df4a4a]" 
                  />
                  <span>{pref.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <Button 
              type="submit" 
              className="h-9 rounded-none bg-[#df4a4a] text-white hover:bg-[#c83c3c] text-[10px] font-bold uppercase tracking-widest px-8 cursor-pointer"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
