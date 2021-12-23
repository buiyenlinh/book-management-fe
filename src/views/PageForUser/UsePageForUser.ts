import API from "@/services"

export default function UsePageForUser() {
  const getCategory = async () => {
    return await API.get(`home-user/category`);
  }

  const getBook = async (page: number) => {
    return await API.get(`home-user/book?page=${page}`);
  }

  const getBookByCategory = async (id: number, page: number) => {
    return await API.post(`home-user/book-in-category?category_id=${id}&page=${page}`);
  }

  const getNewBookList = async (total: number) => {
    return await API.get(`home-user/new-list?total=${total}`);
  }

  const getSimilarBook = async (set_number: number, id: number) => {
    return await API.post(`home-user/similar-book?id=${id}&set_number=${set_number}`);
  }

  const getInfoBook = async (id: number) => {
    return await API.get(`home-user/book/${id}`);
  }

  const getAuthor = async (page: number) => {
    return await API.get(`home-user/author?page=${page}`);
  }

  const getBookByAuthor = async (author_id: number) => {
    return await API.get(`home-user/book-in-author?author_id=${author_id}`);
  }

  return {
    getCategory,
    getBook,
    getBookByCategory,
    getNewBookList,
    getSimilarBook,
    getInfoBook,
    getAuthor,
    getBookByAuthor
  }
}