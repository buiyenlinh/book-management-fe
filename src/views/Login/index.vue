<script lang="ts">
import { defineComponent, onMounted, ref } from "vue"
import router from "@/router"
import UseLogin from "./UseLogin"

export default defineComponent ({
  setup() {
    const { login } = UseLogin();
    const username = ref("");
    const password = ref("");
    const usernameError = ref("");
    const passwordError = ref("");
    const resetForm = () => {
      username.value = "";
      password.value = "";
      usernameError.value = "";
      passwordError.value = "";
    };
    
    const submitForm = () => {
      const values = {
        'username' : username.value,
        'password' : password.value,
        'active' : 1,
      };
      login(values).then(function(response) {
        localStorage.setItem('token', response?.data?.data?.token);
        router.push({ name : 'Admin' });
      }).catch(function(error) {
        alert(error?.response?.data?.message);
      })
    };
    const checkUsername = () => {
      if (!username.value) {
        usernameError.value = "Tên đăng nhập là bắt buộc";
      } else {
        usernameError.value = "";
      }
    };
    const checkPassword = () => {
      if (!password.value) {
        passwordError.value = "Tên đăng nhập là bắt buộc";
      } else {
        passwordError.value = "";
      }
    };

    onMounted(async() => {
      if (localStorage.getItem('token')) {
        router.push({name : 'Admin'})
      }
    })
    return {
      username,
      password,
      usernameError,
      passwordError,
      resetForm,
      submitForm,
      checkUsername,
      checkPassword
    }
  }
})

</script>
<template>
  <div id="login">
    <div class="row mr-0">
      <div class="col-md-6 col-sm-12 p-0">
        <div class="login-left">
          <img src="@/assets/images/login-left.png" alt="">
        </div>
      </div>
      <div class="col-md-6 col-sm-12 p-0">
        <div class="login-right">
        <div class="login-form">
          <form action="">
            <div class="mb-3">
              <label for="">Tên đăng nhập</label>
              <input type="text" class="form-control" v-model="username" @keyup="checkUsername"/>
              <div class="text-danger">{{ usernameError }}</div>
            </div>
            <div class="mb-3">
              <label for="">Mật khẩu</label>
              <input type="password" class="form-control" v-model="password" @keyup="checkPassword"/>
              <div class="text-danger">{{ passwordError }}</div>
            </div>
            <div>
              <button 
                type="button"
                class="btn btn-primary btn-sm mr-1"
                @click="submitForm">Đăng nhập</button>
              <button
                type="reset"
                class="btn btn-secondary btn-sm"
                @click="resetForm">Đặt lại</button>
            </div>
          </form>
        </div>
      </div>
      </div>
    </div>  
</div>
</template>

<style scoped lang="scss">
img {
  width: 100%;
  min-height: 100vh;
  object-fit: cover;
}
.login-form {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 100vh;
  form {
    width: 300px;
    border: 2px solid #369;
    padding: 30px 15px;
  }
}
</style>