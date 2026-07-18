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
        <h2 className="text-xs font-bold uppercase tracking-widest text-black dark:text-zinc-200 flex items-center gap-2">
          <Globe className="h-4.5 w-4.5 text-red-500" />
          Live Kernel Auditing Trail
        </h2>
        <button 
          onClick={clearLogs}
          className="text-[10px] font-bold uppercase tracking-wider border border-zinc-200 dark:border-zinc-800 text-black/75 dark:text-zinc-400 hover:text-black dark:hover:text-white px-3 py-1.5 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition cursor-pointer bg-transparent rounded-xl"
        >
          Clear Screen Logs
        </button>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 shadow-[0_1px_3px_rgba(0,0,0,0.01)] rounded-2xl">
        <div className="bg-zinc-50 dark:bg-zinc-955 p-6 border border-zinc-200 dark:border-zinc-850 rounded-xl h-[420px] overflow-y-auto font-mono text-xs text-black dark:text-emerald-400 space-y-2 select-text leading-relaxed">
          {logs.length === 0 ? (
            <div className="text-black/50 text-center uppercase tracking-wide py-12">Logs list is currently clean.</div>
          ) : (
            logs.map((log, i) => (
              <div key={i} className="flex gap-3 hover:bg-zinc-200/50 dark:hover:bg-zinc-900/30 py-0.5 px-1 rounded transition-colors">
                <span className="text-red-500">▶</span>
                <span>{log}</span>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="text-[10px] text-black/60 dark:text-zinc-400 font-semibold uppercase tracking-wider">
        Audit log outputs are generated continuously based on mock interactions and localStorage state transactions.
      </div>
    </div>
  )
}
