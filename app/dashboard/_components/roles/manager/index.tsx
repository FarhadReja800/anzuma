"use client"

import * as React from "react"
import { 

  Check 
} from "lucide-react"
import { DashboardUser, SupportTicket } from "../../../_components/types"
import { products as initialProducts } from "@/lib/data"
import { DashboardShell } from "../../dashboard-shell"

import { OverviewTab } from "./overview-tab"
import { InventoryTab } from "./inventory-tab"
import { ReportsTab } from "./reports-tab"
import { TicketsTab } from "./tickets-tab"
import { ContentTab } from "../content-tab"
import { RbacMatrixView } from "../rbac-matrix-view"
import { RolePermissions, getRbacPermissions, DEFAULT_RBAC_PERMISSIONS } from "../rbac-config"

interface ManagerViewProps {
  user: DashboardUser
  handleLogout: () => void
}

interface StockProduct {
  id: number
  name: string
  category: string
  price: number
  originalPrice?: number
  stockQty: number
  supplier: string
}

export function ManagerView({ user, handleLogout }: ManagerViewProps) {
  const [activeTab, setActiveTab] = React.useState<"overview" | "inventory" | "reports" | "tickets" | "rbac" | "content">("overview")
  const [products, setProducts] = React.useState<StockProduct[]>([])
  const [tickets, setTickets] = React.useState<SupportTicket[]>([])
  const [permissions, setPermissions] = React.useState<RolePermissions | null>(null)
  
  // Loader states
  const [restockingId, setRestockingId] = React.useState<number | null>(null)
  
  // Toast Alert
  const [toastMessage, setToastMessage] = React.useState<string | null>(null)

  const triggerToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  React.useEffect(() => {
    const timer = setTimeout(() => {
      // Populate stock data
      const stored = localStorage.getItem("arzuma_manager_stock")
      if (stored) {
        setProducts(JSON.parse(stored))
      } else {
        const mapped = initialProducts.map((p, idx) => ({
          ...p,
          stockQty: idx % 3 === 0 ? 8 : idx % 5 === 0 ? 3 : 45,
          supplier: idx % 2 === 0 ? "Arzuma Global Ltd." : "TexStyle Imports Inc."
        }))
        localStorage.setItem("arzuma_manager_stock", JSON.stringify(mapped))
        setProducts(mapped)
      }

      // Populate tickets
      const storedTickets = localStorage.getItem("arzuma_tickets")
      if (storedTickets) {
        setTickets(JSON.parse(storedTickets))
      } else {
        const defaultTickets: SupportTicket[] = [
          {
            id: "TCK-872",
            subject: "Exchange size for Puff Jacket",
            category: "Return Request",
            priority: "Medium",
            status: "Answered",
            date: "July 1, 2026",
            messages: []
          },
          {
            id: "TCK-990",
            subject: "Refund request for wallet",
            category: "Billing",
            priority: "High",
            status: "Open",
            date: "July 4, 2026",
            messages: []
          }
        ]
        localStorage.setItem("arzuma_tickets", JSON.stringify(defaultTickets))
        setTickets(defaultTickets)
      }

      const allPerms = getRbacPermissions()
      setPermissions(allPerms.manager || DEFAULT_RBAC_PERMISSIONS.manager)
    }, 0)

    return () => clearTimeout(timer)
  }, [])

  const saveProducts = (updated: StockProduct[]) => {
    setProducts(updated)
    localStorage.setItem("arzuma_manager_stock", JSON.stringify(updated))
  }

  const saveTickets = (updated: SupportTicket[]) => {
    setTickets(updated)
    localStorage.setItem("arzuma_tickets", JSON.stringify(updated))
  }

  const handleRestock = (productId: number) => {
    if (restockingId !== null) return
    setRestockingId(productId)
    
    setTimeout(() => {
      const updated = products.map(p => {
        if (p.id === productId) {
          const nextStock = p.stockQty + 50
          triggerToast(`Restock successful: SKU-${p.id} stock updated to ${nextStock}`)
          return { ...p, stockQty: nextStock }
        }
        return p
      })
      saveProducts(updated)
      setRestockingId(null)
    }, 1500)
  }

  const handleAssignTicket = (ticketId: string, moderator: string) => {
    const updated = tickets.map(t => {
      if (t.id === ticketId) {
        triggerToast(`Ticket ${ticketId} assigned to Moderator: ${moderator}`)
        return {
          ...t,
          status: "Open" as const
        }
      }
      return t
    })
    saveTickets(updated)
  }

  // Stock counters
  const lowStockProducts = products.filter(p => p.stockQty <= 10)
  const totalValue = products.reduce((acc, curr) => acc + (curr.price * curr.stockQty), 0)

  const activePermissions = permissions || DEFAULT_RBAC_PERMISSIONS.manager

  return (
    <DashboardShell
      user={user}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      handleLogout={handleLogout}
      title="Performance Management"
      badgeText="MGR"
      ticketsCount={tickets.length}
      productsCount={lowStockProducts.length}
    >
      {/* Toast */}
      {toastMessage && (
        <div 
          className="fixed bottom-6 right-6 z-50 bg-emerald-500 text-black text-xs font-bold py-3.5 px-5 shadow-2xl flex items-center gap-2 border border-emerald-450 rounded-lg animate-fadeInFast"
        >
          <Check className="h-4 w-4" />
          <span className="tracking-wide">{toastMessage}</span>
        </div>
      )}

      {/* OVERVIEW TAB */}
      {activeTab === "overview" && (
        <OverviewTab 
          totalValue={totalValue}
          lowStockProducts={lowStockProducts}
          tickets={tickets}
        />
      )}

      {/* CONTENT MANAGER TAB */}
      {activeTab === "content" && (
        <ContentTab 
          permissions={activePermissions}
          triggerToast={triggerToast}
        />
      )}

      {/* INVENTORY TAB */}
      {activeTab === "inventory" && (
        <InventoryTab 
          products={products}
          restockingId={restockingId}
          handleRestock={handleRestock}
          permissions={activePermissions}
        />
      )}

      {/* REPORTS TAB */}
      {activeTab === "reports" && (
        <ReportsTab 
          products={products}
        />
      )}

      {/* TICKETS TAB */}
      {activeTab === "tickets" && (
        <TicketsTab 
          tickets={tickets}
          handleAssignTicket={handleAssignTicket}
        />
      )}

      {/* RBAC ACCESS TAB */}
      {activeTab === "rbac" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/80 p-6 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.01)]">
          <div className="mb-6">
            <h2 className="text-base font-bold text-zinc-800 dark:text-zinc-100 uppercase tracking-wide">
              Manager Permission Scope
            </h2>
            <p className="text-[11px] text-zinc-400 dark:text-zinc-555 mt-1">
              Active permission policies configured by SuperAdmin.
            </p>
          </div>
          {permissions ? (
            <RbacMatrixView role="manager" permissions={permissions} />
          ) : (
            <div className="text-zinc-400 text-xs py-8 text-center">Loading Permissions Matrix...</div>
          )}
        </div>
      )}
    </DashboardShell>
  )
}
