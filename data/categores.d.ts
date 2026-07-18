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

export interface TCategoriesResponse {
  success: boolean;
  message: string;
  data: TCategory[];
}