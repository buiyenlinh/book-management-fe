<script lang="ts">
import { defineComponent, onMounted, provide, ref } from 'vue'
import UsePageForUser from '../UsePageForUser';
import 'swiper/swiper-bundle.min.css'
import SwiperCore, {
  Autoplay,Pagination,Navigation
} from 'swiper';
SwiperCore.use([Autoplay,Pagination,Navigation]);

export default defineComponent({
  name: 'Home',
  setup() {
    const { getCategory, getNewBookList } = UsePageForUser();
    const categoryList = ref();
    const newBookList = ref();
    onMounted(() => {
      getCategory().then(response => {
        categoryList.value = response?.data?.data;
      })

      getNewBookList(8).then(response => {
        newBookList.value = response?.data?.data;
        console.log(newBookList.value);
      })
    });

    return {
      categoryList,
      newBookList
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
            <ul class="row">
              <li v-for="(item, index) in categoryList?.data"
                :key="index"
                class="col-md-3 col-sm-4 col-6 text-center">
                <b class="nav-link">{{ item?.name }}</b>
              </li>
            </ul>
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
