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

export interface BookInterface {
  title: string | null,
  describe: string | null,
  language: string | null,
  page_total: number | null,
  cover_image: string | null,
  producer: string | null,
  author: string | null,
  content: string | null,
  mp3: string | null,
  category: {
    id: number,
    name: string
  },
  status: number | string |  null,
  username: string
}

export interface UserInterface {
  username: string | null,
  fullname: string | null,
  birthday: string | null,
  gender: string | null,
  address: string | null,
  avatar: string | null,
  role: {
    id: number,
    name: string
  },
  active: number | null,
}