<script lang="ts">
import moment from 'moment';
import { defineComponent, provide, ref } from 'vue'
import UseAuthor from "./UseAuthor"
import router from "../../router";
import Pagination from "../Components/Pagination/index.vue"
import { AuthorInterface } from "../Type/index"
import AddUpdateAuthor from "./AddUpdate/index.vue";
import DeleteAuthor from "./Delete/index.vue";
import { notify } from "@kyvg/vue3-notification";
import { Icon } from '@iconify/vue';

export default defineComponent({
  components: {
    Pagination,
    DeleteAuthor,
    AddUpdateAuthor,
    Icon
  },
  setup() {
    const { getAuthorList, getAuthorListSearch, searchAuthorLoading } = UseAuthor();
    const currentPage = ref(Number(router.currentRoute.value.params.page));
    const authorList = ref();
    const authorSelected = ref();
    const textSearch = ref('');
    
    const handleGetAuthorList = () => {
      getAuthorList(currentPage.value).then(function(response) {
        authorList.value = response.data?.data;
      }).catch(function(ex) {
        console.log(ex);
      })
    }

    const handleChangePage = (page : number) => {
      currentPage.value = page;
      handleGetAuthorList();
    }

    handleGetAuthorList();

    const selectAuthor = (value: AuthorInterface) => {
      authorSelected.value = value;
    }
    const resetAuthorSelected = () => {
      authorSelected.value = "";
    }

    const handleSearch = () => {  
      getAuthorListSearch(textSearch.value, currentPage.value).then(response => {
        authorList.value = response.data?.data;
      }).catch (error => {
        searchAuthorLoading.value = false;
         notify({
          title: error?.response?.data?.errors,
          type: "warn"
        });
      }).finally (() => {
        searchAuthorLoading.value = false;
      })
    }

    provide("handleSearch", handleSearch);
    provide("currentPage", currentPage);
    provide("handleGetAuthorList", handleGetAuthorList);
    provide("handleChangePage", handleChangePage);
    provide("resetAuthorSelected", resetAuthorSelected);

    return {
      authorList,
      selectAuthor,
      authorSelected,
      textSearch,
      handleSearch,
      searchAuthorLoading,
      handleGetAuthorList,
      currentPage
    }
  },
  methods: {
    formatDate (date: Date) {
      return moment(date).format('DD-MM-YYYY');
    },
    cancelSearch () {
      this.textSearch = "";
      this.handleGetAuthorList();
    }
  }
})
</script>


<template>
  <div class="author">
    <h4>Danh sách tác giả</h4>

     <div class="d-flex justify-content-between">
      <div class="search-author" style="width: 30%">
        <div class="input-group mb-3">
          <input type="text" class="form-control-sm form-control" v-model="textSearch" placeholder="Nhập tên...">
          <div class="input-group-append">
            <button class="btn btn-info btn-sm mr-1" @click="handleSearch">
              <span v-if="searchAuthorLoading" class="spinner-border spinner-border-sm"/>
              <span v-else><Icon icon="bx:bx-search" width="16" /></span>
            </button>
          </div>
          <button class="btn btn-secondary btn-sm" @click="cancelSearch">Hủy</button>
        </div>
      </div>
      <div class="add-author">
        <button class="btn btn-info btn-sm" data-toggle="modal" data-target="#add-update-author-id">Thêm</button>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table table-striped table-hover">
        <thead style="color: #252f3b">
          <th style="min-width: 200px">Họ tên</th>
          <th>Giới thiệu</th>
          <th style="min-width: 150px">Ngày tạo</th>
          <th>Thao tác</th>
        </thead>
        <tbody>
          <tr v-for="item in authorList?.data" :key="item.id">
            <td>{{ item?.fullname }}</td>
            <td>{{ item?.introduce }}</td>
            <td>
              <span v-if="item.created_at != null">{{ formatDate(item.created_at) }}</span>
            </td>
            <td>
              <b class="text-info mr-2"
                style="cursor: pointer"
                @click="selectAuthor(item)"
                data-toggle="modal"
                data-target="#add-update-author-id">Sửa</b>

              <b class="text-danger mr-2"
                style="cursor: pointer"
                @click="selectAuthor(item)"
                data-toggle="modal"
                data-target="#delete-author-id">Xóa</b>
            </td>
          </tr>
          <div class="p-2" v-if="authorList?.data?.length == 0">Không có dữ liệu</div>
        </tbody>
      </table>
    </div>
    <Pagination :dataProp="authorList?.meta"  :nameRoute="'Author'"/>
  </div>
  <AddUpdateAuthor :authorSelected="authorSelected" />
  <DeleteAuthor :authorSelected="authorSelected" />
</template>
