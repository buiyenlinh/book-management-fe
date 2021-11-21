<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue';
import router from "@/router"
import API from "../../services"
import { useStore } from "vuex"

export default defineComponent({
  setup() {
    const menu = reactive([
      {
        label: 'Thống kê',
        link: "DashBoard",
        icon: "",
      },
      {
        label: 'Loại sách',
        link: "Category",
        icon: "",
      }
    ]);

    const store = useStore();

    onMounted(async () => {
      try {
        const response = await API.get("profile");
        if (response.data.success) {
          store.dispatch("setUser", response.data.data)
        }
      } catch (e) {
        router.push("/admin/login");
        localStorage.setItem("token", "");
      }
    })

    return {
      menu
    }
  },
})
</script>


<template>
  <div id="admin">
    <div class="admin d-flex">
      <div class="side-bar">
        <div class="text-light p-3 text-center">Admin</div>
        <ul class="nav flex-column" role="tablist">
          <li v-for="item in menu"
            :key="item"
            class="nav-item"
            >
            <router-link :to="{name: item.link}">{{ item.label }}</router-link>
          </li>
        </ul>
      </div>
      <div class="content">
        <div class="content-header">
          <div class="d-flex justify-content-between">
            <b>This is header left</b>
            <button class="btn btn-info btn-sm">Button</button>
          </div>
        </div>
        <div class="content-relative">
          <div class="content-absolute">
            <router-view/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$sideBarWidth : 230px;
$headerHeight : 50px;

.router-link-exact-active {
  background: #d0cccd;
  color: #252f3b !important;
}

#admin, .admin {
  height: 100%;
  width: 100%;
}

.side-bar {
  width: $sideBarWidth;
  background: #252f3b;
  min-height: 100vh;
  top: 0;
  position: fixed;
  left: 0;
  .nav-item {
    a {
      color: #fff;
      display: inline-block;
      width: 100%;
      padding: 10px 15px;
    }
    a:hover{
      text-decoration: none;
    }
  }
}

.content {
  width: calc(100% - $sideBarWidth);
  margin-left: $sideBarWidth;
  position: relative;
  .content-header {
    height: $headerHeight;
    border-bottom: 1px solid #ddd;
    position: fixed;
    top: 0;
    width: 100%;
    background: #fff;
    z-index: 100;
  }
  .content-relative {
    position: relative;
    height: calc((100% - $headerHeight));
    width: 100%;
    .content-absolute {
      position: absolute;
      top: $headerHeight;
      left: 0;
      height: 100%;
      width: 100%;
      padding: 30px;
      background: #f6f6f6;
    }
  }
}
</style>