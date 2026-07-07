"use client"

import * as React from "react"
import Link from "next/link"
import { 
  ShoppingBag, 
  MapPin, 
  CreditCard, 
  CheckCircle2
} from "lucide-react"

import { ConfirmStep } from "@/components/checkout/confirm-step"
import { LocationStep } from "@/components/checkout/location-step"
import { PaymentStep } from "@/components/checkout/payment-step"
import { SuccessStep } from "@/components/checkout/success-step"
import { PriceSummary } from "@/components/checkout/price-summary"
import { CartItem } from "@/lib/data"

export default function CheckoutPage() {
  const [cartItems, setCartItems] = React.useState<CartItem[]>([])
  
  // Derive cart total directly from cart items to avoid redundant state updates
  const cartTotal = React.useMemo(() => {
    return cartItems.reduce((sum: number, item: CartItem) => sum + (item.price * item.qty), 0)
  }, [cartItems])
  
  // Checkout Multi-step State
  const [step, setStep] = React.useState<1 | 2 | 3 | 4>(1)
  
  // Shipping Form State
  const [shippingInfo, setShippingInfo] = React.useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  })
  
  // Payment Form State
  const [paymentMethod, setPaymentMethod] = React.useState<"cod" | "card" | "mobile">("cod")
  const [cardDetails, setCardDetails] = React.useState({
    number: "",
    expiry: "",
    cvc: "",
  })
  const [mobileNumber, setMobileNumber] = React.useState("")
  
  // Success Order State
  const [orderId, setOrderId] = React.useState("")

  // Sync Cart items on mount
  React.useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    React.startTransition(() => {
      setCartItems(cart)
    })
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setShippingInfo(prev => ({ ...prev, [name]: value }))
  }

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCardDetails(prev => ({ ...prev, [name]: value }))
  }

  const handleConfirmOrder = () => {
    if (cartItems.length === 0) return
    setStep(2)
  }

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(3)
  }

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Generate order ID
    const newOrderId = `ORD-${Math.floor(10000 + Math.random() * 90000)}`
    setOrderId(newOrderId)
    
    // Format product string
    const productStr = cartItems.map(item => `${item.name} (${item.size}, ${item.color}) x${item.qty}`).join(", ")
    
    // Save to tracked orders in localStorage (for tracking page)
    const customOrders = JSON.parse(localStorage.getItem("custom_orders") || "{}")
    customOrders[newOrderId] = {
      email: shippingInfo.email,
      product: productStr,
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      status: 0 // Status: Placed
    }
    localStorage.setItem("custom_orders", JSON.stringify(customOrders))

    // Save to dashboard orders in localStorage (for user dashboard)
    const initialOrders = [
      {
        id: "ORD-12345",
        date: "June 30, 2026",
        product: "Basic High-Neck Puff Jacket (Black, M)",
        price: 69.00,
        status: "Shipped" as const,
        trackingId: "TRK-987654321",
        imageIndex: 0
      },
      {
        id: "ORD-67890",
        date: "July 2, 2026",
        product: "Tailored Wide-Leg Trousers (Beige, L)",
        price: 24.90,
        status: "Processing" as const,
        trackingId: "TRK-123456789",
        imageIndex: 2
      },
      {
        id: "ORD-11111",
        date: "July 5, 2026",
        product: "Classic Leather Crossbody Bag",
        price: 49.99,
        status: "Delivered" as const,
        trackingId: "TRK-456789123",
        imageIndex: 4
      }
    ]
    const storedOrders = localStorage.getItem("arzuma_orders")
    const currentOrders = storedOrders ? JSON.parse(storedOrders) : initialOrders
    
    const newDashboardOrder = {
      id: newOrderId,
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      product: productStr,
      price: cartTotal,
      status: "Processing" as const,
      trackingId: `TRK-${Math.floor(100000000 + Math.random() * 900000000)}`,
      imageIndex: Math.floor(Math.random() * 6)
    }
    
    currentOrders.unshift(newDashboardOrder)
    localStorage.setItem("arzuma_orders", JSON.stringify(currentOrders))
    
    // Clear Cart
    localStorage.removeItem("cart")
    window.dispatchEvent(new Event("cart-updated"))
    
    setStep(4)
  }

  // If cart is empty and not on success step
  if (cartItems.length === 0 && step !== 4) {
    return (
      <div className="flex-1 bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center py-20 px-4 font-sans text-center">
        <div className="h-16 w-16 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center text-zinc-400 mb-6">
          <ShoppingBag className="h-8 w-8" />
        </div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Your Shopping Bag is Empty</h1>
        <p className="text-zinc-500 dark:text-zinc-400 mb-8 max-w-sm">Please add some items to your bag before checking out.</p>
        <Link href="/shop" className="px-6 py-2.5 bg-zinc-950 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200 text-xs font-bold uppercase tracking-wider rounded-md transition duration-300">
          Go To Shop
        </Link>
      </div>
    )
  }

  return (
    <div className="flex-1 bg-[#fcfcfc] dark:bg-zinc-955 font-sans min-h-[calc(100vh-112px)] pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16">
        
        {/* Step Progress Indicator Bar */}
        <div className="flex items-center justify-center max-w-xl mx-auto mb-12 sm:mb-16">
          {[
            { stepNum: 1, label: "Confirm", icon: ShoppingBag },
            { stepNum: 2, label: "Location", icon: MapPin },
            { stepNum: 3, label: "Payment", icon: CreditCard },
            { stepNum: 4, label: "Success", icon: CheckCircle2 }
          ].map((item, idx) => {
            const Icon = item.icon
            const isCompleted = step > item.stepNum
            const isActive = step === item.stepNum
            
            return (
              <React.Fragment key={item.stepNum}>
                {idx > 0 && (
                  <div className={`flex-1 h-0.5 mx-2 sm:mx-4 transition-colors duration-300 ${
                    isCompleted ? "bg-[#df4a4a]" : "bg-zinc-200 dark:bg-zinc-800"
                  }`} />
                )}
                <div className="flex flex-col items-center">
                  <div className={`h-8 w-8 sm:h-10 sm:w-10 rounded-full flex items-center justify-center border transition-all duration-300 ${
                    isCompleted 
                      ? "bg-[#df4a4a] border-[#df4a4a] text-white" 
                      : isActive 
                      ? "border-[#df4a4a] text-[#df4a4a] bg-[#df4a4a]/5 dark:bg-[#df4a4a]/10" 
                      : "border-zinc-200 dark:border-zinc-800 text-zinc-400"
                  }`}>
                    <Icon className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
                  </div>
                  <span className={`text-[10px] sm:text-xs font-semibold tracking-wider uppercase mt-2.5 ${
                    isActive ? "text-[#df4a4a]" : "text-zinc-400 dark:text-zinc-550"
                  }`}>
                    {item.label}
                  </span>
                </div>
              </React.Fragment>
            )
          })}
        </div>

        {/* Main Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Flow Panels */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* STEP 1: CART CONFIRMATION */}
            {step === 1 && (
              <ConfirmStep 
                cartItems={cartItems} 
                onConfirm={handleConfirmOrder} 
              />
            )}

            {/* STEP 2: SHIPPING LOCATION DETAILS (CONDITIONAL) */}
            {step === 2 && (
              <LocationStep 
                shippingInfo={shippingInfo} 
                onInputChange={handleInputChange} 
                onSubmit={handleShippingSubmit} 
                onBack={() => setStep(1)} 
              />
            )}

            {/* STEP 3: PAYMENT METHOD (CONDITIONAL) */}
            {step === 3 && (
              <PaymentStep 
                paymentMethod={paymentMethod} 
                setPaymentMethod={setPaymentMethod} 
                cardDetails={cardDetails} 
                onCardChange={handleCardChange} 
                mobileNumber={mobileNumber} 
                setMobileNumber={setMobileNumber} 
                onSubmit={handlePaymentSubmit} 
                onBack={() => setStep(2)} 
              />
            )}

            {/* STEP 4: SUCCESS CONFIRMATION SCREEN */}
            {step === 4 && (
              <SuccessStep 
                orderId={orderId} 
                email={shippingInfo.email} 
                address={shippingInfo.address} 
                city={shippingInfo.city} 
                paymentMethod={paymentMethod} 
              />
            )}

          </div>

          {/* Right Column: Order Pricing Summary (Only shown for Steps 1, 2, and 3) */}
          {step !== 4 && (
            <div className="lg:col-span-5">
              <PriceSummary cartTotal={cartTotal} />
            </div>
          )}

        </div>

      </div>
    </div>
  )
}
