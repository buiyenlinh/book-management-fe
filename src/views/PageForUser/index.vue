<script>
import { defineComponent, onMounted, ref, watch } from "vue"
import FooterComponent from "./Component/Footer.vue"
export default defineComponent({
  components: {
    FooterComponent
  },
  setup() {
    const menu = ref([
      {
        label: 'Trang chủ',
        link: 'Home',
        params: {}
      },
      {
        label: 'Giới thiệu',
        link: 'Introduce',
        params: {}
      },
      {
        label: 'Sách',
        link: 'UserBook',
        params: {
          page: 1
        }
      },
      {
        label: 'Tác giả',
        link: 'UserAuthorList',
        params: {
          page: 1
        }
      }
    ]);
    return {
      menu
    }
  }
})
</script>


<template>
  <div id="home_user">
    <div class="home_user">
      <div id="hu__header">
        <div class="hu__header">
          <div class="container">
            <div class="row">
              <div class="col-md-2 col-sm-2 col-12">
                <div class="logo">
                  <router-link :to="{ name: 'Home' }">
                    <img src="@/assets/images/logo-header-left.png" alt="">
                  </router-link>
                </div>
              </div>

              <div class="col-md-7 col-sm-7 col-12">
                <div class="menu-main">
                  <ul class="nav justify-content-end" role="tablist">
                    <li class="nav-item"
                      v-for="(item, index) in menu" :key="index" >
                      <router-link :to="{name: item.link, params: {page: item.params?.page}}" class="nav-link">
                        <span>{{ item.label }}</span>
                      </router-link>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-md-3 col-sm-3 col-12 text-right">
                <div class="nav-item" style="margin-top: 15px">
                  <div v-if="$root.user">
                    <div class="dropdown">
                      <span class="dropdown-toggle" data-toggle="dropdown">
                        {{ $root.user?.fullname }}
                      </span>
                      <div class="dropdown-menu">
                        <a class="dropdown-item" href="#">
                          <a @click="$root.logout()">Đăng xuất</a>
                        </a>
                        <router-link class="dropdown-item" :to="{name: 'UserProfile'}" style="display: inline-block">Cá nhân</router-link>
                      </div>
                    </div>
                  </div>
                  <div v-else>
                    <router-link :to="{name: 'UserLogin'}" style="display: inline-block">Đăng nhập</router-link> / 
                    <router-link :to="{name: 'UserRegister'}"  style="display: inline-block">Đăng ký</router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="hu__content">
        <router-view></router-view>
      </div>
      <FooterComponent/>
    </div>
  </div>
</template>

