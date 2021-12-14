<script lang="ts">
import { defineComponent, ref, provide } from "vue";
import UseBook from "./UseBook";
import { notify } from "@kyvg/vue3-notification";
import moment from "moment";
import AddUpdate from "./AddUpdate/index.vue";
import WatchBook from "./WatchBook/index.vue";
import DeleteBook from "./Delete/index.vue"
import Pagination from "../Components/Pagination/index.vue";
import router from "../../router"
import { BookInterface } from "../Type/index"
import SelectComponent from "../Components/Select/index.vue"

export default defineComponent({
  components: {
    AddUpdate,
    Pagination,
    DeleteBook,
    WatchBook,
    SelectComponent
  },
  setup() {

    const { getBookList } = UseBook();
    const currentPage = ref(Number(router.currentRoute.value.params.page));
    const bookList = ref(1);

    const handleGetBookList = () => {
      getBookList(currentPage.value).then(function(response) {
        bookList.value = response.data.data;
      }).catch(function(error){
        notify({
          title: error?.response?.data?.errors,
          type: "warn"
        });
      })
    }
    
    handleGetBookList();
    const handleChangePage = (page : number) => {
      currentPage.value = page;
      handleGetBookList();
    }
    const itemBook = ref();
    const selectBook = (item: BookInterface) => {
      itemBook.value = item;
    }

    const resetItemBook = () => {
      itemBook.value = null;
    }
    provide("handleGetBookList", handleGetBookList);
    provide("handleChangePage", handleChangePage);
    provide("resetItemBook", resetItemBook);

    return {
      bookList,
      handleChangePage,
      selectBook,
      itemBook
    }
  },
  methods: {
    formatDate(date: Date) {
      return moment(date).format("HH:mm, DD-MM-YYYY");
    },
    searchAuthor(value: any) {
      console.log(value)
    }
  }
})
</script>


<template>
  <div class="book">
    <h4>Danh sách quyển sách</h4>
    <div class="row">
      <div class="col-md-3 col-sm-4 col-12 search-title-book">
        <div class="input-group mb-3">
          <input type="text" class="form-control-sm form-control" placeholder="Nhập tên sách...">
        </div>
      </div>

      <div class="col-md-3 col-sm-4 col-12 search-author-book">
        <div class="mb-3">
          <SelectComponent :url="'author/search'" @changeValue="searchAuthor" />
        </div>
      </div>

      <div class="col-md-3 col-sm-4 col-12 search-category-book">
        <div class="input-group mb-3">
          <input type="text" class="form-control-sm form-control" placeholder="Nhập loại sách...">
        </div>
      </div>

      <div class="col-md-2 col-sm-4"> 
        <button class="btn btn-info btn-sm">Lọc</button>
      </div>
      <div class=" col-md-1 col-sm-4 add-Book mb-3 text-right">
        <button class="btn btn-info btn-sm" data-toggle="modal" data-target="#add-update-book-id">Thêm</button>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table table-striped table-hover">
        <thead style="color: #252f3b">
          <th>Tên sách</th>
          <th>Tác giả</th>
          <th>Ngôn ngữ</th>
          <th>Nhà xuất bản</th>
          <th>Loại sách</th>
          <th>Người tạo</th>
          <th>Ngày tạo</th>
          <th>Thao tác</th>
        </thead>
        <tbody>
          <tr v-for="item in bookList?.data" :key="item.id">
            <td>{{ item?.title }}</td>
            <td>{{ item?.author?.fullname }}</td>
            <td>{{ item?.language }}</td>
            <td>{{ item?.producer }}</td>
            <td>{{ item?.category?.name }}</td>
            <td>{{ item?.username }}</td>
            <td>{{ formatDate(item.created_at) }}</td>
            <td>
              <b class="text-set-01  mr-2"
                style="cursor: pointer"
                @click="selectBook(item)"
                data-toggle="modal"
                data-target="#watch-book-id">Xem</b>

              <b class="text-info mr-2"
                style="cursor: pointer"
                @click="selectBook(item)"
                data-toggle="modal"
                data-target="#add-update-book-id">Sửa</b>

              <b class="text-danger mr-2"
                style="cursor: pointer"
                @click="selectBook(item)"
                data-toggle="modal"
                data-target="#delete-book-id">Xóa</b>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagination :dataProp="bookList.meta"  :nameRoute="'Book'"/>
  </div>
  <AddUpdate :itemBook="itemBook" />
  <DeleteBook :itemBook="itemBook" />
  <WatchBook :itemBook="itemBook" />
</template>

<style scoped lang="scss">
  .book {
    width: 100%;
    height: 100%;
    background: #fff;
    padding: 15px;
    border-radius: 5px;
    box-shadow: 0px 4px 10px 3px rgba(3, 55, 119, 0.15);
    table thead th {
      text-transform: capitalize;
    }
  }
</style>