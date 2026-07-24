export interface NewsItem {
  _id?: string;
  id?: string;
  title: string;
  content: string;
  excerpt?: string;
  image?: string;
  category?: string;
  tags?: string[];
  isPopular?: boolean;
  views?: number;
  slug?: string;
  author?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateNewsPayload {
  title: string;
  content: string;
  excerpt?: string;
  image?: string;
  category?: string;
  tags?: string[];
  isPopular?: boolean;
  views?: number;
}

export interface UpdateNewsPayload extends Partial<CreateNewsPayload> {}

export interface NewsAPIResponse<T = NewsItem> {
  success: boolean;
  message?: string;
  data: T;
}
