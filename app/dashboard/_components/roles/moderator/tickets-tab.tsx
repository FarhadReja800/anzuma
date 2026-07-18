"use client"

import * as React from "react"
import { Send, LifeBuoy } from "lucide-react"
import { SupportTicket } from "../../../_components/types"

interface TicketsTabProps {
  tickets: SupportTicket[]
  selectedTicketId: string | null
  setSelectedTicketId: (id: string | null) => void
  activeTicket: SupportTicket | undefined
  replyMessage: string
  setReplyMessage: (message: string) => void
  handleSendReply: (e: React.FormEvent) => void
}

export function TicketsTab({
  tickets,
  selectedTicketId,
  setSelectedTicketId,
  activeTicket,
  replyMessage,
  setReplyMessage,
  handleSendReply
}: TicketsTabProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeInFast">
      {/* Left Column: list of tickets */}
      <div className="space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-widest text-black dark:text-zinc-200">
          Inbox Tickets
        </h2>
        <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
          {tickets.map(t => {
            const isSelected = selectedTicketId === t.id
            return (
              <div
                key={t.id}
                onClick={() => setSelectedTicketId(t.id)}
                className={`p-4 border transition cursor-pointer flex flex-col justify-between rounded-2xl ${
                  isSelected 
                    ? "bg-amber-50/40 dark:bg-zinc-900 border-amber-500" 
                    : "bg-white dark:bg-zinc-900/60 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                }`}
              >
                <div className="flex justify-between items-start">
                  <span className="font-mono text-[9px] font-bold text-black/60 dark:text-zinc-500">{t.id}</span>
                  <span className={`px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider border rounded ${
                    t.status === "Answered" 
                      ? "bg-emerald-50 text-emerald-700 border-emerald-250 dark:bg-emerald-955 dark:text-emerald-450 dark:border-emerald-500/20"
                      : "bg-red-50 text-red-750 border-red-200 dark:bg-red-955 dark:text-red-400 dark:border-red-500/20"
                  }`}>
                    {t.status}
                  </span>
                </div>
                <h4 className="font-bold text-xs uppercase tracking-wide mt-2 text-black dark:text-zinc-200">{t.subject}</h4>
                <div className="flex justify-between items-center text-[10px] text-black/75 dark:text-zinc-400 mt-3">
                  <span className="font-medium">{t.category}</span>
                  <span>{t.date}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Right 2 Columns: ticket details & reply interface */}
      <div className="lg:col-span-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex flex-col min-h-[400px] shadow-[0_1px_3px_rgba(0,0,0,0.01)] rounded-2xl overflow-hidden">
        {activeTicket ? (
          <>
            {/* Ticket Header info */}
            <div className="p-6 border-b border-zinc-150 dark:border-zinc-855 flex justify-between items-center bg-zinc-50/50 dark:bg-zinc-950">
              <div>
                <h3 className="font-bold text-sm uppercase tracking-wide text-black dark:text-zinc-100">{activeTicket.subject}</h3>
                <p className="text-[10px] text-black/70 dark:text-zinc-400 font-medium mt-0.5">
                  Priority: {activeTicket.priority} • Category: {activeTicket.category} • Date: {activeTicket.date}
                </p>
              </div>
            </div>

            {/* Messages Feed */}
            <div className="flex-1 p-6 space-y-4 max-h-[300px] overflow-y-auto bg-white dark:bg-zinc-900">
              {activeTicket.messages.length === 0 ? (
                <div className="text-center text-black/60 uppercase font-semibold text-xs tracking-wider py-12">
                  No messages in ticket history
                </div>
              ) : (
                activeTicket.messages.map((m, idx) => {
                  const isUser = m.sender === "user"
                  return (
                    <div key={idx} className={`flex gap-3 max-w-[85%] ${isUser ? "" : "ml-auto flex-row-reverse"}`}>
                      <div className={`h-8 w-8 rounded-full border flex items-center justify-center text-[10px] font-bold shrink-0 ${
                        isUser 
                          ? "bg-zinc-100 border-zinc-200 text-black/80 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300" 
                          : "bg-amber-50 border-amber-250 text-amber-700 dark:bg-amber-955 dark:border-amber-500/30 dark:text-amber-500"
                      }`}>
                        {isUser ? "US" : "AG"}
                      </div>
                      <div className={`p-4 border rounded-2xl ${
                        isUser 
                          ? "bg-zinc-50 border-zinc-150 dark:bg-zinc-950 dark:border-zinc-850 text-black dark:text-zinc-100" 
                          : "bg-amber-50/50 border-amber-200/50 text-black dark:bg-amber-955/10 dark:border-amber-500/10 dark:text-zinc-100"
                      }`}>
                        <p className="text-xs leading-relaxed whitespace-pre-wrap">{m.text}</p>
                        <div className="text-[9px] font-mono text-black/60 dark:text-zinc-500 mt-2 text-right">{m.time}</div>
                      </div>
                    </div>
                  )
                })
              )}
            </div>

            {/* Reply Input Form */}
            <form onSubmit={handleSendReply} className="p-4 border-t border-zinc-150 dark:border-zinc-850 bg-zinc-50/50 dark:bg-zinc-950 flex gap-4">
              <input
                type="text"
                required
                placeholder="Type your moderator support reply here..."
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                className="flex-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-3 text-xs outline-none text-black dark:text-zinc-200 focus:border-amber-500 rounded-xl"
              />
              <button
                type="submit"
                className="bg-amber-600 hover:bg-amber-500 text-white font-bold uppercase tracking-wider text-xs px-5 py-3 transition select-none flex items-center gap-2 cursor-pointer hover:shadow-lg rounded-xl"
              >
                <Send className="h-4.5 w-4.5" />
                Reply
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-12 text-black/60 uppercase tracking-widest text-xs font-bold font-sans bg-white dark:bg-zinc-900">
            <LifeBuoy className="h-10 w-10 text-amber-500 mb-3 animate-bounce" />
            Select a support ticket from the sidebar to inspect messages & post resolution replies.
          </div>
        )}
      </div>
    </div>
  )
}
