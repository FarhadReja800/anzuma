"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import NextImage from "next/image"
import { 
  Power,
  LayoutDashboard,
  ShoppingCart,
  Users,
  Tag,
  Folder,
  ArrowLeftRight,
  Star,
  PlusCircle,
  Image as ImageIcon,
  List as ListIcon,
  MessageSquare,
  User as UserIcon,
  Sliders,
  Search,
  Bell,
  Sun,
  Moon,
  ExternalLink,
  MoreVertical,
  Check,
  Filter,
  Menu,
  X,
  Video
} from "lucide-react"

import { DashboardUser, Order } from "../dashboard/_components/types"
import { UsersTab } from "../dashboard/_components/roles/super-admin/users-tab"
import { SettingsTab } from "../dashboard/_components/roles/super-admin/settings-tab"
import { AuditTab } from "../dashboard/_components/roles/super-admin/audit-tab"
import { RbacTab } from "../dashboard/_components/roles/super-admin/rbac-tab"
import { ContentTab } from "../dashboard/_components/roles/content-tab"

import { OrdersTab } from "../dashboard/_components/roles/admin/orders-tab"
import { CatalogTab } from "../dashboard/_components/roles/admin/catalog-tab"
import { CouponsTab } from "../dashboard/_components/roles/admin/coupons-tab"
import { HomeBannerTab } from "../dashboard/_components/roles/banner-tab"
import { RolePermissions, getRbacPermissions, DEFAULT_RBAC_PERMISSIONS } from "../dashboard/_components/roles/rbac-config"
import { VideoTab } from "../dashboard/_components/roles/video-tab"
import { WeeklyReportChart } from "@/components/dashboard/weekly-report-chart"
import { LiveUsersCountryCard } from "@/components/dashboard/live-users-country-card"

import { products as initialProducts, Product } from "@/lib/data"

interface MockUser {
  id: string
  name: string
  email: string
  role: "customer" | "superAdmin" | "admin" | "manager" | "moderator"
  status: "Active" | "Banned"
  joined: string
}

interface Coupon {
  code: string
  discount: number
  active: boolean
  usedCount: number
}

const DEFAULT_COUPONS: Coupon[] = [
  { code: "WELCOME10", discount: 10, active: true, usedCount: 142 },
  { code: "VIPGOLD", discount: 20, active: true, usedCount: 58 },
  { code: "SUMMER50", discount: 50, active: false, usedCount: 0 },
  { code: "FESTIVE15", discount: 15, active: true, usedCount: 22 }
]

const INITIAL_USERS: MockUser[] = [
  { id: "USR-001", name: "Farhad Reja", email: "demo@arzuma.com", role: "customer", status: "Active", joined: "June 20, 2026" },
  { id: "USR-002", name: "Sarah Connor", email: "sarah@arzuma.com", role: "admin", status: "Active", joined: "May 14, 2026" },
  { id: "USR-003", name: "John Doe", email: "john@arzuma.com", role: "manager", status: "Active", joined: "April 11, 2026" },
  { id: "USR-004", name: "Agent Smith", email: "smith@arzuma.com", role: "moderator", status: "Active", joined: "July 02, 2026" },
  { id: "USR-005", name: "Super User", email: "super@arzuma.com", role: "superAdmin", status: "Active", joined: "Jan 10, 2026" }
]

export default function SuperAdminDashboardPage() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = React.useState<DashboardUser | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [activeTab, setActiveTab] = React.useState<string>("overview")
  const [users, setUsers] = React.useState<MockUser[]>([])
  const [permissions, setPermissions] = React.useState<Record<string, RolePermissions>>({})
  const [searchQuery, setSearchQuery] = React.useState("")
  const [sidebarOpen, setSidebarOpen] = React.useState(false)
  const [isDarkMode, setIsDarkMode] = React.useState(false)

  // Catalog tab states
  const [products, setProducts] = React.useState<Product[]>([])
  const [catalogSearch, setCatalogSearch] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState("All")
  const [editingProduct, setEditingProduct] = React.useState<number | null>(null)
  const [editPrice, setEditPrice] = React.useState<string>("")

  // Coupons tab states
  const [coupons, setCoupons] = React.useState<Coupon[]>([])
  const [newCouponCode, setNewCouponCode] = React.useState("")
  const [newCouponDiscount, setNewCouponDiscount] = React.useState(15)

  // Orders tab states
  const [orders, setOrders] = React.useState<Order[]>([])

  // Settings Form State
  const [siteName, setSiteName] = React.useState("Arzuma")
  const [allowRegistration, setAllowRegistration] = React.useState(true)
  const [maintenanceMode, setMaintenanceMode] = React.useState(false)
  const [backupRunning, setBackupRunning] = React.useState(false)
  const [backupProgress, setBackupProgress] = React.useState("")
  
  // Live logs
  const [logs, setLogs] = React.useState<string[]>([
    "[SYSTEM] Kernel initialized successfully.",
    "[SECURITY] Firewall rule updated: blocked IP 192.168.1.105",
    "[DATABASE] Automatic vacuum finished. 450 rows cleaned.",
    "[AUTH] SuperAdmin login from IP 103.45.67.12 (DHAKA)",
  ])
  
  // Toast Alert
  const [toastMessage, setToastMessage] = React.useState<string | null>(null)

  const triggerToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  // Load initial configurations
  React.useEffect(() => {
    let active = true

    async function loadData() {
      // Validate session role
      const savedUser = localStorage.getItem("arzuma_user")
      if (savedUser) {
        try {
          const parsed = JSON.parse(savedUser)
          if (parsed.role === "superAdmin") {
            if (active) setCurrentUser(parsed)
          } else {
            router.push("/dashboard")
          }
        } catch (e) {
          router.push("/auth?mode=login")
        }
      } else {
        router.push("/auth?mode=login")
      }
      if (active) setLoading(false)

      const stored = localStorage.getItem("arzuma_all_users")
      if (stored) {
        if (active) setUsers(JSON.parse(stored))
      } else {
        localStorage.setItem("arzuma_all_users", JSON.stringify(INITIAL_USERS))
        if (active) setUsers(INITIAL_USERS)
      }

      const storedSettings = localStorage.getItem("arzuma_system_settings")
      if (storedSettings) {
        const parsed = JSON.parse(storedSettings)
        if (active) {
          setSiteName(parsed.siteName || "Arzuma")
          setAllowRegistration(parsed.allowRegistration ?? true)
          setMaintenanceMode(parsed.maintenanceMode ?? false)
        }
      }

      // Catalog & products (Fetch from API)
      try {
        const response = await fetch("/api/product/get-products")
        if (response.ok) {
          const json = await response.json()
          const rawList = Array.isArray(json) ? json : (json.data || [])
          if (Array.isArray(rawList)) {
            const mappedList = rawList.map((p: Omit<Product, "id"> & { _id?: string | number; id?: string | number }) => ({
              ...p,
              id: p._id || p.id
            })) as unknown as Product[]
            if (active) {
              setProducts(mappedList)
              localStorage.setItem("arzuma_products", JSON.stringify(mappedList))
            }
          }
        }
      } catch (error) {
        console.error("Failed to load products from API:", error)
        if (active) {
          const storedProducts = localStorage.getItem("arzuma_products")
          setProducts(storedProducts ? JSON.parse(storedProducts) : [])
        }
      }

      // Coupons
      const storedCoupons = localStorage.getItem("arzuma_coupons")
      if (storedCoupons) {
        if (active) setCoupons(JSON.parse(storedCoupons))
      } else {
        localStorage.setItem("arzuma_coupons", JSON.stringify(DEFAULT_COUPONS))
        if (active) setCoupons(DEFAULT_COUPONS)
      }

      // Orders
      const storedOrders = localStorage.getItem("arzuma_orders")
      if (storedOrders) {
        if (active) setOrders(JSON.parse(storedOrders))
      }

      if (active) setPermissions(getRbacPermissions())

      // Check dark mode
      const isDark = document.documentElement.classList.contains("dark") || 
                     localStorage.getItem("theme") === "dark"
      if (active) setIsDarkMode(isDark)
    }

    const timer = setTimeout(loadData, 0)

    return () => {
      active = false
      clearTimeout(timer)
    }
  }, [])

  const saveUsers = (updated: MockUser[]) => {
    setUsers(updated)
    localStorage.setItem("arzuma_all_users", JSON.stringify(updated))
  }

  const addLog = (message: string) => {
    const time = new Date().toLocaleTimeString()
    setLogs(prev => [`[${time}] ${message}`, ...prev.slice(0, 19)])
  }

  const clearLogs = () => {
    setLogs([`[${new Date().toLocaleTimeString()}] Live log trail cleared.`])
    triggerToast("Auditing screen logs reset successfully")
  }

  const handleRoleChange = (userId: string, newRole: MockUser["role"]) => {
    const updated = users.map(u => u.id === userId ? { ...u, role: newRole } : u)
    saveUsers(updated)
    const affected = users.find(u => u.id === userId)
    addLog(`[ROLE CHANGE] Updated role of ${affected?.name} (${userId}) to '${newRole}'`)
    triggerToast(`Role updated to ${newRole} for ${affected?.name}`)
  }

  const handleToggleBan = (userId: string) => {
    const updated = users.map(u => {
      if (u.id === userId) {
        const nextStatus = u.status === "Active" ? "Banned" as const : "Active" as const
        addLog(`[USER CONTROL] Toggled ban status for ${u.name} (${userId}) to ${nextStatus}`)
        triggerToast(`${u.name} is now ${nextStatus}`)
        return { ...u, status: nextStatus }
      }
      return u
    })
    saveUsers(updated)
  }

  const handleCreateUser = (newUser: { name: string, email: string, role: MockUser["role"] }) => {
    const created: MockUser = {
      id: `USR-${Math.floor(100 + Math.random() * 900)}`,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: "Active",
      joined: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    }
    saveUsers([...users, created])
    addLog(`[USER CONTROL] Created user ${newUser.name} with role ${newUser.role}`)
    triggerToast(`User ${newUser.name} created successfully!`)
  }

  const handleTriggerBackup = () => {
    if (backupRunning) return
    setBackupRunning(true)
    addLog("[BACKUP] Database backup procedure initiated.")
    
    const steps = [
      "Connecting to Database Cluster...",
      "Exporting Schemas & Tables (182 entities)...",
      "Compressing Assets & Blobs (74.2MB total)...",
      "Uploading snapshot to secure cloud storage...",
      "Backup successful! Reference ID: BAK-9821-ARZ"
    ]
    
    let currentStep = 0
    setBackupProgress(steps[0])
    
    const interval = setInterval(() => {
      currentStep++
      if (currentStep < steps.length) {
        setBackupProgress(steps[currentStep])
        addLog(`[BACKUP] ${steps[currentStep]}`)
      } else {
        clearInterval(interval)
        setBackupRunning(false)
        setBackupProgress("")
        triggerToast("Full system backup completed successfully!")
      }
    }, 1000)
  }

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault()
    const settings = { siteName, allowRegistration, maintenanceMode }
    localStorage.setItem("arzuma_system_settings", JSON.stringify(settings))
    addLog(`[CONFIG] System settings updated. MaintenanceMode=${maintenanceMode}`)
    triggerToast("System configurations saved successfully!")
  }

  // Catalog actions
  const handleStartEdit = (p: Product) => {
    setEditingProduct(p.id)
    setEditPrice(p.price.toString())
  }

  const handleSavePrice = (id: number) => {
    const parsedPrice = parseFloat(editPrice)
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      triggerToast("Please enter a valid price number.")
      return
    }
    const updated = products.map(p => p.id === id ? { ...p, price: parsedPrice } : p)
    setProducts(updated)
    localStorage.setItem("arzuma_products", JSON.stringify(updated))
    setEditingProduct(null)
    triggerToast("Product price updated successfully.")
  }

  // Coupons actions
  const handleToggleCoupon = (code: string) => {
    const updated = coupons.map(c => c.code === code ? { ...c, active: !c.active } : c)
    setCoupons(updated)
    localStorage.setItem("arzuma_coupons", JSON.stringify(updated))
    const affected = coupons.find(c => c.code === code)
    triggerToast(`Coupon ${code} is now ${!affected?.active ? "Active" : "Inactive"}.`)
  }

  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCouponCode.trim()) return
    const code = newCouponCode.trim().toUpperCase()
    if (coupons.some(c => c.code === code)) {
      triggerToast("Coupon code already exists!")
      return
    }
    const updated = [...coupons, { code, discount: newCouponDiscount, active: true, usedCount: 0 }]
    setCoupons(updated)
    localStorage.setItem("arzuma_coupons", JSON.stringify(updated))
    setNewCouponCode("")
    triggerToast(`Coupon ${code} created successfully.`)
  }

  const handleDeleteCoupon = (code: string) => {
    const updated = coupons.filter(c => c.code !== code)
    setCoupons(updated)
    localStorage.setItem("arzuma_coupons", JSON.stringify(updated))
    triggerToast(`Coupon ${code} deleted.`)
  }

  // Orders Dispatch
  const handleUpdateOrderStatus = (orderId: string, status: Order["status"]) => {
    const updated = orders.map(o => {
      if (o.id === orderId) {
        return { 
          ...o, 
          status,
          trackingId: status === "Shipped" ? `TRK-${Math.floor(100000000 + Math.random() * 900000000)}` : o.trackingId
        }
      }
      return o
    })
    setOrders(updated)
    localStorage.setItem("arzuma_orders", JSON.stringify(updated))
    triggerToast(`Order ${orderId} updated to ${status}.`)
  }

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("arzuma_user")
    localStorage.removeItem("arzuma_token")
    triggerToast("SuperAdmin logged out successfully!")
    setTimeout(() => {
      router.push("/auth?mode=login")
    }, 800)
  }

  // Theme Toggler
  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
      setIsDarkMode(false)
    } else {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
      setIsDarkMode(true)
    }
  }

  // Filters
  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.id.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredProducts = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(catalogSearch.toLowerCase()) || p.id.toString().includes(catalogSearch)
    const matchCategory = selectedCategory === "All" || p.category === selectedCategory
    return matchSearch && matchCategory
  })

  const categoriesList = ["All", ...Array.from(new Set(products.map(p => p.category)))]
  const activePermissions = permissions.superAdmin || DEFAULT_RBAC_PERMISSIONS.superAdmin

  // Sidebar Layout Navigation mappings
  const sidebarSections = [
    {
      title: "Main menu",
      items: [
        { id: "overview", label: "Dashboard", icon: LayoutDashboard },
        { id: "orders", label: "Order Management", icon: ShoppingCart },
        { id: "users", label: "Customers", icon: Users },
        { id: "coupons", label: "Coupon Code", icon: Tag },
        { id: "home-banner", label: "Home Banner", icon: ImageIcon },
        { id: "create-video", label: "Create Video", icon: Video },
        { id: "catalog", label: "Categories", icon: Folder },
        { id: "audit", label: "Transaction", icon: ArrowLeftRight },
        { id: "brand", label: "Brand", icon: Star, disabled: true },
      ]
    },
    {
      title: "Product",
      items: [
        { id: "content", label: "Add Products", icon: PlusCircle },
        { id: "product-media", label: "Product Media", icon: ImageIcon, disabled: true },
        { id: "product-list", label: "Product List", icon: ListIcon, disabled: true },
        { id: "product-reviews", label: "Product Reviews", icon: MessageSquare, disabled: true },
      ]
    },
    {
      title: "Admin",
      items: [
        { id: "rbac", label: "Admin role", icon: UserIcon },
        { id: "settings", label: "Control Authority", icon: Sliders },
      ]
    }
  ]

  if (loading || !currentUser) {
    return (
      <div className="min-h-screen bg-white dark:bg-zinc-950 flex items-center justify-center p-8">
        <div className="text-xs font-bold uppercase tracking-widest text-[#047857] animate-pulse">
          Loading Security Session...
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-zinc-950 flex font-sans text-zinc-900 dark:text-zinc-100 transition-colors duration-200 w-full">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#10b981] text-white text-xs font-bold py-3.5 px-5 shadow-2xl flex items-center gap-2 border border-emerald-500 rounded-2xl animate-fadeInFast">
          <Check className="h-4 w-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. SIDEBAR (Left Panel) */}
      <aside className={`
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        fixed lg:relative top-0 left-0 h-full lg:h-auto z-40 lg:z-auto
        w-[280px] bg-white dark:bg-zinc-900 border-r border-zinc-200/50 dark:border-zinc-800/80 
        flex flex-col py-6 px-5 transition-transform duration-300 ease-in-out shrink-0
      `}>
        {/* Mobile Sidebar Close */}
        <button 
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden absolute top-4 right-4 p-2 text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-full"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Brand Header */}
        <div className="px-3 mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-[#047857] rounded-xl flex items-center justify-center text-white shadow-md shadow-emerald-500/10">
              <ShoppingCart className="h-4.5 w-4.5 stroke-[2.5]" />
            </div>
            <span className="text-lg font-black tracking-wider text-[#047857] dark:text-emerald-400">
              DEALPORT
            </span>
          </div>
          <button className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hidden lg:block cursor-pointer">
            <MoreVertical className="h-4.5 w-4.5" />
          </button>
        </div>

        {/* Nav Items List */}
        <div className="flex-1 overflow-y-auto space-y-7 pr-1 custom-scrollbar">
          {sidebarSections.map((sec, sIdx) => (
            <div key={sIdx} className="space-y-2">
              <span className="px-3 text-[10px] font-extrabold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                {sec.title}
              </span>
              <div className="space-y-1">
                {sec.items.map((item) => {
                  const Icon = item.icon
                  const isActive = activeTab === item.id
                  
                  if (item.disabled) {
                    return (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[11px] font-bold text-zinc-300 dark:text-zinc-700 cursor-not-allowed select-none"
                      >
                        <Icon className="h-4.5 w-4.5" />
                        <span>{item.label}</span>
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
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[11px] font-bold tracking-wide transition-all cursor-pointer ${
                        isActive
                          ? "bg-[#047857] text-white shadow-lg shadow-emerald-500/10"
                          : "text-zinc-505 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800/40"
                      }`}
                    >
                      <Icon className={`h-4.5 w-4.5 ${isActive ? "text-white" : "text-zinc-400 dark:text-zinc-500"}`} />
                      <span>{item.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Footer Elements */}
        <div className="pt-4 border-t border-zinc-150 dark:border-zinc-800/80 space-y-4">
          {/* Your Shop Link card */}
          <a 
            href="/shop" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center justify-between p-3.5 bg-zinc-50 dark:bg-zinc-850/60 border border-zinc-100 dark:border-zinc-800 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors group cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <Star className="h-4.5 w-4.5 text-[#047857] fill-[#047857]" />
              <span className="text-[11px] font-bold text-zinc-700 dark:text-zinc-200">Your Shop</span>
            </div>
            <ExternalLink className="h-3.5 w-3.5 text-zinc-400 group-hover:text-[#047857] transition-colors" />
          </a>

          {/* User profile widget */}
          <div className="flex items-center justify-between gap-3 p-1">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="h-9 w-9 rounded-full overflow-hidden bg-zinc-100 border border-zinc-200/50 shrink-0">
                <NextImage 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150" 
                  alt="Admin profile" 
                  width={36}
                  height={36}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <span className="block text-[11px] font-extrabold text-zinc-800 dark:text-zinc-200 truncate uppercase tracking-wide">
                  Dealport
                </span>
                <span className="block text-[9px] text-zinc-400 dark:text-zinc-500 truncate leading-none mt-0.5">
                  Mark@thedesigner...
                </span>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="p-2 text-zinc-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-all cursor-pointer"
              title="Logout"
            >
              <Power className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Sidebar mobile overlay */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/35 backdrop-blur-xs z-35"
        />
      )}

      {/* 2. CONTENT PANE */}
      <main className="flex-1 p-6 lg:p-8 flex flex-col min-w-0 transition-all duration-300">
        
        {/* Top Header bar */}
        <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-zinc-200/40 dark:border-zinc-900 mb-8">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl lg:hidden"
            >
              <Menu className="h-5.5 w-5.5" />
            </button>
            <h1 className="text-xl font-extrabold tracking-tight text-zinc-850 dark:text-zinc-100">
              Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-5 justify-end w-full lg:w-auto">
            {/* Search inputs */}
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 dark:text-zinc-550" />
              <input 
                type="text" 
                placeholder="Search data, users, or reports" 
                className="w-full pl-10 pr-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 rounded-full text-[12px] font-semibold text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-hidden focus:ring-1 focus:ring-[#047857] transition-all shadow-xs"
              />
            </div>

            {/* Notification bell */}
            <button className="relative p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-all cursor-pointer">
              <Bell className="h-5 w-5 text-zinc-400 dark:text-zinc-505" />
              <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-[#047857]"></span>
            </button>

            {/* Dark mode toggle switch */}
            <button 
              onClick={toggleTheme}
              className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-all cursor-pointer text-zinc-400 dark:text-zinc-505"
            >
              {isDarkMode ? <Sun className="h-5 w-5 text-amber-500" /> : <Moon className="h-5 w-5 text-slate-500" />}
            </button>

            {/* Profile Avatar */}
            <div className="h-9 w-9 rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-800 shrink-0">
              <NextImage 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150" 
                alt="Profile" 
                width={36}
                height={36}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </header>

        {/* 3. TABS CONTENTS RENDERER */}
        {activeTab === "overview" ? (
          /* Dealport overview screen */
          <div className="space-y-8 animate-fadeInFast">
            
            {/* Top row 3 cards stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Total Sales Card */}
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/80 rounded-3xl p-6 shadow-xs relative flex flex-col justify-between min-h-[170px]">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="block text-[11px] font-extrabold uppercase tracking-wider text-zinc-400 dark:text-zinc-505">
                      Total Sales
                    </span>
                    <span className="block text-[10px] text-zinc-400 mt-0.5 leading-none">
                      Last 7 days
                    </span>
                  </div>
                  <button className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer">
                    <MoreVertical className="h-4.5 w-4.5" />
                  </button>
                </div>

                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-zinc-800 dark:text-zinc-100 tracking-tight select-none">
                    $350K
                  </span>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/20 px-1.5 py-0.5 rounded-sm">
                    Sales ↑ 10.4%
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-zinc-50 dark:border-zinc-850 pt-3.5">
                  <span className="text-[10px] font-bold text-zinc-400">
                    Previous 7days <span className="text-indigo-600 dark:text-indigo-400">($235)</span>
                  </span>
                  <button className="text-[10px] font-extrabold text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 px-3 py-1 rounded-xl transition-all cursor-pointer">
                    Details
                  </button>
                </div>
              </div>

              {/* Total Orders Card */}
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/80 rounded-3xl p-6 shadow-xs relative flex flex-col justify-between min-h-[170px]">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="block text-[11px] font-extrabold uppercase tracking-wider text-zinc-400 dark:text-zinc-555">
                      Total Orders
                    </span>
                    <span className="block text-[10px] text-zinc-400 mt-0.5 leading-none">
                      Last 7 days
                    </span>
                  </div>
                  <button className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer">
                    <MoreVertical className="h-4.5 w-4.5" />
                  </button>
                </div>

                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-zinc-800 dark:text-zinc-100 tracking-tight select-none">
                    10.7K
                  </span>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/20 px-1.5 py-0.5 rounded-sm">
                    order ↑ 14.4%
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-zinc-50 dark:border-zinc-850 pt-3.5">
                  <span className="text-[10px] font-bold text-zinc-400">
                    Previous 7days <span className="text-indigo-600 dark:text-indigo-400">(7.6k)</span>
                  </span>
                  <button className="text-[10px] font-extrabold text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 px-3 py-1 rounded-xl transition-all cursor-pointer">
                    Details
                  </button>
                </div>
              </div>

              {/* Pending & Canceled Card */}
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/80 rounded-3xl p-6 shadow-xs relative flex flex-col justify-between min-h-[170px]">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="block text-[11px] font-extrabold uppercase tracking-wider text-zinc-400 dark:text-zinc-555">
                      Pending & Canceled
                    </span>
                    <span className="block text-[10px] text-zinc-400 mt-0.5 leading-none">
                      Last 7 days
                    </span>
                  </div>
                  <button className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer">
                    <MoreVertical className="h-4.5 w-4.5" />
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <span className="block text-[10px] text-zinc-400">Pending</span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-xl font-extrabold">509</span>
                      <span className="text-[8px] font-black text-emerald-600">user 204</span>
                    </div>
                  </div>
                  <div>
                    <span className="block text-[10px] text-zinc-400">Canceled</span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-xl font-extrabold">94</span>
                      <span className="text-[8px] font-black text-rose-500">↓ 14.4%</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-end border-t border-zinc-50 dark:border-zinc-850 pt-3.5">
                  <button className="text-[10px] font-extrabold text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 px-3 py-1 rounded-xl transition-all cursor-pointer">
                    Details
                  </button>
                </div>
              </div>

            </div>

            {/* Middle row grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Report for this week chart */}
              <WeeklyReportChart className="lg:col-span-8" />

              {/* Users in last 30 mins + Sales by country */}
              <LiveUsersCountryCard className="lg:col-span-4" />

            </div>

            {/* Bottom Row grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Transactions table (Left, approx 70% width) */}
              <div className="lg:col-span-8 bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/80 rounded-3xl p-6 shadow-xs">
                <div className="flex items-start justify-between border-b border-zinc-50 dark:border-zinc-850 pb-4 mb-4">
                  <h3 className="text-sm font-extrabold text-zinc-800 dark:text-zinc-250">
                    Transaction
                  </h3>
                  <button className="flex items-center gap-1.5 bg-[#047857] hover:bg-emerald-700 text-white px-3 py-1.5 rounded-xl text-[10px] font-bold shadow-xs cursor-pointer">
                    <Filter className="h-3.5 w-3.5" />
                    Filter
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-zinc-50 dark:border-zinc-850 text-[10px] font-extrabold uppercase tracking-widest text-zinc-400">
                        <th className="py-3 px-2">No</th>
                        <th className="py-3 px-2">Id Customer</th>
                        <th className="py-3 px-2">Order Date</th>
                        <th className="py-3 px-2">Status</th>
                        <th className="py-3 px-2">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">
                      <tr className="border-b border-zinc-50/50 dark:border-zinc-850/55 hover:bg-zinc-50/30 dark:hover:bg-zinc-800/20 transition-all">
                        <td className="py-3.5 px-2 font-bold text-zinc-900 dark:text-zinc-100">1.</td>
                        <td className="py-3.5 px-2 text-[#047857] font-bold">#6545</td>
                        <td className="py-3.5 px-2 text-zinc-400">01 Oct | 11:29 am</td>
                        <td className="py-3.5 px-2">
                          <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                            <span className="h-2 w-2 rounded-full bg-emerald-500" />
                            Paid
                          </span>
                        </td>
                        <td className="py-3.5 px-2 font-black">$64</td>
                      </tr>
                      <tr className="hover:bg-zinc-50/30 dark:hover:bg-zinc-800/20 transition-all">
                        <td className="py-3.5 px-2 font-bold text-zinc-900 dark:text-zinc-100">2.</td>
                        <td className="py-3.5 px-2 text-[#047857] font-bold">#5412</td>
                        <td className="py-3.5 px-2 text-zinc-400">01 Oct | 11:29 am</td>
                        <td className="py-3.5 px-2">
                          <span className="flex items-center gap-1.5 text-amber-500 dark:text-amber-400">
                            <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                            Pending
                          </span>
                        </td>
                        <td className="py-3.5 px-2 font-black">$557</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Top Products widget (Right, approx 30% width) */}
              <div className="lg:col-span-4 bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/80 rounded-3xl p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between border-b border-zinc-50 dark:border-zinc-850 pb-4 mb-4">
                    <h3 className="text-sm font-extrabold text-zinc-800 dark:text-zinc-250">
                      Top Products
                    </h3>
                    <button className="text-[10px] font-extrabold text-[#047857] hover:underline cursor-pointer">
                      All product
                    </button>
                  </div>

                  {/* Inner search box */}
                  <div className="relative mb-5">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
                    <input 
                      type="text" 
                      placeholder="Search" 
                      className="w-full pl-9 pr-3 py-1.5 bg-zinc-50 dark:bg-zinc-850 border border-zinc-150 dark:border-zinc-800 rounded-xl text-[10px] text-zinc-800 dark:text-zinc-100"
                    />
                  </div>

                  {/* Products Item */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-zinc-100 dark:bg-zinc-800 rounded-xl overflow-hidden shadow-sm border border-zinc-200/50 shrink-0">
                        <NextImage 
                          src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=150" 
                          alt="Apple iPhone 13" 
                          width={40}
                          height={40}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="block text-[11px] font-bold text-zinc-800 dark:text-zinc-200 truncate">
                          Apple iPhone 13
                        </span>
                        <span className="block text-[9px] text-zinc-400 font-semibold mt-0.5">
                          Item #FXZ-4567
                        </span>
                      </div>
                      <span className="text-[11px] font-black text-zinc-800 dark:text-zinc-100">
                        $999.00
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-zinc-50 dark:border-zinc-900 pt-4 mt-6 text-center text-[10px] font-bold text-zinc-400">
                  <span>Sales performance log</span>
                </div>
              </div>

            </div>

          </div>
        ) : (
          /* Operational sub-tabs panels */
          <div className="flex-1 flex flex-col">
            
            {/* Header info */}
            <div className="mb-6 pb-4 border-b border-zinc-200/40 dark:border-zinc-800">
              <h2 className="text-lg font-black uppercase tracking-wider text-[#047857] dark:text-emerald-400">
                {sidebarSections.flatMap(s => s.items).find(i => i.id === activeTab)?.label || "Operation Control Panel"}
              </h2>
            </div>

            {/* Inner router tabs content panels */}
            <div className="flex-1">
              {activeTab === "users" && (
                <UsersTab 
                  filteredUsers={filteredUsers}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  handleRoleChange={handleRoleChange}
                  handleToggleBan={handleToggleBan}
                  currentUserRole="superAdmin"
                  handleCreateUser={handleCreateUser}
                />
              )}

              {activeTab === "settings" && (
                <SettingsTab 
                  siteName={siteName}
                  setSiteName={setSiteName}
                  allowRegistration={allowRegistration}
                  setAllowRegistration={setAllowRegistration}
                  maintenanceMode={maintenanceMode}
                  setMaintenanceMode={setMaintenanceMode}
                  backupRunning={backupRunning}
                  backupProgress={backupProgress}
                  handleTriggerBackup={handleTriggerBackup}
                  handleSaveSettings={handleSaveSettings}
                  logs={logs}
                />
              )}

              {activeTab === "content" && (
                <ContentTab 
                  permissions={activePermissions}
                  triggerToast={triggerToast}
                />
              )}

              {activeTab === "rbac" && (
                <RbacTab 
                  permissions={permissions}
                  setPermissions={setPermissions}
                  triggerToast={triggerToast}
                />
              )}

              {activeTab === "audit" && (
                <AuditTab 
                  logs={logs}
                  clearLogs={clearLogs}
                />
              )}

              {activeTab === "orders" && (
                <OrdersTab 
                  orders={orders}
                  handleUpdateOrderStatus={handleUpdateOrderStatus}
                  permissions={activePermissions}
                />
              )}

              {activeTab === "catalog" && (
                <CatalogTab 
                  filteredProducts={filteredProducts}
                  searchQuery={catalogSearch}
                  setSearchQuery={setCatalogSearch}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  categories={categoriesList}
                  editingProduct={editingProduct}
                  editPrice={editPrice}
                  setEditPrice={setEditPrice}
                  handleStartEdit={handleStartEdit}
                  handleSavePrice={handleSavePrice}
                  setEditingProduct={setEditingProduct}
                  permissions={activePermissions}
                />
              )}

              {activeTab === "coupons" && (
                <CouponsTab 
                  coupons={coupons}
                  newCouponCode={newCouponCode}
                  setNewCouponCode={setNewCouponCode}
                  newCouponDiscount={newCouponDiscount}
                  setNewCouponDiscount={setNewCouponDiscount}
                  handleAddCoupon={handleAddCoupon}
                  handleToggleCoupon={handleToggleCoupon}
                  handleDeleteCoupon={handleDeleteCoupon}
                  permissions={activePermissions}
                />
              )}

              {activeTab === "home-banner" && (
                <HomeBannerTab triggerToast={triggerToast} />
              )}

              {activeTab === "create-video" && (
                <VideoTab triggerToast={triggerToast} />
              )}
            </div>

          </div>
        )}
      </main>
      
      {/* Embedded CSS animations */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInFast {
          animation: fadeInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
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
