"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ShieldCheck } from "lucide-react"

import { DashboardShell } from "./dashboard-shell"
import { OverviewTab } from "./overview-tab"
import { OrdersTab } from "./orders-tab"
import { WishlistTab } from "./wishlist-tab"
import { AddressesTab } from "./addresses-tab"
import { RewardsTab } from "./rewards-tab"
import { SupportTab } from "./support-tab"
import { SettingsTab } from "./settings-tab"
import { AdminView } from "./roles/admin/index"
import { ManagerView } from "./roles/manager/index"
import { ModeratorView } from "./roles/moderator/index"
import { useDashboardState } from "../_hooks/use-dashboard-state"
import { DashboardUser } from "./types"

const emptySubscribe = () => () => {}
const getSnapshot = () => true
const getServerSnapshot = () => false

interface DashboardPageProps {
  roleOverride?: DashboardUser["role"]
}

export function DashboardPage({ roleOverride }: DashboardPageProps) {
  const state = useDashboardState()
  const router = useRouter()
  const mounted = React.useSyncExternalStore(
    emptySubscribe,
    getSnapshot,
    getServerSnapshot
  )

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

  const currentUser: DashboardUser = {
    ...user,
    role: roleOverride || user.role
  }

  React.useEffect(() => {
    if (mounted && currentUser && currentUser.role === "superAdmin") {
      router.push("/super-admin")
    }
  }, [currentUser, router, mounted])

  if (!mounted) {
    return (
      <div className="flex-1 bg-[#fcfcfc] dark:bg-zinc-950 flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="text-xs font-bold uppercase tracking-widest text-zinc-400 animate-pulse">
          Loading Security Session...
        </div>
      </div>
    )
  }

  if (currentUser && currentUser.role === "superAdmin") {
    return (
      <div className="flex-1 bg-white dark:bg-zinc-950 flex flex-col items-center justify-center min-h-screen p-8 text-center">
        <h2 className="text-xl font-bold tracking-tight text-zinc-800 dark:text-zinc-200">
          Redirecting to Root Control Center...
        </h2>
        <p className="text-xs text-zinc-400 dark:text-zinc-505 mt-2">
          Please wait while we route you to the isolated administration terminal.
        </p>
      </div>
    )
  }
  if (currentUser && currentUser.role === "admin") {
    return <AdminView user={currentUser} handleLogout={handleLogout} />
  }
  if (currentUser && currentUser.role === "manager") {
    return <ManagerView user={currentUser} handleLogout={handleLogout} />
  }
  if (currentUser && currentUser.role === "moderator") {
    return <ModeratorView user={currentUser} handleLogout={handleLogout} />
  }


  return (
    <DashboardShell
      user={currentUser}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      handleLogout={handleLogout}
      title="Dashboard"
      badgeText={currentUser.tier.toUpperCase()}
      ordersCount={orders.length}
      wishlistCount={wishlist.length}
      ticketsCount={tickets.length}
    >
      {toastMessage && (
        <div 
          className="fixed bottom-6 right-6 z-50 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-xs py-3.5 px-5 shadow-2xl flex items-center gap-2 border border-zinc-800 dark:border-zinc-200 rounded-lg animate-fadeInFast"
        >
          <ShieldCheck className="h-4 w-4 text-emerald-505" />
          <span className="font-semibold tracking-wide">{toastMessage}</span>
        </div>
      )}

      {activeTab === "overview" && (
        <OverviewTab 
          user={currentUser}
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
          user={currentUser}
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
