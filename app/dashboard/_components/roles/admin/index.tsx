"use client"

import * as React from "react"
import { 
  Check,
 
} from "lucide-react"
import { DashboardUser, Order } from "../../../_components/types"
import { products as initialProducts, Product } from "@/lib/data"
import { DashboardShell } from "../../dashboard-shell"

import { OverviewTab } from "./overview-tab"
import { CatalogTab } from "./catalog-tab"
import { OrdersTab } from "./orders-tab"
import { CouponsTab } from "./coupons-tab"
import { UsersTab } from "../super-admin/users-tab"
import { RbacMatrixView } from "../rbac-matrix-view"
import { RolePermissions, getRbacPermissions, DEFAULT_RBAC_PERMISSIONS } from "../rbac-config"
import { ContentTab } from "../content-tab"
import { HomeBannerTab } from "../banner-tab"
import { VideoTab } from "../video-tab"

interface AdminViewProps {
  user: DashboardUser
  handleLogout: () => void
}

interface Coupon {
  code: string
  discount: number
  active: boolean
  usedCount: number
}

interface MockUser {
  id: string
  name: string
  email: string
  role: "customer" | "superAdmin" | "admin" | "manager" | "moderator"
  status: "Active" | "Banned"
  joined: string
}

const DEFAULT_COUPONS: Coupon[] = [
  { code: "WELCOME10", discount: 10, active: true, usedCount: 142 },
  { code: "VIPGOLD", discount: 20, active: true, usedCount: 58 },
  { code: "SUMMER50", discount: 50, active: false, usedCount: 0 },
  { code: "FESTIVE15", discount: 15, active: true, usedCount: 22 }
]

export function AdminView({ user, handleLogout }: AdminViewProps) {
  const [activeTab, setActiveTab] = React.useState<"overview" | "catalog" | "orders" | "coupons" | "rbac" | "content" | "users" | "home-banner" | "create-video">("overview")
  const [products, setProducts] = React.useState<Product[]>([])
  const [orders, setOrders] = React.useState<Order[]>([])
  const [coupons, setCoupons] = React.useState<Coupon[]>([])
  const [users, setUsers] = React.useState<MockUser[]>([])
  const [permissions, setPermissions] = React.useState<RolePermissions | null>(null)
  
  // Search & Filter
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState("All")
  const [userSearchQuery, setUserSearchQuery] = React.useState("")
  
  // Modals & Edits
  const [editingProduct, setEditingProduct] = React.useState<number | null>(null)
  const [editPrice, setEditPrice] = React.useState<string>("")
  
  // New Coupon Form
  const [newCouponCode, setNewCouponCode] = React.useState("")
  const [newCouponDiscount, setNewCouponDiscount] = React.useState(15)

  // Toast
  const [toastMessage, setToastMessage] = React.useState<string | null>(null)

  const triggerToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  React.useEffect(() => {
    let active = true

    async function loadData() {
      // 1. Fetch products from API
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

      // 2. Load orders
      const storedOrders = localStorage.getItem("arzuma_orders")
      if (active) {
        setOrders(storedOrders ? JSON.parse(storedOrders) : [])
      }

      // 3. Load coupons
      const storedCoupons = localStorage.getItem("arzuma_coupons")
      if (active) {
        setCoupons(storedCoupons ? JSON.parse(storedCoupons) : [])
      }

      // 4. Load users
      const storedUsers = localStorage.getItem("arzuma_all_users")
      if (active) {
        setUsers(storedUsers ? JSON.parse(storedUsers) : [])
      }

      // 5. Load RBAC permissions
      const allPerms = getRbacPermissions()
      if (active) {
        setPermissions(allPerms.admin || DEFAULT_RBAC_PERMISSIONS.admin)
      }
    }

    const timer = setTimeout(loadData, 0)

    return () => {
      active = false
      clearTimeout(timer)
    }
  }, [])

  // Sync helpers
  const saveProducts = (updated: Product[]) => {
    setProducts(updated)
    localStorage.setItem("arzuma_products", JSON.stringify(updated))
  }

  const saveOrders = (updated: Order[]) => {
    setOrders(updated)
    localStorage.setItem("arzuma_orders", JSON.stringify(updated))
  }

  const saveCoupons = (updated: Coupon[]) => {
    setCoupons(updated)
    localStorage.setItem("arzuma_coupons", JSON.stringify(updated))
  }

  const saveUsers = (updated: MockUser[]) => {
    setUsers(updated)
    localStorage.setItem("arzuma_all_users", JSON.stringify(updated))
  }

  // Actions
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
    saveProducts(updated)
    setEditingProduct(null)
    triggerToast("Product price updated successfully.")
  }

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
    saveOrders(updated)
    triggerToast(`Order ${orderId} updated to ${status}.`)
  }

  const handleToggleCoupon = (code: string) => {
    const updated = coupons.map(c => c.code === code ? { ...c, active: !c.active } : c)
    saveCoupons(updated)
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
    saveCoupons(updated)
    setNewCouponCode("")
    triggerToast(`Coupon ${code} created successfully.`)
  }

  const handleDeleteCoupon = (code: string) => {
    const updated = coupons.filter(c => c.code !== code)
    saveCoupons(updated)
    triggerToast(`Coupon ${code} deleted.`)
  }

  // User Actions
  const handleRoleChange = (userId: string, newRole: MockUser["role"]) => {
    // Admin cannot elevate to or modify superAdmin roles checking permissions
    const affected = users.find(u => u.id === userId)
    if (affected?.role === "superAdmin" || newRole === "superAdmin") {
      triggerToast("Access Denied: You cannot manage Super Admin roles.")
      return
    }
    const updated = users.map(u => u.id === userId ? { ...u, role: newRole } : u)
    saveUsers(updated)
    triggerToast(`Role updated to ${newRole} for ${affected?.name}`)
  }

  const handleToggleBan = (userId: string) => {
    const affected = users.find(u => u.id === userId)
    if (affected?.role === "superAdmin") {
      triggerToast("Access Denied: Super Admin accounts are write-protected.")
      return
    }
    const updated = users.map(u => {
      if (u.id === userId) {
        const nextStatus = u.status === "Active" ? "Banned" as const : "Active" as const
        triggerToast(`${u.name} is now ${nextStatus}`)
        return { ...u, status: nextStatus }
      }
      return u
    })
    saveUsers(updated)
  }

  const handleCreateUser = (newUser: { name: string, email: string, role: MockUser["role"] }) => {
    // Admin cannot create Super Admin accounts
    if (newUser.role === "superAdmin") {
      triggerToast("Access Denied: You cannot create Super Admin accounts.")
      return
    }
    const created: MockUser = {
      id: `USR-${Math.floor(100 + Math.random() * 900)}`,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: "Active",
      joined: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    }
    saveUsers([...users, created])
    triggerToast(`User ${newUser.name} created successfully!`)
  }

  // Filters
  const filteredProducts = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.id.toString().includes(searchQuery)
    const matchCategory = selectedCategory === "All" || p.category === selectedCategory
    return matchSearch && matchCategory
  })

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(userSearchQuery.toLowerCase()) || 
    u.email.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
    u.id.toLowerCase().includes(userSearchQuery.toLowerCase())
  )

  // Categories list
  const categories = ["All", ...Array.from(new Set(products.map(p => p.category)))]

  // Math summary stats
  const totalRevenue = orders.reduce((acc, curr) => curr.status !== "Cancelled" ? acc + curr.price : acc, 0)
  const lowStockCount = products.filter(p => p.id % 3 === 0).length || 3

  const activePermissions = permissions || DEFAULT_RBAC_PERMISSIONS.admin

  return (
    <DashboardShell
      user={user}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      handleLogout={handleLogout}
      title="Store Management"
      badgeText="STAFF"
      ordersCount={orders.length}
      usersCount={users.length}
      productsCount={products.length}
      couponsCount={coupons.length}
    >
      {/* Toast Alert */}
      {toastMessage && (
        <div 
          className="fixed bottom-6 right-6 z-50 bg-[#3eb075] text-white text-xs font-bold py-3.5 px-5 shadow-2xl flex items-center gap-2 border border-emerald-450 rounded-lg animate-fadeInFast"
        >
          <Check className="h-4 w-4" />
          <span className="tracking-wide">{toastMessage}</span>
        </div>
      )}

      {/* OVERVIEW TAB */}
      {activeTab === "overview" && (
        <OverviewTab 
          totalRevenue={totalRevenue}
          orders={orders}
          products={products}
          lowStockCount={lowStockCount}
        />
      )}

      {/* USERS TAB */}
      {activeTab === "users" && (
        <UsersTab 
          filteredUsers={filteredUsers}
          searchQuery={userSearchQuery}
          setSearchQuery={setUserSearchQuery}
          handleRoleChange={handleRoleChange}
          handleToggleBan={handleToggleBan}
          currentUserRole="admin"
          handleCreateUser={handleCreateUser}
        />
      )}

      {/* CONTENT MANAGER TAB */}
      {activeTab === "content" && (
        <ContentTab 
          permissions={activePermissions}
          triggerToast={triggerToast}
        />
      )}

      {/* CATALOG TAB */}
      {activeTab === "catalog" && (
        <CatalogTab 
          filteredProducts={filteredProducts}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
          editingProduct={editingProduct}
          editPrice={editPrice}
          setEditPrice={setEditPrice}
          handleStartEdit={handleStartEdit}
          handleSavePrice={handleSavePrice}
          setEditingProduct={setEditingProduct}
          permissions={activePermissions}
        />
      )}

      {/* ORDERS TAB */}
      {activeTab === "orders" && (
        <OrdersTab 
          orders={orders}
          handleUpdateOrderStatus={handleUpdateOrderStatus}
          permissions={activePermissions}
        />
      )}

      {/* COUPONS TAB */}
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

      {/* HOME BANNER TAB */}
      {activeTab === "home-banner" && (
        <HomeBannerTab triggerToast={triggerToast} />
      )}

      {/* CREATE VIDEO TAB */}
      {activeTab === "create-video" && (
        <VideoTab triggerToast={triggerToast} />
      )}

      {/* RBAC MATRIX VIEW */}
      {activeTab === "rbac" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/80 p-6 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.01)]">
          <div className="mb-6">
            <h2 className="text-base font-bold text-zinc-800 dark:text-zinc-100 uppercase tracking-wide">
              Your Staff Access Permissions
            </h2>
            <p className="text-[11px] text-zinc-400 dark:text-zinc-550 mt-1">
              Active roles security descriptors. Managed by SuperAdmin.
            </p>
          </div>
          {permissions ? (
            <RbacMatrixView role="admin" permissions={permissions} />
          ) : (
            <div className="text-zinc-400 text-xs py-8 text-center">Loading Permissions Matrix...</div>
          )}
        </div>
      )}
    </DashboardShell>
  )
}
