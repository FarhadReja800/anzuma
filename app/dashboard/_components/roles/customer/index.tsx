"use client"

import * as React from "react"
import NextImage from "next/image"
import { 
  Power,
  LayoutDashboard,
  ShoppingCart,
  Tag,
  Truck,
  CreditCard,
  Settings,
  Headphones,
  Search,
  MessageSquare,
  Bell,
  ArrowDown,
  ArrowUp,
  CheckCircle,
  Menu,
  X,

} from "lucide-react"

import { OrdersTab } from "../../orders-tab"
import { WishlistTab } from "../../wishlist-tab"
import { AddressesTab } from "../../addresses-tab"
import { RewardsTab } from "../../rewards-tab"
import { SupportTab } from "../../support-tab"
import { SettingsTab } from "../../settings-tab"

interface CustomerViewProps {
  state: any
}

export function CustomerView({ state }: CustomerViewProps) {
  const {
    user,
    activeTab,
    setActiveTab,
    orders,
    wishlist,
    billingAddress,
    shippingAddress,
    billingForm,
    shippingForm,
    setBillingForm,
    setShippingForm,
    tickets,
    ticketSubject,
    ticketCategory,
    ticketPriority,
    ticketMessage,
    setTicketSubject,
    setTicketCategory,
    setTicketPriority,
    setTicketMessage,
    profileName,
    profileEmail,
    profilePhone,
    currentPassword,
    newPassword,
    showPasswordFields,
    toastMessage,
    copiedVoucher,
    isEditingBilling,
    isEditingShipping,
    setIsEditingBilling,
    setIsEditingShipping,
    setProfileName,
    setProfileEmail,
    setProfilePhone,
    setCurrentPassword,
    setNewPassword,
    setShowPasswordFields,
    handleLogout,
    handleCancelOrder,
    handleSaveBilling,
    handleSaveShipping,
    handleCreateTicket,
    handleSaveProfile,
    handleCopyVoucher,
    handleRemoveFromWishlist,
    handleAddToCart,
    triggerToast
  } = state

  const [sidebarOpen, setSidebarOpen] = React.useState(false)

  // Map the navigation items to tabs
  const navItems = [
    { id: "overview", label: "Dashboard", icon: LayoutDashboard },
    { id: "orders", label: "Order", icon: ShoppingCart },
    { id: "wishlist", label: "Products", icon: Tag },
    { id: "addresses", label: "Shipping", icon: Truck },
    { id: "rewards", label: "Payments", icon: CreditCard },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  // Count helper functions for live statistics
  const shippedCount = orders.filter((o: { status: string }) => o.status === "Shipped").length || 67
  const pendingCount = orders.filter((o: { status: string }) => o.status === "Processing" || o.status === "Pending").length || 9
  const newOrdersCount = orders.filter((o: { status: string }) => o.status === "New" || o.status === "Processing").length || 35

  return (
    <div className="min-h-screen bg-[#f3f4f9] dark:bg-zinc-950 flex font-sans w-full">
      {/* Main Dashboard Window Wrapper */}
      <div className="w-full bg-white dark:bg-zinc-900 overflow-hidden flex flex-col md:flex-row min-h-screen transition-all duration-300">

        
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between px-6 py-4 bg-white dark:bg-zinc-900 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#1258ff] animate-pulse"></span>
            <span className="text-sm font-bold tracking-widest text-zinc-800 dark:text-zinc-100 uppercase">
              ARZUMA
            </span>
          </div>
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-xl"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Sidebar Panel */}
        <aside className={`
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          fixed md:relative top-0 left-0 h-full md:h-auto z-40 md:z-auto
          w-[260px] bg-white dark:bg-zinc-900 border-r border-zinc-100 dark:border-zinc-800/80 
          flex flex-col py-8 px-6 transition-transform duration-300 ease-in-out shrink-0
        `}>
          {/* Close button for mobile */}
          <button 
            onClick={() => setSidebarOpen(false)}
            className="md:hidden absolute top-4 right-4 p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Top Power Button (Logout) */}
          <div className="mb-10 flex justify-start">
            <button 
              onClick={handleLogout}
              className="group p-3 bg-zinc-55 hover:bg-red-50 dark:bg-zinc-800 dark:hover:bg-red-950/30 text-zinc-800 hover:text-red-500 dark:text-zinc-200 dark:hover:text-red-400 rounded-full transition-all duration-300 shadow-sm cursor-pointer border border-zinc-200/50"
              title="Logout"
            >
              <Power className="h-6 w-6 transition-transform group-hover:rotate-12" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.id || (item.id === "overview" && activeTab === "dashboard")
              
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id === "overview" ? "overview" : item.id)
                    setSidebarOpen(false)
                  }}
                  className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-[12px] font-bold tracking-wide transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#ebf3ff] dark:bg-blue-950/40 text-[#1258ff] dark:text-blue-400"
                      : "text-zinc-400 hover:text-zinc-800 dark:text-zinc-505 dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-850/40"
                  }`}
                >
                  <Icon className={`h-5 w-5 ${isActive ? "text-[#1258ff] dark:text-blue-400" : "text-zinc-400 dark:text-zinc-500"}`} />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </nav>

          {/* Customer Support Widget */}
          <div className="mt-8 mb-6">
            <div className="p-5 bg-[#ebf3ff]/50 dark:bg-zinc-850/30 border border-[#1258ff]/10 dark:border-zinc-800 rounded-3xl">
              <h4 className="text-[12px] font-extrabold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">
                Customer Support
              </h4>
              <p className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-2 leading-relaxed font-sans font-medium">
                Ask you query , place requests or important issues. Our support team will contact 24/7 to you.
              </p>
              <button 
                onClick={() => {
                  setActiveTab("support")
                  setSidebarOpen(false)
                }}
                className="w-full mt-4 py-2.5 px-4 bg-[#1258ff] hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 text-white rounded-xl text-[10px] font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-500/10 hover:shadow-lg cursor-pointer font-sans"
              >
                <Headphones className="h-4 w-4" />
                Connect Now
              </button>
            </div>
          </div>

          {/* Sidebar Footer Links */}
          <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-col gap-1 text-[10px] text-zinc-400 dark:text-zinc-500 font-bold leading-relaxed">
            <a href="#" className="hover:text-zinc-600 dark:hover:text-zinc-350 transition-colors">Terms & Services</a>
            <a href="#" className="hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">Privacy Policy</a>
          </div>
        </aside>

        {/* Backdrop overlay for mobile sidebar */}
        {sidebarOpen && (
          <div 
            onClick={() => setSidebarOpen(false)}
            className="md:hidden fixed inset-0 bg-black/30 backdrop-blur-xs z-35"
          />
        )}

        {/* Content Pane */}
        <main className="flex-1 bg-[#fcfdff] dark:bg-zinc-950 p-6 md:p-8 flex flex-col min-w-0 transition-all duration-300">
          {/* Toast Notification */}
          {toastMessage && (
            <div className="fixed bottom-8 right-8 z-50 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs py-3.5 px-6 rounded-2xl shadow-2xl flex items-center gap-3 border border-zinc-800 dark:border-zinc-200 animate-fadeInFast">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="font-bold tracking-wide">{toastMessage}</span>
            </div>
          )}

          {/* Render Active Tab */}
          {activeTab === "overview" || activeTab === "dashboard" ? (
            /* Mockup dashboard overview screen */
            <div className="flex-1 flex flex-col gap-6 md:gap-8 animate-fadeInFast">
              
              {/* Header section */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-zinc-100 dark:border-zinc-900 pb-6">
                
                {/* Revenue stats left */}
                <div className="flex flex-col">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-zinc-400 dark:text-zinc-505">
                    Total Revenue
                  </span>
                  <div className="flex items-baseline gap-3 mt-1">
                    <span className="text-3xl font-extrabold text-zinc-850 dark:text-zinc-100 tracking-tight leading-none">
                      $ 45,365.00
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-rose-500 bg-rose-50 dark:bg-rose-950/20 px-1.5 py-0.5 rounded-sm flex items-center gap-0.5 select-none">
                        <ArrowDown className="h-3 w-3 stroke-[3]" /> $1,294
                      </span>
                      <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 px-1.5 py-0.5 rounded-sm flex items-center gap-0.5 select-none">
                        <ArrowUp className="h-3 w-3 stroke-[3]" /> $1,294
                      </span>
                    </div>
                  </div>
                </div>

                {/* Central search bar */}
                <div className="w-full lg:max-w-xs relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 dark:text-zinc-500" />
                  <input 
                    type="text" 
                    placeholder="Search" 
                    className="w-full pl-10 pr-4 py-2.5 bg-zinc-50/80 dark:bg-zinc-850 border border-zinc-200/30 dark:border-zinc-800 rounded-2xl text-[12px] font-semibold text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-hidden focus:ring-1 focus:ring-[#1258ff] transition-all"
                  />
                </div>

                {/* Notification controls and User Profile */}
                <div className="flex items-center gap-5 justify-end">
                  <button className="relative p-2.5 hover:bg-zinc-50 dark:hover:bg-zinc-850 rounded-xl transition-all cursor-pointer">
                    <MessageSquare className="h-5 w-5 text-zinc-400 hover:text-zinc-800 dark:text-zinc-550 dark:hover:text-zinc-200" />
                    <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500"></span>
                  </button>
                  <button className="relative p-2.5 hover:bg-zinc-50 dark:hover:bg-zinc-850 rounded-xl transition-all cursor-pointer">
                    <Bell className="h-5 w-5 text-zinc-400 hover:text-zinc-800 dark:text-zinc-550 dark:hover:text-zinc-200" />
                    <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#1258ff]"></span>
                  </button>
                  <div className="h-10 w-10 rounded-full border border-zinc-205/50 dark:border-zinc-800 overflow-hidden shadow-xs shrink-0 select-none">
                    <NextImage 
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" 
                      alt="User profile avatar" 
                      width={40}
                      height={40}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

              </div>

              {/* Stats card banner */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                
                {/* Shipped orders (Blue) */}
                <div className="relative bg-gradient-to-br from-[#4e95ff] to-[#1258ff] rounded-[24px] p-6 text-white shadow-lg shadow-blue-500/10 overflow-hidden group">
                  <div className="z-10 relative flex flex-col h-full justify-between">
                    <span className="text-[12px] font-bold opacity-90 tracking-wide">
                      Shipped orders
                    </span>
                    <span className="text-4xl font-extrabold mt-3 tracking-tight select-none">
                      {shippedCount}
                    </span>
                  </div>
                  {/* Subtle truck icon watermark */}
                  <Truck className="absolute -right-4 -bottom-4 h-24 w-24 opacity-15 rotate-12 transition-transform duration-300 group-hover:scale-110" />
                </div>

                {/* Pending orders (Red/Pink) */}
                <div className="relative bg-gradient-to-br from-[#ff6b8b] to-[#e63b60] rounded-[24px] p-6 text-white shadow-lg shadow-red-500/10 overflow-hidden group">
                  <div className="z-10 relative flex flex-col h-full justify-between">
                    <span className="text-[12px] font-bold opacity-90 tracking-wide">
                      Pending orders
                    </span>
                    <span className="text-4xl font-extrabold mt-3 tracking-tight select-none">
                      {String(pendingCount).padStart(2, '0')}
                    </span>
                  </div>
                  {/* Shopping cart watermark */}
                  <ShoppingCart className="absolute -right-4 -bottom-4 h-24 w-24 opacity-15 rotate-12 transition-transform duration-300 group-hover:scale-110" />
                </div>

                {/* New orders (Purple) */}
                <div className="relative bg-gradient-to-br from-[#b24bf3] to-[#822ae2] rounded-[24px] p-6 text-white shadow-lg shadow-purple-500/10 overflow-hidden group">
                  <div className="z-10 relative flex flex-col h-full justify-between">
                    <span className="text-[12px] font-bold opacity-90 tracking-wide">
                      New orders
                    </span>
                    <span className="text-4xl font-extrabold mt-3 tracking-tight select-none">
                      {newOrdersCount}
                    </span>
                  </div>
                  {/* Tag watermark */}
                  <Tag className="absolute -right-4 -bottom-4 h-24 w-24 opacity-15 rotate-12 transition-transform duration-300 group-hover:scale-110" />
                </div>

              </div>

              {/* Bottom widgets section */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Inbox and Activity Columns */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                  
                  {/* Inbox Widget */}
                  <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex flex-col justify-between">
                    <div className="flex items-start justify-between border-b border-zinc-50 dark:border-zinc-850 pb-4">
                      <div>
                        <h3 className="text-sm font-extrabold text-zinc-800 dark:text-zinc-200">
                          Inbox
                        </h3>
                        <span className="text-[10px] text-zinc-400 dark:text-zinc-505 font-bold mt-0.5 block">
                          Group: Support
                        </span>
                      </div>
                      <button 
                        onClick={() => setActiveTab("support")}
                        className="text-[10px] font-extrabold text-[#1258ff] dark:text-blue-400 hover:underline cursor-pointer"
                      >
                        View details
                      </button>
                    </div>

                    <div className="mt-4 space-y-4">
                      <div className="flex items-center justify-between text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 p-2 rounded-xl transition-all cursor-pointer">
                        <span className="truncate">Waiting for order#12345</span>
                        <span className="text-[10px] text-zinc-400 font-bold ml-2">4:39</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 p-2 rounded-xl transition-all cursor-pointer">
                        <span className="truncate">Customer support id#22234</span>
                        <span className="text-[10px] text-zinc-400 font-bold ml-2">11:07</span>
                      </div>
                    </div>
                  </div>

                  {/* Recent Activity Widget */}
                  <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
                    <div className="flex items-start justify-between border-b border-zinc-50 dark:border-zinc-850 pb-4">
                      <h3 className="text-sm font-extrabold text-zinc-800 dark:text-zinc-200">
                        Recent Activity
                      </h3>
                      <button 
                        onClick={() => setActiveTab("orders")}
                        className="text-[10px] font-extrabold text-[#1258ff] dark:text-blue-400 hover:underline cursor-pointer"
                      >
                        View all
                      </button>
                    </div>

                    <div className="mt-4 space-y-3.5">
                      
                      {/* Item 1 */}
                      <div className="flex items-center justify-between gap-4 py-1.5 border-b border-zinc-50/40 dark:border-zinc-850/20">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-4.5 w-4.5 text-[#1258ff]" />
                          <span className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">
                            Confirm order update
                          </span>
                        </div>
                        <span className="text-[9px] font-extrabold uppercase tracking-wider text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-950/25 px-2.5 py-1 rounded-md">
                          URGENT
                        </span>
                      </div>

                      {/* Item 2 */}
                      <div className="flex items-center justify-between gap-4 py-1.5 border-b border-zinc-50/40 dark:border-zinc-850/20">
                        <div className="flex items-center gap-3">
                          <span className="h-4 w-4 rounded-full bg-rose-505 block"></span>
                          <span className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">
                            Finish shipping update
                          </span>
                        </div>
                        <span className="text-[9px] font-extrabold uppercase tracking-wider text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-950/25 px-2.5 py-1 rounded-md">
                          URGENT
                        </span>
                      </div>

                      {/* Item 3 */}
                      <div className="flex items-center justify-between gap-4 py-1.5 border-b border-zinc-50/40 dark:border-zinc-850/20">
                        <div className="flex items-center gap-3">
                          <span className="h-4 w-4 rounded-full border-2 border-zinc-300 dark:border-zinc-700 block"></span>
                          <span className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">
                            Create new order
                          </span>
                        </div>
                        <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#05b38d] bg-emerald-50 dark:text-[#05b38d] dark:bg-emerald-950/25 px-2.5 py-1 rounded-md">
                          NEW
                        </span>
                      </div>

                      {/* Item 4 */}
                      <div className="flex items-center justify-between gap-4 py-1.5">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-4.5 w-4.5 text-[#1258ff]" />
                          <span className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">
                            Update payment report
                          </span>
                        </div>
                        <span className="text-[9px] font-extrabold uppercase tracking-wider text-zinc-550 bg-zinc-100 dark:text-zinc-400 dark:bg-zinc-800 px-2.5 py-1 rounded-md">
                          DEFAULT
                        </span>
                      </div>

                    </div>
                  </div>

                </div>

                {/* Today's Trends Chart Column */}
                <div className="lg:col-span-5 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-sm font-extrabold text-zinc-800 dark:text-zinc-200">
                          Today&apos;s trends
                        </h3>
                        <span className="text-[10px] text-zinc-400 dark:text-zinc-550 font-bold block mt-0.5">
                          30 Sept 2021
                        </span>
                      </div>
                      
                      {/* Chart Legend */}
                      <div className="flex items-center gap-3 text-[9px] font-bold text-zinc-405">
                        <div className="flex items-center gap-1.5">
                          <span className="h-0.75 w-3 bg-[#1258ff] rounded-full"></span>
                          <span>Today</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="h-0.75 w-3 bg-zinc-300 dark:bg-zinc-700 rounded-full"></span>
                          <span>Yesterday</span>
                        </div>
                      </div>
                    </div>

                    {/* Chart SVG */}
                    <div className="mt-8 relative h-[210px] w-full flex items-center justify-center">
                      <svg viewBox="0 0 350 210" className="w-full h-full overflow-visible">
                        {/* Horizontal guide grids */}
                        <line x1="0" y1="30" x2="350" y2="30" stroke="currentColor" className="text-zinc-100 dark:text-zinc-850" strokeWidth="1" />
                        <line x1="0" y1="70" x2="350" y2="70" stroke="currentColor" className="text-zinc-100 dark:text-zinc-850" strokeWidth="1" />
                        <line x1="0" y1="110" x2="350" y2="110" stroke="currentColor" className="text-zinc-100 dark:text-zinc-850" strokeWidth="1" />
                        <line x1="0" y1="150" x2="350" y2="150" stroke="currentColor" className="text-zinc-100 dark:text-zinc-850" strokeWidth="1" />
                        <line x1="0" y1="190" x2="350" y2="190" stroke="currentColor" className="text-zinc-100 dark:text-zinc-850" strokeWidth="1" />

                        {/* Yesterday trend line (Silver/Grey) */}
                        <path 
                          d="M 10,140 Q 60,110 90,150 T 170,120 T 260,160 T 340,110" 
                          fill="none" 
                          stroke="currentColor" 
                          className="text-zinc-200 dark:text-zinc-800" 
                          strokeWidth="2.5" 
                          strokeLinecap="round"
                        />

                        {/* Today trend line (Blue) */}
                        <path 
                          d="M 10,150 Q 60,140 90,90 T 170,180 T 260,80 T 340,130" 
                          fill="none" 
                          stroke="#1258ff" 
                          strokeWidth="3.5" 
                          strokeLinecap="round"
                        />

                        {/* Vertical line indicator at index x=260 */}
                        <line x1="255" y1="80" x2="255" y2="190" stroke="#1258ff" strokeDasharray="3 3" strokeWidth="1" />

                        {/* Interactive circle bullet marker */}
                        <circle cx="255" cy="115" r="4.5" fill="none" stroke="#1258ff" strokeWidth="2.5" />
                        <circle cx="255" cy="115" r="2" fill="#1258ff" />

                        {/* Value tooltip label block */}
                        <g transform="translate(240, 83)">
                          <rect x="0" y="0" width="30" height="20" rx="6" fill="white" stroke="#1258ff" strokeWidth="1.5" className="shadow-xs" />
                          <text x="15" y="13" textAnchor="middle" fill="#1258ff" style={{ fontSize: "9px", fontWeight: "900" }}>38</text>
                        </g>
                      </svg>
                    </div>
                  </div>

                  <div className="border-t border-zinc-50 dark:border-zinc-900 pt-4 flex justify-between items-center text-[10px] font-bold text-zinc-400 mt-4">
                    <span>Performance metrics</span>
                    <span className="text-[#1258ff] dark:text-blue-400">Live feed</span>
                  </div>
                </div>

              </div>

            </div>
          ) : (
            /* Sub tab renders */
            <div className="flex-1 flex flex-col">
              
              {/* Internal Tab Header */}
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-xl font-extrabold uppercase tracking-wider text-zinc-800 dark:text-zinc-100 font-sans border-b border-zinc-100 dark:border-zinc-800 pb-3 w-full">
                  {navItems.find(t => t.id === activeTab)?.label || "Dashboard Section"}
                </h2>
              </div>

              {/* Sub tab contents */}
              <div className="flex-1">
                {activeTab === "orders" && (
                  <OrdersTab 
                    orders={orders}
                    handleCancelOrder={handleCancelOrder}
                    triggerToast={triggerToast}
                  />
                )}

                {activeTab === "wishlist" && (
                  <WishlistTab 
                    wishlist={wishlist}
                    handleRemoveFromWishlist={handleRemoveFromWishlist}
                    handleAddToCart={handleAddToCart}
                  />
                )}

                {activeTab === "addresses" && (
                  <AddressesTab 
                    billingAddress={billingAddress}
                    shippingAddress={shippingAddress}
                    billingForm={billingForm}
                    shippingForm={shippingForm}
                    setBillingForm={setBillingForm}
                    setShippingForm={setShippingForm}
                    isEditingBilling={isEditingBilling}
                    isEditingShipping={isEditingShipping}
                    setIsEditingBilling={setIsEditingBilling}
                    setIsEditingShipping={setIsEditingShipping}
                    handleSaveBilling={handleSaveBilling}
                    handleSaveShipping={handleSaveShipping}
                  />
                )}

                {activeTab === "rewards" && (
                  <RewardsTab 
                    user={user}
                    copiedVoucher={copiedVoucher}
                    handleCopyVoucher={handleCopyVoucher}
                  />
                )}

                {activeTab === "settings" && (
                  <SettingsTab 
                    profileName={profileName}
                    profileEmail={profileEmail}
                    profilePhone={profilePhone}
                    currentPassword={currentPassword}
                    newPassword={newPassword}
                    showPasswordFields={showPasswordFields}
                    setProfileName={setProfileName}
                    setProfileEmail={setProfileEmail}
                    setProfilePhone={setProfilePhone}
                    setCurrentPassword={setCurrentPassword}
                    setNewPassword={setNewPassword}
                    setShowPasswordFields={setShowPasswordFields}
                    handleSaveProfile={handleSaveProfile}
                  />
                )}

                {activeTab === "support" && (
                  <SupportTab 
                    tickets={tickets}
                    ticketSubject={ticketSubject}
                    ticketCategory={ticketCategory}
                    ticketPriority={ticketPriority}
                    ticketMessage={ticketMessage}
                    setTicketSubject={setTicketSubject}
                    setTicketCategory={setTicketCategory}
                    setTicketPriority={setTicketPriority}
                    setTicketMessage={setTicketMessage}
                    handleCreateTicket={handleCreateTicket}
                  />
                )}
              </div>

            </div>
          )}
        </main>
      </div>

      {/* Embedded CSS styles */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInFast {
          animation: fadeInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  )
}
