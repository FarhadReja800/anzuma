"use client"

import * as React from "react"
import {  TrendingUp, RefreshCw, Zap,  X } from "lucide-react"

export interface MinuteTick {
  minute: string // e.g. "19:30"
  users: number  // e.g. 740
  newUsers: number
  returningUsers: number
}

// 30 minute mock dataset generator
function generateInitial30MinsData(): MinuteTick[] {
  const list: MinuteTick[] = []
  const now = new Date()

  for (let i = 29; i >= 0; i--) {
    const t = new Date(now.getTime() - i * 60 * 1000)
    const minuteStr = t.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    
    // Wave Math for realistic peak traffic curves
    const sinValue = Math.sin((i / 30) * Math.PI * 2)
    const base = 650 + sinValue * 300
    const randomNoise = Math.floor(Math.random() * 120) - 60
    const users = Math.min(1250, Math.max(280, Math.floor(base + randomNoise)))
    
    const newUsers = Math.floor(users * 0.62)
    const returningUsers = users - newUsers

    list.push({
      minute: minuteStr,
      users,
      newUsers,
      returningUsers,
    })
  }

  return list
}

// Smooth Cubic Bezier Spline Helper
function buildSplinePath(pts: { x: number; y: number }[]) {
  if (pts.length < 2) return { line: "", area: "" }

  let line = `M ${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)}`

  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i === 0 ? i : i - 1]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2 < pts.length ? i + 2 : i + 1]

    const k = 0.22
    const cp1x = p1.x + (p2.x - p0.x) * k
    const cp1y = p1.y + (p2.y - p0.y) * k
    const cp2x = p2.x - (p3.x - p1.x) * k
    const cp2y = p2.y - (p3.y - p1.y) * k

    line += ` C ${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`
  }

  const maxY = 220
  const area = `${line} L ${pts[pts.length - 1].x.toFixed(1)},${maxY} L ${pts[0].x.toFixed(1)},${maxY} Z`

  return { line, area }
}

interface UsersPerMinuteChartProps {
  title?: string
  className?: string
  onClose?: () => void
}

export function UsersPerMinuteChart({
  title = "Users Per Minute (Real-Time Traffic)",
  className = "",
  onClose,
}: UsersPerMinuteChartProps) {
  const [data, setData] = React.useState<MinuteTick[]>(generateInitial30MinsData)
  const [timeRange, setTimeRange] = React.useState<"30m" | "1h" | "24h">("30m")
  const [activeMetricFilter, setActiveMetricFilter] = React.useState<"all" | "new" | "returning">("all")
  const [activeIndex, setActiveIndex] = React.useState<number>(29) // Default latest minute
  const [isLiveUpdating, setIsLiveUpdating] = React.useState(true)

  // Real-time minute tick simulation
  React.useEffect(() => {
    if (!isLiveUpdating) return

    const timer = setInterval(() => {
      setData((prev) => {
        const now = new Date()
        const minuteStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        const lastUsers = prev[prev.length - 1].users
        const delta = Math.floor(Math.random() * 160) - 80
        const nextUsers = Math.min(1300, Math.max(300, lastUsers + delta))
        const nextNew = Math.floor(nextUsers * 0.6)

        const newTick: MinuteTick = {
          minute: minuteStr,
          users: nextUsers,
          newUsers: nextNew,
          returningUsers: nextUsers - nextNew,
        }

        const updated = [...prev.slice(1), newTick]
        return updated
      })
    }, 3000)

    return () => clearInterval(timer)
  }, [isLiveUpdating])

  // Calculated derived statistics
  const currentTick = data[activeIndex] || data[data.length - 1]
  const totalUsersInView = data.reduce((acc, d) => acc + d.users, 0)
  const peakUsers = Math.max(...data.map((d) => d.users))
  const avgUsers = Math.round(totalUsersInView / data.length)

  // Chart dimensions
  const W = 640
  const H = 220
  const PAD_X = 40
  const PAD_TOP = 35
  const PAD_BOTTOM = 35
  const USABLE_W = W - PAD_X * 2
  const USABLE_H = H - PAD_TOP - PAD_BOTTOM

  // Target values based on metric filter
  const getVal = (tick: MinuteTick) => {
    if (activeMetricFilter === "new") return tick.newUsers
    if (activeMetricFilter === "returning") return tick.returningUsers
    return tick.users
  }

  const maxVal = Math.max(...data.map(getVal), 1400)

  const coords = data.map((tick, i) => {
    const val = getVal(tick)
    const x = PAD_X + (i / (data.length - 1)) * USABLE_W
    const y = PAD_TOP + USABLE_H - (val / maxVal) * USABLE_H
    return { x, y, tick }
  })

  const { line, area } = buildSplinePath(coords)
  const activeCoord = coords[activeIndex] || coords[coords.length - 1]

  return (
    <div className={`bg-white dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800 rounded-3xl p-6 shadow-lg transition-all duration-300 ${className}`}>
      
      {/* ── Card Top Navigation Bar ─────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-zinc-100 dark:border-zinc-800/80">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
            <Zap className="h-5 w-5 fill-emerald-500/20 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-black text-zinc-900 dark:text-white tracking-tight">
                {title}
              </h3>
              {/* Real-time Pulsing Live Badge */}
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                LIVE
              </span>
            </div>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 font-medium mt-0.5">
              Active concurrent connections measured per minute
            </p>
          </div>
        </div>

        {/* Controls: Time Period & Close */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          <div className="inline-flex items-center bg-zinc-100 dark:bg-zinc-800/80 p-1 rounded-2xl border border-zinc-200/60 dark:border-zinc-700/60 select-none text-xs font-semibold">
            {(["30m", "1h", "24h"] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 rounded-xl transition-all cursor-pointer ${
                  timeRange === range
                    ? "bg-white dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 shadow-xs font-bold"
                    : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800"
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsLiveUpdating((prev) => !prev)}
            className={`p-2 rounded-xl border transition-all cursor-pointer ${
              isLiveUpdating
                ? "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-800/60"
                : "bg-zinc-50 text-zinc-400 border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700"
            }`}
            title={isLiveUpdating ? "Pause Live Sync" : "Resume Live Sync"}
          >
            <RefreshCw className={`h-4 w-4 ${isLiveUpdating ? "animate-spin" : ""}`} style={{ animationDuration: "6s" }} />
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-all cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* ── Key Statistics Cards Row ────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-5 border-b border-zinc-100 dark:border-zinc-800/80">
        
        {/* Current Active */}
        <div className="bg-zinc-50/70 dark:bg-zinc-850/60 p-3.5 rounded-2xl border border-zinc-100 dark:border-zinc-800">
          <span className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Current Traffic</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
              {currentTick ? currentTick.users.toLocaleString() : "0"}
            </span>
            <span className="text-[10px] font-bold text-zinc-400">users/min</span>
          </div>
        </div>

        {/* Peak Traffic */}
        <div className="bg-zinc-50/70 dark:bg-zinc-850/60 p-3.5 rounded-2xl border border-zinc-100 dark:border-zinc-800">
          <span className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Peak Speed</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
              {peakUsers.toLocaleString()}
            </span>
            <span className="text-[10px] font-bold text-zinc-400">max/min</span>
          </div>
        </div>

        {/* Average Traffic */}
        <div className="bg-zinc-50/70 dark:bg-zinc-850/60 p-3.5 rounded-2xl border border-zinc-100 dark:border-zinc-800">
          <span className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Avg Speed</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-black text-purple-600 dark:text-purple-400">
              {avgUsers.toLocaleString()}
            </span>
            <span className="text-[10px] font-bold text-zinc-400">avg/min</span>
          </div>
        </div>

        {/* Growth Rate */}
        <div className="bg-zinc-50/70 dark:bg-zinc-850/60 p-3.5 rounded-2xl border border-zinc-100 dark:border-zinc-800">
          <span className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Traffic Growth</span>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-2xl font-black text-emerald-500">+22.4%</span>
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </div>
        </div>

      </div>

      {/* ── Metric Filter Tabs (All / New / Returning) ────────────────────────── */}
      <div className="flex items-center gap-2 pt-4 pb-2">
        <span className="text-xs font-bold text-zinc-400 uppercase mr-2">Filter:</span>
        {[
          { id: "all", label: "All Active Users" },
          { id: "new", label: "New Visitors" },
          { id: "returning", label: "Returning Users" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveMetricFilter(item.id as any)}
            className={`px-3 py-1 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
              activeMetricFilter === item.id
                ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                : "bg-zinc-50 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* ── Animated Real-Time Bezier Spline SVG Chart ─────────────────────────── */}
      <div className="relative w-full h-[240px] pt-2 select-none">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Soft Emerald Area Gradient */}
            <linearGradient id="liveUsersGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
              <stop offset="60%" stopColor="#10b981" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </linearGradient>

            {/* Glowing Glow DropShadow */}
            <filter id="liveDotGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#10b981" floodOpacity="0.5" />
            </filter>
          </defs>

          {/* Horizontal Grid lines */}
          {[0, 1, 2, 3].map((i) => {
            const y = PAD_TOP + (i / 3) * USABLE_H
            const labelVal = Math.round(maxVal - (i / 3) * maxVal)
            return (
              <g key={i}>
                <line
                  x1={PAD_X}
                  y1={y}
                  x2={W - PAD_X}
                  y2={y}
                  stroke="currentColor"
                  className="text-zinc-100 dark:text-zinc-800/70"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <text
                  x={PAD_X - 8}
                  y={y + 3}
                  textAnchor="end"
                  fill="#a1a1aa"
                  style={{ fontSize: "9px", fontWeight: 600 }}
                >
                  {labelVal}
                </text>
              </g>
            )
          })}

          {/* Area Spline Fill */}
          <path
            d={area}
            fill="url(#liveUsersGradient)"
            style={{ transition: "d 0.4s ease-out" }}
          />

          {/* Curved Line Spline Path */}
          <path
            d={line}
            fill="none"
            stroke="#10b981"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transition: "d 0.4s ease-out" }}
          />

          {/* Interactive Hover Area & Vertical Guide Line */}
          {coords.map((pt, i) => {
            const isActive = i === activeIndex
            return (
              <g key={i} className="cursor-pointer" onClick={() => setActiveIndex(i)}>
                <rect
                  x={pt.x - USABLE_W / 60}
                  y={PAD_TOP - 10}
                  width={USABLE_W / 30}
                  height={USABLE_H + 30}
                  fill="transparent"
                  onMouseEnter={() => setActiveIndex(i)}
                />

                {isActive && (
                  <line
                    x1={pt.x}
                    y1={pt.y}
                    x2={pt.x}
                    y2={H - PAD_BOTTOM + 5}
                    stroke="#10b981"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                    style={{ transition: "all 0.2s ease" }}
                  />
                )}
              </g>
            )
          })}

          {/* Active Data Point Circle with Pulse Animation */}
          {activeCoord && (
            <g style={{ transition: "all 0.3s ease" }}>
              <circle
                cx={activeCoord.x}
                cy={activeCoord.y}
                r="10"
                fill="#10b981"
                fillOpacity="0.25"
                className="animate-ping"
              />
              <circle
                cx={activeCoord.x}
                cy={activeCoord.y}
                r="6"
                fill="#10b981"
                stroke="#ffffff"
                strokeWidth="2.5"
                filter="url(#liveDotGlow)"
              />
            </g>
          )}

          {/* Dynamic Floating Tooltip */}
          {activeCoord && (
            <g
              transform={`translate(${activeCoord.x}, ${Math.max(activeCoord.y - 36, 14)})`}
              className="transition-transform duration-200 ease-out pointer-events-none"
            >
              <rect
                x="-54"
                y="-15"
                width="108"
                height="30"
                rx="15"
                fill="#0f172a"
                className="shadow-xl"
              />
              <text
                x="0"
                y="4"
                textAnchor="middle"
                fill="#ffffff"
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  fontFamily: "var(--font-sans, system-ui, sans-serif)",
                }}
              >
                {`${activeCoord.tick.minute} — ${getVal(activeCoord.tick).toLocaleString()} users`}
              </text>
            </g>
          )}

          {/* X-Axis Minute Labels (Every 5 minutes) */}
          {data.map((tick, i) => {
            if (i % 5 !== 0 && i !== data.length - 1) return null
            const x = PAD_X + (i / (data.length - 1)) * USABLE_W
            const isActive = i === activeIndex

            return (
              <text
                key={i}
                x={x}
                y={H - 8}
                textAnchor="middle"
                className={`cursor-pointer transition-all duration-200 ${
                  isActive
                    ? "fill-emerald-500 font-extrabold text-[11px]"
                    : "fill-zinc-400 dark:fill-zinc-500 font-medium text-[10px]"
                }`}
                onClick={() => setActiveIndex(i)}
                onMouseEnter={() => setActiveIndex(i)}
              >
                {tick.minute}
              </text>
            )
          })}
        </svg>
      </div>

    </div>
  )
}
