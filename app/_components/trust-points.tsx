import * as React from "react"
import { ShieldCheck, Truck, RefreshCw } from "lucide-react"
import { trustPoints } from "@/lib/data"

const iconMap = {
  Truck,
  RefreshCw,
  ShieldCheck,
}

export function TrustPoints() {
  return (
    <section className="border-y border-zinc-100 dark:border-zinc-900 py-12 bg-white dark:bg-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {trustPoints.map((point) => {
            const IconComponent = iconMap[point.iconName as keyof typeof iconMap] || Truck
            return (
              <div key={point.id} className="flex items-start gap-4">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
                  <IconComponent className="h-12 w-12 stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="text-xl font-bold tracking-wide">
                    {point.title}
                  </h4>
                  <p className="mt-1 text-base text-zinc-550 dark:text-zinc-400">
                    {point.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
