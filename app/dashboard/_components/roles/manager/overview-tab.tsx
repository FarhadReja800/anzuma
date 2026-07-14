"use client"

import * as React from "react"
import { SharedAdminOverview } from "../shared-admin-overview"

interface OverviewTabProps {
  totalValue?: number
  lowStockProducts?: any[]
  tickets?: any[]
}

export function OverviewTab(_props: OverviewTabProps) {
  return (
    <SharedAdminOverview
      config={{ role: "manager", userName: "Performance Manager" }}
    />
  )
}
