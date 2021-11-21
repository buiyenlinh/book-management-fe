import API from "@/services"
import { ref } from "vue";

type category = {
  name: string
};

export default function UseCategory () {
  const getCategoryList = (page: number) => {
    return API.get(`category?page=${page}`);
  }

  const addUpdateCategoryLoading = ref(false);
  const addCategory = (params : category) => {
    addUpdateCategoryLoading.value = true;
    return API.post('category', params);
  }
  return {
    getCategoryList,
    addCategory,
    addUpdateCategoryLoading
  }
}