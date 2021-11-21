<script lang="ts">
import { defineComponent, ref, provide } from "vue";
import UseCategory from "./UseCategory";
import { notify } from "@kyvg/vue3-notification";
import moment from "moment";
import AddUpdate from "./AddUpdate/index.vue"
import Pagination from "../Components/Pagination/index.vue";

export default defineComponent({
  components: {
    AddUpdate,
    Pagination
  },
  setup() {
    const { getCategoryList } = UseCategory();
    const currentPage = ref(1);
    const categoryList = ref(1);

    
    const handleGetCategoryList = (page: number) => {
      getCategoryList(page).then(function(response) {
        categoryList.value = response.data.data;
      }).catch(function(error){
        notify({
          title: error?.response?.data?.errors,
          type: "warn"
        });
      })
    }
    handleGetCategoryList(currentPage.value);
    const handleChangePage = (page : number) => {
      currentPage.value = page;
      handleGetCategoryList(currentPage.value);
    }

    provide("handleGetCategoryList", handleGetCategoryList);
    provide("currentPage", currentPage);
    provide("handleChangePage", handleChangePage);
    return {
      categoryList,
      handleChangePage
    }
  },
  methods: {
    formatDate(date: Date) {
      return moment(date).format("HH:mm - DD/MM/YYYY");
    }
  }
})
</script>


<template>
  <div class="category">
    <h4>Danh sách loại sách</h4>

    <div class="d-flex justify-content-between">
      <div class="search-category" style="width: 30%">
        <div class="input-group mb-3">
          <input type="text" class="form-control-sm form-control rounded-0" placeholder="Nhập tên...">
          <div class="input-group-append">
            <button class="btn btn-info rounded-0 btn-sm">Tìm</button>
          </div>
        </div>
      </div>
      <div class="add-category">
        <button class="btn btn-info btn-sm rounded-0" data-toggle="modal" data-target="#add-update-category-id">Thêm</button>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table table-striped table-hover">
        <thead style="color: #252f3b">
          <th>Tên loại sách</th>
          <th>Người tạo</th>
          <th>Thời gian tạo</th>
          <th>Cập nhật lần cuối</th>
          <th>Thao tác</th>
        </thead>
        <tbody>
          <tr v-for="item in categoryList?.data" :key="item.id">
            <td>{{ item.name }}</td>
            <td>{{ item.username }}</td>
            <td>{{ formatDate(item.created_at) }}</td>
            <td>{{ formatDate(item.updated_at) }}</td>
            <td>
              <b class="text-info mr-2">Sửa</b>
              <b class="text-danger">Xóa</b>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagination :dataProp="categoryList"/>
  </div>
  <AddUpdate/>
</template>

<style scoped lang="scss">
  .category {
    width: 100%;
    height: 100%;
    background: #fff;
    padding: 15px;
    border-radius: 5px;
    box-shadow: 0px 4px 10px 3px rgba(3, 55, 119, 0.15);
    table thead th {
      text-transform: capitalize;
    }

    .prevent-click {
      pointer-events: none;
      a {
        background: #d3d0d0;
      }
    }
  }
</style>