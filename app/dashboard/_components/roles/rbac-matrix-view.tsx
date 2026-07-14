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
    admin: "text-blue-400 border-blue-500/20 bg-blue-955/10",
    manager: "text-indigo-400 border-indigo-500/20 bg-indigo-955/10",
    moderator: "text-amber-400 border-amber-500/20 bg-amber-955/10"
  }

  return (
    <div className="space-y-6 animate-fadeInFast">
      <div>
        <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-200 flex items-center gap-2">
          <Shield className="h-4.5 w-4.5 text-zinc-400" />
          Active Security Permissions Profile
        </h2>
        <div className="flex gap-3 items-center mt-2.5">
          <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">Current Role Profile:</span>
          <span className={`px-2.5 py-1 text-[9px] font-bold uppercase border tracking-widest ${roleColors[role]}`}>
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
              className={`p-4 border flex items-center justify-between ${
                isGranted 
                  ? "bg-emerald-950/10 border-emerald-500/20" 
                  : "bg-zinc-900/40 border-zinc-850 opacity-70"
              }`}
            >
              <div>
                <div className="text-[11px] font-bold text-zinc-200 uppercase tracking-wide">{PERMISSION_LABELS[key]}</div>
                <div className="text-[9px] text-zinc-550 font-mono mt-0.5">{key}</div>
              </div>

              <span 
                className={`h-6 w-6 rounded-full flex items-center justify-center border font-bold ${
                  isGranted 
                    ? "bg-emerald-950 border-emerald-500/30 text-emerald-400" 
                    : "bg-red-955 border-red-500/20 text-red-400"
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

      <div className="bg-zinc-900 border border-zinc-800 p-4 text-[10px] text-zinc-500 font-semibold uppercase tracking-wider flex items-center gap-2">
        <AlertTriangle className="h-4 w-4 text-zinc-500 shrink-0" />
        Permissions are managed dynamically by the Root Super Administrator. Contact IT operations for credentials adjustments.
      </div>
    </div>
  )
}
