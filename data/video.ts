export interface Video {
  id?: string;
  _id?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  videoUrl: string;
  buttonText?: string;
  buttonLink?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}
