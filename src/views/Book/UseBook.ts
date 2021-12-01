import API from "@/services"
import { ref } from "vue";
import { BookInterface } from "../Type/index"



export default function UseBook () {
  const addUpdateBookLoading = ref(false);
  const deleteBookLoading = ref(false);

  const getBookList = (page: number) => {
    return API.get(`book?page=${page}`);
  }

  const addBook = (params : any) => {
    addUpdateBookLoading.value = true;
    return API.post('book', params);
  }

  const updateBook = (id: number, params: any) => {
    addUpdateBookLoading.value = true;
    return API.post(`book/update/${id}`, params);
  }

  const deleteBook = (id: number) => {
    deleteBookLoading.value = true;
    return API.delete(`book/${id}`);
  }

  return {
    getBookList,
    addBook,
    updateBook,
    deleteBook,
    addUpdateBookLoading,
    deleteBookLoading
  }
}