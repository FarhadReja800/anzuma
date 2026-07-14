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
      <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-200">
        Customer Support Assignment Allocation
      </h2>

      <div className="bg-zinc-900 border border-zinc-800 overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-zinc-800 text-zinc-400 font-bold uppercase tracking-widest text-[9px] bg-zinc-950">
              <th className="p-4">Ticket ID</th>
              <th className="p-4">Ticket Subject</th>
              <th className="p-4">Category</th>
              <th className="p-4">Priority</th>
              <th className="p-4">Date</th>
              <th className="p-4 text-right">Assign Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-850">
            {tickets.map((t) => (
              <tr key={t.id} className="hover:bg-zinc-850/50 transition">
                <td className="p-4 font-mono font-bold text-zinc-350">{t.id}</td>
                <td className="p-4 font-bold text-zinc-200 uppercase tracking-wide">{t.subject}</td>
                <td className="p-4 text-zinc-450 font-medium">{t.category}</td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider border ${
                    t.priority === "High" || t.priority === "Urgent"
                      ? "bg-red-955 text-red-400 border-red-500/20"
                      : "bg-zinc-950 text-zinc-400 border-zinc-850"
                  }`}>
                    {t.priority}
                  </span>
                </td>
                <td className="p-4 text-zinc-455">{t.date}</td>
                <td className="p-4 text-right">
                  <select
                    onChange={(e) => handleAssignTicket(t.id, e.target.value)}
                    className="bg-zinc-955 border border-zinc-800 text-[10px] uppercase font-bold tracking-wider py-1.5 px-2.5 outline-none focus:border-indigo-500 text-zinc-300 cursor-pointer"
                  >
                    <option value="Unassigned">Assign Staff...</option>
                    <option value="Agent Sarah">Agent Sarah</option>
                    <option value="Agent Smith">Agent Smith</option>
                    <option value="Dave Moderator">Dave Moderator</option>
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
