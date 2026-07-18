"use client"

import * as React from "react"
import { SupportTicket } from "../../../_components/types"

interface TicketsTabProps {
  tickets: SupportTicket[]
  handleAssignTicket: (ticketId: string, moderator: string) => void
}

export function TicketsTab({ tickets, handleAssignTicket }: TicketsTabProps) {
  return (
    <div className="space-y-6 animate-fadeInFast">
      <h2 className="text-xs font-bold uppercase tracking-widest text-black dark:text-zinc-200">
        Customer Support Assignment Allocation
      </h2>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-x-auto shadow-[0_1px_3px_rgba(0,0,0,0.01)] rounded-2xl">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-800 text-black dark:text-zinc-400 font-bold uppercase tracking-widest text-[9px] bg-zinc-50/50 dark:bg-zinc-900/50">
              <th className="p-4">Ticket ID</th>
              <th className="p-4">Ticket Subject</th>
              <th className="p-4">Category</th>
              <th className="p-4">Priority</th>
              <th className="p-4">Date</th>
              <th className="p-4 text-right">Assign Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/80">
            {tickets.map((t) => (
              <tr key={t.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-850/30 transition-colors">
                <td className="p-4 font-mono font-bold text-black/60 dark:text-zinc-450">{t.id}</td>
                <td className="p-4 font-bold text-black dark:text-zinc-200 uppercase tracking-wide">{t.subject}</td>
                <td className="p-4 text-black/85 dark:text-zinc-400 font-medium">{t.category}</td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider border rounded ${
                    t.priority === "High" || t.priority === "Urgent"
                      ? "bg-red-50 text-red-750 border-red-200 dark:bg-red-955 dark:text-red-400 dark:border-red-500/20"
                      : "bg-zinc-50 text-zinc-550 border-zinc-200 dark:bg-zinc-950 dark:text-zinc-400 dark:border-zinc-855"
                  }`}>
                    {t.priority}
                  </span>
                </td>
                <td className="p-4 text-black/75 dark:text-zinc-400">{t.date}</td>
                <td className="p-4 text-right">
                  <select
                    onChange={(e) => handleAssignTicket(t.id, e.target.value)}
                    className="bg-white dark:bg-zinc-955 border border-zinc-200 dark:border-zinc-800 text-[10px] uppercase font-bold tracking-wider py-1.5 px-2.5 outline-none focus:border-indigo-500 text-black dark:text-zinc-300 cursor-pointer rounded-lg"
                  >
                    <option value="Unassigned" className="bg-white dark:bg-zinc-900">Assign Staff...</option>
                    <option value="Agent Sarah" className="bg-white dark:bg-zinc-900">Agent Sarah</option>
                    <option value="Agent Smith" className="bg-white dark:bg-zinc-900">Agent Smith</option>
                    <option value="Dave Moderator" className="bg-white dark:bg-zinc-900">Dave Moderator</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
