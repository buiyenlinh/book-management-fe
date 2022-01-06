<script>
import { defineComponent, ref } from 'vue'
import { notify } from "@kyvg/vue3-notification";
export default defineComponent({
  setup() {
    const username = ref();
    const fullname = ref();
    const birthday = ref();
    const password = ref();
    const gender = ref('N');
    const address = ref();
    const avatar = ref();
    const avatar_preview = ref();

    const handleChangeAvatar = () => {
      console.log('handleChangeAvatar');
    }

    const handleDeleteAvatar = () => {
      console.log('delete avatar');
    }

    return {
      handleDeleteAvatar,
      handleChangeAvatar,
      username,
      fullname,
      birthday,
      password,
      gender,
      address,
      avatar,
      avatar_preview,
    }
  },
  mounted() {
    this.username = this.$root?.user.username;
    this.fullname = this.$root?.user.fullname;
    this.avatar = this.$root?.user.avatar;
    this.birthday = this.$root?.user.birthday;
    this.gender = this.$root?.user.gender;
    this.password = this.$root?.user.password;
    this.address = this.$root?.user.address;
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
              <img :src="$root.validateUrl($root.user?.avatar)" alt="Ảnh đại diện">
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
          <div class="col-md-9 col-sm-8 col-12">
            <h3>{{ $root.user?.fullname }}</h3>
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