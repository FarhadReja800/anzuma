import * as React from "react"
import { LifeBuoy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SupportTicket } from "./types"

interface SupportTabProps {
  tickets: SupportTicket[]
  ticketSubject: string
  ticketCategory: string
  ticketPriority: "Low" | "Medium" | "High" | "Urgent"
  ticketMessage: string
  setTicketSubject: (val: string) => void
  setTicketCategory: (val: string) => void
  setTicketPriority: (val: "Low" | "Medium" | "High" | "Urgent") => void
  setTicketMessage: (val: string) => void
  handleCreateTicket: (e: React.FormEvent) => void
}

export function SupportTab({
  tickets,
  ticketSubject,
  ticketCategory,
  ticketPriority,
  ticketMessage,
  setTicketSubject,
  setTicketCategory,
  setTicketPriority,
  setTicketMessage,
  handleCreateTicket
}: SupportTabProps) {
  return (
    <div className="space-y-8 animate-fadeInFast">
      <div>
        <h2 className="text-xl font-normal tracking-tight font-serif text-zinc-900 dark:text-white">
          VIP Concierge Desk
        </h2>
        <p className="text-[11px] text-zinc-400 mt-1 uppercase tracking-widest font-semibold">
          Submit help tickets and receive immediate assistance from support
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Creation Form */}
        <div className="border border-zinc-150 dark:border-zinc-855 p-6 bg-white dark:bg-zinc-900 shadow-sm h-fit">
          <h3 className="font-bold text-xs uppercase tracking-widest text-zinc-900 dark:text-white border-b pb-4 mb-4 flex items-center gap-2">
            <LifeBuoy className="h-4.5 w-4.5 text-[#df4a4a]" />
            Create Help Ticket
          </h3>

          <form onSubmit={handleCreateTicket} className="space-y-4 text-xs font-semibold">
            <div className="space-y-1">
              <label className="text-[9px] uppercase tracking-wider text-zinc-500">Subject *</label>
              <input 
                type="text" 
                required
                value={ticketSubject}
                onChange={e => setTicketSubject(e.target.value)}
                placeholder="Summary of issue"
                className="w-full border border-zinc-200 dark:border-zinc-700 bg-transparent px-3 py-2 outline-none focus:border-zinc-900 dark:focus:border-zinc-400 text-xs font-normal"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[9px] uppercase tracking-wider text-zinc-500">Category</label>
                <select 
                  value={ticketCategory}
                  onChange={e => setTicketCategory(e.target.value)}
                  className="w-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-2.5 py-2 outline-none focus:border-zinc-900 text-xs font-normal"
                >
                  <option>Order Issue</option>
                  <option>Return Request</option>
                  <option>VIP Question</option>
                  <option>General Feedback</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] uppercase tracking-wider text-zinc-500">Priority</label>
                <select 
                  value={ticketPriority}
                  onChange={e => setTicketPriority(e.target.value as SupportTicket["priority"])}
                  className="w-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-2.5 py-2 outline-none focus:border-zinc-900 text-xs font-normal"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Urgent">Urgent ⚡</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] uppercase tracking-wider text-zinc-500">Details *</label>
              <textarea 
                required
                rows={5}
                value={ticketMessage}
                onChange={e => setTicketMessage(e.target.value)}
                placeholder="Write description of your issue here..."
                className="w-full border border-zinc-200 dark:border-zinc-700 bg-transparent px-3 py-2.5 outline-none focus:border-zinc-900 dark:focus:border-zinc-400 text-xs font-normal leading-relaxed"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full h-9 rounded-none bg-zinc-950 text-white hover:bg-zinc-800 text-[10px] font-bold uppercase tracking-widest cursor-pointer"
            >
              Submit Ticket
            </Button>
          </form>
        </div>

        {/* History Threads */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 flex items-center justify-between">
            <span>My Support Threads ({tickets.length})</span>
            <span className="text-[9px] text-[#df4a4a] lowercase tracking-normal font-semibold">AI responder active</span>
          </h3>

          {tickets.length === 0 ? (
            <div className="border border-zinc-150 dark:border-zinc-805 p-8 bg-white dark:bg-zinc-900 text-center text-xs text-zinc-400">
              You have no active help tickets. Submit one to test the support desk.
            </div>
          ) : (
            <div className="space-y-6">
              {tickets.map((t) => (
                <div 
                  key={t.id}
                  className="border border-zinc-150 dark:border-zinc-805 bg-white dark:bg-zinc-900 shadow-sm overflow-hidden"
                >
                  <div className="px-5 py-3.5 bg-zinc-50 dark:bg-zinc-900/60 border-b border-zinc-150 dark:border-zinc-805 flex items-center justify-between flex-wrap gap-2 text-xs">
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-extrabold text-zinc-900 dark:text-white uppercase">{t.id}</span>
                      <span className="text-zinc-300 dark:text-zinc-700">|</span>
                      <span className="font-bold text-zinc-805 dark:text-zinc-300">{t.subject}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-[9px] font-bold px-2 py-0.5 border rounded-full uppercase ${
                        t.status === "Answered" 
                          ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-950/20 dark:border-green-800" 
                          : "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-955/20 dark:border-amber-800"
                      }`}>
                        {t.status}
                      </span>
                      <span className="text-[10px] text-zinc-400 font-semibold">{t.date}</span>
                    </div>
                  </div>

                  <div className="p-5 space-y-4">
                    {t.messages.map((m, idx) => (
                      <div 
                        key={idx} 
                        className={`flex flex-col max-w-[85%] ${m.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"}`}
                      >
                        <div className={`p-4 text-xs leading-relaxed font-medium ${
                          m.sender === "user" 
                            ? "bg-zinc-955 text-white dark:bg-white dark:text-zinc-950 rounded-lg rounded-tr-none" 
                            : "bg-zinc-50 border border-zinc-150 text-zinc-800 dark:bg-zinc-850/60 dark:border-zinc-800 dark:text-zinc-200 rounded-lg rounded-tl-none"
                        }`}>
                          <p className="whitespace-pre-line">{m.text}</p>
                        </div>
                        <span className="text-[9px] text-zinc-400 font-bold mt-1.5 px-1 block">
                          {m.sender === "user" ? "You" : "VIP Concierge Agent"} • {m.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
