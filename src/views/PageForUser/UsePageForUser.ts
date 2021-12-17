import API from "@/services"

export default function UsePageForUser() {
  const getCategory = async (set_page: number, page: number) => {
    return await API.get(`home-user/category?set_page=${set_page}&page=${page}`);
  }

  const getBook = async (page: number) => {
    return await API.get(`home-user/book?page=${page}`);
  }

  const getBookByCategory = async (id: number, page: number) => {
    return await API.get(`home-user/book?category_id=${id}&page=${page}`);
  }

  return {
    getCategory,
    getBook,
    getBookByCategory
  }
}