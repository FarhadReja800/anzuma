"use client"

import * as React from "react"
import { SharedAdminOverview } from "../shared-admin-overview"

interface OverviewTabProps {
  totalRevenue?: number
  orders?: any[]
  products?: any[]
  lowStockCount?: number
}

export function OverviewTab(_props: OverviewTabProps) {
  return (
    <SharedAdminOverview
      config={{ role: "admin", userName: "Store Admin" }}
    />
  )
}
