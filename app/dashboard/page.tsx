"use client"

import * as React from "react"
import { ShieldCheck, Menu } from "lucide-react"

import { Sidebar } from "./_components/sidebar"
import { OverviewTab } from "./_components/overview-tab"
import { OrdersTab } from "./_components/orders-tab"
import { WishlistTab } from "./_components/wishlist-tab"
import { AddressesTab } from "./_components/addresses-tab"
import { RewardsTab } from "./_components/rewards-tab"
import { SupportTab } from "./_components/support-tab"
import { SettingsTab } from "./_components/settings-tab"
import { useDashboardState } from "./_hooks/use-dashboard-state"

export default function DashboardPage() {
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
    sidebarOpen,
    setSidebarOpen,
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
  } = useDashboardState()

  return (
    <div className="flex-1 bg-[#fcfcfc] dark:bg-zinc-950 font-sans min-h-[calc(100vh-80px)] text-zinc-900 dark:text-zinc-100 flex relative overflow-hidden">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div 
          className="fixed bottom-6 right-6 z-50 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-xs py-3.5 px-5 shadow-2xl flex items-center gap-2 border border-zinc-800 dark:border-zinc-200"
          style={{ animation: "fadeInUp 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}
        >
          <ShieldCheck className="h-4 w-4 text-[#df4a4a]" />
          <span className="font-semibold tracking-wide">{toastMessage}</span>
        </div>
      )}

      {/* 1. SIDEBAR (Desktop & Mobile Drawer) */}
      <Sidebar 
        user={user}
        ordersCount={orders.length}
        wishlistCount={wishlist.length}
        ticketsCount={tickets.length}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        handleLogout={handleLogout}
      />

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col p-4 sm:p-6 md:p-8 lg:p-10 w-full overflow-x-hidden">
        
        {/* Mobile Header Bar */}
        <div className="flex md:hidden items-center justify-between border-b pb-4 mb-6">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-805 dark:text-zinc-200 cursor-pointer"
          >
            <Menu className="h-5 w-5 text-[#df4a4a]" />
            Menu
          </button>
          <span className="text-[10px] font-bold uppercase bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1 text-zinc-650 dark:text-zinc-300 tracking-wider">
            VIP {user.tier}
          </span>
        </div>

        {/* TAB CONTENTS */}
        {activeTab === "overview" && (
          <OverviewTab 
            user={user}
            orders={orders}
            wishlistCount={wishlist.length}
            ticketsCount={tickets.length}
          />
        )}

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

      </main>

      {/* Embedded Animations and Keyframe Styles */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideRight {
          from { transform: translateX(-100%); }
          to   { transform: translateX(0); }
        }
        @keyframes slideDown {
          from { height: 0; opacity: 0; overflow: hidden; }
          to   { height: auto; opacity: 1; }
        }
        .animate-fadeInFast {
          animation: fadeInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-slideRight {
          animation: slideRight 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-slideDown {
          animation: slideDown 0.25s ease-out forwards;
        }
      `}</style>
    </div>
  )
}
