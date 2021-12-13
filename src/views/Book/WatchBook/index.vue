<script lang="ts">
import { defineComponent, PropType, watch, ref, inject } from 'vue';
import { BookInterface } from "../../Type/index";
import { base } from "@/services/base";
import moment from "moment";

export default defineComponent({
  props: {
    itemBook: {
      type: Object as PropType<BookInterface>
    }
  },
  setup(props) {
    const { URL_IMAGE } = base();
    const resetItemBook = inject<() => void>("resetItemBook");
    const book = ref();
    watch(props, () => {
      book.value = props.itemBook
    })

    const closeModal = () => {
      book.value = "";
      if (resetItemBook) {
        resetItemBook();
      }
    }
    return {
      book,
      closeModal,
      URL_IMAGE
    }
  },
  methods: {
    formatDate(date: Date) {
      return moment(date).format("DD-MM-YYYY");
    }
  }
})
</script>


<template>
  <div class="modal fade" id="watch-book-id">
    <div class="modal-dialog modal-dialog-scrollable modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Thông tin sách</h4>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-5 col-xs-12 col-12">
              <div class="cover-image mb-3">
                <img v-if="book?.cover_image" :src="URL_IMAGE + book?.cover_image" alt="Ảnh bìa sách">
                <span  v-else>Ảnh bìa sách</span>
              </div>
            </div>
            <div class="col-md-7 col-xs-12 col-12">
              <div class="info">
                <h3 class="text-set-01">{{ book?.title }}</h3>
                <p><b>Loại sách:</b> {{ book?.category?.name }}</p>
                <p><b>Ngôn ngữ:</b> {{ book?.language }}</p>
                <p class="mb-2">
                  <b>Tác giả:</b> {{ book?.author?.fullname }}
                </p>
                <p v-if="book?.author?.introduce" class="ml-2 text-justify">{{ book?.author?.introduce }}</p>
                <p><b>Nhà xuất bản:</b> {{ book?.producer }}</p>
                <p><b>Thời gian phát hành:</b> {{ formatDate(book?.release_time) }}</p>
              </div>
            </div>
            <div class="col-md-12 col-sm-12 col-12">
              <div class="content pb-3">
                <div class="mp3">
                  <div class="mb-2"><b>Mp3</b></div>
                  <audio controls v-if="book?.mp3">
                    <source :src="URL_IMAGE + book?.mp3" type="audio/mpeg">
                  </audio>
                </div>
                <div class="mt-3 mb-2"><b>Nội dung</b></div>
                <div id="accordion">
                  <div class="card" v-for="(item, index) in book?.content" :key="index">
                    <div class="card-header">
                      <a class="card-link" data-toggle="collapse" :href="'#collaps' + item?.id">
                        {{ item?.title }}
                      </a>
                    </div>
                    <div :id="'collaps' + item?.id" :class="[index == 0 ? 'show' : '', 'collapse']" data-parent="#accordion">
                      <div class="card-body">
                        {{ item?.content }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>

        <div class="modal-footer">
          <button type="button"
            class="btn btn-secondary btn-sm"
            data-dismiss="modal"
            id="close-modal-watch-book"
            @click="closeModal">Đóng</button>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.cover-image {
  width: 100%;
  height: 400px;
  overflow: hidden;
  border: 1px solid #252f3b;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: scale(1);
    transition: all ease-in-out 0.7s;
  }
}

.cover-image:hover img {
  transform: scale(1.2);
}

.card-header a {
  display: block;
}

</style>