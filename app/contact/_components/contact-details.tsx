import * as React from "react"
import { Mail, Phone, MapPin } from "lucide-react"

export function ContactDetails() {
  return (
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
  )
}
