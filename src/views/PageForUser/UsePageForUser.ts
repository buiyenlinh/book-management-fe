import API from "@/services"

export default function UsePageForUser() {
  const getCategory = async () => {
    return await API.get(`home-user/category`);
  }

  const getBook = async (page: number) => {
    return await API.get(`home-user/book?page=${page}`);
  }

  const getBookByCategory = async (alias: string, page: number) => {
    return await API.post(`home-user/book-in-category?alias=${alias}&page=${page}`);
  }

  const getNewBookList = async (total: number) => {
    return await API.get(`home-user/new-list?total=${total}`);
  }

  const getSimilarBook = async (set_number: number, alias: string) => {
    return await API.post(`home-user/similar-book?alias=${alias}&set_number=${set_number}`);
  }

  const getInfoBook = async (alias: string) => {
    return await API.post(`home-user/book/${alias}`);
  }

  const getAuthor = async (page: number) => {
    return await API.get(`home-user/author?page=${page}`);
  }

  const getBookByAuthor = async (alias: string, page: number) => {
    return await API.post(`home-user/book-in-author/${alias}?page=${page}`);
  }

  const getContentChapter = async (alias_book: string, alias_content: string) => {
    return await API.get(`home-user/chapter?book=${alias_book}&alias_content=${alias_content}`);
  }

  return {
    getCategory,
    getBook,
    getBookByCategory,
    getNewBookList,
    getSimilarBook,
    getInfoBook,
    getAuthor,
    getBookByAuthor,
    getContentChapter
  }
}