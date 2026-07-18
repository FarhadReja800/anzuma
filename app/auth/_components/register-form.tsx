"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"

import { registerUser } from "@/store/api/user"
import { AuthAPIResponse, UserEntry, UserRole } from "@/data/user.auth"
import { useToast } from "@/components/ui/toast"

export function RegisterForm() {
  const router = useRouter()
  const toast = useToast()
  const [showPassword, setShowPassword] = React.useState(false)
  const [username, setUsername] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [error, setError] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const formattedName = username.charAt(0).toUpperCase() + username.slice(1)
    const normalizedEmail = email.trim().toLowerCase()

    try {
      setLoading(true)
      setError(null)

      const response = await registerUser({
        name: formattedName,
        email: normalizedEmail,
        password: password,
        role: "user", // Default role tested in postman user register request
      })
      console.log("Register API Response:", response)

      // If registration returns token/session info, save it
      const token = response.token || response.accessToken || response.data?.token || response.data?.accessToken || ""
      console.log("Extracted token:", token)
      if (token) {
        localStorage.setItem("arzuma_token", token)
      }

      // Save user session
      const apiUser = response.user || response.data?.user || response
      let userRole: string = apiUser.role === "user" ? "customer" : (apiUser.role || "customer")
      if (userRole === "super-admin") {
        userRole = "superAdmin"
      }

      const mockUser = {
        name: apiUser.name || formattedName,
        email: apiUser.email || normalizedEmail,
        tier: "Bronze", 
        points: 100, 
        role: userRole as UserRole
      }

      const allUsers = JSON.parse(localStorage.getItem("arzuma_all_users") || "[]") as UserEntry[]
      const existingIndex = allUsers.findIndex((u: UserEntry) => u.email?.toLowerCase() === normalizedEmail)
      const joinedDate = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })

      const userEntry: UserEntry = {
        id: existingIndex > -1 ? allUsers[existingIndex].id : `USR-${Math.floor(100 + Math.random() * 900)}`,
        name: apiUser.name || formattedName,
        email: normalizedEmail,
        role: userRole as UserRole,
        status: "Active",
        joined: existingIndex > -1 ? allUsers[existingIndex].joined || joinedDate : joinedDate
      }

      if (existingIndex > -1) {
        allUsers[existingIndex] = userEntry
      } else {
        allUsers.push(userEntry)
      }

      localStorage.setItem("arzuma_all_users", JSON.stringify(allUsers))
      localStorage.setItem("arzuma_user", JSON.stringify(mockUser))
      
      // Dispatch storage event to notify header/other components
      window.dispatchEvent(new Event("storage"))
      
      toast.success("Successfully registered account! Welcome!")

      if (mockUser.role === "superAdmin") {
        router.push("/super-admin")
      } else {
        router.push("/dashboard")
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Failed to register. Please try again."
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
          Username *
        </label>
        <input
          type="text"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-3 text-xs outline-none focus:border-zinc-850 dark:focus:border-zinc-200 transition rounded-none"
        />
      </div>

      <div className="space-y-1">
        <label className="text-[11px] font-semibold text-zinc-850 dark:text-zinc-300">
          Email address *
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
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

      <p className="text-[10px] text-zinc-550 dark:text-zinc-450 leading-relaxed font-normal">
        Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our{" "}
        <Link href="/privacy-policy" className="text-[#df4a4a] hover:underline font-semibold">
          privacy policy
        </Link>
        .
      </p>

      {error && (
        <div className="text-[11px] text-red-650 dark:text-red-400">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#df4a4a] hover:bg-[#c83c3c] disabled:bg-zinc-400 text-white py-3.5 text-xs font-bold uppercase tracking-wider transition duration-200 rounded-none cursor-pointer disabled:cursor-not-allowed"
      >
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  )
}
