export interface BlogPost {
  id: string | number
  _id?: string
  title: string
  excerpt: string
  date: string
  category: string
  tags: string[]
  image: string
  paragraphs: string[]
  blockquote?: string
  content?: string
  views?: number
  isPopular?: boolean
  slug?: string
}
