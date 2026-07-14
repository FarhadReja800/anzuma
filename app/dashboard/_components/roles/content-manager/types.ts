export interface Project {
  id: string | number
  name: string
  slug: string
  sku: string
  price: number
  salePrice: number
  onSale: boolean
  description: string
  shortDescription: string
  images: string[]
  categories: string[]
  tags: string[]
  colors: { name: string; value: string }[]
  sizes: string[]
  stockQuantity: number
  inStock: boolean
  ratings: number
  reviewsCount: number
  reviews: {
    reviewerName: string
    reviewerEmail: string
    rating: number
    comment: string
    createdAt: string
  }[]
  additionalInformation: {
    weight: string
    dimensions: string
  }
  isActive: boolean
}

export interface TCategory {
  id: string | number
  name: string
  slug: string
  parent?: string | null
  icon?: string
  order?: number
  isActive?: boolean
}

export interface Blog {
  id: number
  title: string
  category: string
  date: string
  excerpt: string
}
