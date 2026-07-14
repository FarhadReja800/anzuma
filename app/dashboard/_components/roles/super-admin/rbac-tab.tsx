"use client"

import * as React from "react"
import { Shield, RefreshCw, Check, X, AlertTriangle } from "lucide-react"
import { 
  RolePermissions, 
  PERMISSION_LABELS, 
  DEFAULT_RBAC_PERMISSIONS, 
  saveRbacPermissions 
} from "../rbac-config"

interface RbacTabProps {
  permissions: Record<string, RolePermissions>
  setPermissions: React.Dispatch<React.SetStateAction<Record<string, RolePermissions>>>
  triggerToast: (msg: string) => void
}

export function RbacTab({ permissions, setPermissions, triggerToast }: RbacTabProps) {
  const roles: (keyof Record<string, RolePermissions>)[] = ["superAdmin", "admin", "manager", "moderator"]

  const handleToggle = (role: string, key: keyof RolePermissions) => {
    // Super Admin permissions should remain locked (always true) for security integrity
    if (role === "superAdmin") {
      triggerToast("Super Admin permissions are root locked for system security.")
      return
    }

    const updated = {
      ...permissions,
      [role]: {
        ...permissions[role],
        [key]: !permissions[role][key]
      }
    }
    setPermissions(updated)
    saveRbacPermissions(updated)
    triggerToast(`Updated ${PERMISSION_LABELS[key]} for ${role} role.`)
  }

  const handleReset = () => {
    setPermissions(DEFAULT_RBAC_PERMISSIONS)
    saveRbacPermissions(DEFAULT_RBAC_PERMISSIONS)
    triggerToast("Restored system default RBAC authorization configurations.")
  }

  return (
    <div className="space-y-6 animate-fadeInFast">
      <div className="flex justify-between items-center gap-4 flex-wrap">
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-200 flex items-center gap-2">
            <Shield className="h-4.5 w-4.5 text-red-500 animate-pulse" />
            Role-Based Access Control (RBAC) Settings
          </h2>
          <p className="text-[10px] text-zinc-500 mt-1 uppercase tracking-wider font-semibold">
            Define and manage custom security permissions dynamically across role profiles
          </p>
        </div>
        <button 
          onClick={handleReset}
          className="text-[10px] font-bold uppercase tracking-wider border border-zinc-800 text-zinc-400 hover:text-white px-3.5 py-2 hover:bg-zinc-900 transition flex items-center gap-2 cursor-pointer bg-transparent"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Reset to Defaults
        </button>
      </div>

      {/* Permissions Matrix */}
      <div className="bg-zinc-900 border border-zinc-800 overflow-x-auto rounded-none shadow-2xl relative">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-zinc-800 text-zinc-400 font-bold uppercase tracking-widest text-[9px] bg-zinc-955 select-none">
              <th className="p-4.5 w-1/3">Security Feature Permission</th>
              <th className="p-4.5 text-center text-red-400">Super Admin</th>
              <th className="p-4.5 text-center text-blue-400">Admin</th>
              <th className="p-4.5 text-center text-indigo-400">Manager</th>
              <th className="p-4.5 text-center text-amber-400">Moderator</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-850 font-medium">
            {(Object.keys(PERMISSION_LABELS) as (keyof RolePermissions)[]).map((key) => (
              <tr key={key} className="hover:bg-zinc-850/30 transition">
                <td className="p-4 font-semibold text-zinc-200 flex flex-col">
                  <span className="text-[11px] tracking-wide">{PERMISSION_LABELS[key]}</span>
                  <span className="text-[8.5px] text-zinc-500 font-mono mt-0.5 lowercase tracking-wider">{key}</span>
                </td>
                
                {roles.map((role) => {
                  const isGranted = permissions[role]?.[key]
                  const isLocked = role === "superAdmin"
                  return (
                    <td key={role} className="p-4 text-center">
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() => handleToggle(role as string, key)}
                          disabled={isLocked}
                          className={`h-7 w-12 rounded-full p-0.5 transition-all duration-300 relative border outline-none cursor-pointer flex items-center ${
                            isGranted 
                              ? "bg-emerald-950/60 border-emerald-500/40 justify-end" 
                              : "bg-zinc-950 border-zinc-800 justify-start"
                          } ${isLocked ? "opacity-90 cursor-not-allowed" : "hover:border-zinc-500"}`}
                        >
                          <span 
                            className={`h-5 w-5 rounded-full transition-transform duration-300 shadow-lg flex items-center justify-center ${
                              isGranted 
                                ? "bg-emerald-500 text-black" 
                                : "bg-zinc-800 text-zinc-500"
                            }`}
                          >
                            {isGranted ? (
                              <Check className="h-3 w-3 stroke-3" />
                            ) : (
                              <X className="h-2.5 w-2.5 stroke-3" />
                            )}
                          </span>
                        </button>
                      </div>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 p-4 text-[10px] text-zinc-400 font-semibold uppercase tracking-wider flex items-start gap-3">
        <AlertTriangle className="h-4.5 w-4.5 text-amber-500 shrink-0 mt-0.5" />
        <div>
          <span className="text-zinc-200 block mb-1">Security Enforcement Notice:</span>
          Toggling these values live updates the local storage permission context. Other dashboards loaded under this browser environment will automatically respect modified permissions matrix dynamically.
        </div>
      </div>
    </div>
  )
}
