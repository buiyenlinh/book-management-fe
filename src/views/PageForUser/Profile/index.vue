<script>
import { defineComponent, ref } from 'vue'
import { notify } from "@kyvg/vue3-notification";
import UsePageForUser from "../UsePageForUser.ts"
import moment from "moment";
export default defineComponent({
  setup() {
    const { deleteAvatarProfile, deleteAvatarLoading, updateProfileUser, updateProfileLoading } = UsePageForUser();
    const username = ref();
    const fullname = ref();
    const birthday = ref();
    const gender = ref('N');
    const address = ref();
    const avatar = ref();
    const avatar_preview = ref();

    return {
      username,
      fullname,
      birthday,
      gender,
      address,
      avatar,
      avatar_preview,
      deleteAvatarLoading,
      deleteAvatarProfile,
      updateProfileUser,
      updateProfileLoading
    }
  },
  mounted() {
    this.username = this.$root?.user.username;
    this.fullname = this.$root?.user.fullname;
    this.avatar = this.$root?.user.avatar;
    this.birthday = moment(this.$root?.user.birthday).format("YYYY-MM-DD");
    this.gender = this.$root?.user.gender;
    this.address = this.$root?.user.address;
    this.avatar_preview = this.$root.validateUrl(this.$root.user?.avatar)
  },
  methods: {
    handleDeleteAvatar(){
      this.deleteAvatarProfile().then(response => {
        this.deleteAvatarLoading = true;
        this.avatar = this.$root?.user.avatar;
        this.avatar_preview = '';
        this.$root.setAuth(response.data?.data);
        notify({
          title: response?.data?.message,
          type: "success"
        });
      }).catch(error => {
        this.deleteAvatarLoading = false;
      }).finally (() => {
        this.deleteAvatarLoading = false;
      })
    },
    handleChangeAvatar(value) {
      this.avatar = value?.target?.files[0];
      this.avatar_preview = URL.createObjectURL(value?.target?.files[0]);
    },
    onSubmit () {
      const formData = new FormData();
      if (this.fullname) {
        formData.append('fullname', this.fullname);
      }
      if (this.address) {
        formData.append('address', this.address);
      }
      if (this.gender) {
        formData.append('gender', this.gender);
      }
      if (this.birthday) {
        formData.append('birthday', this.birthday);
      }

      if (this.avatar) {
        formData.append('avatar', this.avatar);
      }

      this.updateProfileUser(formData).then(response => {
        this.$root.setAuth(response.data?.data);
        this.updateProfileLoading = true;
        notify({
          title: response?.data?.message,
          type: "success"
        });
      }).catch(error => {
        this.updateProfileLoading = false;
      }).finally(() => {
        this.updateProfileLoading = false;
      })
    }
  }
})
</script>


<template>
  <div id="user-profile" style="margin-top: 80px">
    <div class="container">
      <div class="user-profile">
        <div class="row">
          <div class="col-md-3 col-sm-4 col-12">
            <div class="avatar">
              <img :src="avatar_preview" alt="Ảnh đại diện">
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
            </div>
          </div>
          <div class="col-md-9 col-sm-8 col-12">
            <h3>{{ $root.user?.fullname }}</h3>
            <div class="profile-form">
              <div class="row">
                <div class="col-12 col-md-6 col-sm-12">
                  <div class="form-group">
                    <label for="">Họ tên <span class="text-danger">*</span></label>
                    <input type="text" class="form-control" v-model="fullname" @keyup="checkFullname">
                  </div>
                </div>

                <div class="col-12 col-md-6 col-sm-12">
                  <div class="form-group">
                    <label for="">Tên đăng nhập <span class="text-danger">*</span></label>
                    <input type="text" class="form-control" v-model="username" @keyup="checkUsername" disabled>
                  </div>
                </div>

                <div class="col-12 col-md-6 col-sm-12">
                  <div class="form-group">
                    <label for="">Địa chỉ <span class="text-danger">*</span></label>
                    <input type="text" class="form-control" v-model="address" @keyup="checkAddress">
                  </div>
                </div>

                <div class="col-12 col-md-6 col-sm-12">
                  <div class="form-group">
                    <label for="">Ngày sinh <span class="text-danger">*</span></label>
                    <input type="date" class="form-control" v-model="birthday" @change="checkBirthday">
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
    </div>
  </div>
</template>

<style scoped>
.user-profile {
  padding: 50px 0px;
}
.avatar img {
  width: 100%;
  object-fit: cover;
}
</style>