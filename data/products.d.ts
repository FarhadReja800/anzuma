export interface TCategory {
  _id: string;
  name: string;
  slug: string;
  parent: string | null;
  icon: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface TColor {
  name: string;
  value: string;
}

export interface TReview {
  _id: string;
  reviewerName: string;
  reviewerEmail: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface TProduct {
  _id: string;
  name: string;
  slug: string;
  sku: string;
  price: number;
  salePrice: number;
  onSale: boolean;
  description: string;
  shortDescription: string;
  images: string[];
  categories: TCategory[];
  tags: string[];
  colors: TColor[];
  sizes: string[];
  stockQuantity: number;
  inStock: boolean;
  ratings: number;
  reviewsCount: number;
  reviews: TReview[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface TProductMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface TProductsResponse {
  success: boolean;
  message: string;
  meta: TProductMeta;
  data: TProduct[];
}