"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"

import { loginUser } from "@/store/api/user"
import { AuthAPIResponse, UserRole } from "@/data/user.auth"
import { useToast } from "@/components/ui/toast"

export function LoginForm() {
  const router = useRouter()
  const toast = useToast()
  const [showPassword, setShowPassword] = React.useState(false)
  const [identifier, setIdentifier] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [rememberMe, setRememberMe] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState(false)

  const normalizeEmail = (value: string): string => {
    const trimmed = value.trim().toLowerCase()
    return trimmed.includes("@") ? trimmed : `${trimmed}@arzuma.com`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const email = normalizeEmail(identifier)

    try {
      setLoading(true)
      setError(null)

      const response = await loginUser({ email, password })
      console.log("Login API Response:", response)

      // Extract token and save to localStorage
      const token = response.token || response.accessToken || response.data?.token || response.data?.accessToken || ""
      console.log("Extracted token:", token)
      if (token) {
        localStorage.setItem("arzuma_token", token)
      }

      // Extract user info
      const apiUser = response.user || response.data?.user || response

      let userRole: string = apiUser.role || "customer"
      if (userRole === "super-admin") {
        userRole = "superAdmin"
      }

      const loggedInUser = {
        name: apiUser.name || apiUser.username || identifier.split("@")[0],
        email: apiUser.email || email,
        tier: apiUser.tier || "Gold",
        points: apiUser.points ?? 1250,
        role: userRole as UserRole
      }
      localStorage.setItem("arzuma_user", JSON.stringify(loggedInUser))

      window.dispatchEvent(new Event("storage"))

      toast.success("Successfully logged in! Redirecting...")

      if (loggedInUser.role === "superAdmin") {
        router.push("/super-admin")
      } else {
        router.push("/dashboard")
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Invalid email or password. Please try again."
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setLoading(false)
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
          className="w-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-955 px-4 py-3 text-xs outline-none focus:border-zinc-850 dark:focus:border-zinc-200 transition rounded-none"
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
        <div className="text-[11px] text-red-655 dark:text-red-400">
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
        disabled={loading}
        className="w-full bg-[#df4a4a] hover:bg-[#c83c3c] disabled:bg-zinc-400 text-white py-3.5 text-xs font-bold uppercase tracking-wider transition duration-200 rounded-none cursor-pointer disabled:cursor-not-allowed"
      >
        {loading ? "Logging in..." : "Log in"}
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
