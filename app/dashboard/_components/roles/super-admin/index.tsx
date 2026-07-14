"use client"

import * as React from "react"
import { 
  Activity, 
  Users, 
  Settings, 
  Shield, 
  Terminal, 
  Check,
  Package
} from "lucide-react"
import { DashboardUser } from "../../../_components/types"
import { DashboardShell } from "../../dashboard-shell"

import { OverviewTab } from "./overview-tab"
import { UsersTab } from "./users-tab"
import { SettingsTab } from "./settings-tab"
import { AuditTab } from "./audit-tab"
import { RbacTab } from "./rbac-tab"
import { ContentTab } from "../content-tab"
import { RolePermissions, getRbacPermissions, DEFAULT_RBAC_PERMISSIONS } from "../rbac-config"

interface SuperAdminViewProps {
  user: DashboardUser
  handleLogout: () => void
}

interface MockUser {
  id: string
  name: string
  email: string
  role: "customer" | "superAdmin" | "admin" | "manager" | "moderator"
  status: "Active" | "Banned"
  joined: string
}

const INITIAL_USERS: MockUser[] = [
  { id: "USR-001", name: "Farhad Reja", email: "demo@arzuma.com", role: "customer", status: "Active", joined: "June 20, 2026" },
  { id: "USR-002", name: "Sarah Connor", email: "sarah@arzuma.com", role: "admin", status: "Active", joined: "May 14, 2026" },
  { id: "USR-003", name: "John Doe", email: "john@arzuma.com", role: "manager", status: "Active", joined: "April 11, 2026" },
  { id: "USR-004", name: "Agent Smith", email: "smith@arzuma.com", role: "moderator", status: "Active", joined: "July 02, 2026" },
  { id: "USR-005", name: "Super User", email: "super@arzuma.com", role: "superAdmin", status: "Active", joined: "Jan 10, 2026" }
]

export function SuperAdminView({ user, handleLogout }: SuperAdminViewProps) {
  const [activeTab, setActiveTab] = React.useState<"overview" | "users" | "settings" | "audit" | "rbac" | "content" | "product-media" | "product-list" | "product-reviews" | "control-authority">("overview")
  const [users, setUsers] = React.useState<MockUser[]>([])
  const [permissions, setPermissions] = React.useState<Record<string, RolePermissions>>({})
  const [searchQuery, setSearchQuery] = React.useState("")
  
  // Settings Form State
  const [siteName, setSiteName] = React.useState("Arzuma")
  const [allowRegistration, setAllowRegistration] = React.useState(true)
  const [maintenanceMode, setMaintenanceMode] = React.useState(false)
  const [backupRunning, setBackupRunning] = React.useState(false)
  const [backupProgress, setBackupProgress] = React.useState("")
  
  // Live logs
  const [logs, setLogs] = React.useState<string[]>([
    "[SYSTEM] Kernel initialized successfully.",
    "[SECURITY] Firewall rule updated: blocked IP 192.168.1.105",
    "[DATABASE] Automatic vacuum finished. 450 rows cleaned.",
    "[AUTH] SuperAdmin login from IP 103.45.67.12 (DHAKA)",
    "[SYSTEM] Background sync completed in 142ms."
  ])
  
  // Toast Alert
  const [toastMessage, setToastMessage] = React.useState<string | null>(null)

  const triggerToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  React.useEffect(() => {
    const timer = setTimeout(() => {
      const stored = localStorage.getItem("arzuma_all_users")
      if (stored) {
        setUsers(JSON.parse(stored))
      } else {
        localStorage.setItem("arzuma_all_users", JSON.stringify(INITIAL_USERS))
        setUsers(INITIAL_USERS)
      }

      const storedSettings = localStorage.getItem("arzuma_system_settings")
      if (storedSettings) {
        const parsed = JSON.parse(storedSettings)
        setSiteName(parsed.siteName || "Arzuma")
        setAllowRegistration(parsed.allowRegistration ?? true)
        setMaintenanceMode(parsed.maintenanceMode ?? false)
      }

      setPermissions(getRbacPermissions())
    }, 0)

    return () => clearTimeout(timer)
  }, [])

  const saveUsers = (updated: MockUser[]) => {
    setUsers(updated)
    localStorage.setItem("arzuma_all_users", JSON.stringify(updated))
  }

  const addLog = (message: string) => {
    const time = new Date().toLocaleTimeString()
    setLogs(prev => [`[${time}] ${message}`, ...prev.slice(0, 19)])
  }

  const handleRoleChange = (userId: string, newRole: MockUser["role"]) => {
    const updated = users.map(u => u.id === userId ? { ...u, role: newRole } : u)
    saveUsers(updated)
    const affected = users.find(u => u.id === userId)
    addLog(`[ROLE CHANGE] Updated role of ${affected?.name} (${userId}) to '${newRole}'`)
    triggerToast(`Role updated to ${newRole} for ${affected?.name}`)
  }

  const handleToggleBan = (userId: string) => {
    const updated = users.map(u => {
      if (u.id === userId) {
        const nextStatus = u.status === "Active" ? "Banned" as const : "Active" as const
        addLog(`[USER CONTROL] Toggled ban status for ${u.name} (${userId}) to ${nextStatus}`)
        triggerToast(`${u.name} is now ${nextStatus}`)
        return { ...u, status: nextStatus }
      }
      return u
    })
    saveUsers(updated)
  }

  // Create User logic callback
  const handleCreateUser = (newUser: { name: string, email: string, role: MockUser["role"] }) => {
    const created: MockUser = {
      id: `USR-${Math.floor(100 + Math.random() * 900)}`,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: "Active",
      joined: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    }
    saveUsers([...users, created])
    addLog(`[USER CONTROL] Created user ${newUser.name} with role ${newUser.role}`)
    triggerToast(`User ${newUser.name} created successfully!`)
  }

  const handleTriggerBackup = () => {
    if (backupRunning) return
    setBackupRunning(true)
    addLog("[BACKUP] Database backup procedure initiated.")
    
    const steps = [
      "Connecting to Database Cluster...",
      "Exporting Schemas & Tables (182 entities)...",
      "Compressing Assets & Blobs (74.2MB total)...",
      "Uploading snapshot to secure cloud storage...",
      "Backup successful! Reference ID: BAK-9821-ARZ"
    ]
    
    let currentStep = 0
    setBackupProgress(steps[0])
    
    const interval = setInterval(() => {
      currentStep++
      if (currentStep < steps.length) {
        setBackupProgress(steps[currentStep])
        addLog(`[BACKUP] ${steps[currentStep]}`)
      } else {
        clearInterval(interval)
        setBackupRunning(false)
        setBackupProgress("")
        triggerToast("Full system backup completed successfully!")
      }
    }, 1000)
  }

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault()
    const settings = { siteName, allowRegistration, maintenanceMode }
    localStorage.setItem("arzuma_system_settings", JSON.stringify(settings))
    addLog(`[CONFIG] System settings updated. MaintenanceMode=${maintenanceMode}`)
    triggerToast("System configurations saved successfully!")
  }

  const clearLogs = () => {
    setLogs([`[${new Date().toLocaleTimeString()}] Live log trail cleared.`, ...logs.slice(0, 1)])
    triggerToast("Auditing screen logs reset successfully")
  }

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.id.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const activePermissions = permissions.superAdmin || DEFAULT_RBAC_PERMISSIONS.superAdmin

  return (
    <DashboardShell
      user={user}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      handleLogout={handleLogout}
      title="Root Control Center"
      badgeText="ROOT"
      usersCount={users.length}
    >
      {/* Toast Alert */}
      {toastMessage && (
        <div 
          className="fixed bottom-6 right-6 z-50 bg-[#3eb075] text-white text-xs font-bold py-3.5 px-5 shadow-2xl flex items-center gap-2 border border-emerald-400 rounded-lg animate-fadeInFast"
        >
          <Check className="h-4 w-4" />
          <span className="tracking-wide">{toastMessage}</span>
        </div>
      )}

      {/* OVERVIEW TAB */}
      {activeTab === "overview" && (
        <OverviewTab 
          users={users}
          maintenanceMode={maintenanceMode}
          backupRunning={backupRunning}
          backupProgress={backupProgress}
          handleTriggerBackup={handleTriggerBackup}
          logs={logs}
        />
      )}

      {/* USERS TAB */}
      {activeTab === "users" && (
        <UsersTab 
          filteredUsers={filteredUsers}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleRoleChange={handleRoleChange}
          handleToggleBan={handleToggleBan}
          currentUserRole="superAdmin"
          handleCreateUser={handleCreateUser}
        />
      )}

      {/* CONTENT MANAGER TAB */}
      {activeTab === "content" && (
        <ContentTab 
          permissions={activePermissions}
          triggerToast={triggerToast}
        />
      )}

      {/* SYSTEM CONFIG TAB */}
      {activeTab === "settings" && (
        <SettingsTab 
          siteName={siteName}
          setSiteName={setSiteName}
          allowRegistration={allowRegistration}
          setAllowRegistration={setAllowRegistration}
          maintenanceMode={maintenanceMode}
          setMaintenanceMode={setMaintenanceMode}
          handleSaveSettings={handleSaveSettings}
        />
      )}

      {/* RBAC MATRIX TAB */}
      {activeTab === "rbac" && (
        <RbacTab 
          permissions={permissions}
          setPermissions={setPermissions}
          triggerToast={triggerToast}
        />
      )}

      {/* SYSTEM LOGS TAB */}
      {activeTab === "audit" && (
        <AuditTab 
          logs={logs}
          clearLogs={clearLogs}
        />
      )}

      {/* PRODUCT MEDIA TAB */}
      {activeTab === "product-media" && (
        <div className="space-y-6 animate-fadeInFast">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Product Media Library</h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                Manage visual assets, image galleries, and campaign creatives for the storefront.
              </p>
            </div>
            <button
              onClick={() => triggerToast("Opening media publishing workflow...")}
              className="px-4 py-2 bg-[#3eb075] hover:bg-emerald-600 text-white rounded-full text-xs font-bold uppercase tracking-wider"
            >
              Publish new asset
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {[
              { label: "Homepage Hero Banner", size: "1920x720", status: "Published" },
              { label: "Collection Teaser", size: "1200x800", status: "Draft" },
              { label: "Product Carousel", size: "1080x1080", status: "Published" }
            ].map((media) => (
              <div key={media.label} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-5 shadow-sm">
                <div className="h-44 rounded-3xl bg-zinc-100 dark:bg-zinc-950 flex items-end p-4">
                  <span className="text-xs uppercase tracking-widest text-zinc-500">{media.label}</span>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-wide text-zinc-500">
                    <span>{media.size}</span>
                    <span className={
                      media.status === "Published"
                        ? "text-emerald-600"
                        : "text-amber-500"
                    }>{media.status}</span>
                  </div>
                  <button
                    onClick={() => triggerToast(`Viewing ${media.label}`)}
                    className="w-full px-3 py-2 bg-zinc-950 text-white text-[11px] font-bold uppercase rounded-2xl"
                  >
                    View asset
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PRODUCT LIST TAB */}
      {activeTab === "product-list" && (
        <div className="space-y-6 animate-fadeInFast">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Product Catalog Overview</h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                Review product inventory, SKU status and catalog health at a glance.
              </p>
            </div>
            <button
              onClick={() => triggerToast("Refreshing catalog snapshot...")}
              className="px-4 py-2 bg-[#3eb075] hover:bg-emerald-600 text-white rounded-full text-xs font-bold uppercase tracking-wider"
            >
              Refresh catalog
            </button>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-zinc-100 dark:bg-zinc-950 text-zinc-500 uppercase tracking-widest text-[10px]">
                <tr>
                  <th className="p-4">SKU</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {[
                  { sku: "TSHIRT-001", name: "Premium Tee", category: "Apparel", price: "$29", status: "Live" },
                  { sku: "BACKPACK-002", name: "City Backpack", category: "Accessories", price: "$75", status: "Live" },
                  { sku: "JACKET-007", name: "Winter Parka", category: "Outerwear", price: "$180", status: "Draft" }
                ].map((product) => (
                  <tr key={product.sku} className="hover:bg-zinc-50 dark:hover:bg-zinc-950 transition-colors">
                    <td className="p-4 font-mono text-zinc-600 dark:text-zinc-400">{product.sku}</td>
                    <td className="p-4 font-semibold text-zinc-900 dark:text-zinc-100">{product.name}</td>
                    <td className="p-4 text-zinc-500 dark:text-zinc-400">{product.category}</td>
                    <td className="p-4 font-bold text-zinc-800 dark:text-zinc-100">{product.price}</td>
                    <td className="p-4 uppercase text-[10px] tracking-widest font-bold">
                      <span className={product.status === "Live" ? "text-emerald-500" : "text-amber-500"}>{product.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* PRODUCT REVIEWS TAB */}
      {activeTab === "product-reviews" && (
        <div className="space-y-6 animate-fadeInFast">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Product Review Moderation</h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                Approve or flag recent product reviews before they go live on the storefront.
              </p>
            </div>
            <button
              onClick={() => triggerToast("Loading review sentiment analytics...")}
              className="px-4 py-2 bg-[#3eb075] hover:bg-emerald-600 text-white rounded-full text-xs font-bold uppercase tracking-wider"
            >
              Analyse reviews
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { id: "REV-100", user: "Amina Rahman", rating: 5, product: "Leather Tote Bag", comment: "Quality is excellent and delivery was fast.", status: "Pending" },
              { id: "REV-101", user: "Arif Khan", rating: 3, product: "Denim Jacket", comment: "Nice jacket but wrong size shipped.", status: "Pending" },
              { id: "REV-102", user: "Sara Ali", rating: 4, product: "Cargo Pants", comment: "Comfortable and looks premium.", status: "Approved" }
            ].map((review) => (
              <div key={review.id} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-5 shadow-sm">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div>
                    <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{review.product}</div>
                    <div className="text-[11px] text-zinc-500 dark:text-zinc-400">{review.user}</div>
                  </div>
                  <span className={
                    review.status === "Approved"
                      ? "text-emerald-500"
                      : "text-amber-500"
                  }>{review.status}</span>
                </div>
                <p className="text-sm leading-6 text-zinc-700 dark:text-zinc-300">"{review.comment}"</p>
                <div className="mt-4 flex items-center justify-between gap-2">
                  <div className="text-[11px] text-zinc-500">Rating: {review.rating}/5</div>
                  <button
                    onClick={() => triggerToast(`Updated review ${review.id}`)}
                    className="px-3 py-2 text-[10px] uppercase tracking-wider font-bold bg-zinc-950 text-white rounded-2xl"
                  >
                    Manage
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CONTROL AUTHORITY TAB */}
      {activeTab === "control-authority" && (
        <div className="space-y-6 animate-fadeInFast">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Control Authority</h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                High-level security controls, governance policies, and audit locking features.
              </p>
            </div>
            <button
              onClick={() => triggerToast("Saving control authority policy...")}
              className="px-4 py-2 bg-[#3eb075] hover:bg-emerald-600 text-white rounded-full text-xs font-bold uppercase tracking-wider"
            >
              Save policy
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              { title: "RBAC Enforcement", description: "Lock or release specific system permissions for staff roles.", active: true },
              { title: "Audit Lockdown", description: "Enable immutable action logging and compliance snapshots.", active: false },
              { title: "Platform Guardrails", description: "Activate global feature flags and operational safety checks.", active: true },
              { title: "Emergency Override", description: "Grant temporary root access for critical incident response.", active: false }
            ].map((item) => (
              <div key={item.title} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">{item.title}</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">{item.description}</p>
                  </div>
                  <span className={item.active ? "text-emerald-500" : "text-zinc-500"}>
                    {item.active ? "Active" : "Disabled"}
                  </span>
                </div>
                <button
                  onClick={() => triggerToast(`${item.title} toggled`)}
                  className="mt-5 px-4 py-2 bg-zinc-950 text-white rounded-full text-xs font-bold uppercase tracking-wider"
                >
                  Toggle
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </DashboardShell>
  )
}
