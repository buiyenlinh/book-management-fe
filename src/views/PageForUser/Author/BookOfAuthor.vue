<script lang="ts">
import { defineComponent, onMounted, ref, provide } from 'vue'
import router from "@/router"
import UsePageForUser from "../UsePageForUser"
import { base } from "@/services/base";
import Pagination from "../../Components/Pagination/index.vue"
import Pagination2 from "../../Components/Pagination/Pagination.vue"

export default defineComponent({
  components: {
    Pagination2
  },
  setup() {
    const { getBookByAuthor, getAuthor } = UsePageForUser();
    const list = ref();
    const { URL_IMAGE } = base();
    const author_alias = ref('' + router.currentRoute.value.params?.name);
    const currentPage = ref(Number(router.currentRoute.value.params?.page));
    onMounted(() => { 
      handleGetBookByAuthor();
    })
    const handleGetBookByAuthor = () => {
      getBookByAuthor(author_alias.value, currentPage.value).then(response => {
        list.value = response.data?.data;
      })
    }

    const handleChangePage = (page : number) => {
      currentPage.value = page;
      handleGetBookByAuthor();
    }

    return {
      list,
      URL_IMAGE,
      currentPage,
      handleChangePage
    }
  },
})
</script>


<template>
  <div class="book-of-author pt-5 pb-5">
    <div class="container">
      <div class="row">
        <div class="col-md-4 col-sm-4 col-12">
          <div>
            <h3>{{ list?.author?.fullname }}</h3>
            <p>{{ list?.author?.introduce }}</p>
          </div>
        </div>
        <div class="col-md-8 col-sm-8 col-12">

          <ul class="row">
            <li class="col-md-3 col-sm-4 col-6" v-for="(item, index) in list?.books?.data" :key="index">
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
          <Pagination2 :last_page="list?.books?.meta?.last_page" :current_page="Number(currentPage)" @change="handleChangePage" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
ul li img {
  width: 100%;
  height: 250px;
  object-fit: cover;
}
</style>