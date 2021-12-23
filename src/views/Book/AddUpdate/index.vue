<script lang="ts">
import { defineComponent, ref, inject, PropType, watch } from "vue";
import { useStore } from "vuex";
import UseBook from "../UseBook";
import { notify } from "@kyvg/vue3-notification";
import { BookInterface, CategoryInterface } from "../../Type/index";
import { base } from "@/services/base";
import moment from "moment";
import SelectComponent from "../../Components/Select/index.vue"
import useFunction from "../../Type/Function"

type contentType = {
  id: number | null,
  title: string,
  content: string
}

export default defineComponent({
  name: "AddUpdateBook",
  components: {
    SelectComponent
  },
  props: {
    itemBook: {
      type: Object as PropType<BookInterface>
    }
  },
  setup(props) {
    const store = useStore();
    const { createAlias } = useFunction();
    const { addUpdateBookLoading, addBook, updateBook } = UseBook();
    const handleGetBookList = inject<() => void>("handleGetBookList");
    const resetItemBook = inject<() => void>("resetItemBook");
    const textSearch = inject('textSearch') as any;
    const handleSearchBook = inject<() => void>("handleSearchBook");
    const { URL_IMAGE } = base();
    const book = ref();

    const title = ref();
    const describe = ref();
    const language = ref('Tiếng việt');
    const release_time = ref();
    const cover_image = ref();
    const producer = ref();
    const author_id = ref();
    const mp3 = ref();
    const category_id = ref();
    const status = ref(1);
    const alias = ref();
    const content = ref<contentType[]>([]);
    const categoryList = ref();
    const authorList = ref();
    const textShowCategory = ref('Chọn loại sách...');
    const textShowAuthor = ref('Chọn tác giả...');

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
      status: '',
      alias: ''
    }); 

    const addContent = () => {
      content.value.push({id: null, title: '', content: ''});
    }

    const searchBookCategory = (value: CategoryInterface) => {
      category_id.value = value?.id;
    }

    const searchAuthor = (value: CategoryInterface) => {
      author_id.value = value?.id;
    }

    watch(() => props.itemBook, (newItem, oldItem) => {
      book.value = newItem;
      if (book.value?.id) {
        title.value = newItem?.title;
        describe.value = newItem?.describe;
        language.value = '' + newItem?.language;
        release_time.value = moment(newItem?.release_time).format('YYYY-MM-DD');
        cover_image.value = newItem?.cover_image;
        producer.value = newItem?.producer;
        author_id.value = newItem?.author?.id;
        alias.value = newItem?.alias;
        textShowCategory.value = '' + newItem?.category?.name;
        textShowAuthor.value = '' + newItem?.author?.fullname;
        
        if (newItem?.content) {
          content.value = newItem?.content;
        }
        mp3.value = newItem?.mp3;
        category_id.value = newItem?.category?.id;
        status.value = Number(newItem?.status);

        if (cover_image.value) {
          coverPreview.value = URL_IMAGE + cover_image.value;
        }
        if (mp3.value) {
          mp3_preview.value = URL_IMAGE + mp3.value;
        }
      }
      
    })

    const onSubmit = () => {  
      checkTitle();
      checkAlias();
      checkAuthor();
      checkCategory();
      checkReleaseTime();

      if (language.value != "Tiếng việt" && language.value != "Tiếng anh") {
        error.value.language = "Vui lòng chọn tiếng việt hoặc tiếng anh";
      } else {
        error.value.language = "";
      }

      if (status.value != 0 && status.value != 1) {
        error.value.status = "Trạng thái lựa chọn không hợp lệ";
      } else {
        error.value.status = "";
      }

      if (error.value.title == "" && error.value?.alias == "" && error.value.author_id == "" && error.value.language == "" && error.value.release_time == "" && error.value.category_id == "" && error.value.status == "" && error.value.mp3 == "" && error.value.cover_image == "") {
        const formData = new FormData();
        formData.append('title', title.value);
        formData.append('describe', describe.value);
        formData.append('language', language.value);
        formData.append('release_time', release_time.value);
        formData.append('cover_image', cover_image.value);
        formData.append('producer', producer.value);
        formData.append('author_id', author_id.value);
        formData.append('mp3', mp3.value);
        formData.append('category_id', category_id.value);
        formData.append('status', '' + status.value);
        formData.append('alias', alias.value);
        formData.append('username', store.state.user.username);
        formData.append('content', JSON.stringify(content.value));

        if (book.value?.id) {
          updateBook(book.value?.id, formData).then(function(response) {
            addUpdateBookLoading.value = true;
            notify({
              title: response?.data?.message,
              type: "success"
            });

            if (textSearch?.value == "") {
              if(handleGetBookList) {
                handleGetBookList();
              }
            } else {
              if (handleSearchBook) {
                handleSearchBook();
              }
            }
            
            document.getElementById("close-modal-book")?.click();
          }).catch(function(error) {
            addUpdateBookLoading.value = false;
            notify({
              title: error?.response?.data?.errors?.title[0],
              type: "warn"
            });
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
          notify({
            title: error?.response?.data?.errors?.title[0],
            type: "warn"
          });
        }).finally(function() {
          addUpdateBookLoading.value = false;
        })
        }
      }
    }


    const closeModal = () => {
      if (resetItemBook) {
        resetItemBook();
      }
      textShowCategory.value = "Chọn loại sách...";
      textShowAuthor.value = "Chọn tác giả...";
      mp3_name_preview.value = "";
      mp3_preview.value = "";
      book.value = "";
      title.value = "";
      describe.value = "";
      language.value = "Tiếng việt";
      release_time.value = "";
      cover_image.value = "";
      producer.value = "";
      author_id.value = "";
      content.value = [];
      mp3.value = "";
      category_id.value = "";
      status.value =  1;
      alias.value = "";

      error.value = {
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
        status: '',
        alias: ''
      };
    }

    const coverPreview = ref();
    const mp3_preview = ref('');
    const handleChangeCover = (event: any) => {
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

    const checkTitle = () => {
      if (title.value == "" || title.value == null) {
        error.value.title = "Tên sách là bắt buộc";
      } else {
        error.value.title = "";
      }
    }

    const checkAlias = () => {
      if (alias.value == "" || alias.value == null) {
        error.value.alias = "Đường dẫn là bắt buộc";
      } else {
        error.value.alias = "";
      }
    }

    const checkAuthor = () => {
      if (author_id.value == "" || author_id.value == null || Number(author_id.value) <= 0) {
        error.value.author_id = "Tác giả là bắt buộc";
      } else {
        error.value.author_id = "";
      }
    }

    const checkCategory = () => {
      if (category_id.value == "" || category_id.value == null || Number(category_id.value) <= 0) {
        error.value.category_id = "Loại sách là bắt buộc";
      } else {
        error.value.category_id = "";
      }
    }

    const checkReleaseTime = () => {
      if (release_time.value == "" || release_time.value == null  ) {
        error.value.release_time = "Thời gian phát hành là bắt buộc";
      } else {
        error.value.release_time = "";
      }
    }

    return {
      searchBookCategory,
      searchAuthor,
      addContent,
      handleChangeCover,
      handleChangeMp3,
      onSubmit,
      checkTitle,
      checkAuthor,
      checkCategory,
      checkReleaseTime,
      closeModal,
      authorList, addUpdateBookLoading, book,
      coverPreview, mp3_preview, content,
      mp3_name_preview, categoryList,
      title, describe, language,
      release_time, cover_image,
      producer, author_id, mp3,
      category_id, status, error,
      textShowCategory, textShowAuthor,
      checkAlias, alias,
      createAlias
    }
  },
  methods: {
    handleCreateAlias() {
      this.alias = this.createAlias(this.title);
    }
  }
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
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for=""><b>Tên sách </b><span class="text-danger">*</span></label>
                <input type="text" class="form-control" v-model="title" @keyup="checkTitle" @blur="handleCreateAlias">
                <div class="pt-2">
                  <i class="text-danger error">{{ error?.title }}</i>
                </div>
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group">
                <label for=""><b>Ngôn ngữ </b><span class="text-danger">*</span></label><br>
                <div class="form-check-inline">
                  <label class="form-check-label">
                    <input type="radio" class="form-check-input" value="Tiếng việt" v-model="language">Tiếng việt
                  </label>
                </div>
                <div class="form-check-inline">
                  <label class="form-check-label">
                    <input type="radio" class="form-check-input" value="Tiếng anh" v-model="language">Tiếng anh
                  </label>
                </div>
                <div class="pt-2">
                  <i class="text-danger error">{{ error?.language }}</i>
                </div>
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group">
                <label for=""><b>Đường dẫn </b><span class="text-danger">*</span></label>
                <input type="text" class="form-control" v-model="alias" @keyup="checkAlias">
                <div class="pt-2">
                  <i class="text-danger error">{{ error?.alias }}</i>
                </div>
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group">
                <label for=""><b>Loại sách </b><span class="text-danger">*</span></label>
               <SelectComponent
                  :url="'category/search?name='"
                  @changeValue="searchBookCategory"
                  :text="textShowCategory"
                  :variable="'name'"  
                />
                <div class="pt-2">
                  <i class="text-danger error">{{ error?.category_id }}</i>
                </div>
              </div>
            </div>

             <div class="col-md-6">
              <div class="form-group">
                <label for=""><b>Tác giả </b><span class="text-danger">*</span></label>
                <SelectComponent
                  :url="'author/search?fullname='"
                  @changeValue="searchAuthor"
                  :text="textShowAuthor"
                  :variable="'fullname'"
                />
                <div class="pt-2">
                  <i class="text-danger error">{{ error?.author_id }}</i>
                </div>
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group">
                <label for=""><b>Nhà xuất bản </b></label>
                <input type="text" class="form-control" v-model="producer">
                <div class="pt-2">
                  <i class="text-danger error">{{ error?.producer }}</i>
                </div>
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group">
                <label for=""><b>Thời gian phát hành </b><span class="text-danger">*</span></label>
                <input type="date" class="form-control" v-model="release_time" @change="checkReleaseTime">
                <div class="pt-2">
                  <i class="text-danger error">{{ error?.release_time }}</i>
                </div>
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group">
                <label for=""><b>Bìa sách </b></label><br>
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
                <label for=""><b>mp3 </b></label><br>
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

            <div class="col-md-6">
              <div class="form-group">
                <label for=""><b>Trạng thái </b><span class="text-danger">*</span></label><br>
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

            <div class="col-md-12">
              <div class="form-group">
                <label for=""><b>Mô tả </b></label>
                <textarea class="form-control" v-model="describe" rows="3" @keyup="checkDescribe"></textarea>
                <div class="pt-2">
                  <i class="text-danger error">{{ error?.describe }}</i>
                </div>
              </div>
            </div>

            <div class="col-md-12">
              <div class="form-group">
                <label for=""><b>Phần / Chương </b></label><br>
                <div class="ml-2 mr-2" v-for="(item, index) in content" :key="index">
                  <label for="" class="ml-2  mt-3">Tiêu đề {{ index + 1 }}</label>
                  <input type="text" class="form-control" v-model="content[index].title">
                  <label for="" class="ml-2 mt-3">Nội dung {{ index + 1 }}</label>
                  <textarea class="form-control" rows="5" v-model="content[index].content"></textarea>
                </div>
                <div class="text-center">
                  <button class="btn btn-info" @click="addContent">+</button>
                </div>
                <div class="pt-2">
                  <i class="text-danger error">{{ error?.content }}</i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button"
            class="btn btn-info btn-sm"
            @click="onSubmit">
            <span v-if="addUpdateBookLoading" class="spinner-border spinner-border-sm"/>
            {{ book?.id ? 'Cập nhật' : 'Thêm' }}
          </button>
          <button type="button"
            class="btn btn-secondary btn-sm"
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