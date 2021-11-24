<script lang="ts">
import { defineComponent, ref } from 'vue'
import UseBook from "../UseBook"
import { BookInterFace } from "../../Type/index"

export default defineComponent({
  setup() {
    const { addUpdateBookLoading, addBook, updatebook } = UseBook();
    const book = ref();
    const title = ref();
    const describe = ref();
    const language = ref();
    const page_total = ref();
    const cover_image = ref();
    const producer = ref();
    const author = ref();
    const content = ref();
    const mp3 = ref();
    const category_id = ref();
    const status = ref();
    const error = ref({
      title: '',
      describe: '',
      language: '',
      page_total: '',
      cover_image: '',
      producer: '',
      author: '',
      content: '',
      mp3: '',
      category_id: '',
    });

    const onSubmit = () => {
      checkTitle();
      checkDescribe();
      checkLanguage();
      checkPage_total();
      checkProducer();
      checkAuthor();
      checkContent();
      if (title.value && describe.value && language.value && page_total.value && author.value && content.value) {
        console.log("Submit");
      }
    }
    const closeModal = () => {
      console.log("Close");
    }

    const checkTitle = () => {
      if (title.value == "" || title.value == null) {
        error.value.title = "Tên sách là bắt buộc";
      } else {
        error.value.title = "";
      }
    }

    const checkDescribe = () => {
      if (describe.value == "" || describe.value == null) {
        error.value.describe = "Mô tả là bắt buộc";
      } else {
        error.value.describe = "";
      }
    }

    const checkLanguage = () => {
      if (language.value == "" || language.value == null) {
        error.value.language = "Ngôn ngữ là bắt buộc";
      } else {
        error.value.language = "";
      }
    }

    const checkPage_total = () => {
      if (page_total.value == "" || page_total.value == null) {
        error.value.page_total = "Tổng số trang là bắt buộc";
      } else {
        error.value.page_total = "";
      }
    }

    const checkProducer = () => {
      if (producer.value == "" || producer.value == null) {
        error.value.producer = "Nhà sản xuất là bắt buộc";
      } else {
        error.value.producer = "";
      }
    }

    const checkAuthor = () => {
      if (author.value == "" || author.value == null) {
        error.value.author = "Tác giả là bắt buộc";
      } else {
        error.value.author = "";
      }
    }

    const checkContent = () => {
      if (content.value == "" || content.value == null) {
        error.value.content = "Nội dung là bắt buộc";
      } else {
        error.value.content = "";
      }
    }

    return {
      addUpdateBookLoading,
      closeModal,
      onSubmit,
      book, title, describe, language, page_total, cover_image, producer,
      author, content, mp3, category_id, status,
      error,
      checkTitle, checkDescribe, checkLanguage, checkPage_total,
      checkProducer, checkAuthor, checkContent
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
                  <label for="">Ngôn ngữ <span class="text-danger">*</span></label>
                  <input type="text" class="form-control" v-model="language" @keyup="checkLanguage">
                  <div class="pt-2">
                    <i class="text-danger error">{{ error?.language }}</i>
                  </div>
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <label for="">Tác giả <span class="text-danger">*</span></label>
                  <input type="text" class="form-control" v-model="author" @keyup="checkAuthor">
                  <div class="pt-2">
                    <i class="text-danger error">{{ error?.author }}</i>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="">Tổng số trang <span class="text-danger">*</span></label>
                  <input type="number" class="form-control" v-model="page_total" @keyup="checkPage_total">
                  <div class="pt-2">
                    <i class="text-danger error">{{ error?.page_total }}</i>
                  </div>
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <label for="">Nhà sản xuất <span class="text-danger">*</span></label>
                  <input type="text" class="form-control" v-model="producer" @keyup="checkProducer">
                  <div class="pt-2">
                    <i class="text-danger error">{{ error?.producer }}</i>
                  </div>
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <label for="">Loại sách <span class="text-danger">*</span></label>
                  <select name="" id="" class="form-control" v-model="category_id">
                    <option value="">Chọn</option>
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
                      <input type="radio" class="form-check-input" value="1" v-model="status" checked="true">Kích hoạt
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
                  <input type="file">
                  <div class="pt-2">
                    <i class="text-danger error">{{ error?.cover_image }}</i>
                  </div>
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <label for="">mp3 <span class="text-danger">*</span></label><br>
                  <input type="file">
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
                  <label for="">Nội dung <span class="text-danger">*</span></label>
                  <textarea class="form-control" rows="5" v-model="content" @keyup="checkContent"></textarea>
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