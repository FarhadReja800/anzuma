"use client"

import * as React from "react"
import { MoreVertical, TrendingUp, TrendingDown, Globe, Sparkles, Maximize2, Activity } from "lucide-react"
import { UsersPerMinuteChart } from "./users-per-minute-chart"

export interface CountrySale {
  code: string
  country: string
  flag: string
  sales: string
  percentage: number // e.g. 75 for 75% bar fill
  change: string
  isUp: boolean
  barColor: string
}

const DEFAULT_COUNTRY_SALES: CountrySale[] = [
  {
    code: "US",
    country: "US",
    flag: "🇺🇸",
    sales: "30k",
    percentage: 70,
    change: "25.8%",
    isUp: true,
    barColor: "bg-indigo-600 dark:bg-indigo-500",
  },
  {
    code: "BR",
    country: "BRAZIL",
    flag: "🇧🇷",
    sales: "30k",
    percentage: 65,
    change: "15.8%",
    isUp: false,
    barColor: "bg-purple-600 dark:bg-purple-500",
  },
  {
    code: "AU",
    country: "AUSTRALIA",
    flag: "🇦🇺",
    sales: "25k",
    percentage: 55,
    change: "35.8%",
    isUp: true,
    barColor: "bg-cyan-600 dark:bg-cyan-500",
  },
]

// Equalizer pill heights (22 bars)
const INITIAL_BARS = [
  35, 50, 28, 68, 92, 54, 42, 80, 95, 62, 45, 78, 58, 38, 70, 85, 48, 98, 80, 92, 75, 88
]

// Smooth Spline Helper for Mini SVG Curve
function buildMiniSpline(bars: number[]) {
  const W = 320
  const H = 60
  const pts = bars.map((v, i) => ({
    x: (i / (bars.length - 1)) * W,
    y: H - (v / 100) * (H - 12) - 6
  }))

  let line = `M ${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i === 0 ? i : i - 1]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2 < pts.length ? i + 2 : i + 1]

    const k = 0.2
    const cp1x = p1.x + (p2.x - p0.x) * k
    const cp1y = p1.y + (p2.y - p0.y) * k
    const cp2x = p2.x - (p3.x - p1.x) * k
    const cp2y = p2.y - (p3.y - p1.y) * k

    line += ` C ${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`
  }

  const area = `${line} L ${W},${H} L 0,${H} Z`
  return { line, area, lastPt: pts[pts.length - 1] }
}

interface LiveUsersCountryCardProps {
  className?: string
  onViewInsight?: () => void
}

export function LiveUsersCountryCard({
  className = "",
  onViewInsight,
}: LiveUsersCountryCardProps) {
  const [bars, setBars] = React.useState<number[]>(INITIAL_BARS)
  const [hoveredBarIndex, setHoveredBarIndex] = React.useState<number | null>(null)
  const [showModal, setShowModal] = React.useState(false)
  const [toastMessage, setToastMessage] = React.useState<string | null>(null)

  // Real-time live jitter simulation (oscillating heights subtly every 2.5s)
  React.useEffect(() => {
    const interval = setInterval(() => {
      setBars((prev) =>
        prev.map((h) => {
          const delta = Math.floor(Math.random() * 19) - 9
          return Math.min(100, Math.max(20, h + delta))
        })
      )
    }, 2500)

    return () => clearInterval(interval)
  }, [])

  const handleInsightClick = () => {
    if (onViewInsight) {
      onViewInsight()
    } else {
      setShowModal(true)
    }
  }

  const { line: miniLine, area: miniArea, lastPt } = buildMiniSpline(bars)

  return (
    <>
      <div className={`bg-white dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between relative transition-all duration-300 ${className}`}>
        
        {/* Toast Alert overlay */}
        {toastMessage && (
          <div className="absolute top-4 left-4 right-4 z-20 bg-indigo-600 text-white text-xs font-bold py-2.5 px-4 rounded-2xl shadow-xl flex items-center gap-2 animate-fadeInFast">
            <Sparkles className="h-4 w-4 shrink-0" />
            <span className="truncate">{toastMessage}</span>
          </div>
        )}

        <div>
          {/* Card Top Header */}
          <div className="flex items-start justify-between mb-2">
            <button 
              onClick={() => setShowModal(true)}
              className="text-left group cursor-pointer focus:outline-none"
            >
              <span className="block text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wide group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                Users in last 30 minutes
              </span>
            </button>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowModal(true)}
                className="p-1.5 text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 rounded-lg transition-colors cursor-pointer"
                title="Open Full Live Chart"
              >
                <Maximize2 className="h-4 w-4" />
              </button>
              <button className="p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 rounded-lg transition-colors cursor-pointer">
                <MoreVertical className="h-4.5 w-4.5" />
              </button>
            </div>
          </div>

          {/* Big Number & Subtitle */}
          <div 
            onClick={() => setShowModal(true)}
            className="mb-4 cursor-pointer group"
          >
            <div className="flex items-baseline gap-2">
              <span className="block text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white tracking-tight select-none group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                21.5K
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-200/60 dark:border-emerald-800/60">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                Live
              </span>
            </div>
            <span className="block text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mt-1">
              USERS PER MINUTE
            </span>
          </div>

          {/* ── LIVE MINI AREA SPLINE + EQUALIZER CHART (CLICKABLE FOR FULL VIEW) ──── */}
          <div 
            onClick={() => setShowModal(true)}
            className="relative mb-6 cursor-pointer group/chart bg-zinc-50/50 dark:bg-zinc-850/40 p-3 rounded-2xl border border-zinc-100 dark:border-zinc-800 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300"
            title="Click to view full real-time Users Per Minute chart"
          >
            {/* Hover Floating Click Badge */}
            <div className="absolute top-2 right-3 z-10 opacity-0 group-hover/chart:opacity-100 transition-opacity duration-200 bg-emerald-600 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
              <Activity className="h-3 w-3" />
              <span>Full Live Chart ↗</span>
            </div>

            {/* Mini SVG Live Wave Spline Layer */}
            <div className="h-14 w-full relative mb-1 overflow-hidden">
              <svg viewBox="0 0 320 60" className="w-full h-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="miniLiveGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00c853" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#00c853" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                <path
                  d={miniArea}
                  fill="url(#miniLiveGrad)"
                  style={{ transition: "d 0.5s ease-out" }}
                />

                <path
                  d={miniLine}
                  fill="none"
                  stroke="#00c853"
                  className="dark:stroke-emerald-400"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ transition: "d 0.5s ease-out" }}
                />

                {/* Animated Latest Live Dot */}
                {lastPt && (
                  <g transform={`translate(${lastPt.x}, ${lastPt.y})`}>
                    <circle r="6" fill="#00c853" fillOpacity="0.3" className="animate-ping" />
                    <circle r="3.5" fill="#00c853" stroke="#ffffff" strokeWidth="1.5" />
                  </g>
                )}
              </svg>
            </div>

            {/* Equalizer Pill Bars Layer */}
            <div className="flex items-end gap-1.5 h-10 w-full">
              {bars.map((val, idx) => {
                const isHovered = hoveredBarIndex === idx
                return (
                  <div
                    key={idx}
                    className="flex-1 relative group/bar"
                    onMouseEnter={() => setHoveredBarIndex(idx)}
                    onMouseLeave={() => setHoveredBarIndex(null)}
                  >
                    <div
                      className={`w-full rounded-full transition-all duration-500 ease-out ${
                        isHovered
                          ? "bg-[#00c853] scale-y-110 shadow-[0_0_10px_rgba(0,200,83,0.6)]"
                          : "bg-[#00c853] dark:bg-emerald-500 hover:bg-[#00e676]"
                      }`}
                      style={{
                        height: `${val}%`,
                        opacity: isHovered ? 1 : 0.85 + (val / 100) * 0.15,
                      }}
                    />

                    {/* Hover Bar Tooltip */}
                    {isHovered && (
                      <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-[9px] font-bold py-0.5 px-1.5 rounded shadow-lg whitespace-nowrap z-20 pointer-events-none">
                        {`${val * 24} users`}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* ── SALES BY COUNTRY Section ─────────────────────────────────── */}
          <div className="pt-4 border-t border-zinc-150 dark:border-zinc-800">
            <div className="flex items-center justify-between mb-3.5">
              <span className="text-xs font-black text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
                SALES BY COUNTRY
              </span>
            </div>

            <div className="space-y-3.5">
              {DEFAULT_COUNTRY_SALES.map((item) => (
                <div key={item.code} className="flex items-center justify-between gap-3 text-xs">
                  
                  {/* Left: Code & Name */}
                  <div className="w-16 shrink-0 flex items-center gap-2">
                    <span className="text-base select-none">{item.flag}</span>
                    <div>
                      <span className="block font-black text-zinc-900 dark:text-zinc-100 leading-none">
                        {item.code}
                      </span>
                      <span className="block text-[9px] font-bold text-zinc-400 dark:text-zinc-500 uppercase mt-0.5 leading-none">
                        {item.sales}
                      </span>
                    </div>
                  </div>

                  {/* Middle: Progress Bar */}
                  <div className="flex-1 min-w-0">
                    <div className="w-full bg-zinc-100 dark:bg-zinc-800/90 h-2 rounded-full overflow-hidden p-0.5">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ease-out ${item.barColor}`}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Right: Badge Change */}
                  <div className="w-16 text-right shrink-0">
                    <span
                      className={`inline-flex items-center gap-0.5 text-[11px] font-extrabold ${
                        item.isUp ? "text-emerald-500 dark:text-emerald-400" : "text-rose-500 dark:text-rose-400"
                      }`}
                    >
                      {item.isUp ? (
                        <TrendingUp className="h-3 w-3 shrink-0" />
                      ) : (
                        <TrendingDown className="h-3 w-3 shrink-0" />
                      )}
                      {item.change}
                    </span>
                  </div>

                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ── View Insight Button ─────────────────────────────────────────── */}
        <div className="mt-5 pt-2">
          <button
            onClick={handleInsightClick}
            className="w-full py-2.5 px-4 border-2 border-indigo-200 dark:border-indigo-800/80 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 font-bold text-xs rounded-full transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-xs hover:border-indigo-400 dark:hover:border-indigo-600"
          >
            <Globe className="h-3.5 w-3.5" />
            <span>View Insight</span>
          </button>
        </div>

      </div>

      {/* Modal / Overlay for Full Real-Time Users Per Minute Analytics */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeInFast">
          <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <UsersPerMinuteChart onClose={() => setShowModal(false)} />
          </div>
        </div>
      )}
    </>
  )
}
