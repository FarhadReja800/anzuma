export interface BlogPost {
  id: number
  title: string
  excerpt: string
  date: string
  category: string
  tags: string[]
  image: string
  paragraphs: string[]
  blockquote?: string
}
