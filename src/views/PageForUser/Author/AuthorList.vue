<script lang="ts">
import { defineComponent, onMounted, ref, provide, watch } from 'vue'
import UsePageForUser from "../UsePageForUser"
import { Icon } from '@iconify/vue';
import router from "@/router"
import Pagination2 from "../../Components/Pagination/Pagination.vue"
export default defineComponent({
  components: {
    Icon, Pagination2
  },
  setup() {
    const { getAuthor } = UsePageForUser();
    const authorList = ref();
    const currentPage = ref(Number(router.currentRoute.value.params?.page));
    onMounted(() => {
      handleGetAuthor();
    })

    watch(() => router.currentRoute.value.params, () => {
      currentPage.value = Number(router.currentRoute.value.params?.page);
    })

    const handleGetAuthor = () => {
      getAuthor(currentPage.value).then(response => {
        authorList.value = response.data?.data
      })
    }

    const handleChangePage = (page : number) => {
      currentPage.value = page;
      handleGetAuthor();
    }
    return {
      authorList,
      handleChangePage,
      currentPage
    }
  }
})
</script>


<template>
  <div class="hu-author-list pt-5 pb-5">
    <div class="container">
      <h3>Danh sách tác giả</h3>
      <ul class="row">
        <li class="col-md-3 col-sm-4 col-6" v-for="(item, index) in authorList?.data" :key="index">
          <router-link :to="{name: 'UserBookAuthor', params: { name: item?.alias, page: 1 }}" class="nav-link">
            <Icon icon="akar-icons:circle-chevron-right" />
            {{ item?.fullname }}
          </router-link>
        </li>
      </ul>
      <Pagination2 :last_page="authorList?.meta?.last_page" :current_page="Number(currentPage)" @change="handleChangePage" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
ul li {
  padding-bottom: 20px;
  padding-top: 5px;
  a {
    color: #333;
  }
}
</style>