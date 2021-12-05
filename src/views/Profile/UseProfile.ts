import API from "@/services"
import { createReturnStatement } from "@vue/compiler-core";

export default function UseProfile () {
  const getProfile = async () => {
    return await API.get('profile');
  }

  return {
    getProfile,
  }
}