"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"

export function NewsletterPromo() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    alert("Subscribed successfully!")
  }

  return (
    <section className="bg-zinc-950 text-white py-16 dark:bg-zinc-900">
      <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Join the Clotya Club
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
          Subscribe to receive update on new collections, exclusive events, and a 15% discount on your first order.
        </p>
        <form onSubmit={handleSubmit} className="pt-2 flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <input
            type="email"
            required
            placeholder="Enter your email address"
            className="flex-1 px-4 py-3 rounded-xl bg-zinc-900 text-white border border-zinc-800 text-sm outline-none focus:border-white transition dark:bg-zinc-955"
          />
          <Button type="submit" className="bg-white text-black hover:bg-zinc-200 h-11 text-xs font-bold rounded-xl px-6">
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  )
}
