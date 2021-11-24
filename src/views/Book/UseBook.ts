import API from "@/services"
import { ref } from "vue";

type Book = {
  name: string
};

export default function UseBook () {
  const addUpdateBookLoading = ref(false);
  const deleteBookLoading = ref(false);

  const getBookList = (page: number) => {
    return API.get(`book?page=${page}`);
  }

  const addBook = (params : Book) => {
    addUpdateBookLoading.value = true;
    return API.post('book', params);
  }

  const updatebook = (id: number, params: Book) => {
    addUpdateBookLoading.value = true;
    return API.patch(`book/${id}`, params);
  }

  const deleteBook = (id: number) => {
    deleteBookLoading.value = true;
    return API.delete(`book/${id}`);
  }

  return {
    getBookList,
    addBook,
    updatebook,
    deleteBook,
    addUpdateBookLoading,
    deleteBookLoading
  }
}