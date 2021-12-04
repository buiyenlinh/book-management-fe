import API from "@/services";
import { ref } from "vue";

export default function () {
  const addUpdateUserLoading = ref(false);
  const deleteUserLoading = ref(false);
  const getUserList = async(page: number) => {
    return await API.get(`user?page=${page}`);
  }

  const addUser = async (params: FormData) => {
    addUpdateUserLoading.value = true;
    return await API.post('user', params);
  }

  const updateUser = async (id: number, params : FormData) => {
    addUpdateUserLoading.value = true;
    return await API.post(`user/update/${id}`, params);    
  }

  const deleteUser = async (id : number) => {
    deleteUserLoading.value = true;
    return await API.delete(`user/${id}`);
  }

  return {
    getUserList,
    addUser,
    updateUser,
    deleteUser,
    addUpdateUserLoading,
    deleteUserLoading
  }
}