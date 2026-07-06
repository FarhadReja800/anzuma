"use client"

import * as React from "react"

export function ContactForm() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.subject) {
      alert("Please fill in all required fields.")
      return
    }

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      setFormData({ name: "", email: "", subject: "", message: "" })
      setTimeout(() => setIsSuccess(false), 5000)
    }, 1500)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="w-full">
      {isSuccess ? (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-none p-6 text-center space-y-2 dark:bg-emerald-950/20 dark:border-emerald-900/30 dark:text-emerald-400">
          <h4 className="text-sm font-bold">Message Sent Successfully!</h4>
          <p className="text-xs">Thank you for writing to us. We will respond to you within 24 hours.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">Your name *</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-zinc-200 bg-white px-3 py-2 text-[11px] outline-none transition focus:border-zinc-800 dark:border-zinc-800 dark:bg-zinc-950 dark:focus:border-zinc-200 rounded-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">Your email *</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-zinc-200 bg-white px-3 py-2 text-[11px] outline-none transition focus:border-zinc-800 dark:border-zinc-800 dark:bg-zinc-950 dark:focus:border-zinc-200 rounded-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">Subject *</label>
            <input
              type="text"
              name="subject"
              required
              value={formData.subject}
              onChange={handleChange}
              className="w-full border border-zinc-200 bg-white px-3 py-2 text-[11px] outline-none transition focus:border-zinc-800 dark:border-zinc-800 dark:bg-zinc-950 dark:focus:border-zinc-200 rounded-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">Your message</label>
            <textarea
              name="message"
              rows={6}
              value={formData.message}
              onChange={handleChange}
              className="w-full border border-zinc-200 bg-white px-3 py-2 text-[11px] outline-none transition focus:border-zinc-800 dark:border-zinc-800 dark:bg-zinc-950 dark:focus:border-zinc-200 resize-none rounded-none"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#eaeaea] hover:bg-[#dfdfdf] border border-zinc-300 text-zinc-800 px-6 py-2.5 text-[11px] font-bold uppercase tracking-wider transition rounded-none dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-700 dark:hover:bg-zinc-700 disabled:opacity-50"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      )}
    </div>
  )
}

