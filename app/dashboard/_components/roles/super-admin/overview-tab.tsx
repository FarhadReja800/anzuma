"use client"

import * as React from "react"
import { SharedAdminOverview } from "../shared-admin-overview"

interface OverviewTabProps {
  users?: any[]
  maintenanceMode?: boolean
  backupRunning?: boolean
  backupProgress?: string
  handleTriggerBackup?: () => void
  logs?: string[]
}

export function OverviewTab(_props: OverviewTabProps) {
  return (
    <SharedAdminOverview
      config={{ role: "superAdmin", userName: "Super User" }}
    />
  )
}
