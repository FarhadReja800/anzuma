"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function VerifyCodePage() {
  const router = useRouter()
  const [code, setCode] = React.useState("")
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (code.length < 4) {
      alert("Please enter a valid verification code.")
      return
    }

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      // Redirect to reset password after successful verification
      router.push("/auth/reset-password")
    }, 1500)
  }

  return (
    <div className="flex-1 bg-white text-zinc-955 dark:bg-zinc-955 dark:text-zinc-50 font-sans py-16 px-4 flex items-center justify-center min-h-[calc(100vh-80px)]">
      
      {/* Card Container */}
      <div className="w-full max-w-[500px] border border-zinc-200 dark:border-zinc-800 p-8 sm:p-12 bg-white dark:bg-zinc-900 shadow-sm rounded-none">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-xl font-bold uppercase tracking-wider text-zinc-900 dark:text-white mb-3">
            Verification Code
          </h1>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal">
            Please enter the 6-digit verification code sent to your registered email address.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-zinc-850 dark:text-zinc-300">
              Verification Code *
            </label>
            <input
              type="text"
              required
              maxLength={6}
              placeholder="e.g. 123456"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
              className="w-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-3 text-xs outline-none focus:border-zinc-850 dark:focus:border-zinc-200 text-center tracking-[0.5em] font-bold transition rounded-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#df4a4a] hover:bg-[#c83c3c] text-white py-3.5 text-xs font-bold uppercase tracking-wider transition duration-200 rounded-none disabled:opacity-50"
          >
            {isSubmitting ? "Verifying..." : "Verify Code"}
          </button>

          <div className="flex justify-between items-center text-[11px] font-semibold pt-2">
            <Link href="/auth" className="text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200">
              Back to Login
            </Link>
            <button
              type="button"
              onClick={() => alert("Verification code resent.")}
              className="text-[#df4a4a] hover:underline"
            >
              Resend Code
            </button>
          </div>
        </form>

      </div>

    </div>
  )
}
