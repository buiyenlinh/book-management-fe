<script>
import { defineComponent, onMounted, ref } from "vue"
import router from "@/router"
import UseLogin from "./UseLogin"
import { notify } from "@kyvg/vue3-notification";
import { Icon } from "@iconify/vue"
export default defineComponent ({
  components: {
    Icon
  },
  setup() {
    const { login, loginLoading } = UseLogin();
    const username = ref("");
    const password = ref("");
    const usernameError = ref("");
    const passwordError = ref("");
    
    const submitForm = () => {
      const values = {
        'username' : username.value,
        'password' : password.value,
        'active' : 1,
      };
      if (username.value && password.value) {
        login(values)?.then(function(response) {
          loginLoading.value = true;
          localStorage.setItem('token', response?.data?.data?.token);
          router.push({ name : 'DashBoard' });
        }).catch(function(error) {
          loginLoading.value = false;
          notify({
            title: error?.response?.data?.errors,
            type: "warn"
          });
        }).finally(function() {
          loginLoading.value = false;
        })
      }
      
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
        router.push({name : 'DashBoard'})
      }
    })

    return {
      username,
      password,
      usernameError,
      passwordError,
      submitForm,
      checkUsername,
      checkPassword,
      loginLoading
    }
  },
})

</script>
<template>
  <div id="login">
    <div class="login">
      <div class="login-form">
        <form action="">
          <div class="text-center mb-3">
            <h3 style="font-weight: bold">WELCOME</h3>
            <p>Vui lòng nhập thông tin pên dưới</p>
          </div>
          
          <div class="mb-3">
            <label for="">Tên đăng nhập <span class="text-danger font-weight-bold">*</span></label>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text"><Icon icon="fa-solid:user" /></span>
              </div>
              <input type="text" class="form-control" v-model="username" @keyup="checkUsername"/>
            </div>
            <div class="text-danger">{{ usernameError }}</div>
          </div>

          <div class="mb-2">
            <label for="">Mật khẩu <span class="text-danger font-weight-bold">*</span></label>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text"><Icon icon="dashicons:lock-alt" /></span>
              </div>
              <input type="password" class="form-control" v-model="password" @keyup="checkPassword" />
            </div>
            <div class="text-danger">{{ passwordError }}</div>
          </div>

          <div>
            <div class="text-right font-weight-bold mb-4"><a href="">Quên mật khẩu</a></div>
            <button 
              type="button"
              class="btn btn-primary"
              style="width: 100%"
              @click="submitForm"
              :disabled="loginLoading"  
            >
              <span v-if="loginLoading" class="spinner-border spinner-border-sm"/>
              Đăng nhập
            </button>
          </div>
        </form>
      </div>
    </div>
 
</div>
</template>

<style scoped lang="scss">

.login-form {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 100vh;
  form {
    width: 350px;
    border: 2px solid #369;
    padding: 30px 15px;
  }

  div.text-danger {
    font-size: 14px;
    font-style: italic;
    margin-top: 5px;
  }

  .facebook, .google {
    border: 1px dotted #ddd;
    padding: 5px 25px;
  }
}
</style>