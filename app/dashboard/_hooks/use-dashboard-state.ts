import * as React from "react"
import { useRouter } from "next/navigation"
import { products, Product, CartItem } from "@/lib/data"
import { DashboardUser, Address, Order, SupportTicket } from "../_components/types"

export const DEFAULT_USER: DashboardUser = {
  name: "Farhad Reja",
  email: "demo@arzuma.com",
  phone: "+880 1712-345678",
  tier: "Gold",
  points: 1250
}

export const INITIAL_ORDERS: Order[] = [
  {
    id: "ORD-12345",
    date: "June 30, 2026",
    product: "Basic High-Neck Puff Jacket (Black, M)",
    price: 69.00,
    status: "Shipped",
    trackingId: "TRK-987654321",
    imageIndex: 0
  },
  {
    id: "ORD-67890",
    date: "July 2, 2026",
    product: "Tailored Wide-Leg Trousers (Beige, L)",
    price: 24.90,
    status: "Processing",
    trackingId: "TRK-123456789",
    imageIndex: 2
  },
  {
    id: "ORD-11111",
    date: "July 5, 2026",
    product: "Classic Leather Crossbody Bag",
    price: 49.99,
    status: "Delivered",
    trackingId: "TRK-456789123",
    imageIndex: 4
  }
]

export function useDashboardState() {
  const router = useRouter()

  // State Management
  const [user, setUser] = React.useState<DashboardUser>(DEFAULT_USER)
  const [activeTab, setActiveTab] = React.useState<string>("overview")
  const [orders, setOrders] = React.useState<Order[]>([])
  const [wishlist, setWishlist] = React.useState<Product[]>([])
  const [cartItems, setCartItems] = React.useState<CartItem[]>([])
  
  // Addresses State
  const [billingAddress, setBillingAddress] = React.useState<Address>({
    name: "Farhad Reja",
    street: "12/A Dhanmondi R/A",
    city: "Dhaka",
    state: "Dhaka Division",
    zip: "1209",
    country: "Bangladesh",
    phone: "+880 1712-345678"
  })
  
  const [shippingAddress, setShippingAddress] = React.useState<Address>({
    name: "Farhad Reja",
    street: "House 45, Road 11, Banani",
    city: "Dhaka",
    state: "Dhaka Division",
    zip: "1213",
    country: "Bangladesh",
    phone: "+880 1712-345678"
  })

  // Support Tickets State
  const [tickets, setTickets] = React.useState<SupportTicket[]>([
    {
      id: "TCK-872",
      subject: "Exchange size for Puff Jacket",
      category: "Return Request",
      priority: "Medium",
      status: "Answered",
      date: "July 1, 2026",
      messages: [
        { sender: "user", text: "I received the jacket but M is a bit too small for me. Can I exchange it for L?", time: "10:15 AM" },
        { sender: "agent", text: "Hi Farhad, yes! We can arrange a size swap. I have initiated the exchange request. Our courier partner will pick up the size M item within 48 hours and deliver the size L size at the same time.", time: "11:30 AM" }
      ]
    }
  ])

  // UI Edit Modal states
  const [isEditingBilling, setIsEditingBilling] = React.useState(false)
  const [isEditingShipping, setIsEditingShipping] = React.useState(false)
  const [billingForm, setBillingForm] = React.useState<Address>({ ...billingAddress })
  const [shippingForm, setShippingForm] = React.useState<Address>({ ...shippingAddress })

  // Support ticket form state
  const [ticketSubject, setTicketSubject] = React.useState("")
  const [ticketCategory, setTicketCategory] = React.useState("Order Issue")
  const [ticketPriority, setTicketPriority] = React.useState<"Low" | "Medium" | "High" | "Urgent">("Medium")
  const [ticketMessage, setTicketMessage] = React.useState("")

  // Profile Settings form states
  const [profileName, setProfileName] = React.useState("")
  const [profileEmail, setProfileEmail] = React.useState("")
  const [profilePhone, setProfilePhone] = React.useState("")
  const [currentPassword, setCurrentPassword] = React.useState("")
  const [newPassword, setNewPassword] = React.useState("")
  const [showPasswordFields, setShowPasswordFields] = React.useState(false)
  const [toastMessage, setToastMessage] = React.useState<string | null>(null)

  // Voucher state
  const [copiedVoucher, setCopiedVoucher] = React.useState<string | null>(null)

  // Mobile navigation overlay toggle
  const [sidebarOpen, setSidebarOpen] = React.useState(false)

  // Synchronization with localStorage on mount
  React.useEffect(() => {
    const initializeData = () => {
      // 1. Check Auth Session
      const savedUser = localStorage.getItem("arzuma_user")
      if (savedUser) {
        try {
          const parsed = JSON.parse(savedUser)
          setUser({
            name: parsed.name || DEFAULT_USER.name,
            email: parsed.email || DEFAULT_USER.email,
            phone: parsed.phone || DEFAULT_USER.phone || "",
            tier: parsed.tier || DEFAULT_USER.tier,
            points: parsed.points || DEFAULT_USER.points
          })
          setProfileName(parsed.name || DEFAULT_USER.name)
          setProfileEmail(parsed.email || DEFAULT_USER.email)
          setProfilePhone(parsed.phone || DEFAULT_USER.phone || "")
        } catch (e) {
          setProfileName(DEFAULT_USER.name)
          setProfileEmail(DEFAULT_USER.email)
          setProfilePhone(DEFAULT_USER.phone || "")
        }
      } else {
        localStorage.setItem("arzuma_user", JSON.stringify(DEFAULT_USER))
        setProfileName(DEFAULT_USER.name)
        setProfileEmail(DEFAULT_USER.email)
        setProfilePhone(DEFAULT_USER.phone || "")
      }

      // 2. Load Wishlist
      const storedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
      const items = products.filter((p) => storedWishlist.includes(p.id))
      setWishlist(items)

      // 3. Load Cart
      const storedCart = JSON.parse(localStorage.getItem("cart") || "[]")
      setCartItems(storedCart)

      // 4. Load Orders
      const storedOrders = localStorage.getItem("arzuma_orders")
      if (storedOrders) {
        setOrders(JSON.parse(storedOrders))
      } else {
        localStorage.setItem("arzuma_orders", JSON.stringify(INITIAL_ORDERS))
        setOrders(INITIAL_ORDERS)
      }

      // 5. Load Addresses
      const storedBilling = localStorage.getItem("arzuma_billing_address")
      if (storedBilling) {
        const parsed = JSON.parse(storedBilling)
        setBillingAddress(parsed)
        setBillingForm(parsed)
      }
      const storedShipping = localStorage.getItem("arzuma_shipping_address")
      if (storedShipping) {
        const parsed = JSON.parse(storedShipping)
        setShippingAddress(parsed)
        setShippingForm(parsed)
      }

      // 6. Load Tickets
      const storedTickets = localStorage.getItem("arzuma_tickets")
      if (storedTickets) {
        setTickets(JSON.parse(storedTickets))
      }
    }

    // Schedule updates after the mount render phase finishes to avoid cascading render warning
    const timer = setTimeout(initializeData, 0)

    const syncWishlist = () => {
      const storedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
      const items = products.filter((p) => storedWishlist.includes(p.id))
      setWishlist(items)
    }

    const syncCart = () => {
      const storedCart = JSON.parse(localStorage.getItem("cart") || "[]")
      setCartItems(storedCart)
    }

    window.addEventListener("wishlist-updated", syncWishlist)
    window.addEventListener("cart-updated", syncCart)
    window.addEventListener("storage", () => {
      syncWishlist()
      syncCart()
    })

    return () => {
      clearTimeout(timer)
      window.removeEventListener("wishlist-updated", syncWishlist)
      window.removeEventListener("cart-updated", syncCart)
    }
  }, [])

  // Show visual toast notification
  const triggerToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage(null)
    }, 3000)
  }

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("arzuma_user")
    triggerToast("Logged out successfully!")
    setTimeout(() => {
      router.push("/auth?mode=login")
      window.dispatchEvent(new Event("storage"))
    }, 800)
  }

  // Order Cancellation Logic
  const handleCancelOrder = (orderId: string) => {
    const updated = orders.map(o => {
      if (o.id === orderId && o.status === "Processing") {
        return { ...o, status: "Cancelled" as const }
      }
      return o
    })
    setOrders(updated)
    localStorage.setItem("arzuma_orders", JSON.stringify(updated))
    triggerToast(`Order ${orderId} has been successfully cancelled.`)
  }

  // Save Address Operations
  const handleSaveBilling = (e: React.FormEvent) => {
    e.preventDefault()
    setBillingAddress(billingForm)
    localStorage.setItem("arzuma_billing_address", JSON.stringify(billingForm))
    setIsEditingBilling(false)
    triggerToast("Billing address updated successfully!")
  }

  const handleSaveShipping = (e: React.FormEvent) => {
    e.preventDefault()
    setShippingAddress(shippingForm)
    localStorage.setItem("arzuma_shipping_address", JSON.stringify(shippingForm))
    setIsEditingShipping(false)
    triggerToast("Shipping address updated successfully!")
  }

  // Support desk ticket responder simulation
  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault()
    if (!ticketSubject.trim() || !ticketMessage.trim()) return

    const newTicketId = `TCK-${Math.floor(100 + Math.random() * 900)}`
    const newTicket: SupportTicket = {
      id: newTicketId,
      subject: ticketSubject,
      category: ticketCategory,
      priority: ticketPriority,
      status: "Open",
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      messages: [
        { sender: "user", text: ticketMessage, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]
    }

    const updatedTickets = [newTicket, ...tickets]
    setTickets(updatedTickets)
    localStorage.setItem("arzuma_tickets", JSON.stringify(updatedTickets))
    
    setTicketSubject("")
    setTicketMessage("")
    triggerToast("Support ticket created successfully!")

    setTimeout(() => {
      setTickets(prevTickets => {
        const found = prevTickets.find(t => t.id === newTicketId)
        if (!found) return prevTickets

        const simulatedMessage = {
          sender: "agent" as const,
          text: `Hi ${user.name},\n\nThank you for reaching out to the Arzuma VIP Concierge. We have received your query regarding "${ticketSubject}". An agent has prioritized this as ${ticketPriority} Priority.\n\nOur team is currently reviewing your account details, and we will get back to you shortly. Feel free to reply directly to this thread if you have additional screenshots or info.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }

        const updated = prevTickets.map(t => {
          if (t.id === newTicketId) {
            return {
              ...t,
              status: "Answered" as const,
              messages: [...t.messages, simulatedMessage]
            }
          }
          return t
        })
        localStorage.setItem("arzuma_tickets", JSON.stringify(updated))
        triggerToast("You received a reply from your Support Agent!")
        return updated
      })
    }, 3500)
  }

  // Profile operations
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    const updatedUser = {
      ...user,
      name: profileName,
      email: profileEmail,
      phone: profilePhone
    }
    setUser(updatedUser)
    localStorage.setItem("arzuma_user", JSON.stringify(updatedUser))

    if (showPasswordFields && newPassword) {
      triggerToast("Profile and password updated successfully!")
      setCurrentPassword("")
      setNewPassword("")
      setShowPasswordFields(false)
    } else {
      triggerToast("Profile settings saved successfully!")
    }
    window.dispatchEvent(new Event("storage"))
  }

  // Claim voucher
  const handleCopyVoucher = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedVoucher(code)
    triggerToast(`Promo Code ${code} copied to clipboard!`)
    setTimeout(() => {
      setCopiedVoucher(null)
    }, 2000)
  }

  // Wishlist actions
  const handleRemoveFromWishlist = (productId: number) => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
    const updated = storedWishlist.filter((id: number) => id !== productId)
    localStorage.setItem("wishlist", JSON.stringify(updated))
    window.dispatchEvent(new Event("wishlist-updated"))
    triggerToast("Item removed from your wishlist.")
  }

  const handleAddToCart = (product: Product) => {
    const storedCart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]")
    const existingIndex = storedCart.findIndex((item) => item.id === product.id)
    
    if (existingIndex > -1) {
      storedCart[existingIndex].qty += 1
    } else {
      storedCart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        qty: 1,
        color: "Standard",
        size: "M"
      })
    }

    localStorage.setItem("cart", JSON.stringify(storedCart))
    window.dispatchEvent(new Event("cart-updated"))
    triggerToast(`Added "${product.name}" to your shopping bag!`)
  }

  return {
    user,
    activeTab,
    setActiveTab,
    orders,
    wishlist,
    cartItems,
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
  }
}
