import { ref } from "vue";
import API from "@/services"
import { AuthorInterface } from "../Type/index";

export default function UseAuthor() {
  const addUpdateAuthorLoading = ref(false);
  const deleteAuthorLoading = ref(false);
  const getAuthorListSearch = async (text: string) => {
    return await API.get(`author/search?fullname=${text}`);
  }

  const getAuthorList = async (page: number) => {
    return await API.get(`author?page=${page}`);
  }

  const addAuthor =async (params: AuthorInterface) => {
    addUpdateAuthorLoading.value = true;
    return await API.post('author', params);
  }

  const updateAuthor =async (params:AuthorInterface, id: number) => {
    addUpdateAuthorLoading.value = true;
    return await API.patch(`author/${id}`, params);
  }

  const deleteAuthor =async (id: number) => {
    deleteAuthorLoading.value = true;
    return await API.delete(`author/${id}`);
  }

  return {
    getAuthorList,
    addAuthor,
    updateAuthor,
    deleteAuthor,
    addUpdateAuthorLoading,
    deleteAuthorLoading,
    getAuthorListSearch
  }
}