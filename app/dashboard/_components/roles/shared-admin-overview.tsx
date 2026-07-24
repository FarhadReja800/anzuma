"use client"

import * as React from "react"
import {
  TrendingUp,
  TrendingDown,
  Search,
  MoreVertical,
  Globe,
  Filter,

} from "lucide-react"
import { WeeklyReportChart } from "@/components/dashboard/weekly-report-chart"
import { LiveUsersCountryCard } from "@/components/dashboard/live-users-country-card"

export interface AdminOverviewConfig {
  role: "superAdmin" | "admin" | "manager" | "moderator"
  userName: string
}

interface TransactionRow {
  no: number
  customerId: string
  orderDate: string
  status: "Paid" | "Pending" | "Cancelled"
  amount: number
}

interface TopProduct {
  name: string
  sku: string
  price: number
  emoji: string
}

const TRANSACTIONS: TransactionRow[] = [
  { no: 1, customerId: "#6545", orderDate: "01 Oct | 11:29 am", status: "Paid",      amount: 64  },
  { no: 2, customerId: "#5412", orderDate: "01 Oct | 10:15 am", status: "Pending",   amount: 557 },
  { no: 3, customerId: "#7823", orderDate: "30 Sep | 04:55 pm", status: "Paid",      amount: 119 },
  { no: 4, customerId: "#3301", orderDate: "30 Sep | 01:20 pm", status: "Cancelled", amount: 220 },
  { no: 5, customerId: "#9910", orderDate: "29 Sep | 09:05 am", status: "Paid",      amount: 340 },
]

const TOP_PRODUCTS: TopProduct[] = [
  { name: "Apple iPhone 13",          sku: "Item #FXZ-4567", price: 999.00, emoji: "📱" },
  { name: "Nike Air Force 1",         sku: "Item #NKE-1234", price: 120.00, emoji: "👟" },
  { name: "Sony WH-1000XM5",          sku: "Item #SNY-8891", price: 349.00, emoji: "🎧" },
  { name: "Levi's 501 Original Jeans",sku: "Item #LVS-3390", price: 89.00,  emoji: "👖" },
]

const COUNTRY_SALES = [
  { flag: "🇺🇸", country: "US",        sales: "30k", change: "+25.8%", up: true  },
  { flag: "🇧🇷", country: "Brazil",    sales: "30k", change: "−15.8%", up: false },
  { flag: "🇦🇺", country: "Australia", sales: "25k", change: "+35.8%", up: true  },
]

// Weekly area chart data
const CHART_POINTS = [8, 18, 14, 22, 14, 28, 26, 30, 18, 30, 28, 24]
const CHART_MAX   = 35
const W = 480
const H = 120
const PAD_X = 10
const PAD_Y = 10
const UW = W - PAD_X * 2
const UH = H - PAD_Y * 2

function buildPath(pts: number[]) {
  const coords = pts.map((v, i) => ({
    x: PAD_X + (i / (pts.length - 1)) * UW,
    y: PAD_Y + UH - (v / CHART_MAX) * UH,
  }))
  const line = coords.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(" ")
  const area = [
    `M ${coords[0].x} ${H}`,
    ...coords.map(p => `L ${p.x} ${p.y}`),
    `L ${coords[coords.length - 1].x} ${H}`,
    "Z",
  ].join(" ")
  return { line, area, coords }
}

// Mini bar chart for "users per minute"
const BAR_DATA = [6, 10, 8, 14, 12, 16, 14, 18, 12, 20, 16, 14, 18, 22, 18, 20, 16, 24, 20, 18, 14, 16]

function statusStyle(status: TransactionRow["status"]) {
  switch (status) {
    case "Paid":      return "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400"
    case "Pending":   return "bg-amber-50   text-amber-600   dark:bg-amber-950/30   dark:text-amber-400"
    case "Cancelled": return "bg-red-50     text-red-600     dark:bg-red-950/30     dark:text-red-400"
  }
}

interface Props {
  config: AdminOverviewConfig
}

export function SharedAdminOverview({ config }: Props) {
  const [productSearch, setProductSearch] = React.useState("")
  const [weekFilter, setWeekFilter]       = React.useState<"this" | "last">("this")
  const [, setTxFilter]           = React.useState(false)

  const filteredProducts = TOP_PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(productSearch.toLowerCase())
  )

  const { line, area, coords } = buildPath(CHART_POINTS)

  // Role-specific labels
  const roleLabel: Record<AdminOverviewConfig["role"], { sales: string; orders: string; weekly: string }> = {
    superAdmin: { sales: "Total Sales",    orders: "Total Orders",    weekly: "Report for this week" },
    admin:      { sales: "Total Revenue",  orders: "Total Orders",    weekly: "Weekly Performance"   },
    manager:    { sales: "Revenue Managed",orders: "Orders Managed",  weekly: "Team Report"          },
    moderator:  { sales: "Reviews Handled",orders: "Tickets Resolved",weekly: "Activity This Week"   },
  }
  const labels = roleLabel[config.role]

  const weeklyStats = [
    { label: "Customers",     value: "52k"  },
    { label: "Total Products",value: "3.5k" },
    { label: "Stock Products",value: "2.5k" },
    { label: "Out of Stock",  value: "0.5k" },
    { label: "Revenue",       value: "250k" },
  ]

  return (
    <div className="space-y-6 animate-fadeInFast">

      {/* ── Row 1: 3 Stat Cards ────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        {/* Total Sales */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 rounded-2xl p-6 shadow-[0_1px_4px_rgba(0,0,0,0.04)] relative overflow-hidden">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">{labels.sales}</p>
              <p className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5">Last 7 days</p>
            </div>
            <button className="p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer rounded">
              <MoreVertical className="h-4 w-4" />
            </button>
          </div>
          <div className="flex items-end gap-3 mb-4">
            <span className="text-3xl font-black text-zinc-850 dark:text-zinc-100 tracking-tight">$350K</span>
            <span className="flex items-center gap-0.5 text-[11px] font-bold text-emerald-500 mb-1">
              <TrendingUp className="h-3.5 w-3.5" /> Sales ↑ 10.4%
            </span>
          </div>
          <p className="text-[11px] text-zinc-400 dark:text-zinc-500">
            Previous 7days <span className="text-rose-500 font-bold">($235)</span>
          </p>
          <button className="mt-4 px-4 py-1.5 border border-zinc-200 dark:border-zinc-700 rounded-full text-[11px] font-bold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer">
            Details
          </button>
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-emerald-50 dark:bg-emerald-950/20 rounded-full blur-2xl pointer-events-none" />
        </div>

        {/* Total Orders */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 rounded-2xl p-6 shadow-[0_1px_4px_rgba(0,0,0,0.04)] relative overflow-hidden">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">{labels.orders}</p>
              <p className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5">Last 7 days</p>
            </div>
            <button className="p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer rounded">
              <MoreVertical className="h-4 w-4" />
            </button>
          </div>
          <div className="flex items-end gap-3 mb-4">
            <span className="text-3xl font-black text-zinc-850 dark:text-zinc-100 tracking-tight">10.7K</span>
            <span className="flex items-center gap-0.5 text-[11px] font-bold text-emerald-500 mb-1">
              <TrendingUp className="h-3.5 w-3.5" /> order ↑ 14.4%
            </span>
          </div>
          <p className="text-[11px] text-zinc-400 dark:text-zinc-500">
            Previous 7days <span className="text-blue-500 font-bold">(7.6k)</span>
          </p>
          <button className="mt-4 px-4 py-1.5 border border-zinc-200 dark:border-zinc-700 rounded-full text-[11px] font-bold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer">
            Details
          </button>
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-blue-50 dark:bg-blue-950/20 rounded-full blur-2xl pointer-events-none" />
        </div>

        {/* Pending & Canceled */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 rounded-2xl p-6 shadow-[0_1px_4px_rgba(0,0,0,0.04)] relative overflow-hidden">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">Pending &amp; Canceled</p>
              <p className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5">Last 7 days</p>
            </div>
            <button className="p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer rounded">
              <MoreVertical className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase mb-1">Pending</p>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-black text-zinc-850 dark:text-zinc-100">509</span>
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400 mb-1">user 204</span>
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase mb-1">Canceled</p>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-black text-zinc-850 dark:text-zinc-100">94</span>
                <span className="flex items-center gap-0.5 text-[10px] font-bold text-rose-500 mb-1">
                  <TrendingDown className="h-3 w-3" /> 14.4%
                </span>
              </div>
            </div>
          </div>
          <button className="px-4 py-1.5 border border-zinc-200 dark:border-zinc-700 rounded-full text-[11px] font-bold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer">
            Details
          </button>
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-rose-50 dark:bg-rose-950/20 rounded-full blur-2xl pointer-events-none" />
        </div>
      </div>

      {/* ── Row 2: Weekly Chart + Right Panel ──────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* Weekly Report Chart */}
        <div className="lg:col-span-7">
          <WeeklyReportChart title={labels.weekly} />
        </div>

        {/* Right: Live Users + Sales by Country */}
        <LiveUsersCountryCard className="lg:col-span-5" />
      </div>

      {/* ── Row 3: Transaction Table + Top Products ─────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* Transaction Table */}
        <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 rounded-2xl p-6 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-black text-zinc-850 dark:text-zinc-100 uppercase tracking-wide">Transaction</h3>
            <button
              onClick={() => setTxFilter(v => !v)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-[10px] font-bold transition-colors cursor-pointer"
            >
              <Filter className="h-3 w-3" />
              Filter
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-zinc-100 dark:border-zinc-800">
                  {["No", "Id Customer", "Order Date", "Status", "Amount"].map(h => (
                    <th key={h} className="pb-3 text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest pr-4 last:pr-0 last:text-right">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TRANSACTIONS.map((tx, i) => (
                  <tr key={i} className="border-b border-zinc-50 dark:border-zinc-850 hover:bg-zinc-50/60 dark:hover:bg-zinc-800/30 transition-colors">
                    <td className="py-3 pr-4 text-[12px] font-bold text-zinc-500 dark:text-zinc-400">{tx.no}.</td>
                    <td className="py-3 pr-4 text-[12px] font-bold text-zinc-700 dark:text-zinc-300">{tx.customerId}</td>
                    <td className="py-3 pr-4 text-[12px] text-zinc-500 dark:text-zinc-400">{tx.orderDate}</td>
                    <td className="py-3 pr-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${statusStyle(tx.status)}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${
                          tx.status === "Paid" ? "bg-emerald-500" :
                          tx.status === "Pending" ? "bg-amber-500" : "bg-red-500"
                        }`} />
                        {tx.status}
                      </span>
                    </td>
                    <td className="py-3 text-right text-[12px] font-black text-zinc-700 dark:text-zinc-300">${tx.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="lg:col-span-5 bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 rounded-2xl p-6 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-black text-zinc-850 dark:text-zinc-100 uppercase tracking-wide">Top Products</h3>
            <a href="#" className="text-[11px] font-bold text-blue-500 hover:text-blue-400 transition-colors">All product</a>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search"
              value={productSearch}
              onChange={e => setProductSearch(e.target.value)}
              className="w-full pl-8 pr-4 py-2 text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl outline-none focus:border-emerald-500 transition-colors font-medium text-zinc-700 dark:text-zinc-300"
            />
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
          </div>

          <div className="space-y-3">
            {filteredProducts.map((p, i) => (
              <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                <div className="h-10 w-10 bg-zinc-100 dark:bg-zinc-800 rounded-xl flex items-center justify-center text-lg shrink-0">
                  {p.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-bold text-zinc-800 dark:text-zinc-200 truncate">{p.name}</p>
                  <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-medium">{p.sku}</p>
                </div>
                <span className="text-[13px] font-black text-zinc-700 dark:text-zinc-300 shrink-0">
                  ${p.price.toFixed(2)}
                </span>
              </div>
            ))}
            {filteredProducts.length === 0 && (
              <p className="text-center text-[11px] text-zinc-400 dark:text-zinc-500 py-4">No products found</p>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
