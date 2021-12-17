<script lang="ts">
import { defineComponent, onMounted, provide, ref } from 'vue'
import UsePageForUser from '../UsePageForUser';
import Carousel from "../../Components/Carousel/index.vue";

export default defineComponent({
  components: {
    Carousel
  },
  setup() {
    const { getCategory } = UsePageForUser();
    const currentPage = ref(1);
    const set_page = ref(4);
    const categoryList = ref();
    onMounted(() => {
      getCategory(set_page.value, currentPage.value).then(response => {
        categoryList.value = response?.data?.data;
      })
    });

    const handleChangeCurrentPage = (page: number) => {
      currentPage.value = page;
      handleGetCategory();
    }

    const handleGetCategory = () => {
      getCategory(set_page.value, currentPage.value).then(response => {
        categoryList.value = response?.data?.data;
      })
    }
    provide("handleChangeCurrentPage", handleChangeCurrentPage);

    return {
      categoryList,
      set_page,
      currentPage
    }
  },
})
</script>

<template>
  <div id="home">
    <div class="home">
      <div class="home-bg">
        <div class="img">
          <img src="@/assets/images/background-header-01.jpg" alt="">
        </div>
        <div class="text">
          <h2><b style="font-size: 200%;">Sách</b><br> là phép màu di động duy nhất. Đọc sách chính là hộ chiếu cho vô số cuộc phiêu lưu.</h2>
        </div>
      </div>
      <div class="home-category pt-3 pb-3">
        <div class="container">
          <h3 class="title-block">Danh mục sách</h3>
          <div class="list">
            <Carousel :set_page="set_page" :list="categoryList" :currentPage="currentPage" />
          </div>
        </div>
      </div>
      
      <div class="home-book-new">
        <div class="container">
          <h3 class="title-block">Sách mới</h3>
          <div class="text-center">
            <button class="btn btn-primary btn-sm">Xem thêm</button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
