"use client"

import * as React from "react"
import { MoreVertical } from "lucide-react"

export interface MetricItem {
  id: "customers" | "totalProducts" | "stockProducts" | "outOfStock" | "revenue"
  label: string
  value: string
  themeColor: string
  gradientId: string
  stopColor: string
  textColor: string
  badgeBg: string
  thisWeekData: number[] // 7 values for Sun-Sat
  lastWeekData: number[]
  thisWeekLabels: string[] // e.g. ["9k", "11k", "14k", "14k", "19k", "15k", "17.5k"]
  lastWeekLabels: string[]
}

const DEFAULT_METRICS: MetricItem[] = [
  {
    id: "customers",
    label: "CUSTOMERS",
    value: "52k",
    themeColor: "#047857", // Emerald
    gradientId: "emeraldGrad",
    stopColor: "#047857",
    textColor: "text-[#047857] dark:text-emerald-400",
    badgeBg: "bg-emerald-50 dark:bg-emerald-950/30",
    thisWeekData: [25, 40, 52, 78, 68, 55, 60],
    lastWeekData: [20, 32, 42, 60, 52, 44, 48],
    thisWeekLabels: ["9k", "11k", "12.5k", "14k", "13k", "11k", "12k"],
    lastWeekLabels: ["7k", "9k", "10k", "11.5k", "10.5k", "9k", "9.5k"],
  },
  {
    id: "totalProducts",
    label: "TOTAL PRODUCTS",
    value: "3.5k",
    themeColor: "#2563eb", // Blue
    gradientId: "blueGrad",
    stopColor: "#2563eb",
    textColor: "text-blue-600 dark:text-blue-400",
    badgeBg: "bg-blue-50 dark:bg-blue-950/30",
    thisWeekData: [62, 65, 70, 88, 82, 80, 85],
    lastWeekData: [55, 58, 62, 75, 70, 68, 72],
    thisWeekLabels: ["3.1k", "3.2k", "3.3k", "3.5k", "3.4k", "3.4k", "3.5k"],
    lastWeekLabels: ["2.8k", "2.9k", "3.0k", "3.1k", "3.1k", "3.2k", "3.2k"],
  },
  {
    id: "stockProducts",
    label: "STOCK PRODUCTS",
    value: "2.5k",
    themeColor: "#7c3aed", // Violet / Purple
    gradientId: "violetGrad",
    stopColor: "#7c3aed",
    textColor: "text-violet-600 dark:text-violet-400",
    badgeBg: "bg-violet-50 dark:bg-violet-950/30",
    thisWeekData: [50, 55, 60, 75, 70, 68, 72],
    lastWeekData: [42, 46, 50, 62, 58, 56, 60],
    thisWeekLabels: ["2.1k", "2.2k", "2.3k", "2.5k", "2.4k", "2.4k", "2.5k"],
    lastWeekLabels: ["1.9k", "2.0k", "2.1k", "2.2k", "2.2k", "2.3k", "2.3k"],
  },
  {
    id: "outOfStock",
    label: "OUT OF STOCK",
    value: "0.5k",
    themeColor: "#f59e0b", // Amber / Warm Gold
    gradientId: "amberGrad",
    stopColor: "#f59e0b",
    textColor: "text-amber-600 dark:text-amber-400",
    badgeBg: "bg-amber-50 dark:bg-amber-950/30",
    thisWeekData: [75, 60, 50, 35, 30, 28, 40],
    lastWeekData: [85, 72, 62, 48, 42, 40, 50],
    thisWeekLabels: ["0.8k", "0.7k", "0.6k", "0.5k", "0.4k", "0.4k", "0.5k"],
    lastWeekLabels: ["0.9k", "0.8k", "0.7k", "0.6k", "0.5k", "0.6k", "0.6k"],
  },
  {
    id: "revenue",
    label: "REVENUE",
    value: "250k",
    themeColor: "#4f46e5", // Indigo
    gradientId: "indigoGrad",
    stopColor: "#4f46e5",
    textColor: "text-indigo-600 dark:text-indigo-400",
    badgeBg: "bg-indigo-50 dark:bg-indigo-950/30",
    thisWeekData: [35, 50, 68, 92, 80, 75, 84],
    lastWeekData: [28, 40, 52, 70, 62, 58, 65],
    thisWeekLabels: ["140k", "170k", "210k", "250k", "230k", "220k", "240k"],
    lastWeekLabels: ["110k", "130k", "160k", "190k", "180k", "175k", "195k"],
  },
]

const DAYS_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const DAYS_FULL = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

// Helper function to build ultra-smooth cubic Bezier spline path
function buildSmoothSpline(pts: { x: number; y: number }[]) {
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

  const maxY = 180
  const area = `${line} L ${pts[pts.length - 1].x.toFixed(1)},${maxY} L ${pts[0].x.toFixed(1)},${maxY} Z`

  return { line, area }
}

interface WeeklyReportChartProps {
  title?: string
  className?: string
}

export function WeeklyReportChart({
  title = "Report for this week",
  className = "",
}: WeeklyReportChartProps) {
  const [activeMetricId, setActiveMetricId] = React.useState<MetricItem["id"]>("customers")
  const [period, setPeriod] = React.useState<"this" | "last">("this")
  const [activeDayIndex, setActiveDayIndex] = React.useState<number>(3) // Default Wednesday (Index 3)

  const currentMetric = DEFAULT_METRICS.find((m) => m.id === activeMetricId) || DEFAULT_METRICS[0]
  const dataPoints = period === "this" ? currentMetric.thisWeekData : currentMetric.lastWeekData
  const valueLabels = period === "this" ? currentMetric.thisWeekLabels : currentMetric.lastWeekLabels

  // Dimensions
  const W = 580
  const H = 200
  const PAD_X = 35
  const PAD_TOP = 40
  const PAD_BOTTOM = 30
  const USABLE_W = W - PAD_X * 2
  const USABLE_H = H - PAD_TOP - PAD_BOTTOM

  // Calculate coordinates
  const coords = dataPoints.map((val, i) => {
    const x = PAD_X + (i / (dataPoints.length - 1)) * USABLE_W
    const y = PAD_TOP + USABLE_H - (val / 100) * USABLE_H
    return { x, y }
  })

  const { line, area } = buildSmoothSpline(coords)
  const activeCoord = coords[activeDayIndex] || coords[3]
  const activeDayFull = DAYS_FULL[activeDayIndex]
  const activeValueLabel = valueLabels[activeDayIndex]

  return (
    <div className={`bg-white dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800 rounded-3xl p-6 shadow-sm transition-all duration-300 ${className}`}>
      
      {/* ── Card Header: Title & Time Period Toggle ────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
          {title}
        </h3>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          {/* Segmented Control Pill Toggle */}
          <div className="inline-flex items-center bg-zinc-100 dark:bg-zinc-800/80 p-1 rounded-2xl border border-zinc-200/60 dark:border-zinc-700/60 select-none">
            <button
              onClick={() => setPeriod("this")}
              className={`px-3.5 py-1 text-xs font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
                period === "this"
                  ? "bg-white dark:bg-zinc-900 shadow-sm"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200"
              }`}
              style={{ color: period === "this" ? currentMetric.themeColor : undefined }}
            >
              This week
            </button>
            <button
              onClick={() => setPeriod("last")}
              className={`px-3.5 py-1 text-xs font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
                period === "last"
                  ? "bg-white dark:bg-zinc-900 shadow-sm"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200"
              }`}
              style={{ color: period === "last" ? currentMetric.themeColor : undefined }}
            >
              Last week
            </button>
          </div>

          <button className="p-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 rounded-lg transition-colors cursor-pointer">
            <MoreVertical className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>

      {/* ── Metric Stats Tab Row (Multi-Colored Dynamic Highlights) ──────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 border-b border-zinc-100 dark:border-zinc-800/80 pb-3 mb-6">
        {DEFAULT_METRICS.map((metric) => {
          const isActive = metric.id === activeMetricId
          return (
            <button
              key={metric.id}
              onClick={() => setActiveMetricId(metric.id)}
              className="text-left group focus:outline-none cursor-pointer transition-all duration-200"
            >
              <div className="px-2 py-1">
                <span 
                  className={`block text-2xl font-extrabold tracking-tight transition-colors duration-300 ${
                    isActive ? "" : "text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-white"
                  }`}
                  style={{ color: isActive ? metric.themeColor : undefined }}
                >
                  {metric.value}
                </span>
                <span className="block text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mt-1 truncate">
                  {metric.label}
                </span>
              </div>
              
              {/* Distinct Color Underline Indicator */}
              <div className="h-1 w-full mt-2 rounded-full overflow-hidden bg-transparent">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    isActive ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-1/2 group-hover:opacity-40"
                  }`}
                  style={{ backgroundColor: metric.themeColor }}
                />
              </div>
            </button>
          )
        })}
      </div>

      {/* ── Animated Smooth Bezier Spline SVG Chart with Dynamic Theme Colors ───────── */}
      <div className="relative w-full h-[220px] select-none">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Dynamic Color Gradients */}
            {DEFAULT_METRICS.map((m) => (
              <linearGradient key={m.gradientId} id={m.gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={m.stopColor} stopOpacity="0.28" />
                <stop offset="60%" stopColor={m.stopColor} stopOpacity="0.06" />
                <stop offset="100%" stopColor={m.stopColor} stopOpacity="0" />
              </linearGradient>
            ))}

            {/* Glowing Shadow for Active Point */}
            <filter id="glowColor" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor={currentMetric.themeColor} floodOpacity="0.45" />
            </filter>
          </defs>

          {/* Horizontal Grid lines */}
          {[0, 1, 2, 3].map((i) => {
            const y = PAD_TOP + (i / 3) * USABLE_H
            return (
              <line
                key={i}
                x1={PAD_X}
                y1={y}
                x2={W - PAD_X}
                y2={y}
                stroke="currentColor"
                className="text-zinc-100 dark:text-zinc-800/80"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            )
          })}

          {/* Dynamic Area Fill */}
          <path
            d={area}
            fill={`url(#${currentMetric.gradientId})`}
            style={{ transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)" }}
          />

          {/* Dynamic Curved Line Path */}
          <path
            d={line}
            fill="none"
            stroke={currentMetric.themeColor}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)" }}
          />

          {/* Interactive Hover / Active Columns & Vertical Guide Line */}
          {coords.map((pt, i) => {
            const isActive = i === activeDayIndex
            return (
              <g key={i} className="cursor-pointer" onClick={() => setActiveDayIndex(i)}>
                {/* Transparent click target column */}
                <rect
                  x={pt.x - USABLE_W / 14}
                  y={PAD_TOP - 10}
                  width={USABLE_W / 7}
                  height={USABLE_H + 30}
                  fill="transparent"
                  onMouseEnter={() => setActiveDayIndex(i)}
                />

                {/* Vertical Dotted Guide Line for Active Day */}
                {isActive && (
                  <line
                    x1={pt.x}
                    y1={pt.y}
                    x2={pt.x}
                    y2={H - PAD_BOTTOM + 5}
                    stroke={currentMetric.themeColor}
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                    style={{ transition: "all 0.3s ease" }}
                  />
                )}
              </g>
            )
          })}

          {/* Active Data Point Node with Glow Ring */}
          {activeCoord && (
            <g style={{ transition: "all 0.3s ease" }}>
              {/* Pulsing Outer Ring */}
              <circle
                cx={activeCoord.x}
                cy={activeCoord.y}
                r="9"
                fill={currentMetric.themeColor}
                fillOpacity="0.22"
                className="animate-ping"
              />
              
              {/* Outer Glowing Dot */}
              <circle
                cx={activeCoord.x}
                cy={activeCoord.y}
                r="6"
                fill={currentMetric.themeColor}
                stroke="#ffffff"
                strokeWidth="2.5"
                filter="url(#glowColor)"
              />
            </g>
          )}

          {/* Floating Pill Tooltip above Active Point */}
          {activeCoord && (
            <g
              transform={`translate(${activeCoord.x}, ${Math.max(activeCoord.y - 32, 16)})`}
              className="transition-transform duration-300 ease-out pointer-events-none"
            >
              {/* Tooltip Background Pill */}
              <rect
                x="-48"
                y="-14"
                width="96"
                height="26"
                rx="13"
                fill={currentMetric.themeColor}
                className="shadow-lg"
              />

              {/* Tooltip Text */}
              <text
                x="0"
                y="3"
                textAnchor="middle"
                fill="#ffffff"
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  fontFamily: "var(--font-sans, system-ui, sans-serif)",
                }}
              >
                {`${activeDayFull} ${activeValueLabel}`}
              </text>
            </g>
          )}

          {/* X-Axis Day Labels */}
          {DAYS_SHORT.map((day, i) => {
            const x = PAD_X + (i / (DAYS_SHORT.length - 1)) * USABLE_W
            const isActive = i === activeDayIndex
            return (
              <text
                key={day}
                x={x}
                y={H - 5}
                textAnchor="middle"
                onClick={() => setActiveDayIndex(i)}
                onMouseEnter={() => setActiveDayIndex(i)}
                fill={isActive ? currentMetric.themeColor : "#a1a1aa"}
                className={`cursor-pointer transition-all duration-200 ${
                  isActive
                    ? "font-extrabold text-[12px]"
                    : "font-medium text-[11px] hover:fill-zinc-700 dark:hover:fill-zinc-300"
                }`}
                style={{ fontFamily: "var(--font-sans, system-ui, sans-serif)" }}
              >
                {day}
              </text>
            )
          })}
        </svg>
      </div>

    </div>
  )
}
