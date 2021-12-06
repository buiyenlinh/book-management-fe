<script lang="ts">
import UseCategory from '@/views/Category/UseCategory';
import { defineComponent, inject, PropType, ref, watch } from 'vue'
import UseUser from "../UseUser"
import { useStore } from "vuex";
import { notify } from "@kyvg/vue3-notification";
import { UserInterface } from "../../Type/index"
import { base } from "@/services/base"
import moment from "moment";
export default defineComponent({
  props: {
    userSelect: {
      type: Object as PropType<UserInterface>
    }
  },
  setup(props) {
    const { addUpdateUserLoading, addUser, updateUser } = UseUser();
    const store = useStore();
    const handleGetUserList = inject<() => void>("handleGetUserList");
    const resetUserSelect = inject<() => void>("resetUserSelect");
    const { URL_IMAGE } = base();
    const user = ref();
    const username = ref();
    const fullname = ref();
    const birthday = ref();
    const password = ref();
    const gender = ref('N');
    const address = ref();
    const avatar = ref();
    const active = ref(1);
    const role_id = ref();

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

    const onSubmit = () => {
      checkUsername();
      checkFullname();
      checkAddress();
      checkBirthday();
      if (!role_id.value) {
        error.value.role_id = "Vai trò người dùng là bắt buộc";
      }
      
      if (username.value && fullname.value && birthday.value && gender.value && address.value && role_id.value && active.value) {
        const formData = new FormData();
        formData.append('username', username.value);
        formData.append('fullname', fullname.value);
        formData.append('birthday', birthday.value);
        formData.append('gender', gender.value);
        formData.append('address', address.value);
        formData.append('active', '' + active.value);
        formData.append('role_id', role_id.value);
        if (avatar.value) {
          formData.append('avatar', avatar.value);
        }
        if (password.value) {
          formData.append('password', password.value);
        }

        if (user.value?.id) {
          updateUser(user.value?.id, formData).then(function(response) {
            addUpdateUserLoading.value = true;
            notify({
                title: response?.data?.message,
                type: "success"
              });
            if(handleGetUserList) {
              handleGetUserList();
            }
            document.getElementById("close-modal-user")?.click();
          }).catch(function(error) {
            addUpdateUserLoading.value = false;
            if (error?.response?.data?.errors?.role) {
              notify({
                title: error?.response?.data?.errors?.role,
                type: "warn"
              });
            } 
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
            addUpdateUserLoading.value = false;
          })
        } else {
          checkPassword();
          if (password.value && avatar.value) {
            addUser(formData).then(function(response) {
              addUpdateUserLoading.value = true;
              notify({
                  title: response?.data?.message,
                  type: "success"
                });
              if(handleGetUserList) {
                handleGetUserList();
              }
              document.getElementById("close-modal-user")?.click();
            }).catch(function(error) {
              addUpdateUserLoading.value = false;
              if (error?.response?.data?.errors) {
                notify({
                  title: error?.response?.data?.errors.username[0],
                  type: "warn"
                });
              }
            }).finally(function() {
              addUpdateUserLoading.value = false;
            })
          }
        }
      }
    }

    watch(() => props.userSelect, (newItem, oldItem) => {
      user.value = newItem;
      if (newItem?.username) {
        username.value = newItem?.username;
        fullname.value = newItem?.fullname;
        gender.value = '' + newItem?.gender;
        active.value = Number(newItem?.active);
        address.value = newItem?.address;
        if (newItem?.birthday) {
          birthday.value = moment(newItem?.birthday).format("YYYY-MM-DD");
        }

        avatar.value = newItem?.avatar;
        role_id.value = newItem?.role?.id;
        if (avatar.value) {
          avatar_preview.value = URL_IMAGE + avatar.value;
        }
      }
    })
    const closeModal = () => {
      if (resetUserSelect) {
        resetUserSelect();
      }
      user.value = "";
      username.value = "";
      fullname.value = "";
      birthday.value = "";
      password.value = "";
      gender.value = "N";
      address.value = "";
      avatar.value = "";
      active.value = 1;
      role_id.value = "";
      error.value = {
        username: '',
        fullname: '',
        password: '',
        birthday: '',
        gender: '',
        address: '',
        avatar: '',
        active: '',
        role_id: '',
      };
      avatar_preview.value = '';
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

    const checkPassword = () => {
      if (password.value == "" || password.value == null) {
        error.value.password = "Mật khẩu là bắt buộc";
      } else {
        error.value.password = "";
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

    const checkRole = () => {
      if (!role_id.value) {
        error.value.role_id = "Vai trò người dùng là bắt buộc";
      } else {
        error.value.role_id = "";
      }
    }

    const avatar_preview = ref("");
    const handleChangeAvatar = (event: any) => {
      if (event?.target.files[0].type != "image/jpeg" && event?.target.files[0].type != "image/png" && event?.target.files[0].type != "image/jpg") {
        error.value.avatar = "Vui lòng chọn ảnh có phần mở rộng 'jpg', 'png', jpeg'";
      } else {
        avatar.value = event?.target.files[0];
        avatar_preview.value = URL.createObjectURL(event?.target.files[0]);
        error.value.avatar = "";
      }
    }

    return {
      user,
      addUpdateUserLoading,
      closeModal,
      onSubmit,
      error,
      checkUsername,
      checkFullname,
      checkAddress,
      handleChangeAvatar,
      checkPassword,
      checkBirthday,
      checkRole,
      username,
      fullname,
      password,
      gender,
      address,
      avatar_preview,
      active,
      role_id,
      birthday
    }
  },
})
</script>


<template>
  <div class="modal fade" id="add-update-user-id">
    <div class="modal-dialog modal-dialog-scrollable modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Sách</h4>
        </div>
        <div class="modal-body">
          <form action="">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="">Họ tên <span class="text-danger">*</span></label>
                  <input type="text" class="form-control" v-model="fullname" @keyup="checkFullname">
                  <div class="pt-2">
                    <i class="text-danger error">{{ error?.fullname }}</i>
                  </div>
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <label for="">Tên đăng nhập <span class="text-danger">*</span></label>
                  <input type="text" class="form-control" v-model="username" @keyup="checkUsername">
                  <div class="pt-2">
                    <i class="text-danger error">{{ error?.username }}</i>
                  </div>
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <label for="">Mật khẩu <span v-if="user?.id == '' || user?.id == null" class="text-danger">*</span></label>
                  <input type="password" class="form-control" v-model="password" @keyup="checkPassword">
                  <div class="pt-2">
                    <i class="text-danger error" v-if="user?.id == '' || user?.id == null">{{ error?.password }}</i>
                  </div>
                </div>
              </div>

              <div class="col-md-6">
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

              <div class="col-md-6">
                <div class="form-group">
                  <label for="">Địa chỉ <span class="text-danger">*</span></label>
                  <input type="text" class="form-control" v-model="address" @keyup="checkAddress">
                  <div class="pt-2">
                    <i class="text-danger error">{{ error?.address }}</i>
                  </div>
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <label for="">Ngày sinh <span class="text-danger">*</span></label>
                  <input type="date" class="form-control" v-model="birthday" @change="checkBirthday">
                  <div class="pt-2">
                    <i class="text-danger error">{{ error?.birthday }}</i>
                  </div>
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <label for="">Vai trò <span class="text-danger">*</span></label>
                  <select name="" v-model="role_id" id="" class="form-control" @change="checkRole">
                    <option value="2">Administrator</option>
                    <option value="3">Editor</option>
                    <option value="4">User</option>
                  </select>
                  <div class="pt-2">
                    <i class="text-danger error">{{ error?.role_id }}</i>
                  </div>
                </div>
              </div>


              <div class="col-md-6">
                <div class="form-group">
                  <label for="">Trạng thái <span class="text-danger">*</span></label><br>
                  <div class="form-check-inline">
                    <label class="form-check-label">
                      <input type="radio" class="form-check-input" value="1" v-model="active">Kích hoạt
                    </label>
                  </div>
                  <div class="form-check-inline">
                    <label class="form-check-label">
                      <input type="radio" class="form-check-input" value="0" v-model="active">Không kích hoạt
                    </label>
                  </div>
                  <div class="pt-2">
                    <i class="text-danger error">{{ error?.active }}</i>
                  </div>
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <label for="">Ảnh đại diện <span class="text-danger">*</span></label><br>
                   <button type="button" class="btn btn-info btn-sm" @click="$refs.RefAvatar.click()">
                    Chọn ảnh
                  </button>

                  <input
                    type="file"
                    ref="RefAvatar"
                    style="display: none"
                    @change="handleChangeAvatar"
                  />
                  <div class="mt-1">
                    <img v-if="avatar_preview" :src="avatar_preview" alt="" style="width: 150px; height: 100px; object-fit: cover">
                  </div>
                  <div class="pt-2">
                    <i class="text-danger error">{{ error?.avatar }}</i>
                  </div>
                </div>
              </div>

            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button"
            class="btn btn-info btn-sm"
            @click="onSubmit">
            <span v-if="addUpdateUserLoading" class="spinner-border spinner-border-sm"/>
            {{ user?.id ? 'Cập nhật' : 'Thêm' }}
          </button>
          <button type="button"
            class="btn btn-secondary btn-sm"
            data-dismiss="modal"
            id="close-modal-user"
            @click="closeModal">Đóng</button>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.error {
  font-size: 12px;
}
</style>