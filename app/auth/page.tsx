"use client"

import * as React from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { LoginForm } from "./_components/login-form"
import { RegisterForm } from "./_components/register-form"

function AuthContent() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const mode = searchParams.get("mode")

  const activeTab: "login" | "register" = mode === "register" ? "register" : "login"

  const handleTabChange = (nextTab: "login" | "register") => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("mode", nextTab)
    router.replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex-1 bg-white text-zinc-955 dark:bg-zinc-950 dark:text-zinc-50 font-sans py-16 px-4 flex items-center justify-center min-h-[calc(100vh-80px)]">
      
      {/* Auth Card Outer Container */}
      <div className="w-full max-w-125 border border-zinc-200 dark:border-zinc-800 p-8 sm:p-12 bg-white dark:bg-zinc-900 shadow-sm rounded-none">
        
        {/* Tabs Headers */}
        <div className="flex justify-center items-center gap-8 mb-12 border-b border-zinc-100 dark:border-zinc-800 pb-4">
          <button
            type="button"
            onClick={() => handleTabChange("login")}
            className={`text-sm tracking-wider uppercase transition-all duration-200 ${
              activeTab === "login"
                ? "font-bold text-zinc-955 dark:text-white border-b-2 border-zinc-955 dark:border-white pb-4 -mb-4.5"
                : "font-semibold text-zinc-400 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 pb-4 -mb-4.5"
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => handleTabChange("register")}
            className={`text-sm tracking-wider uppercase transition-all duration-200 ${
              activeTab === "register"
                ? "font-bold text-zinc-955 dark:text-white border-b-2 border-zinc-955 dark:border-white pb-4 -mb-4.5"
                : "font-semibold text-zinc-400 dark:text-zinc-650 hover:text-zinc-600 dark:hover:text-zinc-400 pb-4 -mb-4.5 "
            }`}
          >
            Register
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "login" ? <LoginForm /> : <RegisterForm />}

        {/* Separator and Social Login */}
        <div className="mt-8 space-y-6">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-full border-t border-zinc-200 dark:border-zinc-800"></div>
            <span className="relative bg-white dark:bg-zinc-900 px-4 text-[10px] font-bold uppercase tracking-wider text-zinc-955 dark:text-white z-10">
              OR LOGIN WITH
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Google Button */}
            <button className="flex items-center justify-center gap-2 bg-[#4285F4] hover:bg-[#357ae8] text-white py-3 px-4 text-[10px] font-bold uppercase tracking-wider transition rounded-none">
              <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.485 0-6.19-2.846-6.19-6.19s2.705-6.19 6.19-6.19c1.7 0 3.02.646 4.004 1.572l3.02-3.02C18.6 2.372 15.62 1.2 12.24 1.2 6.132 1.2 1.2 6.132 1.2 1.2 6.132 12.24s4.932 11.04 11.04 11.04c6.132 0 11.04-4.932 11.04-11.04 0-.744-.084-1.464-.24-2.155H12.24z" />
              </svg>
              Google
            </button>

            {/* Facebook Button */}
            <button className="flex items-center justify-center gap-2 bg-[#3B5998] hover:bg-[#2d4373] text-white py-3 px-4 text-[10px] font-bold uppercase tracking-wider transition rounded-none">
              <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" />
              </svg>
              Facebook
            </button>
          </div>
        </div>

      </div>

    </div>
  )
}

export default function AuthPage() {
  return (
    <React.Suspense fallback={
      <div className="flex-1 bg-white text-zinc-955 dark:bg-zinc-950 dark:text-zinc-50 font-sans py-16 px-4 flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="w-full max-w-[500px] border border-zinc-200 dark:border-zinc-800 p-8 sm:p-12 bg-white dark:bg-zinc-900 shadow-sm flex items-center justify-center min-h-[400px]">
          <div className="text-sm font-semibold tracking-wider uppercase animate-pulse">Loading Form...</div>
        </div>
      </div>
    }>
      <AuthContent />
    </React.Suspense>
  )
}
