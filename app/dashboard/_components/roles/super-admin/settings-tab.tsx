"use client"

import * as React from "react"
import { Settings, AlertTriangle, ShieldAlert } from "lucide-react"

interface SettingsTabProps {
  siteName: string
  setSiteName: (name: string) => void
  allowRegistration: boolean
  setAllowRegistration: (allow: boolean) => void
  maintenanceMode: boolean
  setMaintenanceMode: (mode: boolean) => void
  handleSaveSettings: (e: React.FormEvent) => void
  backupRunning?: boolean
  backupProgress?: string
  handleTriggerBackup?: () => void
  logs?: string[]
}

export function SettingsTab({
  siteName,
  setSiteName,
  allowRegistration,
  setAllowRegistration,
  maintenanceMode,
  setMaintenanceMode,
  handleSaveSettings,
  backupRunning = false,
  backupProgress = "",
  handleTriggerBackup = () => {},
  logs = []
}: SettingsTabProps) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 p-8 max-w-2xl animate-fadeInFast space-y-8">
      <div>
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
                    <span className="flex items-center gap-1.5 text-[10px] text-red-500 font-bold bg-red-955/35 border border-red-500/20 px-2 py-0.5 rounded-full">
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

      {/* Backup Controls */}
      <div className="pt-6 border-t border-zinc-800 space-y-4">
        <h3 className="text-[11px] font-bold text-zinc-300 uppercase tracking-widest flex items-center gap-2">
          <ShieldAlert className="h-4 w-4 text-zinc-500" />
          System Backups & Snapshots
        </h3>
        <p className="text-[11px] text-zinc-550">
          Create a complete backup of the database cluster, configurations, and media assets.
        </p>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <button
            type="button"
            onClick={handleTriggerBackup}
            disabled={backupRunning}
            className={`
              bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold uppercase tracking-widest text-[10px] px-4 py-2.5 transition duration-200 cursor-pointer border border-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed shrink-0
            `}
          >
            {backupRunning ? "Backup in Progress..." : "Trigger Full Backup"}
          </button>
          {backupRunning && (
            <div className="flex-1 space-y-1.5">
              <div className="flex justify-between text-[9px] text-zinc-400 font-mono">
                <span>{backupProgress}</span>
              </div>
              <div className="w-full bg-zinc-950 h-1.5 border border-zinc-800">
                <div className="bg-red-500 h-full transition-all duration-350 w-[75%] animate-pulse"></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Live System Logs */}
      <div className="pt-6 border-t border-zinc-800 space-y-4">
        <h3 className="text-[11px] font-bold text-zinc-300 uppercase tracking-widest">
          Live System Logs
        </h3>
        <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-none font-mono text-[10px] text-zinc-400 h-40 overflow-y-auto space-y-1.5 scrollbar-thin scrollbar-thumb-zinc-800">
          {logs.length > 0 ? (
            logs.map((log, index) => (
              <div key={index} className="leading-relaxed hover:bg-white/5 px-1 py-0.5 rounded transition-colors">
                <span className="text-zinc-600 mr-2">&gt;</span>
                {log}
              </div>
            ))
          ) : (
            <div className="text-zinc-600 italic text-center py-12">No logs captured.</div>
          )}
        </div>
      </div>
    </div>
  )
}
