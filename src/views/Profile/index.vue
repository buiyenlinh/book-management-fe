<script lang="ts">
import { defineComponent, ref } from "vue";
import UseProfile from "./UseProfile"
import moment from "moment";
import { base } from "@/services/base"
import { notify } from "@kyvg/vue3-notification";
import { useStore } from "vuex";
export default defineComponent({
  setup() {
    const { getProfile, updateProfile, updateProfileLoading, deleteAvatar, deleteAvatarLoading } = UseProfile();
    const { URL_IMAGE, IMAGE_DEFAULT } = base();
    const store = useStore();
    const profile = ref();
    const username = ref();
    const fullname = ref();
    const birthday = ref();
    const password = ref();
    const gender = ref('N');
    const address = ref();
    const avatar = ref();
    const avatar_preview = ref();

    const error = ref({
      username: '',
      fullname: '',
      password: '',
      birthday: '',
      gender: '',
      address: '',
      avatar: '',
      active: '',
      role_id: '',
    });

    const handleGetProfile = () => {
      getProfile().then(function(response) {
        store.dispatch("setUser", response.data.data)
        profile.value = response.data.data;
        username.value = response.data.data.username;
        fullname.value = response.data.data.fullname;
        birthday.value = moment(response.data.data.birthday).format("YYYY-MM-DD");
        
        gender.value = response.data.data.gender;
        address.value = response.data.data.address;
        if (response.data.data.avatar) {
          avatar_preview.value = URL_IMAGE + response.data.data.avatar;
        } else {
          avatar_preview.value = IMAGE_DEFAULT;
        }
      })
    }
    handleGetProfile();
    const handleChangeAvatar = (value : any) => {
      avatar.value = value?.target?.files[0];
      avatar_preview.value = URL.createObjectURL(value?.target?.files[0]);
    }

     const checkUsername = () => {
      if (username.value == "" || username.value == null) {
        error.value.username = "Tên đăng nhập là bắt buộc";
      } else {
        error.value.username = "";
      }
    }

    const checkFullname = () => {
      if (fullname.value == "" || fullname.value == null) {
        error.value.fullname = "Họ và tên là bắt buộc";
      } else {
        error.value.fullname = "";
      }
    }

    const checkAddress = () => {
      if (address.value == "" || address.value == null) {
        error.value.address = "Địa chỉ là bắt buộc";
      } else {
        error.value.address = "";
      }
    }

    const checkBirthday = () => {
      if (birthday.value == "" || birthday.value == null) {
        error.value.birthday = "Ngày sinh là bắt buộc";
      } else {
        error.value.birthday = "";
      }
    }

    const onSubmit = async () => {
      checkUsername();
      checkFullname();
      checkAddress();
      checkBirthday();
      const formData = new FormData();
      formData.append('username', username.value);
      formData.append('fullname', fullname.value);
      formData.append('birthday', birthday.value);
      formData.append('gender', gender.value);
      formData.append('address', address.value);
      if (avatar.value) {
        formData.append('avatar', avatar.value);
      }
      if (password.value) {
        formData.append('password', password.value);
      }
      
      if (username.value && fullname.value && birthday.value && gender.value && address.value) {
        await updateProfile(formData).then(function(response) {
          avatar.value = "";
          handleGetProfile();
          notify({
            title: response?.data?.message,
            type: "success"
          });
        }).catch(function(error) {
          updateProfileLoading.value = false;

          if (error?.response?.data?.errors?.fullname[0]) {
              notify({
                title: error?.response?.data?.errors?.fullname[0],
                type: "warn"
              });
            }

            if (error?.response?.data?.errors?.active[0]) {
              notify({
                title: error?.response?.data?.errors?.active[0],
                type: "warn"
              });
            }

            if (error?.response?.data?.errors?.gender[0]) {
              notify({
                title: error?.response?.data?.errors?.gender[0],
                type: "warn"
              });
            }

            if (error?.response?.data?.errors?.address[0]) {
              notify({
                title: error?.response?.data?.errors?.address[0],
                type: "warn"
              });
            }

            if (error?.response?.data?.errors?.birthday[0]) {
              notify({
                title: error?.response?.data?.errors?.birthday[0],
                type: "warn"
              });
            }
        }).finally(function() {
          updateProfileLoading.value = false;
        })
      }
    }

    const handleDeleteAvatar = () => {
      if (avatar_preview.value) {
        deleteAvatar().then(function(response) {
          avatar_preview.value = "";
          handleGetProfile();
          notify({
            title: response?.data?.message,
            type: "success"
          });
        }).catch(function() {
          deleteAvatarLoading.value = false;
        }).finally (function () {
          deleteAvatarLoading.value = false;
        })
      }
    }

    return {
      deleteAvatarLoading,
      profile,
      username,
      fullname,
      birthday,
      password,
      gender,
      address,
      avatar,
      avatar_preview,
      handleChangeAvatar,
      checkUsername,
      checkFullname,
      checkAddress,
      checkBirthday,
      onSubmit,
      error,
      updateProfileLoading,
      handleDeleteAvatar
    }
  },
})
</script>


<template>
  <div class="profile">
    <div class="row">
      <div class="col-12 col-md-3 col-sm-12">
        <div class="profile-avatar text-center">
          <img :src="avatar_preview" alt="" style="width: 200px; height: 200px; object-fit: cover; border-radius: 50%">
        </div>
        <div class="text-center pt-3">
          <button type="button" class="btn btn-info btn-sm" @click="$refs.RefAvatar.click()">
            Chọn ảnh
          </button>
          <input
            type="file"
            ref="RefAvatar"
            style="display: none"
            @change="handleChangeAvatar"
          />
           <button type="button" class="btn btn-danger btn-sm ml-2" @click="handleDeleteAvatar">
            <span v-if="deleteAvatarLoading" class="spinner-border spinner-border-sm"/>
            Xóa ảnh
          </button>
          <div class="pt-2">
            <i class="text-danger error">{{ error?.avatar }}</i>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-9 col-sm-12">
        <div class="profile-form">
          <div class="row">
            <div class="col-12 col-md-6 col-sm-12">
              <div class="form-group">
                <label for="">Họ tên <span class="text-danger">*</span></label>
                <input type="text" class="form-control" v-model="fullname" @keyup="checkFullname">
                <div class="pt-2">
                  <i class="text-danger error">{{ error?.fullname }}</i>
                </div>
              </div>
            </div>

            <div class="col-12 col-md-6 col-sm-12">
              <div class="form-group">
                <label for="">Tên đăng nhập <span class="text-danger">*</span></label>
                <input type="text" class="form-control" v-model="username" @keyup="checkUsername">
                <div class="pt-2">
                  <i class="text-danger error">{{ error?.username }}</i>
                </div>
              </div>
            </div>

            <div class="col-12 col-md-6 col-sm-12">
              <div class="form-group">
                <label for="">Mật khẩu <span class="text-danger">*</span></label>
                <input type="password" class="form-control" v-model="password" @keyup="checkPassword">
                <div class="pt-2">
                  <i class="text-danger error">{{ error?.password }}</i>
                </div>
              </div>
            </div>

            <div class="col-12 col-md-6 col-sm-12">
              <div class="form-group">
                <label for="">Địa chỉ <span class="text-danger">*</span></label>
                <input type="text" class="form-control" v-model="address" @keyup="checkAddress">
                <div class="pt-2">
                  <i class="text-danger error">{{ error?.address }}</i>
                </div>
              </div>
            </div>

            <div class="col-12 col-md-6 col-sm-12">
              <div class="form-group">
                <label for="">Ngày sinh <span class="text-danger">*</span></label>
                <input type="date" class="form-control" v-model="birthday" @change="checkBirthday">
                <div class="pt-2">
                  <i class="text-danger error">{{ error?.birthday }}</i>
                </div>
              </div>
            </div>

            <div class="col-12 col-md-6 col-sm-12">
              <div class="form-group">
                <label for="">Giới tính <span class="text-danger">*</span></label><br>
                <div class="form-check-inline">
                  <label class="form-check-label">
                    <input type="radio" class="form-check-input" value="F" v-model="gender">Nữ
                  </label>
                </div>
                <div class="form-check-inline">
                  <label class="form-check-label">
                    <input type="radio" class="form-check-input" value="M" v-model="gender">Nam
                  </label>
                </div>
                <div class="form-check-inline">
                  <label class="form-check-label">
                    <input type="radio" class="form-check-input" value="N" v-model="gender">Khác
                  </label>
                </div>
                <div class="pt-2">
                  <i class="text-danger error">{{ error?.gender }}</i>
                </div>
              </div>
            </div>

            <div class="col-12 col-md-6 col-sm-12">
              <button class="btn btn-info btn" @click="onSubmit">
                <span v-if="updateProfileLoading" class="spinner-border spinner-border-sm"/>
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>