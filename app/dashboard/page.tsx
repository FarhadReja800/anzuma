"use client"

import * as React from "react"
import { ShieldCheck } from "lucide-react"

import { DashboardShell } from "./_components/dashboard-shell"
import { OverviewTab } from "./_components/overview-tab"
import { OrdersTab } from "./_components/orders-tab"
import { WishlistTab } from "./_components/wishlist-tab"
import { AddressesTab } from "./_components/addresses-tab"
import { RewardsTab } from "./_components/rewards-tab"
import { SupportTab } from "./_components/support-tab"
import { SettingsTab } from "./_components/settings-tab"
import { useDashboardState } from "./_hooks/use-dashboard-state"

import { SuperAdminView } from "./_components/roles/super-admin/index"
import { AdminView } from "./_components/roles/admin/index"
import { ManagerView } from "./_components/roles/manager/index"
import { ModeratorView } from "./_components/roles/moderator/index"

const emptySubscribe = () => () => {}
const getSnapshot = () => true
const getServerSnapshot = () => false

export default function DashboardPage() {
  const state = useDashboardState()
  const mounted = React.useSyncExternalStore(
    emptySubscribe,
    getSnapshot,
    getServerSnapshot
  )

  if (!mounted) {
    return (
      <div className="flex-1 bg-[#fcfcfc] dark:bg-zinc-950 flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="text-xs font-bold uppercase tracking-widest text-zinc-400 animate-pulse">
          Loading Security Session...
        </div>
      </div>
    )
  }

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

  // If user has system role, render the specialized admin dashboards
  if (user && user.role === "superAdmin") {
    return <SuperAdminView user={user} handleLogout={handleLogout} />
  }
  if (user && user.role === "admin") {
    return <AdminView user={user} handleLogout={handleLogout} />
  }
  if (user && user.role === "manager") {
    return <ManagerView user={user} handleLogout={handleLogout} />
  }
  if (user && user.role === "moderator") {
    return <ModeratorView user={user} handleLogout={handleLogout} />
  }
  return (
    <DashboardShell
      user={user}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      handleLogout={handleLogout}
      title="Dashboard"
      badgeText={user.tier.toUpperCase()}
      ordersCount={orders.length}
      wishlistCount={wishlist.length}
      ticketsCount={tickets.length}
    >
      {/* Toast Alert */}
      {toastMessage && (
        <div 
          className="fixed bottom-6 right-6 z-50 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-xs py-3.5 px-5 shadow-2xl flex items-center gap-2 border border-zinc-800 dark:border-zinc-200 rounded-lg animate-fadeInFast"
        >
          <ShieldCheck className="h-4 w-4 text-emerald-505" />
          <span className="font-semibold tracking-wide">{toastMessage}</span>
        </div>
      )}

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
    </DashboardShell>
  )
}
