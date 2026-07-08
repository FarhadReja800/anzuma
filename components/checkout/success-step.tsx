import * as React from "react"
import Link from "next/link"
import { CheckCircle2, FileText } from "lucide-react"
import { CartItem } from "@/lib/data"

interface SuccessStepProps {
  orderId: string
  email: string
  address: string
  city: string
  paymentMethod: "cod" | "card" | "mobile"
  shippingInfo: {
    name: string
    email: string
    phone: string
    address: string
    city: string
    postalCode: string
  }
  cartItems: CartItem[]
  cartTotal: number
}

export function SuccessStep({
  orderId,
  email,
  address,
  city,
  paymentMethod,
  shippingInfo,
  cartItems,
  cartTotal,
}: SuccessStepProps) {
  
  const handleDownloadInvoice = () => {
    const invoiceHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Invoice - ${orderId}</title>
        <link href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500;700;800;900&display=swap" rel="stylesheet">
        <style>
          body {
            font-family: 'Jost', sans-serif;
            color: #18181b;
            margin: 0;
            padding: 40px;
            line-height: 1.5;
            background: white;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .invoice-card {
            max-width: 800px;
            margin: 0 auto;
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 2px solid #f4f4f5;
            padding-bottom: 24px;
            margin-bottom: 30px;
          }
          .logo {
            font-size: 26px;
            font-weight: 900;
            letter-spacing: -0.05em;
            text-transform: uppercase;
          }
          .logo-symbol {
            font-size: 11px;
            vertical-align: super;
            color: #71717a;
            font-weight: bold;
          }
          .invoice-title {
            text-align: right;
          }
          .invoice-title h1 {
            margin: 0;
            font-size: 22px;
            font-weight: 800;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            color: #df4a4a;
          }
          .invoice-title p {
            margin: 4px 0 0 0;
            color: #71717a;
            font-size: 12px;
          }
          .details {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            margin-bottom: 40px;
          }
          .details-box h3 {
            margin-top: 0;
            margin-bottom: 8px;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: #a1a1aa;
          }
          .details-box p {
            margin: 4px 0;
            font-size: 13px;
            font-weight: 500;
            color: #27272a;
          }
          .table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
          }
          .table th {
            text-align: left;
            padding: 10px 12px;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: #71717a;
            border-bottom: 2px solid #e4e4e7;
          }
          .table td {
            padding: 14px 12px;
            font-size: 13px;
            border-bottom: 1px solid #f4f4f5;
          }
          .table td.num {
            text-align: right;
          }
          .table th.num {
            text-align: right;
          }
          .item-name {
            font-weight: 700;
            color: #18181b;
          }
          .item-meta {
            font-size: 11px;
            color: #71717a;
            margin-top: 4px;
          }
          .totals-container {
            display: flex;
            justify-content: flex-end;
          }
          .totals-table {
            width: 280px;
          }
          .totals-table td {
            padding: 6px 12px;
            font-size: 13px;
          }
          .totals-table tr.grand-total td {
            font-size: 16px;
            font-weight: 800;
            border-top: 2px solid #18181b;
            padding-top: 12px;
            color: #df4a4a;
          }
          .footer {
            text-align: center;
            margin-top: 60px;
            font-size: 11px;
            color: #a1a1aa;
            border-top: 1px solid #f4f4f5;
            padding-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="invoice-card">
          <div class="header">
            <div class="logo">Arzuma<span class="logo-symbol">®</span></div>
            <div class="invoice-title">
              <h1>Invoice</h1>
              <p>Order ID: ${orderId}</p>
              <p>Date: ${new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
            </div>
          </div>
          
          <div class="details">
            <div class="details-box">
              <h3>Billed To:</h3>
              <p><strong>${shippingInfo.name}</strong></p>
              <p>${shippingInfo.email}</p>
              <p>${shippingInfo.phone}</p>
              <p>${shippingInfo.address}</p>
              <p>${shippingInfo.city}, ${shippingInfo.postalCode}</p>
            </div>
            <div class="details-box" style="text-align: right;">
              <h3>Payment Status:</h3>
              <p>Method: <strong style="text-transform: capitalize;">${paymentMethod === "cod" ? "Cash on Delivery" : paymentMethod === "card" ? "Credit Card" : "Mobile Banking"}</strong></p>
              <p>Status: <strong>Paid Successfully</strong></p>
            </div>
          </div>
          
          <table class="table">
            <thead>
              <tr>
                <th>Item Description</th>
                <th class="num">Price</th>
                <th class="num">Qty</th>
                <th class="num">Total</th>
              </tr>
            </thead>
            <tbody>
              ${cartItems.map(item => `
                <tr>
                  <td>
                    <div class="item-name">${item.name}</div>
                    <div class="item-meta">Size: ${item.size} | Color: ${item.color}</div>
                  </td>
                  <td class="num">$${item.price.toFixed(2)}</td>
                  <td class="num">${item.qty}</td>
                  <td class="num">$${(item.qty * item.price).toFixed(2)}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
          
          <div class="totals-container">
            <table class="totals-table">
              <tr>
                <td>Subtotal:</td>
                <td style="text-align: right;">$${cartTotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Shipping:</td>
                <td style="text-align: right; color: #10b981; font-weight: bold;">FREE</td>
              </tr>
              <tr class="grand-total">
                <td>Grand Total:</td>
                <td style="text-align: right;">$${cartTotal.toFixed(2)}</td>
              </tr>
            </table>
          </div>
          
          <div class="footer">
            <p>Thank you for shopping with Arzuma! If you have any questions, please contact support@arzuma.com.</p>
          </div>
        </div>
      </body>
      </html>
    `

    const printWindow = window.open("", "_blank")
    if (printWindow) {
      printWindow.document.write(invoiceHtml)
      printWindow.document.close()
      printWindow.focus()
      setTimeout(() => {
        printWindow.print()
        printWindow.close()
      }, 500)
    }
  }

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/80 p-8 sm:p-10 shadow-[0_1px_6px_rgba(0,0,0,0.02)] rounded-2xl text-center space-y-6 animate-scaleIn">
      <div className="h-16 w-16 bg-emerald-50 dark:bg-emerald-955/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
        <CheckCircle2 className="h-10 w-10" />
      </div>
      
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-zinc-955 dark:text-white tracking-tight">Order Placed Successfully!</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">Thank you for your purchase. We are now preparing your order.</p>
      </div>

      <div className="bg-zinc-50 dark:bg-zinc-950 p-4.5 rounded-2xl inline-block max-w-sm mx-auto w-full text-left space-y-3.5 border border-zinc-100 dark:border-zinc-900">
        <div className="flex justify-between text-xs">
          <span className="text-zinc-500">Order ID:</span>
          <span className="font-mono font-bold text-zinc-955 dark:text-white uppercase">{orderId}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-zinc-500">Billing Email:</span>
          <span className="font-semibold text-zinc-955 dark:text-white">{email}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-zinc-500">Delivery Address:</span>
          <span className="font-semibold text-zinc-955 dark:text-white max-w-48 text-right truncate">{address}, {city}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-zinc-500">Payment:</span>
          <span className="font-semibold text-zinc-955 dark:text-white capitalize">{paymentMethod === "cod" ? "Cash on Delivery" : paymentMethod === "card" ? "Credit Card" : "Mobile Banking"}</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-lg mx-auto pt-4">
        <button 
          onClick={handleDownloadInvoice} 
          className="flex-grow py-3 px-2 text-center bg-zinc-950 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200 text-[10px] sm:text-xs font-medium uppercase tracking-wider rounded-xl transition duration-300 flex items-center justify-center gap-1 cursor-pointer outline-none"
        >
          <FileText className="h-4.5 w-4.5" /> Download Invoice
        </button>
        <Link 
          href={`/order-tracking?orderId=${orderId}&email=${email}`} 
          className="flex-grow py-3 px-2 text-center bg-[#df4a4a] text-white hover:bg-[#c73e3e] text-[10px] sm:text-xs font-medium uppercase tracking-wider rounded-xl transition duration-300 flex items-center justify-center gap-2"
        >
          Track Shipment
        </Link>
        <Link 
          href="/dashboard" 
          className="flex-grow py-3 px-2 text-center border border-zinc-200 hover:border-zinc-900 dark:border-zinc-800 dark:hover:border-zinc-200 text-zinc-955 dark:text-white text-[10px] sm:text-xs font-medium uppercase tracking-wider rounded-xl transition duration-300 flex items-center justify-center"
        >
          Dashboard
        </Link>
      </div>
    </div>
  )
}
export default SuccessStep
