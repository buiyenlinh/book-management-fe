import API from "@/services"
import { ref } from "vue"
interface loginData {
  username : string,
  password : string,
  active : number,
};
interface responseData {
  data: {
    token: string
  },
  success: boolean,
  message: string
}
export default function UseLogin() {
  const loginLoading = ref(false);
  const login = (params : loginData) => {
    loginLoading.value = true;
    return API.post<responseData>('auth/login', params);
  }
  return {
    login,
    loginLoading
  }
}