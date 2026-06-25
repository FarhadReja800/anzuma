"use client"

import * as React from "react"
import { Mail, Phone, MapPin, Clock, Send, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ContactPage() {
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
    if (!formData.name || !formData.email || !formData.message) {
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
    <div className="flex-1 bg-white text-zinc-950 dark:bg-black dark:text-zinc-50 font-sans">
      
      {/* Category Banner */}
      <section className="relative bg-zinc-50 dark:bg-zinc-900/40 py-16 lg:py-24 overflow-hidden border-b border-zinc-100 dark:border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative flex flex-col items-center text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Support</span>
          <h1 className="text-4xl font-extrabold tracking-tight">Contact Us</h1>
          <p className="text-sm text-zinc-500 max-w-lg leading-relaxed">
            Have questions about our garments, custom ordering, sizing assistance, or shipping? Get in touch, we are here to help.
          </p>
          <div className="flex items-center gap-1 text-[11px] font-bold text-zinc-500">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            <span>24/7 DEDICATED CUSTOMER SUPPORT</span>
          </div>
        </div>
      </section>

      {/* Grid Container */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Column Left: Contact Details */}
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-4">
              <h2 className="text-2xl font-extrabold tracking-tight">Get in touch with us</h2>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Feel free to contact us by email, phone, or simply visit one of our curated showrooms. Our stylists will guide you through the latest selections.
              </p>
            </div>

            <div className="space-y-6">
              
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-xl bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center text-zinc-700 dark:text-zinc-350 shrink-0 border border-zinc-100 dark:border-zinc-800">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold tracking-wide uppercase text-zinc-400">Our Showroom</h4>
                  <p className="mt-1 text-sm text-zinc-800 dark:text-zinc-200">100 Broadway Avenue, Soho New York, NY 10012</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-xl bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center text-zinc-700 dark:text-zinc-350 shrink-0 border border-zinc-100 dark:border-zinc-800">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold tracking-wide uppercase text-zinc-400">Phone Support</h4>
                  <p className="mt-1 text-sm text-zinc-800 dark:text-zinc-200">+1 (800) 555-0199</p>
                  <p className="text-xs text-zinc-400">Mon-Fri: 9am - 6pm EST</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-xl bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center text-zinc-700 dark:text-zinc-350 shrink-0 border border-zinc-100 dark:border-zinc-800">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold tracking-wide uppercase text-zinc-400">Styling & General Inquiries</h4>
                  <p className="mt-1 text-sm text-zinc-800 dark:text-zinc-200">hello@clotya.com</p>
                </div>
              </div>

            </div>
          </div>

          {/* Column Right: Elegant Form */}
          <div className="lg:col-span-7 bg-zinc-50 dark:bg-zinc-900/40 p-8 sm:p-10 rounded-3xl border border-zinc-100 dark:border-zinc-900">
            <h3 className="text-lg font-bold mb-6">Send us a message</h3>
            
            {isSuccess ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl p-6 text-center space-y-2 dark:bg-emerald-950/20 dark:border-emerald-900/30 dark:text-emerald-400">
                <h4 className="text-sm font-bold">Message Sent Successfully!</h4>
                <p className="text-xs">Thank you for writing to us. Our styling team will respond to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-xs outline-none transition focus:border-zinc-950 dark:border-zinc-850 dark:bg-zinc-950 dark:focus:border-zinc-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-xs outline-none transition focus:border-zinc-950 dark:border-zinc-850 dark:bg-zinc-950 dark:focus:border-zinc-50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="General inquiry, order delay, styling support..."
                    className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-xs outline-none transition focus:border-zinc-950 dark:border-zinc-850 dark:bg-zinc-950 dark:focus:border-zinc-50"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Your Message *</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us what you need help with..."
                    className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-xs outline-none transition focus:border-zinc-950 dark:border-zinc-850 dark:bg-zinc-950 dark:focus:border-zinc-50 resize-none"
                  ></textarea>
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-zinc-950 text-white hover:bg-zinc-800 h-12 text-xs font-bold tracking-wider uppercase transition flex items-center justify-center gap-2 dark:bg-zinc-100 dark:text-black dark:hover:bg-zinc-200 disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <Send className="h-3.5 w-3.5" />
                </Button>

              </form>
            )}
          </div>

        </div>
      </section>

    </div>
  )
}
