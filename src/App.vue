<script>
import { defineComponent } from 'vue'
import API from "@/services"

export default defineComponent({
  data() {
    return {
      loading: true,
      user: null
    }
  },
  methods: {
    getUser() {
      let token = localStorage.getItem('token');
      if (token) {
        API.get(`home-user/profile`).then(response => {
          this.setAuth(response.data?.data);
          this.loading = false;
        }).catch(err => this.loading = false)
      } else {
        this.loading = false;
      }
    },
    setAuth(user) {
      if (!user) {
        this.user = null;
        return;
      }

      this.user = user;
    },
    logout() {
      if (!confirm('Bạn có muốn thoát tài khoản?')) {
        return false;
      }

      // api  thoát
      this.user = null;
      localStorage.removeItem('token')
        
      return true
    }
  },
  mounted() {
    this.getUser();
  }
})
</script>

<template>
  <div v-if="loading">Loading...</div>
  <router-view v-else />
  <notifications position="top center" />
</template>

<style lang="scss">
html, body {
  height: 100%;
  width: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
