<script lang="ts">
import { defineComponent, onMounted, reactive, ref, watch } from 'vue';
import router from "@/router"
import API from "../../services"
import { useStore } from "vuex";
import { Icon } from '@iconify/vue';
import { base } from "@/services/base"
import UseLogout from "../Logout/UseLogout";
import { notify } from "@kyvg/vue3-notification";

export default defineComponent({
  components: {
    Icon
  },
  setup() {
    const { URL_IMAGE, IMAGE_DEFAULT } = base();
    const { logout, logoutLoading } = UseLogout();
    const store = useStore();
    const account = ref();
    const avatar = ref('');

    const currentName = ref(router.currentRoute.value.name);
    watch(router.currentRoute, () => {
      currentName.value = router.currentRoute.value.name;
    })

    onMounted(async () => {
      try {
        const response = await API.get("profile");
        if (response.data.success) {
          store.dispatch("setUser", response.data.data)
          account.value = response.data.data;
          if (response.data.data?.avatar) {
            avatar.value = URL_IMAGE + response.data.data?.avatar;
          } else {
            avatar.value = IMAGE_DEFAULT;
          }
        } else {
          router.push("/admin/login");
          localStorage.setItem("token", "");
        }
      } catch (e) {
        router.push("/admin/login");
        localStorage.setItem("token", "");
      }
    })
    

    watch(store.state, () => {
      if (store.state.user.avatar) {
        avatar.value = URL_IMAGE + store.state.user.avatar;
      } else {
        avatar.value = IMAGE_DEFAULT;
      }
    })

    const menu = ref([
      {
        label: 'Thống kê',
        link: "DashBoard",
        icon: "carbon:dashboard",
        params: {}
      },
      {
        label: 'Loại sách',
        link: "Category",
        icon: "cil:book",
        params: {
          page: 1
        }
      },
      {
        label: 'Sách',
        link: "Book",
        icon: "bi:book",
        params: {
          page: 1
        }
      },
      {
        label: 'Tác giả',
        link: "Author",
        icon: "raphael:pen",
        params: {
          page: 1
        }
      },
      {
        label: 'Người dùng',
        link: "User",
        icon: "fa-solid:users",
        params: {
          page: 1
        }
      },
      {
        label: 'Tài khoản',
        link: "Profile",
        icon: "ic:round-account-circle",
        params: {}
      },
    ]);

    const changeBars = ref(false);
    const handleBars = () => {
      changeBars.value = !changeBars.value;
    }

    const handleLogout = () => {
      logout().then(function(response) {
        document.getElementById('close-modal-logout')?.click();
        router.push("/admin/login");
        localStorage.setItem("token", "");
      }).catch(function(error) {
        notify({
          title: error?.response?.data?.errors,
          type: "warn"
        });
        logoutLoading.value = false;
      }).finally (function () {
        logoutLoading.value = false;
      })
    }

    return {
      menu,
      currentName,
      account,
      URL_IMAGE,
      handleBars,
      changeBars,
      avatar,
      handleLogout,
      logoutLoading
    }
  },
})
</script>


<template>
  <div id="admin" :class="changeBars ? 'close-side-bars' : ''">
    <div class="admin d-flex">
      <div class="admin-bg" @click="handleBars"></div>
      <div class="side-bar">
        <div class="text-light pt-3 pb-3 text-center user-role">
          <img :src="avatar" alt="">
        </div>
        <ul class="nav flex-column" role="tablist">
          <li v-for="item in menu"
            :key="item"
            class="nav-item"
            :class="item.link==currentName ? 'router-link-exact-active' : ''"
            >
            <router-link v-if="item?.params?.page" :to="{name: item.link, params: {page: item.params.page} }" :title="item?.label">
              <Icon :icon="item.icon" width="20" class="mb-1" />
              <span class="ml-2">{{ item.label }}</span>
            </router-link>

            <router-link v-else :to="{name: item.link}" :title="item?.label">
              <Icon :icon="item.icon"  width="20" class="mb-1" />
              <span class="ml-2">{{ item.label }}</span>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="content">
        <div class="content-header">
          <div class="d-flex justify-content-between">
            <Icon icon="uis:bars"  width="40" @click="handleBars" style="cursor: pointer" />
            <b style="padding: 7px 0px; cursor: pointer" data-toggle="modal" data-target="#logout-modal">
              <Icon icon="ant-design:logout-outlined" width="20" style="margin-bottom: 4px" />
              Đăng xuất
            </b>
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

  <div class="modal fade" id="logout-modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Thông báo</h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        <div class="modal-body">
          Bạn có muốn đăng xuất không?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger btn-sm" @click="handleLogout">
            <span v-if="logoutLoading" class="spinner-border spinner-border-sm"/>
            Đăng xuất
          </button>
          <button type="button" class="btn btn-secondary btn-sm" id="close-modal-logout" data-dismiss="modal">Hủy</button>
        </div>
        
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.close-side-bars {
  .admin-bg {
    background: rgba(0, 0, 0, 0.3);
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 105;
  }
}
</style>