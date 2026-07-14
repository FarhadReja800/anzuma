"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"

type UserRole = "customer" | "superAdmin" | "admin" | "manager" | "moderator";

type StoredUser = {
  name?: string
  email: string
  tier?: string
  points?: number
  role?: UserRole
}

export function LoginForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = React.useState(false)
  const [identifier, setIdentifier] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [rememberMe, setRememberMe] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const normalizeEmail = (value: string) => {
    const trimmed = value.trim().toLowerCase()
    return trimmed.includes("@") ? trimmed : `${trimmed}@arzuma.com`
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const email = normalizeEmail(identifier)
    const username = identifier.split("@")[0]
    const formattedName = username ? username.charAt(0).toUpperCase() + username.slice(1) : "Farhad Reja"

    const savedUsers = JSON.parse(localStorage.getItem("arzuma_all_users") || "[]") as StoredUser[]
    const matchedUser = savedUsers.find((u) => u.email?.toLowerCase() === email)

    if (!matchedUser) {
      setError("No registered account found. Please register first.")
      return
    }

    const mockUser = {
      name: matchedUser.name || formattedName,
      email: matchedUser.email,
      tier: matchedUser.tier || "Gold",
      points: matchedUser.points ?? 1250,
      role: matchedUser.role || "customer"
    }
    localStorage.setItem("arzuma_user", JSON.stringify(mockUser))

    window.dispatchEvent(new Event("storage"))

    const adminRoles: UserRole[] = ["superAdmin", "admin", "manager", "moderator"]
    if (adminRoles.includes(mockUser.role)) {
      router.push("/dashboard")
    } else {
      router.push("/")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-1">
        <label className="text-[11px] font-semibold text-zinc-850 dark:text-zinc-300">
          Username or email address *
        </label>
        <input
          type="text"
          required
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          className="w-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-3 text-xs outline-none focus:border-zinc-850 dark:focus:border-zinc-200 transition rounded-none"
        />
      </div>

      <div className="space-y-1">
        <label className="text-[11px] font-semibold text-zinc-850 dark:text-zinc-300">
          Password *
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setError(null)
            }}
            className="w-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-955 px-4 py-3 text-xs outline-none focus:border-zinc-850 dark:focus:border-zinc-200 transition rounded-none pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {error && (
        <div className="text-[11px] text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="text-[10px] text-zinc-550 dark:text-zinc-450 leading-relaxed">
        Please login with the email address you used when registering. Role assignment is managed by the system.
      </div>

      <div className="flex items-center">
        <label className="flex items-center gap-2 text-[11px] font-semibold text-zinc-755 dark:text-zinc-350 select-none cursor-pointer">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="h-3.5 w-3.5 rounded-none border-zinc-200 dark:border-zinc-800 accent-[#df4a4a]"
          />
          Remember me
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-[#df4a4a] hover:bg-[#c83c3c] text-white py-3.5 text-xs font-bold uppercase tracking-wider transition duration-200 rounded-none"
      >
        Log in
      </button>

      <div className="text-left mt-2">
        <Link
          href="/auth/forgot-password"
          className="text-[11px] text-[#df4a4a] hover:underline font-semibold"
        >
          Lost your password?
        </Link>
      </div>
    </form>
  )
}
