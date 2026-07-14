"use client"

import * as React from "react"
import { 
  ShoppingBag,
  Truck,
  Heart,
  HelpCircle,
  Star,
  Package,
  CheckCircle2,
  Info,
  Calendar,
  TrendingUp,
} from "lucide-react"
import { DashboardUser, Order } from "./types"

interface OverviewTabProps {
  user: DashboardUser
  orders?: Order[]
  wishlistCount?: number
  ticketsCount?: number
}

export function OverviewTab({
  user,
  orders: propOrders,
  wishlistCount = 0,
  ticketsCount = 0
}: OverviewTabProps) {

  const [orders, setOrders] = React.useState<Order[]>(propOrders || [])

  React.useEffect(() => {
    const timer = setTimeout(() => {
      const storedOrders = localStorage.getItem("arzuma_orders")
      if (storedOrders) {
        setOrders(JSON.parse(storedOrders))
      } else if (propOrders) {
        setOrders(propOrders)
      }
    }, 0)
    return () => clearTimeout(timer)
  }, [propOrders])

  // Derived stats
  const totalSpend = orders.reduce((sum, o) => o.status !== "Cancelled" ? sum + o.price : sum, 0)
  const purchaseVolume = totalSpend > 0 ? totalSpend : 118.99
  const pendingShipments = orders.filter(o => o.status === "Processing" || o.status === "Shipped").length
  const openTickets = ticketsCount

  // Today's date
  const now = new Date()
  const dateStr = now.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" }).toUpperCase()

  // Spending chart data (monthly, last 6 months)
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN"]
  const spendData = [30, 55, 95, 140, 200, 165]
  const maxSpend = Math.max(...spendData)

  const chartW = 500
  const chartH = 180
  const padX = 30
  const padY = 20
  const usableW = chartW - padX * 2
  const usableH = chartH - padY * 2

  const points = spendData.map((val, i) => ({
    x: padX + (i / (spendData.length - 1)) * usableW,
    y: padY + usableH - ((val / maxSpend) * usableH)
  }))

  const linePath = points.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(" ")
  const areaPath = [
    `M ${points[0].x} ${chartH - padY}`,
    ...points.map(p => `L ${p.x} ${p.y}`),
    `L ${points[points.length - 1].x} ${chartH - padY}`,
    "Z"
  ].join(" ")

  // Recent activities
  const recentActivities: { icon: React.ReactNode; text: string; time: string; color: string }[] = []

  orders.slice(0, 2).forEach(o => {
    if (o.status === "Processing") {
      recentActivities.push({
        icon: <Package className="h-4 w-4" />,
        text: `Your order ${o.id} was successfully created and is in processing.`,
        time: o.date,
        color: "text-blue-500 bg-blue-50 dark:bg-blue-950/30"
      })
    } else if (o.status === "Shipped") {
      recentActivities.push({
        icon: <Truck className="h-4 w-4" />,
        text: `Jacket shipment ${o.id} has left the warehouse (TRK-${o.trackingId || "987654321"}).`,
        time: o.date,
        color: "text-amber-500 bg-amber-50 dark:bg-amber-950/30"
      })
    } else if (o.status === "Delivered") {
      recentActivities.push({
        icon: <CheckCircle2 className="h-4 w-4" />,
        text: `Order ${o.id} has been delivered successfully.`,
        time: o.date,
        color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30"
      })
    }
  })

  if (recentActivities.length === 0) {
    recentActivities.push(
      {
        icon: <Package className="h-4 w-4" />,
        text: "Your order #ORD-67898 was successfully created and is in processing.",
        time: "Yesterday",
        color: "text-blue-500 bg-blue-50 dark:bg-blue-950/30"
      },
      {
        icon: <Truck className="h-4 w-4" />,
        text: "Jacket shipment ORD-12345 has left the warehouse (TRK-987654321).",
        time: "2 days ago",
        color: "text-amber-500 bg-amber-50 dark:bg-amber-950/30"
      }
    )
  }

  recentActivities.push(
    {
      icon: <Star className="h-4 w-4" />,
      text: "VIP Tier upgrade! You were promoted to Gold Tier level.",
      time: "July 2, 2026",
      color: "text-yellow-500 bg-yellow-50 dark:bg-yellow-950/30"
    },
    {
      icon: <Info className="h-4 w-4" />,
      text: "Your address details were synchronized with your profile.",
      time: "July 1, 2026",
      color: "text-zinc-500 bg-zinc-100 dark:bg-zinc-800"
    }
  )

  const statCards = [
    {
      label: "Purchase Volume",
      value: `$${purchaseVolume.toFixed(2)}`,
      sub: "↑ +44.8% vs last month",
      subColor: "text-emerald-500",
      icon: <ShoppingBag className="h-5 w-5" />,
      iconBg: "bg-rose-100 dark:bg-rose-950/40 text-rose-500",
      accent: "border-l-4 border-rose-400"
    },
    {
      label: "Pending Shipments",
      value: `${pendingShipments}`,
      sub: `↑ ${pendingShipments} in transit`,
      subColor: "text-blue-500",
      icon: <Truck className="h-5 w-5" />,
      iconBg: "bg-blue-100 dark:bg-blue-950/40 text-blue-500",
      accent: "border-l-4 border-blue-400"
    },
    {
      label: "Wishlist Items",
      value: `${wishlistCount}`,
      sub: "Syncs with header",
      subColor: "text-zinc-400",
      icon: <Heart className="h-5 w-5" />,
      iconBg: "bg-pink-100 dark:bg-pink-950/40 text-pink-500",
      accent: "border-l-4 border-pink-400"
    },
    {
      label: "Open Help Tickets",
      value: `${openTickets}`,
      sub: "All responsed live",
      subColor: "text-zinc-400",
      icon: <HelpCircle className="h-5 w-5" />,
      iconBg: "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-500",
      accent: "border-l-4 border-emerald-400"
    }
  ]

  return (
    <div className="space-y-6 animate-fadeInFast">

      {/* ── Welcome Banner ── */}
      <div className="relative bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/80 rounded-2xl px-8 py-6 overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.04)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        <div className="z-10">
          <div className="flex items-center gap-2 text-[11px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-1.5">
            <Calendar className="h-3.5 w-3.5" />
            <span>{dateStr}</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-zinc-850 dark:text-zinc-100 tracking-tight leading-tight">
            Welcome back, <span className="text-[#e8534a]">{user.name}</span>
          </h2>
          <p className="text-[12px] text-zinc-450 dark:text-zinc-505 mt-2 max-w-md leading-relaxed font-medium">
            You are currently logged into your VIP account. Benefit from exclusive members‑only discounts, free returns, and 24/7 priority messaging desk.
          </p>
        </div>

        {/* Loyalty Tier Badge */}
        <div className="shrink-0 z-10">
          <div className="bg-gradient-to-br from-[#c8a96e] to-[#9c7a3a] rounded-xl px-5 py-4 text-white shadow-lg shadow-amber-500/20 flex flex-col items-center min-w-[140px]">
            <div className="flex items-center gap-1.5 mb-1">
              <Star className="h-4 w-4 fill-white/80 text-white/80" />
              <span className="text-[10px] font-black uppercase tracking-widest opacity-90">Loyalty Level</span>
            </div>
            <span className="text-lg font-black uppercase tracking-wider">{user.tier} Tier</span>
            <span className="text-[10px] font-bold opacity-80 mt-0.5">{user.points.toLocaleString()} Reward Points</span>
          </div>
        </div>

        <div className="absolute -right-16 -top-16 w-64 h-64 bg-gradient-to-br from-rose-100 to-amber-50 dark:from-rose-950/20 dark:to-amber-950/10 rounded-full opacity-60 blur-3xl pointer-events-none" />
      </div>

      {/* ── 4 Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {statCards.map((card, i) => (
          <div
            key={i}
            className={`bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/80 rounded-xl p-5 flex items-start justify-between gap-4 shadow-[0_1px_4px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow ${card.accent}`}
          >
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-black text-zinc-400 dark:text-zinc-505 uppercase tracking-widest mb-2">
                {card.label}
              </div>
              <div className="text-3xl font-black text-zinc-850 dark:text-zinc-100 tracking-tight leading-none mb-2">
                {card.value}
              </div>
              <div className={`text-[11px] font-semibold ${card.subColor}`}>
                {card.sub}
              </div>
            </div>
            <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${card.iconBg}`}>
              {card.icon}
            </div>
          </div>
        ))}
      </div>

      {/* ── Bottom Row: Chart + Recent Activities ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* Spending Analytics Chart */}
        <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/80 rounded-2xl p-6 shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-sm font-black text-zinc-850 dark:text-zinc-100 uppercase tracking-wide">Spending Analytics</h3>
              <p className="text-[10px] text-zinc-400 dark:text-zinc-505 mt-0.5 font-medium">Past 6 months purchase history (in USD)</p>
            </div>
            <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-2.5 py-1.5 rounded-lg text-zinc-500 dark:text-zinc-400 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-750 transition-colors select-none">
              <TrendingUp className="h-3 w-3" />
              View Report
            </div>
          </div>

          <div className="relative w-full" style={{ height: "200px" }}>
            <svg viewBox={`0 0 ${chartW} ${chartH + 30}`} className="w-full h-full" preserveAspectRatio="none">
              {[0, 1, 2, 3].map(i => {
                const y = padY + (i / 3) * usableH
                return (
                  <line key={i} x1={padX} y1={y} x2={chartW - padX} y2={y}
                    stroke="currentColor" className="text-zinc-100 dark:text-zinc-800"
                    strokeWidth="1" strokeDasharray="4 4" />
                )
              })}

              <defs>
                <linearGradient id="areaGradOv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#e8534a" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#e8534a" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={areaPath} fill="url(#areaGradOv)" />
              <path d={linePath} fill="none" stroke="#e8534a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

              {points.map((p, i) => (
                <circle key={i} cx={p.x} cy={p.y} r="4.5" fill="white" stroke="#e8534a" strokeWidth="2" className="dark:fill-zinc-900" />
              ))}

              {months.map((m, i) => {
                const x = padX + (i / (months.length - 1)) * usableW
                return (
                  <text key={i} x={x} y={chartH + 22} textAnchor="middle"
                    fill="#a1a1aa"
                    style={{ fontSize: "9px", fontWeight: 700, fontFamily: "sans-serif" }}>
                    {m}
                  </text>
                )
              })}
            </svg>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="lg:col-span-5 bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/80 rounded-2xl p-6 shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-black text-zinc-850 dark:text-zinc-100 uppercase tracking-wide">Recent Activities</h3>
            <span className="text-[9px] font-black text-zinc-400 dark:text-zinc-505 uppercase tracking-widest">Live</span>
          </div>

          <div className="space-y-4">
            {recentActivities.map((activity, i) => (
              <div key={i} className="flex items-start gap-3.5">
                <div className={`h-7 w-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${activity.color}`}>
                  {activity.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-semibold text-zinc-700 dark:text-zinc-300 leading-snug">
                    {activity.text}
                  </p>
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-505 font-medium mt-0.5 block">
                    {activity.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  )
}
