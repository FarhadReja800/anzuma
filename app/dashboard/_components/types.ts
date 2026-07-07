import { Product } from "@/lib/data"

export interface DashboardUser {
  name: string
  email: string
  phone?: string
  tier: "Bronze" | "Silver" | "Gold" | "Platinum"
  points: number
}

export interface Address {
  name: string
  street: string
  city: string
  state: string
  zip: string
  country: string
  phone: string
}

export interface Order {
  id: string
  date: string
  product: string
  price: number
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled"
  trackingId?: string
  imageIndex: number
}

export interface SupportTicket {
  id: string
  subject: string
  category: string
  priority: "Low" | "Medium" | "High" | "Urgent"
  status: "Open" | "Agent Typing..." | "Answered" | "Closed"
  date: string
  messages: {
    sender: "user" | "agent"
    text: string
    time: string
  }[]
}
