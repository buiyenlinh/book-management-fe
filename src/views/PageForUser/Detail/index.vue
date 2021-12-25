<script lang="ts">
import router from '@/router'
import { defineComponent, onMounted, ref } from 'vue'
import UsePageForUser from "../UsePageForUser";
import { base } from "@/services/base";
import CategoryListComponent from "../Component/CategoryList.vue"
import { Icon } from "@iconify/vue"
export default defineComponent({
  components: {
    CategoryListComponent,
    Icon
  },
  setup() {
    const { getInfoBook, getSimilarBook } = UsePageForUser();
    const { URL_IMAGE } = base();
    const book_alias = ref('' + router.currentRoute.value.params?.name);

    const book = ref();
    const similarList = ref();
    onMounted(() => {
      getInfoBook(book_alias.value).then(response => {
        book.value = response?.data?.data;
      })
      getSimilarBook(8, book_alias.value).then(response => {
        similarList.value = response?.data?.data;
      })
    })  
    return {
      book,
      URL_IMAGE,
      similarList
    }
  }
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
                  <p><b>Mp3:</b><br></p>
                  <p>
                    <audio controls v-if="book?.mp3">
                      <source :src="URL_IMAGE + book.mp3" type="audio/mpeg">
                    </audio>
                  </p>
                </div>
              </div>
            </div>

            <div class="chapter-list mt-4">
              <h3 class="title-h3">Danh sách chương / Phần</h3>
              <ul class="row">
                <li v-for="(item, index) in book?.content" :key="index" class="col-md-6 col-sm-6 col-12">
                  <router-link v-if="item?.alias" :to="{ name: 'UserDetailBookContent', params: { content: item?.alias }}">
                    <Icon icon="grommet-icons:chapter-add" />
                    {{ item?.title }}
                  </router-link>
                </li>
              </ul>
            </div>

            <div class="content mt-5">
              <h3 class="title-h3">Nội dung</h3>
              <ul>
                <li v-for="(item, index) in book?.content" :key="index" :id="item?.alias">
                  <p class="text-center pt-4">
                    <b style="font-size: 25px">{{ item?.title }}</b>
                  </p>
                  <p class="content_details">{{ item?.content }}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-sm-3">
          <div class="right">
            <CategoryListComponent />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.title-h3 {
  font-size: 20px;
  font-weight: bold;
}

.book-name {
  text-transform: capitalize;
  font-weight: bold;
}

.similar-book {
  img {
    width: 100%;
    height: 250px;
    object-fit: cover;
  }
}

.image-cover img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border: 1px solid #ddd;
}

.content_details {
  text-align: justify;
}

.chapter-list ul li {
  padding: 7px 20px;
}

</style>