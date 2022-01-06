<script>
import { defineComponent, onMounted, ref } from "vue"
import API from "@/services"
import router from "@/router"
import UseUserLogin from "./UseUserLogin"
import { notify } from "@kyvg/vue3-notification";
import { Icon } from "@iconify/vue"

export default defineComponent ({
  components: {
    Icon
  },
  setup() {
    const { login, loginLoading } = UseUserLogin();
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
        login(values)?.then(response => {
          loginLoading.value = true;
          localStorage.setItem('token', response?.data?.data?.token_user);
          this.$root.setAuth(response);
          router.push({ name : 'Home' });
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
        passwordError.value = "Mật khẩu là bắt buộc";
      } else {
        passwordError.value = "";
      }
    };

    onMounted(async() => {
      if (localStorage.getItem('token')) {
        router.push({name : 'Home'})
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
      loginLoading,
      API
    }
  },
  data() {
    return {
      auth2: null
    }
  },
  methods: {
    initGoogleApi() {
      const api = 'https://apis.google.com/js/api:client.js';
      return new Promise((resolve, reject) => { // resolve sẽ trả về trong then, reject trả về trong catch
        if (!document.getElementById('google_api')) {
          let script = document.createElement('script');
          script.src = api;
          script.id = 'google_api';
          script.onreadystatechange = script.onload = () => {
            if (!script.readyState || /loaded|complete/.test(script.readyState)) {
              setTimeout(() => {
                resolve(window.gapi);
              }, 500)
            }
          }
          document.head.appendChild(script);
        } else {
          resolve(window.gapi);
        }
      })
    },
    googleLogin() {
      if (!this.auth2) {
        return;
      }
      this.auth2.signIn().then(data => {
        var profile = data.getBasicProfile();
        let params = {
          'email': profile.getEmail(),
          'fullname': profile.getName(),
          'oauth2': profile.getId(),
          'avatar': profile.getImageUrl()
        };
        
        API.post('auth/login-with-google', params).then(response => {
          let user = response.data.data;
          localStorage.setItem('token', user.token_user);
          this.$root.setAuth(user);
          router.push({ name : 'Home' });
        })
      })
    }
  },
  mounted() {
    this.initGoogleApi().then(gapi => {
        gapi.load('auth2', () => {
          this.auth2 = gapi.auth2.init({
            client_id: '933093091767-n35329fv6bs2gl0krlflspcrjsqa4ebf.apps.googleusercontent.com'
          });
        })
    });
  }
})

</script>
<template>
  <div id="login">
    <div class="login">
      <div class="login-form">
        <form action="">
          <div class="text-center mb-3">
            <h3 style="font-weight: bold">WELCOME</h3>
            <p>Vui lòng nhập thông tin bên dưới</p>
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
            <p class="text-center pt-3" style="font-size: 14px">Hoặc đăng nhập với</p>
            <div class="d-flex justify-content-between ml-2 mr-2">
              <div class="facebook">
                <Icon icon="logos:facebook" class="mr-2" />
                <span>Facebook</span>
              </div>
              <div class="facebook" @click="googleLogin()">
                <Icon icon="logos:facebook" class="mr-2" />
                <span>Google</span>
              </div>
              <div class="g-signin2" data-onsuccess="onSignIn" @click="googleLogin()"></div>
            </div>
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