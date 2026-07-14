"use client"

import * as React from "react"
import { Globe } from "lucide-react"

interface AuditTabProps {
  logs: string[]
  clearLogs: () => void
}

export function AuditTab({ logs, clearLogs }: AuditTabProps) {
  return (
    <div className="space-y-6 animate-fadeInFast">
      <div className="flex justify-between items-center">
        <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-200 flex items-center gap-2">
          <Globe className="h-4.5 w-4.5 text-red-500" />
          Live Kernel Auditing Trail
        </h2>
        <button 
          onClick={clearLogs}
          className="text-[10px] font-bold uppercase tracking-wider border border-zinc-800 text-zinc-400 hover:text-white px-3 py-1.5 hover:bg-zinc-900 transition cursor-pointer bg-transparent"
        >
          Clear Screen Logs
        </button>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 p-6">
        <div className="bg-zinc-950 p-6 border border-zinc-850 rounded-none h-[420px] overflow-y-auto font-mono text-xs text-emerald-400 space-y-2 select-text leading-relaxed">
          {logs.length === 0 ? (
            <div className="text-zinc-500 text-center uppercase tracking-wide py-12">Logs list is currently clean.</div>
          ) : (
            logs.map((log, i) => (
              <div key={i} className="flex gap-3 hover:bg-zinc-900/30 py-0.5">
                <span className="text-red-500">▶</span>
                <span>{log}</span>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">
        Audit log outputs are generated continuously based on mock interactions and localStorage state transactions.
      </div>
    </div>
  )
}
