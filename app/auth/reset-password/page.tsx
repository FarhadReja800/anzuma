"use client"

import * as React from "react"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")
  const [showPassword, setShowPassword] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!")
      return
    }

    setIsSuccess(true)
  }

  return (
    <div className="flex-1 bg-white text-zinc-955 dark:bg-zinc-955 dark:text-zinc-50 font-sans py-16 px-4 flex items-center justify-center min-h-[calc(100vh-80px)]">
      
      {/* Card Container */}
      <div className="w-full max-w-[500px] border border-zinc-200 dark:border-zinc-800 p-8 sm:p-12 bg-white dark:bg-zinc-900 shadow-sm rounded-none">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-xl font-bold uppercase tracking-wider text-zinc-900 dark:text-white mb-3">
            Change Password
          </h1>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal">
            Enter your new password below to complete the reset process.
          </p>
        </div>

        {isSuccess ? (
          <div className="space-y-6 text-center">
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-none p-6 text-center space-y-2 dark:bg-emerald-950/20 dark:border-emerald-900/30 dark:text-emerald-400">
              <h4 className="text-xs font-bold">Password Reset Successful!</h4>
              <p className="text-[10px]">Your password has been changed successfully. You can now log in using your new credentials.</p>
            </div>
            
            <Link
              href="/auth"
              className="inline-block w-full bg-zinc-950 text-white hover:bg-zinc-800 py-3.5 text-xs font-bold uppercase tracking-wider transition duration-200 rounded-none text-center"
            >
              Go to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* New Password */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-zinc-850 dark:text-zinc-300">
                New Password *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-3 text-xs outline-none focus:border-zinc-850 dark:focus:border-zinc-200 transition rounded-none pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-350"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-zinc-850 dark:text-zinc-300">
                Confirm Password *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-955 px-4 py-3 text-xs outline-none focus:border-zinc-850 dark:focus:border-zinc-200 transition rounded-none pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-350"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#df4a4a] hover:bg-[#c83c3c] text-white py-3.5 text-xs font-bold uppercase tracking-wider transition duration-200 rounded-none"
            >
              Reset Password
            </button>

            <div className="text-center pt-2">
              <Link
                href="/auth"
                className="text-[11px] text-[#df4a4a] hover:underline font-semibold"
              >
                Back to Login
              </Link>
            </div>
          </form>
        )}

      </div>

    </div>
  )
}
