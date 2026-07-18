"use client"

import * as React from "react"
import { 
  Check 
} from "lucide-react"
import { DashboardUser, SupportTicket } from "../../../_components/types"
import { DashboardShell } from "../../dashboard-shell"

import { OverviewTab } from "./overview-tab"
import { TicketsTab } from "./tickets-tab"
import { ReviewsTab } from "./reviews-tab"
import { ContentTab } from "../content-tab"
import { RbacMatrixView } from "../rbac-matrix-view"
import { RolePermissions, getRbacPermissions, DEFAULT_RBAC_PERMISSIONS } from "../rbac-config"

interface ModeratorViewProps {
  user: DashboardUser
  handleLogout: () => void
}

interface ReviewItem {
  id: string
  productName: string
  rating: number
  comment: string
  user: string
  status: "Pending" | "Approved" | "Flagged"
}

const DEFAULT_REVIEWS: ReviewItem[] = [
  { id: "REV-101", productName: "Basic High-Neck Puff Jacket", rating: 5, comment: "Absolutely love the warm fabric and fits like a glove!", user: "Farhad Reja", status: "Pending" },
  { id: "REV-102", productName: "Classic Leather Crossbody Bag", rating: 4, comment: "High quality leather but strap is slightly short.", user: "Amina Rahman", status: "Pending" },
  { id: "REV-103", productName: "Orange T-Shirt", rating: 2, comment: "Color faded after the first wash, not recommended.", user: "Imran Khan", status: "Pending" },
  { id: "REV-104", productName: "Tailored Wide-Leg Trousers", rating: 5, comment: "Perfect for formal office wear. Super comfy!", user: "Nusrat Jahan", status: "Pending" }
]

export function ModeratorView({ user, handleLogout }: ModeratorViewProps) {
  const [activeTab, setActiveTab] = React.useState<"overview" | "tickets" | "reviews" | "rbac" | "content">("overview")
  const [tickets, setTickets] = React.useState<SupportTicket[]>([])
  const [reviews, setReviews] = React.useState<ReviewItem[]>([])
  const [permissions, setPermissions] = React.useState<RolePermissions | null>(null)
  
  // Selected ticket for replying
  const [selectedTicketId, setSelectedTicketId] = React.useState<string | null>(null)
  const [replyMessage, setReplyMessage] = React.useState("")

  // Toast
  const [toastMessage, setToastMessage] = React.useState<string | null>(null)

  const triggerToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  React.useEffect(() => {
    const timer = setTimeout(() => {
      // Load tickets from localStorage
      const storedTickets = localStorage.getItem("arzuma_tickets")
      if (storedTickets) {
        setTickets(JSON.parse(storedTickets))
      } else {
        setTickets([])
      }

      // Load reviews from localStorage
      const storedReviews = localStorage.getItem("arzuma_reviews")
      if (storedReviews) {
        setReviews(JSON.parse(storedReviews))
      } else {
        setReviews([])
      }

      // Load RBAC permissions
      const allPerms = getRbacPermissions()
      setPermissions(allPerms.moderator || DEFAULT_RBAC_PERMISSIONS.moderator)
    }, 0)

    return () => clearTimeout(timer)
  }, [])

  const saveTickets = (updated: SupportTicket[]) => {
    setTickets(updated)
    localStorage.setItem("arzuma_tickets", JSON.stringify(updated))
  }

  const saveReviews = (updated: ReviewItem[]) => {
    setReviews(updated)
    localStorage.setItem("arzuma_reviews", JSON.stringify(updated))
  }

  // Reply to ticket
  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault()
    if (!replyMessage.trim() || !selectedTicketId) return

    const updated = tickets.map(t => {
      if (t.id === selectedTicketId) {
        return {
          ...t,
          status: "Answered" as const,
          messages: [
            ...t.messages,
            {
              sender: "agent" as const,
              text: replyMessage,
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]
        }
      }
      return t
    })

    saveTickets(updated)
    setReplyMessage("")
    triggerToast("Reply posted successfully. Ticket updated to Answered.")
  }

  // Review status changes
  const handleReviewAction = (id: string, action: "Approved" | "Flagged") => {
    const updated = reviews.map(r => r.id === id ? { ...r, status: action } : r)
    saveReviews(updated)
    triggerToast(`Review ${id} has been ${action}.`)
  }

  const activeTicket = tickets.find(t => t.id === selectedTicketId)
  const pendingReviews = reviews.filter(r => r.status === "Pending")

  const activePermissions = permissions || DEFAULT_RBAC_PERMISSIONS.moderator

  return (
    <DashboardShell
      user={user}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      handleLogout={handleLogout}
      title="Moderation Desk"
      badgeText="MOD"
      ticketsCount={tickets.length}
      couponsCount={pendingReviews.length} // mapped to reviews badge in shell
    >
      {/* Toast Alert */}
      {toastMessage && (
        <div 
          className="fixed bottom-6 right-6 z-50 bg-[#3eb075] text-white text-xs font-bold py-3.5 px-5 shadow-2xl flex items-center gap-2 border border-emerald-450 rounded-lg animate-fadeInFast"
        >
          <Check className="h-4 w-4" />
          <span className="tracking-wide">{toastMessage}</span>
        </div>
      )}

      {/* OVERVIEW TAB */}
      {activeTab === "overview" && (
        <OverviewTab 
          tickets={tickets}
          reviews={reviews}
          pendingReviews={pendingReviews}
          setActiveTab={setActiveTab}
          setSelectedTicketId={setSelectedTicketId}
          handleReviewAction={handleReviewAction}
        />
      )}

      {/* CONTENT MANAGER TAB */}
      {activeTab === "content" && (
        <ContentTab 
          permissions={activePermissions}
          triggerToast={triggerToast}
        />
      )}

      {/* TICKETS TAB */}
      {activeTab === "tickets" && (
        <TicketsTab 
          tickets={tickets}
          activeTicket={activeTicket}
          selectedTicketId={selectedTicketId}
          setSelectedTicketId={setSelectedTicketId}
          replyMessage={replyMessage}
          setReplyMessage={setReplyMessage}
          handleSendReply={handleSendReply}
        />
      )}

      {/* REVIEWS TAB */}
      {activeTab === "reviews" && (
        <ReviewsTab 
          reviews={reviews}
          handleReviewAction={handleReviewAction}
          permissions={activePermissions}
        />
      )}

      {/* RBAC MATRIX VIEW */}
      {activeTab === "rbac" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/80 p-6 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.01)]">
          <div className="mb-6">
            <h2 className="text-base font-bold text-zinc-800 dark:text-zinc-100 uppercase tracking-wide">
              Moderator Privilege Profile
            </h2>
            <p className="text-[11px] text-zinc-400 dark:text-zinc-550 mt-1">
              Active permission rules defined by SuperAdmin.
            </p>
          </div>
          {permissions ? (
            <RbacMatrixView role="moderator" permissions={permissions} />
          ) : (
            <div className="text-zinc-400 text-xs py-8 text-center">Loading Permissions Matrix...</div>
          )}
        </div>
      )}
    </DashboardShell>
  )
}
