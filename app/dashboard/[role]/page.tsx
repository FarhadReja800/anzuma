"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import { DashboardPage } from "../_components/dashboard-page"
import { DashboardUser } from "../_components/types"

// Map route parameters to DashboardUser role values
const roleMapping: Record<string, DashboardUser["role"]> = {
  admin: "admin",
  manager: "manager",
  moderator: "moderator",
  superadmin: "superAdmin",
  "super-admin": "superAdmin",
  user: "customer",
}

export default function DynamicDashboardPage() {
  const params = useParams()
  const roleParam = typeof params?.role === "string" ? params.role.toLowerCase() : ""
  
  // Default to customer dashboard if route parameter does not match
  const mappedRole = roleMapping[roleParam] || "customer"

  return <DashboardPage roleOverride={mappedRole} />
}
