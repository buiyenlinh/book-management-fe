import API from "@/services";
import { ref } from "vue";

export default function () {
  const addUpdateUserLoading = ref(false);
  const deleteUserLoading = ref(false);
  const searchUserLoading = ref(false);
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

  const searchUser = async (text: string, page: number) => {
    searchUserLoading.value = true;
    return await API.get(`user/search?${text}&page=${page}`);
  }

  return {
    getUserList,
    addUser,
    updateUser,
    deleteUser,
    searchUser,
    addUpdateUserLoading,
    deleteUserLoading,
    searchUserLoading
  }
}