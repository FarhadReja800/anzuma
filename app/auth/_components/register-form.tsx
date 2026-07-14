"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"

export function RegisterForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = React.useState(false)
  const [username, setUsername] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Save new mock user session
    const formattedName = username.charAt(0).toUpperCase() + username.slice(1)
    const normalizedEmail = email.trim().toLowerCase()
    const mockUser = {
      name: formattedName || "Farhad Reja",
      email: normalizedEmail,
      tier: "Bronze", // Newly registered start at Bronze
      points: 100, // Starting gift points
      role: "customer"
    }

    const allUsers = JSON.parse(localStorage.getItem("arzuma_all_users") || "[]")
    const existingIndex = allUsers.findIndex((u: any) => u.email?.toLowerCase() === normalizedEmail)
    const joinedDate = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })

    const userEntry = {
      id: existingIndex > -1 ? allUsers[existingIndex].id : `USR-${Math.floor(100 + Math.random() * 900)}`,
      name: formattedName || "Farhad Reja",
      email: normalizedEmail,
      role: existingIndex > -1 ? allUsers[existingIndex].role || "customer" : "customer",
      status: existingIndex > -1 ? allUsers[existingIndex].status || "Active" : "Active",
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
    
    router.push("/dashboard")
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

      <button
        type="submit"
        className="w-full bg-[#df4a4a] hover:bg-[#c83c3c] text-white py-3.5 text-xs font-bold uppercase tracking-wider transition duration-200 rounded-none"
      >
        Register
      </button>
    </form>
  )
}
