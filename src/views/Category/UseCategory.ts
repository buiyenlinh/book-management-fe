import API from "@/services"
import { ref } from "vue";

type category = {
  name: string
};

export default function UseCategory () {
  const addUpdateCategoryLoading = ref(false);
  const deleteCategoryLoading = ref(false);

  const getCategoryList = (page: number) => {
    return API.get(`category?page=${page}`);
  }

  const addCategory = (params : category) => {
    addUpdateCategoryLoading.value = true;
    return API.post('category', params);
  }

  const updateCategory = (id: number, params: category) => {
    addUpdateCategoryLoading.value = true;
    return API.patch(`category/${id}`, params);
  }

  const deleteCategory = (id: number) => {
    deleteCategoryLoading.value = true;
    return API.delete(`category/${id}`);
  }

  return {
    getCategoryList,
    addCategory,
    addUpdateCategoryLoading,
    updateCategory,
    deleteCategory,
    deleteCategoryLoading
  }
}