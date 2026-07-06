"use client"

import * as React from "react"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const [identifier, setIdentifier] = React.useState("")
  const [isSubmitted, setIsSubmitted] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  return (
    <div className="flex-1 bg-white text-zinc-955 dark:bg-zinc-950 dark:text-zinc-50 font-sans py-16 px-4 flex items-center justify-center min-h-[calc(100vh-80px)]">
      
      {/* Card Container */}
      <div className="w-full max-w-[500px] border border-zinc-200 dark:border-zinc-800 p-8 sm:p-12 bg-white dark:bg-zinc-900 shadow-sm rounded-none">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-xl font-bold uppercase tracking-wider text-zinc-900 dark:text-white mb-3">
            Lost your password?
          </h1>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal">
            Please enter your username or email address. You will receive a link to create a new password via email.
          </p>
        </div>

        {isSubmitted ? (
          <div className="space-y-6 text-center">
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-none p-6 text-center space-y-2 dark:bg-emerald-950/20 dark:border-emerald-900/30 dark:text-emerald-400">
              <h4 className="text-xs font-bold">Request Submitted!</h4>
              <p className="text-[10px]">We have sent a password reset link to your email address if it exists in our system.</p>
            </div>
            
            <div className="flex justify-between items-center text-[11px] font-semibold">
              <Link href="/auth" className="text-[#df4a4a] hover:underline">
                Back to Login
              </Link>
              <Link href="/auth/verify-code" className="text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200">
                Enter verification code
              </Link>
            </div>
          </div>
        ) : (
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

            <button
              type="submit"
              className="w-full bg-[#df4a4a] hover:bg-[#c83c3c] text-white py-3.5 text-xs font-bold uppercase tracking-wider transition duration-200 rounded-none"
            >
              Get New Password
            </button>

            <div className="flex justify-between items-center text-[11px] font-semibold pt-2">
              <Link href="/auth" className="text-[#df4a4a] hover:underline">
                Back to Login
              </Link>
              <Link href="/auth/verify-code" className="text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-250">
                Enter verification code
              </Link>
            </div>
          </form>
        )}

      </div>

    </div>
  )
}
