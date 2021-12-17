<script>
import { defineComponent, ref } from "vue"

export default defineComponent({
  setup() {
    const menu = ref([
      {
        label: 'Trang chủ',
        link: 'Home'
      },
      {
        label: 'Giới thiệu',
        link: 'Introduce'
      },
      {
        label: 'Sách',
        link: 'Home'
      },
      {
        label: 'Tác giả',
        link: 'Home'
      }
    ]);
    return {
      menu
    }
  },
})
</script>


<template>
  <div id="home_user">
    <div class="home_user">
      <div id="hu__header">
        <div class="hu__header">
          <div class="container">
            <div class="row">
              <div class="col-md-3 col-sm-3 col-12">
                <div class="logo">
                  <img src="@/assets/images/logo-header-left.png" alt="">
                </div>
              </div>

              <div class="col-md-9 col-sm-9 col-12">
                <div class="menu-main">
                  <ul class="nav justify-content-end" role="tablist">
                    <li class="nav-item" v-for="(item, index) in menu" :key="index">
                      <router-link :to="{name: item.link}" class="nav-link">
                        <span>{{ item.label }}</span>
                      </router-link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="hu__content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

