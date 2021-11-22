export interface PageInterface {
  current_page: number,
  data: [],
  first_page_url: number,
  from: number,
  last_page: number,
  last_page_url: string,
  links: [],
  next_page_url: string,
  path: string,
  per_page: number,
  prev_page_url: string,
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