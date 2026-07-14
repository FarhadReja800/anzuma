"use client"

import * as React from "react"
import { Search, Lock, Plus, UserPlus, X } from "lucide-react"

interface MockUser {
  id: string
  name: string
  email: string
  role: "customer" | "superAdmin" | "admin" | "manager" | "moderator"
  status: "Active" | "Banned"
  joined: string
}

interface UsersTabProps {
  filteredUsers: MockUser[]
  searchQuery: string
  setSearchQuery: (query: string) => void
  handleRoleChange: (userId: string, newRole: MockUser["role"]) => void
  handleToggleBan: (userId: string) => void
  currentUserRole?: string
  handleCreateUser?: (newUser: { name: string, email: string, role: MockUser["role"] }) => void
}

export function UsersTab({
  filteredUsers,
  searchQuery,
  setSearchQuery,
  handleRoleChange,
  handleToggleBan,
  currentUserRole = "superAdmin",
  handleCreateUser
}: UsersTabProps) {
  
  const [isAdding, setIsAdding] = React.useState(false)
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [role, setRole] = React.useState<MockUser["role"]>("customer")

  // Generate allowed roles for user creation dropdown based on active permissions
  const getAllowedRoles = React.useMemo(() => {
    const roles: { val: MockUser["role"]; label: string }[] = [
      { val: "customer", label: "Customer" }
    ]
    
    // Super admin can manage / create all roles
    if (currentUserRole === "superAdmin") {
      roles.push({ val: "moderator", label: "Moderator" })
      roles.push({ val: "manager", label: "Manager" })
      roles.push({ val: "admin", label: "Admin" })
      roles.push({ val: "superAdmin", label: "Super Admin" })
    } 
    // Admin can create manager & moderator
    else if (currentUserRole === "admin") {
      roles.push({ val: "moderator", label: "Moderator" })
      roles.push({ val: "manager", label: "Manager" })
    }
    // Manager can only create moderator
    else if (currentUserRole === "manager") {
      roles.push({ val: "moderator", label: "Moderator" })
    }

    return roles
  }, [currentUserRole])

  const canCreateUsers = getAllowedRoles.length > 1

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!handleCreateUser || !name.trim() || !email.trim()) return
    handleCreateUser({ name, email, role })
    setName("")
    setEmail("")
    setRole("customer")
    setIsAdding(false)
  }

  return (
    <div className="space-y-6 animate-fadeInFast">
      
      {/* Top Toolbar */}
      <div className="flex justify-between items-center gap-4 flex-wrap">
        <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-505">
          User Directory ({filteredUsers.length} matches)
        </h2>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Search Input Box */}
          <div className="relative w-full sm:w-72">
            <input 
              type="text" 
              placeholder="Search ID, name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 py-2.5 pl-9 pr-4 text-xs text-zinc-700 dark:text-zinc-300 outline-none rounded-xl focus:border-emerald-500 transition"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          </div>

          {/* User Creation Trigger */}
          {canCreateUsers && handleCreateUser && (
            isAdding ? (
              <button 
                onClick={() => setIsAdding(false)}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" /> Cancel
              </button>
            ) : (
              <button 
                onClick={() => setIsAdding(true)}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-[#3eb075] hover:bg-emerald-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-sm shadow-emerald-500/10"
              >
                <UserPlus className="h-4 w-4" /> Add User
              </button>
            )
          )}
        </div>
      </div>

      {/* Creation form */}
      {isAdding && (
        <form onSubmit={onSubmit} className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/80 p-6 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.01)] space-y-4 animate-fadeInFast">
          <h3 className="text-xs font-black uppercase text-[#3eb075] tracking-widest border-b pb-2">
            Create User Account
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input 
              type="text" placeholder="Full Name..." required value={name} onChange={(e) => setName(e.target.value)}
              className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-800 dark:text-zinc-200 outline-none focus:border-[#3eb075]"
            />
            <input 
              type="email" placeholder="Email Address..." required value={email} onChange={(e) => setEmail(e.target.value)}
              className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-800 dark:text-zinc-200 outline-none focus:border-[#3eb075]"
            />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as any)}
              className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-800 dark:text-zinc-200 outline-none focus:border-[#3eb075] cursor-pointer font-bold uppercase tracking-wider text-[11px]"
            >
              {getAllowedRoles.map(o => (
                <option key={o.val} value={o.val}>{o.label}</option>
              ))}
            </select>
          </div>
          <button 
            type="submit"
            className="px-6 py-2.5 bg-[#3eb075] hover:bg-emerald-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Create Account
          </button>
        </form>
      )}

      {/* Users Table */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/80 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.01)] overflow-hidden">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-zinc-150 dark:border-zinc-850 text-zinc-400 font-bold uppercase tracking-wider text-[10px] bg-zinc-50/50 dark:bg-zinc-900/50">
              <th className="p-4">User Details</th>
              <th className="p-4">ID</th>
              <th className="p-4">Assigned Role</th>
              <th className="p-4">Status</th>
              <th className="p-4">Joined Date</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-850 font-medium">
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-zinc-450 uppercase tracking-wider font-semibold">
                  No registered users found matching query
                </td>
              </tr>
            ) : (
              filteredUsers.map((u) => {
                const isSuperUser = u.id === "USR-005"
                return (
                  <tr key={u.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-850/30 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wide">{u.name}</div>
                      <div className="text-[10px] text-zinc-450 font-medium lowercase mt-0.5">{u.email}</div>
                    </td>
                    <td className="p-4 font-mono text-[10px] text-zinc-450">{u.id}</td>
                    <td className="p-4">
                      <select
                        value={u.role}
                        onChange={(e) => handleRoleChange(u.id, e.target.value as any)}
                        disabled={isSuperUser}
                        className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-[10px] uppercase font-bold tracking-wider py-1.5 px-2.5 outline-none focus:border-[#3eb075] text-zinc-650 dark:text-zinc-300 cursor-pointer rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <option value="customer">Customer</option>
                        <option value="moderator">Moderator</option>
                        <option value="manager">Manager</option>
                        <option value="admin">Admin</option>
                        <option value="superAdmin">Super Admin</option>
                      </select>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase ${
                        u.status === "Active" 
                          ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20"
                          : "bg-red-50 text-red-500 dark:bg-red-955/20"
                      }`}>
                        <span className="h-1 w-1 rounded-full bg-current" />
                        {u.status}
                      </span>
                    </td>
                    <td className="p-4 text-zinc-455 font-medium">{u.joined}</td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleToggleBan(u.id)}
                        disabled={isSuperUser}
                        className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition select-none cursor-pointer rounded-lg border ${
                          u.status === "Active"
                            ? "bg-red-50 border-red-200 text-red-600 hover:bg-red-100 dark:bg-red-955/15 dark:border-red-900/50"
                            : "bg-emerald-50 border-emerald-200 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-950/15 dark:border-emerald-900/50"
                        } disabled:opacity-30 disabled:cursor-not-allowed`}
                      >
                        {u.status === "Active" ? "Ban Account" : "Unban Account"}
                      </button>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 p-4 text-[10px] text-zinc-450 font-bold uppercase tracking-wider flex items-center gap-2 rounded-xl">
        <Lock className="h-4 w-4 text-red-500" />
        Note: USR-005 (Super User Root account) role assignment and security state is write-protected by environment configuration guidelines.
      </div>
    </div>
  )
}
