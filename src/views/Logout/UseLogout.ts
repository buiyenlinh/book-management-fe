import { ref } from "vue";
import API from "@/services";

export default function UseLogout() {
  const logoutLoading = ref(false);
  const logout = async () => {
    logoutLoading.value = true;
    return await API.post('auth/logout');
  }

  return {
    logout,
    logoutLoading
  }
}