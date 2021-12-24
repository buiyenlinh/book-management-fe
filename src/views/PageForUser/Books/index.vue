<script lang="ts">
import { defineComponent, onMounted, provide, ref, watch } from 'vue'
import UsePageForUser from "../UsePageForUser"
import { base } from "@/services/base";
import Pagination2 from "../../Components/Pagination/Pagination.vue"
import router from "@/router"
import CategoryListComponent from "../Component/CategoryList.vue"

export default defineComponent({
  components: {
    Pagination2,
    CategoryListComponent
  },
  setup() {
    const { getBook, getBookByCategory } = UsePageForUser();
    const { URL_IMAGE } = base();
    const bookList = ref();
    const category_id = ref();
    const currentPage = ref(Number(router.currentRoute.value.params.page));

    watch(router.currentRoute, () => {
      currentPage.value = Number(router.currentRoute.value.params.page);
    })

    const handleGetBook = () => {
      getBook(currentPage.value).then(response => {
        bookList.value = response?.data?.data;
      })
    }
    onMounted(() => {
      handleGetBook();
    })

    const handleChangePage = (page : number) => {
      currentPage.value = page;
      handleGetBook();
    }

    return {
      bookList,
      category_id,
      getBookByCategory,
      currentPage,
      URL_IMAGE,
      handleChangePage
    }
  }
})
</script>


<template>
  <div class="hu-book pt-5 pb-4">
    <div class="container">
      <div class="row">
        <div class="col-md-3 col-sm-4 col-12">
          <CategoryListComponent />
        </div>
        <div class="col-md-9 col-sm-8 col-12">
          <ul class="row">
            <li class="col-md-3 col-sm-4 col-6 mb-2"
              v-for="(item, index) in bookList?.data"
              :key="index">
              <router-link v-if="item?.alias" :to="{name: 'UserDetailBook', params: { name: item?.alias }}">
                <div class="item text-center">
                  <img :src="URL_IMAGE + item?.cover_image" alt="">
                  <div class="p-3">
                    <span>{{ item?.title }}</span>
                  </div>
                </div>
              </router-link>
            </li>
          </ul>
          <Pagination2 :last_page="bookList?.meta?.last_page" :current_page="currentPage" @change="handleChangePage"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.item {
  img {
    width: 100%;
    height: 250px;
    object-fit: cover;
    border: 1px solid #ddd;
  }
}
</style>