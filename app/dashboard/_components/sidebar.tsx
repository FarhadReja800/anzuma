import * as React from "react"
import { 
  LayoutDashboard,
  ShoppingBag, 
  Heart, 
  MapPin, 
  Tag, 
  LifeBuoy, 
  User, 
  Users, 
  Folder, 
  ArrowLeftRight, 
  Award, 
  PlusCircle, 
  Image, 
  List, 
  MessageSquare, 
  Shield, 
  Sliders, 
  LogOut, 
  X,
  Store,
  ExternalLink,
  ChevronLeft
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

  const getInitials = (name: string) => {
    return name.split(" ").map(w => w[0]).join("").substring(0, 2)
  }

  // Active state checking helper
  const isTabActive = (tabId: string) => activeTab === tabId

  // Common Nav Item rendering
  const renderNavItem = (item: {
    id: string
    label: string
    icon: React.ComponentType<{ className?: string }>
    disabled?: boolean
    badge?: number | string
  }) => {
    const Icon = item.icon
    const isSelected = isTabActive(item.id) && !item.disabled

    if (item.disabled) {
      return (
        <div
          key={item.label}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-[12px] font-medium text-zinc-400 dark:text-zinc-650 cursor-not-allowed select-none opacity-80"
        >
          <Icon className="h-4.5 w-4.5 text-zinc-350 dark:text-zinc-700" />
          <span>{item.label}</span>
          <span className="ml-auto text-[8px] bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 px-1.5 py-0.5 rounded-sm uppercase tracking-wider font-semibold">
            Coming
          </span>
        </div>
      )
    }

    return (
      <button
        key={item.id}
        onClick={() => {
          setActiveTab(item.id)
          setSidebarOpen(false)
        }}
        className={`w-full flex items-center gap-3 px-4 py-2.5 text-[12px] font-semibold uppercase tracking-wider transition-all duration-200 select-none cursor-pointer rounded-lg ${
          isSelected
            ? "bg-emerald-500 text-white shadow-sm shadow-emerald-500/20 dark:shadow-emerald-500/10"
            : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-850/40"
        }`}
      >
        <Icon className={`h-4.5 w-4.5 transition-colors ${isSelected ? "text-white" : "text-zinc-450 dark:text-zinc-500"}`} />
        <span>{item.label}</span>
        {item.badge !== undefined && (
          <span className={`ml-auto text-[10px] px-2 py-0.5 rounded-full font-bold ${
            isSelected ? "bg-white/20 text-white" : "bg-zinc-100 text-zinc-650 dark:bg-zinc-800 dark:text-zinc-400"
          }`}>
            {item.badge}
          </span>
        )}
      </button>
    )
  }

  const mainMenu = [
    { id: "overview", label: "Dashboard", icon: LayoutDashboard },
    { id: "orders", label: "Order Management", icon: ShoppingBag, badge: ordersCount },
    { id: "wishlist", label: "Wishlist", icon: Heart, badge: wishlistCount },
    { id: "rewards", label: "Coupon Code", icon: Tag },
    { id: "addresses", label: "Address Details", icon: MapPin },
    { id: "support", label: "Support Desk", icon: LifeBuoy, badge: ticketsCount },
    { id: "settings", label: "Account Settings", icon: User },
    { id: "customers", label: "Customers", icon: Users, disabled: true },
    { id: "categories", label: "Categories", icon: Folder, disabled: true },
    { id: "transaction", label: "Transaction", icon: ArrowLeftRight, disabled: true },
    { id: "brand", label: "Brand", icon: Award, disabled: true }
  ]

  const productMenu = [
    { id: "add-product", label: "Add Products", icon: PlusCircle, disabled: true },
    { id: "product-media", label: "Product Media", icon: Image, disabled: true },
    { id: "product-list", label: "Product List", icon: List, disabled: true },
    { id: "product-reviews", label: "Product Reviews", icon: MessageSquare, disabled: true }
  ]

  const adminMenu = [
    { id: "admin-role", label: "Admin role", icon: Shield, disabled: true },
    { id: "control-authority", label: "Control Authority", icon: Sliders, disabled: true }
  ]

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white dark:bg-zinc-900">
      {/* Brand Header */}
      <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 bg-emerald-500 dark:bg-emerald-600 rounded-lg flex items-center justify-center text-white shadow-sm shadow-emerald-500/10">
            <ShoppingBag className="h-5 w-5" />
          </div>
          <span className="text-[18px] font-black tracking-tight text-emerald-500 dark:text-emerald-450 uppercase flex items-center gap-1 font-sans">
            DEAL<span className="text-zinc-850 dark:text-white">PORT</span>
          </span>
        </div>
        <button className="hidden text-zinc-400 hover:text-zinc-600 dark:hover:text-white p-1 rounded-md hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer">
          <ChevronLeft className="h-4.5 w-4.5" />
        </button>
      </div>

      {/* Navigation Group list */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-7 custom-scrollbar">
        {/* Main Menu Section */}
        <div className="space-y-1.5">
          <div className="px-4 text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-2">
            Main menu
          </div>
          <div className="space-y-0.5">
            {mainMenu.map(renderNavItem)}
          </div>
        </div>

        {/* Product Section */}
        <div className="space-y-1.5">
          <div className="px-4 text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-2">
            Product
          </div>
          <div className="space-y-0.5">
            {productMenu.map(renderNavItem)}
          </div>
        </div>

        {/* Admin Section */}
        <div className="space-y-1.5">
          <div className="px-4 text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-2">
            Admin
          </div>
          <div className="space-y-0.5">
            {adminMenu.map(renderNavItem)}
          </div>
        </div>
      </div>

      {/* Your Shop Link Card */}
      <div className="px-4 mb-3">
        <a 
          href="/shop" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center justify-between p-3.5 bg-zinc-50 dark:bg-zinc-850/60 border border-zinc-150 dark:border-zinc-800 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors group cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <Store className="h-4.5 w-4.5 text-emerald-500 dark:text-emerald-450" />
            <span className="text-[12px] font-bold text-zinc-700 dark:text-zinc-200">Your Shop</span>
          </div>
          <ExternalLink className="h-3.5 w-3.5 text-zinc-400 group-hover:text-emerald-500 dark:group-hover:text-emerald-450 transition-colors" />
        </a>
      </div>

      {/* User profile footer */}
      <div className="p-4 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 flex items-center justify-between gap-2.5">
        <div className="flex items-center gap-3 min-w-0">
          <div className="h-10 w-10 rounded-full bg-emerald-100 dark:bg-emerald-950/50 border border-emerald-250 dark:border-emerald-900 flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-sm font-bold shadow-sm shrink-0">
            {getInitials(user.name)}
          </div>
          <div className="min-w-0">
            <div className="text-[12px] font-bold text-zinc-800 dark:text-zinc-150 uppercase tracking-wide truncate">
              {user.name}
            </div>
            <div className="text-[10px] text-zinc-450 dark:text-zinc-500 truncate">
              {user.email}
            </div>
          </div>
        </div>
        <button 
          onClick={handleLogout}
          className="p-2 text-zinc-450 dark:text-zinc-500 hover:text-red-500 dark:hover:text-red-450 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-all cursor-pointer shrink-0"
          title="Log out"
        >
          <LogOut className="h-4.5 w-4.5" />
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* 1. Desktop Sidebar */}
      <aside className="hidden md:flex w-72 border-r border-zinc-200/60 dark:border-zinc-800/80 flex-col shrink-0">
        {sidebarContent}
      </aside>

      {/* 2. Mobile Sidebar Overlay Drawer */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs" onClick={() => setSidebarOpen(false)} />
          <div className="relative flex-1 flex flex-col max-w-[280px] w-full bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 animate-slideRight">
            <div className="absolute top-4 right-4 z-10">
              <button 
                onClick={() => setSidebarOpen(false)} 
                className="p-1 rounded-full text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="h-full flex-1">
              {sidebarContent}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
