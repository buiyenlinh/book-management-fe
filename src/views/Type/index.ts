export interface PageInterface {
  current_page: number,
  from: number,
  last_page: number,
  links: [],
  path: string,
  per_page: number,
  to: number,
  total: number
}

export interface ItemInterface {
  number: number | null,
  label: string
}

export interface CategoryInterface {
  id: number
  name: string,
  username: string
  updated_at: string,
  created_at: string
}

export interface BookInterFace {
  title: string | null,
  describe: string | null,
  language: string | null,
  page_total: number | null,
  cover_image: string | null,
  producer: string | null,
  author: string | null,
  content: string | null,
  mp3: string | null,
  category_id: number | null,
}