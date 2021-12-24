<script lang="ts">
import { defineComponent, ref, provide } from "vue";
import UseCategory from "./UseCategory";
import { notify } from "@kyvg/vue3-notification";
import moment from "moment";
import AddUpdate from "./AddUpdate/index.vue"
import DeleteCategory from "./DeleteCategory/index.vue"
import Pagination from "../Components/Pagination/index.vue";
import router from "../../router"
import { Icon } from '@iconify/vue';
export default defineComponent({
  components: {
    AddUpdate,
    Pagination,
    DeleteCategory,
    Icon
  },
  setup() {
    const { getCategoryList, searchCategoryLoading, getCategoryListSearch } = UseCategory();
    const currentPage = ref(Number(router.currentRoute.value.params.page));
    const categoryList = ref(1);
    const textSearch = ref('');
    
    const handleGetCategoryList = () => {
      getCategoryList(currentPage.value).then(function(response) {
        categoryList.value = response.data.data;
      }).catch(function(error){
        notify({
          title: error?.response?.data?.errors,
          type: "warn"
        });
      })
    }
    handleGetCategoryList();
    const handleChangePage = (page : number) => {
      currentPage.value = page;
      if (textSearch.value == "") {
        handleGetCategoryList();
      } else {
        handleSearch();
      }
    }

    const itemCategory = ref();
    const selectCategory = (item: any) => {
      itemCategory.value = item;
    }

    const resetItemCategory = () => {
      itemCategory.value = null
    }

    const handleSearch = () => {
      getCategoryListSearch(textSearch.value, currentPage.value).then(response => {
        categoryList.value = response.data.data;
      }).catch(function(error){
        notify({
          title: error?.response?.data?.errors,
          type: "warn"
        });
        searchCategoryLoading.value = false;
      }).finally (() => {
        searchCategoryLoading.value = false;
      })
    }

    provide("textSearch", textSearch);
    provide("handleSearch", handleSearch);
    provide("handleGetCategoryList", handleGetCategoryList);
    provide("handleChangePage", handleChangePage);
    provide("resetItemCategory", resetItemCategory);
    return {
      categoryList,
      handleChangePage,
      selectCategory,
      itemCategory,
      textSearch,
      handleSearch,
      handleGetCategoryList,
      searchCategoryLoading
    }
  },
  methods: {
    formatDate(date: Date) {
      return moment(date).format("HH:mm, DD-MM-YYYY");
    },
    cancelSearch () {
      this.textSearch = "";
      this.handleGetCategoryList();
    }
  }
})
</script>


<template>
  <div class="category">
    <h4>Danh sách loại sách</h4>

    <div class="row">
      <div class="col-md-4 col-sm-9 col-12">
        <div class="input-group mb-2">
          <input type="text" class="form-control-sm form-control" v-model="textSearch" placeholder="Nhập tên...">
          <div class="input-group-append">
            <button class="btn btn-info btn-sm mr-1" @click="handleSearch">
              <span v-if="searchCategoryLoading" class="spinner-border spinner-border-sm"/>
              <span v-else><Icon icon="bx:bx-search" width="16" /></span>
            </button>
          </div>
          <button class="btn btn-secondary btn-sm" @click="cancelSearch">Hủy</button>
        </div>
      </div>
      <div class="col-md-8 col-sm-3 col-12 text-right mb-2">
        <button class="btn btn-info btn-sm rounded-0" data-toggle="modal" data-target="#add-update-category-id">Thêm</button>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table table-striped table-hover">
        <thead style="color: #252f3b">
          <th>Tên loại sách</th>
          <th>Người tạo</th>
          <th>Đường dẫn</th>
          <th>Thời gian tạo</th>
          <th>Thao tác</th>
        </thead>
        <tbody>
          <tr v-for="item in categoryList?.data" :key="item.id">
            <td>{{ item.name }}</td>
            <td>{{ item.username }}</td>
            <td>{{ item.alias }}</td>
            <td>{{ formatDate(item.created_at) }}</td>
            <td>
              <b class="text-info mr-2"
                style="cursor: pointer"
                @click="selectCategory(item)"
                data-toggle="modal"
                data-target="#add-update-category-id">Sửa</b>

              <b class="text-danger mr-2"
                style="cursor: pointer"
                @click="selectCategory(item)"
                data-toggle="modal"
                data-target="#delete-category-id">Xóa</b>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagination :dataProp="categoryList.meta" :nameRoute="'Category'"/>
  </div>
  <AddUpdate :itemCategory="itemCategory" />
  <DeleteCategory :itemCategory="itemCategory" />
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

  }
</style>