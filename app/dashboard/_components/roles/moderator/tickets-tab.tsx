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
        <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-200">
          Inbox Tickets
        </h2>
        <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
          {tickets.map(t => {
            const isSelected = selectedTicketId === t.id
            return (
              <div
                key={t.id}
                onClick={() => setSelectedTicketId(t.id)}
                className={`p-4 border transition cursor-pointer flex flex-col justify-between ${
                  isSelected 
                    ? "bg-zinc-900 border-amber-500" 
                    : "bg-zinc-900/60 border-zinc-800 hover:border-zinc-700"
                }`}
              >
                <div className="flex justify-between items-start">
                  <span className="font-mono text-[9px] font-bold text-zinc-500">{t.id}</span>
                  <span className={`px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider ${
                    t.status === "Answered" 
                      ? "bg-emerald-950 text-emerald-400 border border-emerald-500/20"
                      : "bg-red-955 text-red-400 border border-red-500/20"
                  }`}>
                    {t.status}
                  </span>
                </div>
                <h4 className="font-bold text-xs uppercase tracking-wide mt-2 text-zinc-200">{t.subject}</h4>
                <div className="flex justify-between items-center text-[10px] text-zinc-400 mt-3">
                  <span className="font-medium">{t.category}</span>
                  <span>{t.date}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Right 2 Columns: ticket details & reply interface */}
      <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 flex flex-col min-h-[400px]">
        {activeTicket ? (
          <>
            {/* Ticket Header info */}
            <div className="p-6 border-b border-zinc-850 flex justify-between items-center bg-zinc-950">
              <div>
                <h3 className="font-bold text-sm uppercase tracking-wide text-zinc-100">{activeTicket.subject}</h3>
                <p className="text-[10px] text-zinc-500 font-medium mt-0.5">
                  Priority: {activeTicket.priority} • Category: {activeTicket.category} • Date: {activeTicket.date}
                </p>
              </div>
            </div>

            {/* Messages Feed */}
            <div className="flex-1 p-6 space-y-4 max-h-[300px] overflow-y-auto">
              {activeTicket.messages.length === 0 ? (
                <div className="text-center text-zinc-500 uppercase font-semibold text-xs tracking-wider py-12">
                  No messages in ticket history
                </div>
              ) : (
                activeTicket.messages.map((m, idx) => {
                  const isUser = m.sender === "user"
                  return (
                    <div key={idx} className={`flex gap-3 max-w-[85%] ${isUser ? "" : "ml-auto flex-row-reverse"}`}>
                      <div className={`h-8 w-8 rounded-full border flex items-center justify-center text-[10px] font-bold ${
                        isUser 
                          ? "bg-zinc-800 border-zinc-700 text-zinc-300" 
                          : "bg-amber-955 border-amber-500/30 text-amber-500"
                      }`}>
                        {isUser ? "US" : "AG"}
                      </div>
                      <div className={`p-4 border ${
                        isUser 
                          ? "bg-zinc-950 border-zinc-850" 
                          : "bg-amber-955/10 border-amber-500/10 text-zinc-100"
                      }`}>
                        <p className="text-xs leading-relaxed whitespace-pre-wrap">{m.text}</p>
                        <div className="text-[9px] font-mono text-zinc-500 mt-2 text-right">{m.time}</div>
                      </div>
                    </div>
                  )
                })
              )}
            </div>

            {/* Reply Input Form */}
            <form onSubmit={handleSendReply} className="p-4 border-t border-zinc-850 bg-zinc-950 flex gap-4">
              <input
                type="text"
                required
                placeholder="Type your moderator support reply here..."
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                className="flex-1 bg-zinc-900 border border-zinc-800 px-4 py-3 text-xs outline-none text-zinc-200 focus:border-amber-500"
              />
              <button
                type="submit"
                className="bg-amber-600 hover:bg-amber-500 text-white font-bold uppercase tracking-wider text-xs px-5 py-3 transition select-none flex items-center gap-2 cursor-pointer hover:shadow-lg"
              >
                <Send className="h-4.5 w-4.5" />
                Reply
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-12 text-zinc-500 uppercase tracking-widest text-xs font-bold font-sans">
            <LifeBuoy className="h-10 w-10 text-amber-550 mb-3 animate-bounce" />
            Select a support ticket from the sidebar to inspect messages & post resolution replies.
          </div>
        )}
      </div>
    </div>
  )
}
