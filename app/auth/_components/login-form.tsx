"use client"

import * as React from "react"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"

export function LoginForm() {
  const [showPassword, setShowPassword] = React.useState(false)
  const [identifier, setIdentifier] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [rememberMe, setRememberMe] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Logging in with: " + identifier)
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
