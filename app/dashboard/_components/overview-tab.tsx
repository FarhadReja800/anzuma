import * as React from "react"
import { 
  Trophy, 
  ShoppingBag, 
  Heart, 
  LifeBuoy, 
  Clock, 
  MapPin, 
  Calendar, 
  TrendingUp 
} from "lucide-react"
import { DashboardUser, Order } from "./types"

interface OverviewTabProps {
  user: DashboardUser
  orders: Order[]
  wishlistCount: number
  ticketsCount: number
}

export function OverviewTab({
  user,
  orders,
  wishlistCount,
  ticketsCount
}: OverviewTabProps) {
  
  const totalSpending = orders.reduce(
    (sum, o) => sum + (o.status !== "Cancelled" ? o.price : 0), 
    0
  )

  const activeShipments = orders.filter(
    o => o.status === "Processing" || o.status === "Shipped"
  ).length

  // Stats Card data
  const stats = [
    { 
      label: "Purchase Volume", 
      val: `$${totalSpending.toFixed(2)}`, 
      trend: "+14.8% vs last month", 
      icon: ShoppingBag, 
      color: "text-[#df4a4a]" 
    },
    { 
      label: "Pending Shipments", 
      val: activeShipments.toString(), 
      trend: activeShipments > 0 ? `${activeShipments} in transit` : "No pending items", 
      icon: Clock, 
      color: "text-blue-500" 
    },
    { 
      label: "Wishlist Items", 
      val: wishlistCount.toString(), 
      trend: "Syncs with header", 
      icon: Heart, 
      color: "text-red-500" 
    },
    { 
      label: "Open Help Tickets", 
      val: ticketsCount.toString(), 
      trend: "AI responder live", 
      icon: LifeBuoy, 
      color: "text-green-500" 
    }
  ]

  // Chart values
  const chartPoints = [
    { x: 60, y: 140, val: "$40", date: "Jan" },
    { x: 160, y: 110, val: "$90", date: "Feb" },
    { x: 260, y: 125, val: "$60", date: "Mar" },
    { x: 360, y: 80, val: "$120", date: "Apr" },
    { x: 460, y: 30, val: "$190", date: "May" },
    { x: 560, y: 65, val: `$${totalSpending > 10 ? Math.round(totalSpending) : 143}`, date: "Jun" }
  ]

  return (
    <div className="space-y-8 animate-fadeInFast">
      {/* Header banner card */}
      <div className="bg-gradient-to-r from-zinc-900 to-zinc-955 border border-zinc-850 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-white relative overflow-hidden">
        <div className="absolute right-0 bottom-0 top-0 opacity-10 flex items-center pointer-events-none">
          <Trophy className="h-64 w-64 translate-x-20 rotate-12 text-white" />
        </div>
        
        <div className="space-y-2 z-10">
          <div className="flex items-center gap-2">
            <Calendar className="h-3.5 w-3.5 text-zinc-400" />
            <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">
              {new Date().toLocaleDateString("en-US", { weekday: 'long', month: 'short', day: 'numeric' })}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-normal tracking-tight font-serif text-white">
            Welcome back, <span className="font-bold text-[#df4a4a]">{user.name}</span>
          </h1>
          <p className="text-[12px] text-zinc-400 max-w-lg font-light leading-relaxed">
            You are currently logged into your VIP account. Benefit from exclusive members-only discounts, free returns, and 24/7 priority messaging desk.
          </p>
        </div>

        <div className="flex items-center gap-3 z-10 bg-zinc-900/60 border border-zinc-800 p-3 sm:p-4 shrink-0 shadow-lg">
          <div className="h-10 w-10 bg-[#df4a4a] flex items-center justify-center text-white">
            <Trophy className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[9px] font-bold text-zinc-450 uppercase tracking-widest">Loyalty Level</div>
            <div className="text-sm font-black tracking-wide text-white uppercase">{user.tier} Tier</div>
            <div className="text-[10px] text-zinc-400 font-semibold">{user.points} Reward Points</div>
          </div>
        </div>
      </div>

      {/* Quick Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((m, idx) => {
          const Icon = m.icon
          return (
            <div key={idx} className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-805 p-5 shadow-[0_1px_4px_rgba(0,0,0,0.02)] flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <span className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">{m.label}</span>
                <Icon className={`h-4.5 w-4.5 ${m.color}`} />
              </div>
              <div className="mt-4">
                <div className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-955 dark:text-white font-serif">{m.val}</div>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1 font-semibold flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-[#df4a4a]" />
                  {m.trend}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Spending Chart & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* SVG Area Chart */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-805 p-6 shadow-[0_1px_4px_rgba(0,0,0,0.02)] lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-white">Spending Analytics</h3>
              <p className="text-[11px] text-zinc-400">Past 6 months purchase tracker (in USD)</p>
            </div>
            <span className="text-[10px] font-bold text-[#df4a4a] border border-[#df4a4a]/25 px-2 py-0.5 tracking-wider bg-[#df4a4a]/5">
              AUTO-UPDATES
            </span>
          </div>

          <div className="relative w-full h-56 mt-4">
            <svg viewBox="0 0 600 200" className="w-full h-full">
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#df4a4a" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#df4a4a" stopOpacity="0" />
                </linearGradient>
              </defs>

              <line x1="40" y1="20" x2="580" y2="20" stroke="currentColor" className="text-zinc-100 dark:text-zinc-800/40" strokeWidth="1" strokeDasharray="3" />
              <line x1="40" y1="65" x2="580" y2="65" stroke="currentColor" className="text-zinc-100 dark:text-zinc-800/40" strokeWidth="1" strokeDasharray="3" />
              <line x1="40" y1="110" x2="580" y2="110" stroke="currentColor" className="text-zinc-100 dark:text-zinc-800/40" strokeWidth="1" strokeDasharray="3" />
              <line x1="40" y1="155" x2="580" y2="155" stroke="currentColor" className="text-zinc-100 dark:text-zinc-800/40" strokeWidth="1" strokeDasharray="3" />
              
              <line x1="40" y1="160" x2="580" y2="160" stroke="currentColor" className="text-zinc-300 dark:text-zinc-800" strokeWidth="1.5" />

              <path
                d={`M 60 160 L 60 140 Q 110 120 160 110 Q 210 115 260 125 Q 310 100 360 80 Q 410 50 460 30 Q 510 50 560 ${chartPoints[5].y} L 560 160 Z`}
                fill="url(#areaGradient)"
              />

              <path
                d={`M 60 140 Q 110 120 160 110 Q 210 115 260 125 Q 310 100 360 80 Q 410 50 460 30 Q 510 50 560 ${chartPoints[5].y}`}
                fill="none"
                stroke="#df4a4a"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {chartPoints.map((pt, i) => (
                <g key={i} className="group/node cursor-pointer">
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="5.5"
                    className="fill-white dark:fill-zinc-955 stroke-[#df4a4a]"
                    strokeWidth="2.5"
                  />
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="12"
                    fill="transparent"
                  />
                  <g className="opacity-0 group-hover/node:opacity-100 transition-opacity duration-150 pointer-events-none">
                    <rect
                      x={pt.x - 30}
                      y={pt.y - 34}
                      width="60"
                      height="22"
                      rx="3"
                      className="fill-zinc-900 dark:fill-white shadow-xl"
                    />
                    <text
                      x={pt.x}
                      y={pt.y - 20}
                      textAnchor="middle"
                      className="fill-white dark:fill-zinc-900 text-[10px] font-bold"
                    >
                      {pt.val}
                    </text>
                  </g>
                </g>
              ))}

              <text x="60" y="180" textAnchor="middle" className="fill-zinc-400 text-[9px] font-bold">JAN</text>
              <text x="160" y="180" textAnchor="middle" className="fill-zinc-400 text-[9px] font-bold">FEB</text>
              <text x="260" y="180" textAnchor="middle" className="fill-zinc-400 text-[9px] font-bold">MAR</text>
              <text x="360" y="180" textAnchor="middle" className="fill-zinc-400 text-[9px] font-bold">APR</text>
              <text x="460" y="180" textAnchor="middle" className="fill-zinc-400 text-[9px] font-bold">MAY</text>
              <text x="560" y="180" textAnchor="middle" className="fill-zinc-400 text-[9px] font-bold">JUN</text>

              <text x="30" y="24" textAnchor="end" className="fill-zinc-400 text-[8px] font-bold">$200</text>
              <text x="30" y="69" textAnchor="end" className="fill-zinc-400 text-[8px] font-bold">$150</text>
              <text x="30" y="114" textAnchor="end" className="fill-zinc-400 text-[8px] font-bold">$100</text>
              <text x="30" y="158" textAnchor="end" className="fill-zinc-400 text-[8px] font-bold">$0</text>
            </svg>
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-805 p-6 shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
          <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-white mb-5">
            Recent Activities
          </h3>
          
          <div className="space-y-4">
            {[
              { text: `Your order #ORD-67890 was successfully created and is in processing.`, time: "Yesterday", icon: Clock },
              { text: `Jacket shipment ORD-12345 has left the warehouse (TRK-987654321).`, time: "2 days ago", icon: ShoppingBag },
              { text: `VIP Tier upgrade! You were promoted to Gold Tier level.`, time: "July 2, 2026", icon: Trophy },
              { text: `Your address details were synchronized with your profile.`, time: "July 1, 2026", icon: MapPin }
            ].map((act, idx) => {
              const Icon = act.icon
              return (
                <div key={idx} className="flex gap-3 text-xs leading-relaxed">
                  <div className="h-7 w-7 rounded-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700/50 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="h-3.5 w-3.5 text-[#df4a4a]" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-zinc-755 dark:text-zinc-300 font-medium">{act.text}</p>
                    <span className="text-[10px] text-zinc-400 font-semibold">{act.time}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
