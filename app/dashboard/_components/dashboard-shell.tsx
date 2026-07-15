"use client"

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
  Menu,
  Sun,
  Moon,
  Headphones,
  Video
} from "lucide-react"
import NextImage from "next/image"
import Link from "next/link"
import { DashboardUser } from "./types"

interface NavItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  disabled?: boolean
  badge?: number | string
}

interface NavSection {
  title: string
  items: NavItem[]
}

interface DashboardShellProps {
  user: DashboardUser
  activeTab: string
  setActiveTab: (tab: any) => void
  handleLogout: () => void
  children: React.ReactNode
  title?: string
  badgeText?: string
  // Optional counts to dynamically update badges
  ordersCount?: number
  wishlistCount?: number
  ticketsCount?: number
  usersCount?: number
  productsCount?: number
  couponsCount?: number
}

export function DashboardShell({
  user,
  activeTab,
  setActiveTab,
  handleLogout,
  children,
  title = "Dashboard",
  badgeText,
  ordersCount = 0,
  wishlistCount = 0,
  ticketsCount = 0,
  usersCount = 0,
  productsCount = 0,
  couponsCount = 0
}: DashboardShellProps) {
  
  const [sidebarOpen, setSidebarOpen] = React.useState(false)
  const [theme, setTheme] = React.useState<"light" | "dark">("light")

  React.useEffect(() => {
    // Detect initial theme on mount
    const isDark = document.documentElement.classList.contains("dark") || 
                   localStorage.getItem("theme") === "dark"
    if (isDark) {
      document.documentElement.classList.add("dark")
      setTheme("dark")
    } else {
      document.documentElement.classList.remove("dark")
      setTheme("light")
    }
  }, [])

  const toggleTheme = () => {
    if (theme === "light") {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
      setTheme("dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
      setTheme("light")
    }
  }

  const getInitials = (name: string) => {
    return name.split(" ").map(w => w[0]).join("").substring(0, 2)
  }

  const isTabActive = (tabId: string) => activeTab === tabId

  // Generate navigation sections based on role.
  // IMPORTANT: Customer role gets a completely separate, clean sidebar.
  // Staff roles (superAdmin, admin, manager, moderator) get the full operational menu.
  const getNavSections = (): NavSection[] => {
    const role = user.role

    // ─── CUSTOMER: only show customer-relevant items ───────────────────────────
    if (role === "customer") {
      const customerItems: NavItem[] = [
        { id: "overview",   label: "Overview Feed",    icon: LayoutDashboard },
        { id: "orders",     label: "Order History",    icon: ShoppingBag,  badge: ordersCount },
        { id: "wishlist",   label: "Wishlist",         icon: Heart,        badge: wishlistCount },
        { id: "addresses",  label: "Address Details",  icon: MapPin },
        { id: "rewards",    label: "VIP Club Perks",   icon: Tag },
        { id: "support",    label: "Support Desk",     icon: LifeBuoy,     badge: ticketsCount },
        { id: "settings",   label: "Account Settings", icon: User },
      ]
      return [
        { title: "My Account", items: customerItems }
      ]
    }

    // ─── STAFF ROLES: full operational menu ────────────────────────────────────
    const mainItems: NavItem[] = [
      { id: "overview", label: "Dashboard", icon: LayoutDashboard }
    ]

    // Order Management
    if (role === "superAdmin" || role === "admin") {
      mainItems.push({ id: "orders", label: "Order Dispatch", icon: ShoppingBag, badge: ordersCount })
    } else if (role === "manager" || role === "moderator") {
      mainItems.push({ id: "tickets", label: "Support Tickets", icon: ShoppingBag, badge: ticketsCount })
    } else {
      mainItems.push({ id: "order-mgmt", label: "Order Management", icon: ShoppingBag, disabled: true })
    }

    // User Control
    if (role === "superAdmin" || role === "admin") {
      mainItems.push({ id: "users", label: "User Control", icon: Users, badge: usersCount })
    } else {
      mainItems.push({ id: "customers", label: "Customers", icon: Users, disabled: true })
    }

    // Coupon / Rewards
    if (role === "superAdmin" || role === "admin") {
      mainItems.push({ id: "coupons", label: "Coupon Manager", icon: Tag, badge: couponsCount })
    } else {
      mainItems.push({ id: "coupon-code", label: "Coupon Code", icon: Tag, disabled: true })
    }

    // Home Banner
    if (role === "superAdmin" || role === "admin") {
      mainItems.push({ id: "home-banner", label: "Home Banner", icon: Image })
    }

    // Video Create
    if (role === "superAdmin" || role === "admin") {
      mainItems.push({ id: "create-video", label: "Create Video", icon: Video })
    }

    // Categories / Catalog
    if (role === "superAdmin" || role === "admin") {
      mainItems.push({ id: "catalog", label: "Catalog Manager", icon: Folder, badge: productsCount })
    } else if (role === "manager") {
      mainItems.push({ id: "reports", label: "Category Reports", icon: Folder })
    } else {
      mainItems.push({ id: "categories", label: "Categories", icon: Folder, disabled: true })
    }

    // Transactions / Audit
    if (role === "superAdmin") {
      mainItems.push({ id: "audit", label: "System Logs", icon: ArrowLeftRight })
    } else {
      mainItems.push({ id: "transaction", label: "Transaction", icon: ArrowLeftRight, disabled: true })
    }

    mainItems.push({ id: "brand", label: "Brand", icon: Award, disabled: true })

    // Product Section
    const productItems: NavItem[] = []
    if (role === "superAdmin" || role === "admin" || role === "manager" || role === "moderator") {
      productItems.push({ id: "content", label: "Content Manager", icon: PlusCircle })
    } else {
      productItems.push({ id: "add-product", label: "Add Products", icon: PlusCircle, disabled: true })
    }
    if (role === "superAdmin") {
      productItems.push({ id: "product-media", label: "Product Media", icon: Image })
      productItems.push({ id: "product-list", label: "Product List", icon: List })
      productItems.push({ id: "product-reviews", label: "Product Reviews", icon: MessageSquare })
    } else {
      productItems.push({ id: "product-media", label: "Product Media", icon: Image, disabled: true })
      productItems.push({ id: "product-list", label: "Product List", icon: List, disabled: true })
      if (role === "moderator") {
        productItems.push({ id: "reviews", label: "Review Moderation", icon: MessageSquare, badge: couponsCount })
      } else {
        productItems.push({ id: "product-reviews", label: "Product Reviews", icon: MessageSquare, disabled: true })
      }
    }

    // Admin Section
    const adminItems: NavItem[] = []
    adminItems.push({ id: "rbac", label: "RBAC Matrix", icon: Shield })
    if (role === "superAdmin") {
      adminItems.push({ id: "settings", label: "System Config", icon: Sliders })
      adminItems.push({ id: "control-authority", label: "Control Authority", icon: Sliders })
    } else {
      adminItems.push({ id: "control-authority", label: "Control Authority", icon: Sliders, disabled: true })
    }

    return [
      { title: "Main menu",  items: mainItems },
      { title: "Product",    items: productItems },
      { title: "Admin",      items: adminItems }
    ]
  }

  const renderNavItem = (item: NavItem) => {
    const Icon = item.icon
    const isSelected = isTabActive(item.id) && !item.disabled

    if (item.disabled) {
      return (
        <div
          key={item.label}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-[12px] font-medium text-zinc-400 dark:text-zinc-650 cursor-not-allowed select-none opacity-80"
        >
          <Icon className="h-4.5 w-4.5 text-zinc-300 dark:text-zinc-700" />
          <span>{item.label}</span>
          <span className="ml-auto text-[8px] bg-zinc-100 dark:bg-zinc-800 text-zinc-405 dark:text-zinc-505 px-1.5 py-0.5 rounded-sm uppercase tracking-wider font-semibold">
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
            ? "bg-[#3eb075] text-white shadow-sm shadow-emerald-500/10"
            : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-850/40"
        }`}
      >
        <Icon className={`h-4.5 w-4.5 transition-colors ${isSelected ? "text-white" : "text-zinc-450 dark:text-zinc-500"}`} />
        <span>{item.label}</span>
        {item.badge !== undefined && (
          <span className={`ml-auto text-[10px] px-2 py-0.5 rounded-full font-bold ${
            isSelected ? "bg-white/20 text-white" : "bg-zinc-100 text-zinc-655 dark:bg-zinc-800 dark:text-zinc-400"
          }`}>
            {item.badge}
          </span>
        )}
      </button>
    )
  }

  const navSections = getNavSections()

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white dark:bg-zinc-900">
      {/* Brand Header — Arzuma Logo */}
      <div className="px-6 py-5 border-b border-zinc-100 dark:border-zinc-800 flex items-center">
        <Link href="/" className="flex items-center select-none group">
          <NextImage
            src="/ChatGPT Image Jun 27, 2026, 10_41_50 PM.png"
            alt="Arzuma Logo"
            width={160}
            height={52}
            className="h-auto w-auto max-h-14 object-contain transition-opacity duration-200 group-hover:opacity-80"
            priority
          />
          <span className="text-[11px] font-bold text-zinc-400 align-super ml-0.5">®</span>
        </Link>
      </div>

      {/* Navigation Group list */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-7 custom-scrollbar">
        {navSections.map((section, sIdx) => (
          <div key={sIdx} className="space-y-1.5">
            <div className="px-4 text-[10px] font-bold text-zinc-400 dark:text-zinc-505 uppercase tracking-widest mb-2">
              {section.title}
            </div>
            <div className="space-y-0.5">
              {section.items.map(renderNavItem)}
            </div>
          </div>
        ))}
      </div>

      {/* Customer Support Card */}
      <div className="px-4 mb-4 select-none">
        <div className="p-4 bg-zinc-50/50 dark:bg-zinc-850/30 border border-zinc-150/40 dark:border-zinc-800 rounded-2xl">
          <h4 className="text-[11px] font-black text-zinc-855 dark:text-zinc-205 uppercase tracking-wider">Customer Support</h4>
          <p className="text-[10px] text-zinc-450 dark:text-zinc-505 mt-2 leading-relaxed font-sans font-medium">
            Ask you query , place requests or important issues. Our support team will contact 24/7 to you.
          </p>
          <button className="w-full mt-3.5 py-2 px-3 bg-blue-50 hover:bg-blue-100 dark:bg-[#1258ff] dark:hover:bg-blue-600 text-blue-600 dark:text-white rounded-xl text-[10px] font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer">
            <Headphones className="h-3.5 w-3.5" />
            Connect Now
          </button>
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
            <Store className="h-4.5 w-4.5 text-[#3eb075]" />
            <span className="text-[12px] font-bold text-zinc-700 dark:text-zinc-200">Your Shop</span>
          </div>
          <ExternalLink className="h-3.5 w-3.5 text-zinc-400 group-hover:text-[#3eb075] transition-colors" />
        </a>
      </div>

      {/* Sidebar Footer Links */}
      <div className="px-6 mb-3 flex gap-3 text-[9px] text-zinc-400 dark:text-zinc-550 font-bold uppercase tracking-wider">
        <a href="#" className="hover:text-zinc-600 dark:hover:text-zinc-350 transition-colors">Terms & Services</a>
        <span>•</span>
        <a href="#" className="hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">Privacy Policy</a>
      </div>

      {/* User profile footer */}
      <div className="p-4 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 flex items-center justify-between gap-2.5">
        <div className="flex items-center gap-3 min-w-0">
          <div className="h-10 w-10 rounded-full bg-emerald-100 dark:bg-emerald-950/50 border border-emerald-250 dark:border-emerald-900 flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-sm font-bold shadow-sm shrink-0 relative">
            {getInitials(user.name)}
            {badgeText && (
              <span className="absolute -bottom-1 -right-1 px-1.5 py-0.2 bg-[#3eb075] border border-white dark:border-zinc-900 text-[7px] font-black text-white rounded-full uppercase leading-tight select-none">
                {badgeText}
              </span>
            )}
          </div>
          <div className="min-w-0">
            <div className="text-[12px] font-bold text-zinc-800 dark:text-zinc-150 uppercase tracking-wide truncate">
              {user.name}
            </div>
            <div className="text-[9px] font-extrabold text-[#3eb075] uppercase tracking-widest mt-0.5 select-none">
              {user.role === "superAdmin" ? "Super Admin" : 
               user.role === "admin" ? "Admin" : 
               user.role === "manager" ? "Manager" : 
               user.role === "moderator" ? "Moderator" : "User"}
            </div>
            <div className="text-[10px] text-zinc-455 dark:text-zinc-505 truncate mt-0.5">
              {user.email}
            </div>
          </div>
        </div>
        <button 
          onClick={handleLogout}
          className="p-2 text-zinc-450 dark:text-zinc-505 hover:text-red-500 dark:hover:text-red-455 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-all cursor-pointer shrink-0"
          title="Log out"
        >
          <LogOut className="h-4.5 w-4.5" />
        </button>
      </div>
    </div>
  )
  const isStaff = user.role !== "customer"

  return (
    <div className="flex-1 bg-[#f5f6f8] dark:bg-zinc-950 font-sans min-h-screen text-zinc-900 dark:text-zinc-100 flex relative overflow-hidden">
      
      {/* 1. SIDEBAR (Desktop & Mobile Drawer Overlay) */}
      <aside className="hidden md:flex border-r border-zinc-200/60 dark:border-zinc-800/80 flex-col shrink-0" style={{ width: "350px" }}>
        {sidebarContent}
      </aside>

      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs" onClick={() => setSidebarOpen(false)} />
          <div className="relative flex-1 flex flex-col max-w-[280px] w-full bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 animate-slideRight">
            <div className="absolute top-4 right-4 z-10">
              <button 
                onClick={() => setSidebarOpen(false)} 
                className="p-1 rounded-full text-zinc-500 dark:text-zinc-455 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
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

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col w-full overflow-x-hidden min-h-screen">
        
        {/* Top Header Bar */}
        {isStaff ? (
          /* Mobile-only header to toggle sidebar for staff roles, hidden on desktop */
          <header className="md:hidden bg-white dark:bg-zinc-900 border-b border-zinc-200/60 dark:border-zinc-800/80 px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-[0_1px_3px_rgba(0,0,0,0.01)]">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="p-2 text-zinc-550 dark:text-zinc-455 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg cursor-pointer transition-colors"
              >
                <Menu className="h-5 w-5" />
              </button>
              <h1 className="text-lg font-bold tracking-tight text-zinc-800 dark:text-zinc-100 uppercase font-sans">
                {title}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={toggleTheme}
                className="flex items-center justify-center p-2 bg-zinc-100 dark:bg-zinc-855 rounded-full border border-zinc-200 dark:border-zinc-800 cursor-pointer hover:bg-zinc-150 dark:hover:bg-zinc-800 transition-all"
              >
                {theme === "light" ? (
                  <Sun className="h-4 w-4 text-amber-500" />
                ) : (
                  <Moon className="h-4 w-4 text-indigo-400" />
                )}
              </button>
              <div className="h-8 w-8 rounded-full bg-emerald-100 dark:bg-emerald-950 border border-emerald-250 dark:border-emerald-900 flex items-center justify-center text-emerald-600 dark:text-emerald-455 text-xs font-bold shadow-sm">
                {getInitials(user.name)}
              </div>
            </div>
          </header>
        ) : (
          /* Mobile-only header for customer — desktop has no top bar (welcome banner in overview serves that role) */
          <header className="md:hidden bg-white dark:bg-zinc-900 border-b border-zinc-200/60 dark:border-zinc-800/80 px-6 py-4 flex items-center justify-between gap-4 sticky top-0 z-30 shadow-[0_1px_3px_rgba(0,0,0,0.01)]">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="p-2 text-zinc-550 dark:text-zinc-455 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg cursor-pointer transition-colors"
              >
                <Menu className="h-5 w-5" />
              </button>
              <h1 className="text-lg font-bold tracking-tight text-zinc-800 dark:text-zinc-100 uppercase font-sans">
                {title}
              </h1>
            </div>
            <button 
              onClick={toggleTheme}
              className="flex items-center justify-center p-2 bg-zinc-100 dark:bg-zinc-855 rounded-full border border-zinc-200 dark:border-zinc-800 cursor-pointer hover:bg-zinc-150 dark:hover:bg-zinc-800 transition-all"
            >
              {theme === "light" ? (
                <Sun className="h-4 w-4 text-amber-500" />
              ) : (
                <Moon className="h-4 w-4 text-indigo-400" />
              )}
            </button>
          </header>
        )}

        {/* Dynamic Inner Tab Content */}
        <div className="flex-1 p-5 md:p-6 w-full">
          {isStaff && (
            <div className="hidden md:block mb-6">
              <h1 className="text-xl font-extrabold tracking-widest text-zinc-800 dark:text-zinc-100 uppercase font-sans border-b border-zinc-250 dark:border-zinc-800 pb-4">
                {title}
              </h1>
            </div>
          )}
          {children}
        </div>

      </main>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideRight {
          from { transform: translateX(-100%); }
          to   { transform: translateX(0); }
        }
        .animate-fadeInFast {
          animation: fadeInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-slideRight {
          animation: slideRight 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e4e4e7;
          border-radius: 4px;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #27272a;
        }
      `}</style>
    </div>
  )
}
