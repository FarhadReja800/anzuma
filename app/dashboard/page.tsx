"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useDashboardState } from "./_hooks/use-dashboard-state"

import { AdminView } from "./_components/roles/admin/index"
import { ManagerView } from "./_components/roles/manager/index"
import { ModeratorView } from "./_components/roles/moderator/index"
import { CustomerView } from "./_components/roles/customer/index"

const emptySubscribe = () => () => {}
const getSnapshot = () => true
const getServerSnapshot = () => false

export default function DashboardPage() {
  const state = useDashboardState()
  const router = useRouter()
  const mounted = React.useSyncExternalStore(
    emptySubscribe,
    getSnapshot,
    getServerSnapshot
  )

  const { user, handleLogout } = state

  React.useEffect(() => {
    if (mounted && user && user.role === "superAdmin") {
      router.push("/super-admin")
    }
  }, [user, router, mounted])

  if (!mounted) {
    return (
      <div className="flex-1 bg-[#fcfcfc] dark:bg-zinc-950 flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="text-xs font-bold uppercase tracking-widest text-zinc-405 animate-pulse">
          Loading Security Session...
        </div>
      </div>
    )
  }

  // If user has system role, render the specialized admin dashboards
  if (user && user.role === "superAdmin") {
    return (
      <div className="flex-1 bg-white dark:bg-zinc-950 flex flex-col items-center justify-center min-h-screen p-8 text-center">
        <h2 className="text-xl font-bold tracking-tight text-zinc-800 dark:text-zinc-200">
          Redirecting to Root Control Center...
        </h2>
        <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-2">
          Please wait while we route you to the isolated administration terminal.
        </p>
      </div>
    )
  }
  if (user && user.role === "admin") {
    return <AdminView user={user} handleLogout={handleLogout} />
  }
  if (user && user.role === "manager") {
    return <ManagerView user={user} handleLogout={handleLogout} />
  }
  if (user && user.role === "moderator") {
    return <ModeratorView user={user} handleLogout={handleLogout} />
  }

  // Render isolated user/customer dashboard view
  return <CustomerView state={state} />
}

