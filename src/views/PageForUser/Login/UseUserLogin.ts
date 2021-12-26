import API from "@/services"
import { ref } from "vue"
interface loginData {
  username : string,
  password : string,
  active : number,
};


export default function UseUserLogin() {
  const loginLoading = ref(false);
  const login = async (params : loginData) => {
    loginLoading.value = true;
    return await API.post('auth/user/login', params);
  }
  return {
    login,
    loginLoading,
  }
}