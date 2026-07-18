"use client"

import * as React from "react"
import { Shield, Check, X, AlertTriangle } from "lucide-react"
import { RolePermissions, PERMISSION_LABELS, getRbacPermissions } from "./rbac-config"

interface RbacMatrixViewProps {
  role: "admin" | "manager" | "moderator"
  permissions?: RolePermissions | null
}

export function RbacMatrixView({ role, permissions: propPermissions }: RbacMatrixViewProps) {
  const permissions = React.useMemo(() => {
    if (propPermissions) {
      return propPermissions
    }
    const allPerms = getRbacPermissions()
    return allPerms[role] || null
  }, [role, propPermissions])

  if (!permissions) {
    return (
      <div className="p-8 text-center text-zinc-500 uppercase tracking-widest text-xs font-bold font-mono">
        Loading Role-Based Access Control configuration...
      </div>
    )
  }

  const roleNames: Record<string, string> = {
    admin: "System Administrator",
    manager: "Performance Manager",
    moderator: "Content Moderator"
  }

  const roleColors: Record<string, string> = {
    admin: "text-blue-600 border-blue-200 bg-blue-50 dark:text-blue-400 dark:border-blue-500/20 dark:bg-blue-955/10",
    manager: "text-indigo-600 border-indigo-200 bg-indigo-50 dark:text-indigo-400 dark:border-indigo-500/20 dark:bg-indigo-955/10",
    moderator: "text-amber-600 border-amber-200 bg-amber-50 dark:text-amber-400 dark:border-amber-500/20 dark:bg-amber-955/10"
  }

  return (
    <div className="space-y-6 animate-fadeInFast">
      <div>
        <h2 className="text-xs font-bold uppercase tracking-widest text-black dark:text-zinc-200 flex items-center gap-2">
          <Shield className="h-4.5 w-4.5 text-zinc-500 dark:text-zinc-400" />
          Active Security Permissions Profile
        </h2>
        <div className="flex gap-3 items-center mt-2.5">
          <span className="text-[10px] text-black/75 dark:text-zinc-455 uppercase tracking-wider font-semibold">Current Role Profile:</span>
          <span className={`px-2.5 py-1 text-[9px] font-bold uppercase border tracking-widest rounded-md ${roleColors[role]}`}>
            {roleNames[role]}
          </span>
        </div>
      </div>

      {/* Permissions List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(Object.keys(PERMISSION_LABELS) as (keyof RolePermissions)[]).map((key) => {
          const isGranted = permissions[key]
          return (
            <div 
              key={key} 
              className={`p-4 border flex items-center justify-between rounded-xl ${
                isGranted 
                  ? "bg-emerald-50/50 border-emerald-250 dark:bg-emerald-950/10 dark:border-emerald-500/20" 
                  : "bg-zinc-50 border-zinc-200 dark:bg-zinc-900/40 dark:border-zinc-800 opacity-70"
              }`}
            >
              <div>
                <div className="text-[11px] font-bold text-black dark:text-zinc-200 uppercase tracking-wide">{PERMISSION_LABELS[key]}</div>
                <div className="text-[9px] text-black/60 dark:text-zinc-450 font-mono mt-0.5">{key}</div>
              </div>

              <span 
                className={`h-6 w-6 rounded-full flex items-center justify-center border font-bold ${
                  isGranted 
                    ? "bg-emerald-100 border border-emerald-300 text-emerald-700 dark:bg-emerald-950 dark:border-emerald-500/30 dark:text-emerald-400" 
                    : "bg-red-100 border border-red-200 text-red-650 dark:bg-red-955 dark:border-red-500/20 dark:text-red-400"
                }`}
              >
                {isGranted ? (
                  <Check className="h-3 w-3" />
                ) : (
                  <X className="h-3 w-3" />
                )}
              </span>
            </div>
          )
        })}
      </div>

      <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 text-[10px] text-black/75 dark:text-zinc-450 font-semibold uppercase tracking-wider flex items-center gap-2 rounded-xl">
        <AlertTriangle className="h-4 w-4 text-zinc-500 shrink-0" />
        Permissions are managed dynamically by the Root Super Administrator. Contact IT operations for credentials adjustments.
      </div>
    </div>
  )
}
