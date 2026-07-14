"use client"

import * as React from "react"
import { SharedAdminOverview } from "../shared-admin-overview"

interface OverviewTabProps {
  tickets?: any[]
  reviews?: any[]
  pendingReviews?: any[]
  setActiveTab?: (tab: any) => void
  setSelectedTicketId?: (id: string | null) => void
  handleReviewAction?: (id: string, action: "Approved" | "Flagged") => void
}

export function OverviewTab(_props: OverviewTabProps) {
  return (
    <SharedAdminOverview
      config={{ role: "moderator", userName: "Moderator Desk" }}
    />
  )
}
