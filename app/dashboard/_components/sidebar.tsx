import * as React from "react"
import { 
  User, 
  ShoppingBag, 
  Heart, 
  MapPin, 
  Trophy, 
  LifeBuoy, 
  LogOut, 
  X 
} from "lucide-react"
import { DashboardUser } from "./types"

interface SidebarProps {
  user: DashboardUser
  ordersCount: number
  wishlistCount: number
  ticketsCount: number
  activeTab: string
  setActiveTab: (tab: string) => void
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  handleLogout: () => void
}

export function Sidebar({
  user,
  ordersCount,
  wishlistCount,
  ticketsCount,
  activeTab,
  setActiveTab,
  sidebarOpen,
  setSidebarOpen,
  handleLogout
}: SidebarProps) {
  
  const navItems = [
    { id: "overview", label: "Overview Feed", icon: Trophy },
    { id: "orders", label: `Order History (${ordersCount})`, icon: ShoppingBag },
    { id: "wishlist", label: `Wishlist (${wishlistCount})`, icon: Heart },
    { id: "addresses", label: "Address Details", icon: MapPin },
    { id: "rewards", label: "VIP Club Perks", icon: Trophy },
    { id: "support", label: `Support Desk (${ticketsCount})`, icon: LifeBuoy },
    { id: "settings", label: "Account Settings", icon: User }
  ]

  const getInitials = (name: string) => {
    return name.split(" ").map(w => w[0]).join("").substring(0, 3)
  }

  return (
    <>
      {/* 1. Desktop Sidebar */}
      <aside className="hidden md:flex w-72 border-r border-zinc-200/60 dark:border-zinc-900 flex-col bg-white dark:bg-zinc-900/40 shrink-0">
        {/* User Card Profile Summary */}
        <div className="p-8 border-b border-zinc-100 dark:border-zinc-900 flex flex-col items-center text-center">
          <div className="relative group">
            <div className="h-20 w-20 rounded-full bg-zinc-100 dark:bg-zinc-850 flex items-center justify-center text-zinc-800 dark:text-zinc-200 text-xl font-bold border border-zinc-200 dark:border-zinc-800 shadow-sm relative overflow-hidden font-sans">
              {getInitials(user.name)}
            </div>
            <span className="absolute bottom-0 right-0 h-5 px-1.5 bg-[#df4a4a] text-[9px] font-bold text-white rounded-full flex items-center justify-center uppercase tracking-wide border border-white dark:border-zinc-950 shadow">
              {user.tier}
            </span>
          </div>
          <h3 className="mt-4 font-bold text-sm tracking-wide text-zinc-900 dark:text-white uppercase">
            {user.name}
          </h3>
          <p className="text-[11px] text-zinc-400 dark:text-zinc-500 truncate max-w-full font-medium">
            {user.email}
          </p>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-6 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isSelected = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3.5 px-4 py-3 text-[12px] font-bold uppercase tracking-wider transition-all duration-250 select-none cursor-pointer ${
                  isSelected
                    ? "bg-zinc-955 text-white dark:bg-white dark:text-black shadow-sm"
                    : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
                }`}
              >
                <Icon className={`h-4.5 w-4.5 ${isSelected ? "text-[#df4a4a]" : "text-zinc-400"}`} />
                <span>{item.label.split(" (")[0]}</span>
                {item.label.includes("(") && (
                  <span className={`ml-auto text-[10px] px-1.5 py-0.5 rounded-full ${
                    isSelected ? "bg-[#df4a4a] text-white" : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                  }`}>
                    {item.label.match(/\((\d+)\)/)?.[1]}
                  </span>
                )}
              </button>
            )
          })}
        </nav>

        {/* Sidebar Footer Log out */}
        <div className="p-6 border-t border-zinc-100 dark:border-zinc-900">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-[12px] font-bold uppercase tracking-wider text-red-500 hover:bg-red-50/50 dark:hover:bg-red-955/10 transition-colors cursor-pointer"
          >
            <LogOut className="h-4.5 w-4.5" />
            <span>Log out</span>
          </button>
        </div>
      </aside>

      {/* 2. Mobile Sidebar Overlay Drawer */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setSidebarOpen(false)} />
          <div className="relative flex-1 flex flex-col max-w-[280px] w-full bg-white dark:bg-zinc-950 p-6 border-r dark:border-zinc-900 animate-slideRight">
            <div className="absolute top-4 right-4">
              <button onClick={() => setSidebarOpen(false)} className="p-1 rounded-full text-zinc-500 dark:text-zinc-400 cursor-pointer">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex flex-col items-center text-center mt-6 mb-8 border-b dark:border-zinc-900 pb-6">
              <div className="h-16 w-16 rounded-full bg-zinc-100 dark:bg-zinc-805 flex items-center justify-center text-zinc-850 dark:text-zinc-200 text-lg font-bold border dark:border-zinc-800 relative">
                {getInitials(user.name)}
                <span className="absolute -bottom-1 -right-1 h-4 px-1 bg-[#df4a4a] text-[8px] font-bold text-white rounded-full flex items-center justify-center uppercase border border-white dark:border-zinc-950">
                  {user.tier}
                </span>
              </div>
              <h3 className="mt-3 font-bold text-xs uppercase tracking-wider text-zinc-900 dark:text-white">
                {user.name}
              </h3>
            </div>

            <nav className="flex-1 space-y-1 overflow-y-auto">
              {navItems.map((item) => {
                const Icon = item.icon
                const isSelected = activeTab === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id)
                      setSidebarOpen(false)
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-[11px] font-bold uppercase tracking-wider transition-all select-none cursor-pointer ${
                      isSelected
                        ? "bg-zinc-955 text-white dark:bg-white dark:text-black"
                        : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-450 dark:hover:text-white"
                    }`}
                  >
                    <Icon className="h-4 w-4 text-[#df4a4a]" />
                    <span>{item.label.split(" (")[0]}</span>
                    {item.label.includes("(") && (
                      <span className="ml-auto text-[9px] px-1.5 bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 rounded-full">
                        {item.label.match(/\((\d+)\)/)?.[1]}
                      </span>
                    )}
                  </button>
                )
              })}
            </nav>

            <div className="mt-auto border-t dark:border-zinc-900 pt-4">
              <button
                onClick={() => {
                  setSidebarOpen(false)
                  handleLogout()
                }}
                className="w-full flex items-center gap-3 px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-red-500 cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
                <span>Log out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
