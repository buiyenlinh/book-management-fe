<script lang="ts">
import router from '@/router'
import { defineComponent, onMounted, ref } from 'vue'
import UsePageForUser from "../UsePageForUser";
import { base } from "@/services/base";

export default defineComponent({
  setup() {
    const { getInfoBook } = UsePageForUser();
    const { URL_IMAGE } = base();
    const book_id = ref(Number(router.currentRoute.value.params?.id));
    const book = ref();
    onMounted(() => {
      getInfoBook(book_id.value).then(response => {
        book.value = response?.data?.data;
      })
    })  
    return {
      book,
      URL_IMAGE
    }
  },
})
</script>



<template>
  <div class="details-book pt-5 pb-5">
    <div class="container">
      <div class="row">
        <div class="col-md-9 col-sm-9 col-12">
          <div class="left">
          <div class="row">
            <div class="col-md-5 col-sm-5 col-12">
              <div class="image-cover">
                <img v-if="book?.cover_image" :src="URL_IMAGE + book?.cover_image" alt="Ảnh bìa sách">
              </div>
            </div>
            <div class="col-md-7 col-sm-7 col-12">
              <div class="info">
                <h2 class="text-set-01 book-name">{{ book?.title }}</h2>
                <p><b>Loại sách:</b> {{ book?.category?.name }}</p>
                <p><b>Ngôn ngữ:</b> {{ book?.language }}</p>
                <p class="mb-2">
                  <b>Tác giả:</b> {{ book?.author?.fullname }}
                </p>
                <p><b>Nhà xuất bản:</b> {{ book?.producer }}</p>
                <p>
                  <b>Mp3:</b><br>
                  <audio controls v-if="book?.mp3">
                    <source :src="URL_IMAGE + book.mp3" type="audio/mpeg">
                  </audio>
                </p>
              </div>
            </div>
          </div>
          
            <div class="content mt-5 mb-4">
              <div class="inner">
                <div class="content-item" v-for="(item, index) in book?.content" :key="index" :id="item?.title">
                  <h3>Chương / Phần {{ index + 1 }}: {{ item?.title }}</h3>
                  <p>{{ item?.content }}</p>
                  <hr>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-sm-3">
          <div class="right">
            <div class="chapter">
              <h3 style="font-size: 20px; font-weight: bold">Chương / Phần</h3>
              <ul>
                <li v-for="(item, index) in book?.content" :key="index" class="mr-2">
                  <a :href="'#' + item?.title">{{ item?.title }}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="similar-book">
        <h3 style="font-size: 20px; font-weight: bold">Sách tương tự</h3>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.book-name {
  text-transform: capitalize;
  font-weight: bold;
}

.image-cover img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border: 1px solid #ddd;
}


</style>