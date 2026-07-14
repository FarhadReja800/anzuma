"use client"

import * as React from "react"
import { Settings, AlertTriangle } from "lucide-react"

interface SettingsTabProps {
  siteName: string
  setSiteName: (name: string) => void
  allowRegistration: boolean
  setAllowRegistration: (allow: boolean) => void
  maintenanceMode: boolean
  setMaintenanceMode: (mode: boolean) => void
  handleSaveSettings: (e: React.FormEvent) => void
}

export function SettingsTab({
  siteName,
  setSiteName,
  allowRegistration,
  setAllowRegistration,
  maintenanceMode,
  setMaintenanceMode,
  handleSaveSettings
}: SettingsTabProps) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 p-8 max-w-2xl animate-fadeInFast">
      <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-200 mb-6 flex items-center gap-2">
        <Settings className="h-4 w-4 text-red-500" />
        System Architecture Configuration
      </h2>

      <form onSubmit={handleSaveSettings} className="space-y-6">
        
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">
            Site Brand Name
          </label>
          <input 
            type="text"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 px-4 py-3 text-xs outline-none focus:border-red-500 text-zinc-200"
          />
        </div>

        <div className="space-y-4 pt-2">
          <div className="flex items-start">
            <label className="flex items-center gap-3 text-xs font-semibold text-zinc-350 select-none cursor-pointer">
              <input 
                type="checkbox"
                checked={allowRegistration}
                onChange={(e) => setAllowRegistration(e.target.checked)}
                className="h-4.5 w-4.5 border-zinc-800 bg-zinc-955 accent-red-500 rounded-none cursor-pointer"
              />
              <span>Allow New User Registrations</span>
            </label>
          </div>

          <div className="flex items-start">
            <label className="flex items-center gap-3 text-xs font-semibold text-zinc-350 select-none cursor-pointer">
              <input 
                type="checkbox"
                checked={maintenanceMode}
                onChange={(e) => setMaintenanceMode(e.target.checked)}
                className="h-4.5 w-4.5 border-zinc-800 bg-zinc-955 accent-red-500 rounded-none cursor-pointer"
              />
              <span className="flex items-center gap-2">
                Enable System Maintenance Mode 
                {maintenanceMode && (
                  <span className="flex items-center gap-1.5 text-[10px] text-red-500 font-bold bg-red-955 border border-red-500/20 px-2 py-0.5 rounded-full">
                    <AlertTriangle className="h-3 w-3 animate-bounce" /> Under Maintenance
                  </span>
                )}
              </span>
            </label>
          </div>
        </div>

        <div className="pt-4 border-t border-zinc-800">
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-500 text-white font-bold uppercase tracking-widest text-xs px-6 py-3.5 transition duration-200 select-none cursor-pointer hover:shadow-lg hover:shadow-red-600/10"
          >
            Save Configurations
          </button>
        </div>

      </form>
    </div>
  )
}
