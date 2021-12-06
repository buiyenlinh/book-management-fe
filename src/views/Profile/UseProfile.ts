import API from "@/services"
import { ref } from "vue";

export default function UseProfile () {
  const updateProfileLoading = ref(false);
  const deleteAvatarLoading = ref(false);
  const getProfile = async () => {
    return await API.get('profile');
  }

  const updateProfile = async (params: FormData) => {
    updateProfileLoading.value = true;
    return await API.post('profile/update', params);
  }

  const deleteAvatar = async () => {
    deleteAvatarLoading.value = true;
    return await API.delete('/profile/avatar/delete');
  }

  return {
    getProfile,
    updateProfile,
    deleteAvatar,
    updateProfileLoading,
    deleteAvatarLoading
  }
}