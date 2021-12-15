import API from "@/services"
import { ref } from "vue";

export default function UseBook () {
  const addUpdateBookLoading = ref(false);
  const deleteBookLoading = ref(false);
  const searchBookLoading = ref(false);

  const getBookList = (page: number) => {
    return API.get(`book?page=${page}`);
  }

  const addBook = (params : FormData) => {
    addUpdateBookLoading.value = true;
    return API.post('book', params);
  }

  const updateBook = (id: number, params: FormData) => {
    addUpdateBookLoading.value = true;
    return API.post(`book/update/${id}`, params);
  }

  const deleteBook = (id: number) => {
    deleteBookLoading.value = true;
    return API.delete(`book/${id}`);
  }

  const searchBook = (text: string, page: number) => {
    searchBookLoading.value = true;
    return API.get(`book/search?${text}&page=${page}`);
  }

  return {
    getBookList,
    addBook,
    updateBook,
    deleteBook,
    searchBookLoading,
    addUpdateBookLoading,
    deleteBookLoading,
    searchBook
  }
}