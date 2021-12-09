<script lang="ts">
import UseCategory from '@/views/Category/UseCategory';
import { defineComponent, inject, PropType, ref, watch } from 'vue'
import UseBook from "../UseBook"
import { useStore } from "vuex";
import { notify } from "@kyvg/vue3-notification";
import { BookInterface } from "../../Type/index"
import { base } from "@/services/base"

export default defineComponent({
  props: {
    itemBook: {
      type: Object as PropType<BookInterface>
    }
  },
  setup(props) {
    const { addUpdateBookLoading, addBook, updateBook } = UseBook();
    const { getCategoryAllList } = UseCategory();
    const store = useStore();
    const handleGetBookList = inject<() => void>("handleGetBookList");
    const resetItemBook = inject<() => void>("resetItemBook");
    const { URL_IMAGE } = base();
    const book = ref();
    const title = ref();
    const describe = ref();
    const language = ref('Tiếng việt');
    const release_time = ref();
    const cover_image = ref();
    const producer = ref();
    const author_id = ref();
    const content = ref([]);
    const mp3 = ref();
    const category_id = ref();
    const status = ref(1);

    const error = ref({
      title: '',
      describe: '',
      language: '',
      release_time: '',
      cover_image: '',
      producer: '',
      author_id: '',
      content: '',
      mp3: '',
      category_id: '',
    });

    const onSubmit = () => {
      checkTitle();
      if (!category_id.value) {
        error.value.category_id = "Loại truyện là bắt buộc";
      }
      
      if (title.value && language.value && author_id.value) {
        const formData = new FormData();
        formData.append('title', title.value);
        formData.append('describe', describe.value);
        formData.append('language', language.value);
        formData.append('release_time', release_time.value);
        formData.append('cover_image', cover_image.value);
        formData.append('producer', producer.value);
        formData.append('author_id', author_id.value);
        // formData.append('content', content.value);
        formData.append('mp3', mp3.value);
        formData.append('category_id', category_id.value);
        formData.append('status', '' + status.value);
        formData.append('username', store.state.user.username);

        if (book.value?.id) {
          updateBook(book.value?.id, formData).then(function(response) {
            addUpdateBookLoading.value = true;
            notify({
                title: response?.data?.message,
                type: "success"
              });
            if(handleGetBookList) {
              handleGetBookList();
            }
            document.getElementById("close-modal-book")?.click();
          }).catch(function(error) {
            addUpdateBookLoading.value = false;
            if (error?.response?.data?.errors) {
              notify({
                title: error?.response?.data?.errors,
                type: "warn"
              });
            } else {
              notify({
                title: error?.response?.data?.errors?.title[0],
                type: "warn"
              });
            }
          }).finally(function() {
            addUpdateBookLoading.value = false;
          })
        } else {
          addBook(formData).then(function(response) {
            addUpdateBookLoading.value = true;
            notify({
                title: response?.data?.message,
                type: "success"
              });
            if(handleGetBookList) {
              handleGetBookList();
            }
            document.getElementById("close-modal-book")?.click();
          }).catch(function(error) {
            addUpdateBookLoading.value = false;
            if (error?.response?.data?.errors) {
              notify({
                title: error?.response?.data?.errors,
                type: "warn"
              });
            } else {
              notify({
                title: error?.response?.data?.errors?.title[0],
                type: "warn"
              });
            }
          }).finally(function() {
            addUpdateBookLoading.value = false;
          })
        }
      }
    }

    // watch(() => props.itemBook, (newItem, oldItem) => {
    //   book.value = newItem;
    //   title.value = newItem?.title;
    //   describe.value = newItem?.describe;
    //   language.value = newItem?.language;
    //   release_time.value = newItem?.release_time;
    //   cover_image.value = newItem?.cover_image;
    //   producer.value = newItem?.producer;
    //   author_id.value = newItem?.author_id;
    //   content.value = newItem?.content;
    //   mp3.value = newItem?.mp3;
    //   category_id.value = newItem?.category?.id;
    //   status.value = Number(newItem?.status);

    //   coverPreview.value = URL_IMAGE + cover_image.value;
    //   mp3_preview.value = URL_IMAGE + mp3.value;
    // })
    
    const closeModal = () => {
      console.log("Close");
      if (resetItemBook) {
        resetItemBook();
      }
      mp3_name_preview.value = "";
      mp3_preview.value = "";
      book.value = "";
      title.value = "";
      describe.value = "";
      language.value = "";
      release_time.value = "";
      cover_image.value = "";
      producer.value = "";
      author_id.value = "";
      content.value = [];
      mp3.value = "";
      category_id.value = "";
      status.value=  1;
    }

    const checkTitle = () => {
      if (title.value == "" || title.value == null) {
        error.value.title = "Tên sách là bắt buộc";
      } else {
        error.value.title = "";
      }
    }

    const coverPreview = ref();
    const mp3_preview = ref('');
    const handleChangeCover = (event: any) => {
      console.log(event?.target.files[0]);
      if (event?.target.files[0].type != "image/jpeg" && event?.target.files[0].type != "image/png" && event?.target.files[0].type != "image/jpg") {
        error.value.cover_image = "Vui lòng chọn ảnh có phần mở rộng 'jpg', 'png', jpeg'";
      } else {
        cover_image.value = event?.target.files[0];
        coverPreview.value = URL.createObjectURL(event?.target.files[0]);
        error.value.cover_image = "";
      }
    }

    const mp3_name_preview = ref();
    const handleChangeMp3 = (event: any) => {
      console.log(event?.target.files[0]);
      if (event?.target.files[0].type != "audio/mpeg") {
        error.value.mp3 = 'Vui lòng chọn file có phần mở rộng là "mp3"';
      } else {
        mp3.value = event.target.files[0];
        error.value.mp3 = "";
      }
      mp3_name_preview.value = event?.target?.files[0].name;
    }

    const categoryList = ref();
    getCategoryAllList().then(function(response) {
      categoryList.value = response.data;
    })
    
    return {
      addUpdateBookLoading,
      closeModal,
      onSubmit,
      book, title, describe, language, release_time, cover_image, producer,
      author_id, content, mp3, category_id, status,
      error,
      checkTitle, 
      handleChangeCover,
      categoryList,
      coverPreview,
      handleChangeMp3,
      mp3_preview,
      mp3_name_preview
    }
  },
})
</script>


<template>
  <div class="modal fade" id="add-update-book-id">
    <div class="modal-dialog modal-dialog-scrollable modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Sách</h4>
        </div>
        <div class="modal-body">
          <form action="">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="">Tên sách <span class="text-danger">*</span></label>
                  <input type="text" class="form-control" v-model="title" @keyup="checkTitle">
                  <div class="pt-2">
                    <i class="text-danger error">{{ error?.title }}</i>
                  </div>
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <label for="">Nhà sản xuất <span class="text-danger">*</span></label>
                  <input type="text" class="form-control" v-model="producer">
                  <div class="pt-2">
                    <i class="text-danger error">{{ error?.producer }}</i>
                  </div>
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <label for="">Loại sách <span class="text-danger">*</span></label>
                  <select id="" class="form-control" v-model="category_id">
                    <option v-for="item in categoryList" :key="item.id" :value="item.id">{{ item.name }}</option>
                  </select>
                  <div class="pt-2">
                    <i class="text-danger error">{{ error?.category_id }}</i>
                  </div>
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <label for="">Trạng thái <span class="text-danger">*</span></label><br>
                  <div class="form-check-inline">
                    <label class="form-check-label">
                      <input type="radio" class="form-check-input" value="1" v-model="status">Kích hoạt
                    </label>
                  </div>
                  <div class="form-check-inline">
                    <label class="form-check-label">
                      <input type="radio" class="form-check-input" value="0" v-model="status">Không kích hoạt
                    </label>
                  </div>
                  <div class="pt-2">
                    <i class="text-danger error">{{ error?.status }}</i>
                  </div>
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <label for="">Bìa sách <span class="text-danger">*</span></label><br>
                   <button type="button" class="btn btn-info btn-sm" @click="$refs.RefCoverImage.click()">
                    Chọn ảnh
                  </button>

                  <input
                    type="file"
                    ref="RefCoverImage"
                    style="display: none"
                    @change="handleChangeCover"
                  />
                  <div class="mt-1">
                    <img v-if="coverPreview" :src="coverPreview" alt="" style="width: 150px; height: 100px; object-fit: cover">
                  </div>
                  <div class="pt-2">
                    <i class="text-danger error">{{ error?.cover_image }}</i>
                  </div>
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <label for="">mp3 <span class="text-danger">*</span></label><br>
                  <button type="button" class="btn btn-info btn-sm" @click="$refs.RefMp3.click()">
                    Chọn mp3
                  </button>

                  <input
                    type="file"
                    ref="RefMp3"
                    style="display: none"
                    @change="handleChangeMp3"
                  />

                  <div class="mt-1">
                    <div v-if="mp3_name_preview" >File vừa chọn: {{ mp3_name_preview }}</div>
                    <audio controls v-if="mp3_preview  != ''">
                      <source :src="mp3_preview" type="audio/mpeg">
                    </audio>
                  </div>

                  <div class="pt-2">
                    <i class="text-danger error">{{ error?.mp3 }}</i>
                  </div>
                </div>
              </div>

              <div class="col-md-12">
                <div class="form-group">
                  <label for="">Mô tả <span class="text-danger">*</span></label>
                  <textarea class="form-control" v-model="describe" rows="3" @keyup="checkDescribe"></textarea>
                  <div class="pt-2">
                    <i class="text-danger error">{{ error?.describe }}</i>
                  </div>
                </div>
              </div>

              <div class="col-md-12">
                <div class="form-group">
                  <label for="">Phần / Chương <span class="text-danger">*</span></label><br>
                  <label for="">Tiêu đề <span class="text-danger">*</span></label>
                  <input type="text" class="form-control">
                  <textarea class="form-control" rows="5" v-model="content"></textarea>
                  <div class="pt-2">
                    <i class="text-danger error">{{ error?.content }}</i>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button"
            class="btn btn-info btn-sm rounded-0"
            @click="onSubmit">
            <span v-if="addUpdateBookLoading" class="spinner-border spinner-border-sm"/>
            {{ book?.id ? 'Cập nhật' : 'Thêm' }}
          </button>
          <button type="button"
            class="btn btn-secondary btn-sm rounded-0"
            data-dismiss="modal"
            id="close-modal-book"
            @click="closeModal">Đóng</button>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.error {
  font-size: 12px;
}
</style>