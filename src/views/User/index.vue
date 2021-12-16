<script lang="ts">
import { defineComponent, ref, provide, watch } from "vue";
import UseUser from "./UseUser";
import { notify } from "@kyvg/vue3-notification";
import moment from "moment";
import AddUpdateUser from "./AddUpdate/index.vue";
import DeleteBook from "./Delete/index.vue";
import Pagination from "../Components/Pagination/index.vue";
import router from "../../router";
import { BookInterface } from "../Type/index";
import { base } from "@/services/base";
import { useStore } from "vuex";
// import { Icon } from '@iconify/vue';

export default defineComponent({
  components: {
    AddUpdateUser,
    Pagination,
    DeleteBook,
    // Icon
  },
  setup() {
    const store = useStore();
    const { getUserList, searchUserLoading, searchUser } = UseUser();
    const currentPage = ref(Number(router.currentRoute.value.params.page));
    const userList = ref(1);
    const userSelect = ref();
    const { URL_IMAGE } = base();
    const textSearch = ref("");
    const searchFullname = ref("");
    const searchGender = ref("");

    const userRoleLogin = ref();
    watch(() => store.state.user, (newInfo, oldInfo) => {
      userRoleLogin.value = Number(newInfo?.role?.level);
    })
    const handleGetUserList = () => {
      userRoleLogin.value = Number(store.state.user?.role?.level);
      getUserList(currentPage.value).then(function(response) {
        userList.value = response.data.data;
      }).catch(function(error){
        notify({
          title: error?.response?.data?.errors,
          type: "warn"
        });
      })
    }
    
    handleGetUserList();
    const handleChangePage = (page : number) => {
      currentPage.value = page;
      if (textSearch.value != "") {
        handleSearch();
      } else {
        handleGetUserList();
      }
    }

    const handleSelectUser = (item: BookInterface) => {
      userSelect.value = item;
    }

    const resetUserSelect = () => {
      userSelect.value = null;
    }

    const handleSearch = () => {
      textSearch.value = "";
      if (searchFullname.value != "") {
        textSearch.value += 'fullname=' + searchFullname.value;
      }

      if (searchGender.value != "") {
        if (textSearch.value != "") {
          textSearch.value += "&";
        }
        textSearch.value += 'gender=' + searchGender.value;
      }

      searchUser(textSearch.value, currentPage.value).then(response => {
        userList.value = response.data.data;
      }).catch (error => {
        searchUserLoading.value = false;
        notify({
          title: error?.response?.data?.errors,
          type: "warn"
        });
      }).finally (() => {
        searchUserLoading.value = false;
      })
    }

    provide("textSearch", textSearch);
    provide("handleSearch", handleSearch);
    provide("handleGetUserList", handleGetUserList);
    provide("handleChangePage", handleChangePage);
    provide("userSelect", userSelect);
    provide("resetUserSelect", resetUserSelect);
    return {
      userList,
      handleChangePage,
      handleSelectUser,
      userSelect,
      URL_IMAGE,
      userRoleLogin,
      handleSearch,
      textSearch,
      searchUserLoading,
      searchFullname,
      searchGender,
      handleGetUserList,
      currentPage
    }
  },
  methods: {
    formatDate(date: Date) {
      return moment(date).format("HH:mm, DD-MM-YYYY");
    },
    cancelSearch () {
      this.textSearch = "";
      this.searchFullname = "";
      this.searchGender = "";
      this.currentPage = 1;
      this.handleGetUserList();
    }
  }
})
</script>


<template>
  <div class="user">
    <h4>Danh sách người dùng</h4>
     <div class="row">
      <div class="col-md-3 col-sm-6 col-12">
         <div class="mb-2">
          <input type="text" class="form-control-sm form-control" v-model="searchFullname" placeholder="Nhập họ tên...">
        </div>
      </div>
      <div class="col-md-3 col-sm-6 col-12 mb-2">
        <select v-model="searchGender" class="form-control form-control-sm" placeholder="Chọn giới tính...">
          <option value="F">Nữ</option>
          <option value="M">Nam</option>
          <option value="N">N/A</option>
        </select>
      </div>
      <div class="col-md-3 col-sm-6 col-6">
        <button class="btn btn-info btn-sm mr-1 mb-2" @click="handleSearch">
          Lọc
          <span v-if="searchUserLoading" class="spinner-border spinner-border-sm"/>
        </button>
        <button class="btn btn-secondary btn-sm mb-2" @click="cancelSearch">Hủy</button>
      </div>  
      <div class="col-md-3 col-sm-6 col-6 text-right mb-2">
        <button class="btn btn-info btn-sm" data-toggle="modal" data-target="#add-update-user-id">Thêm</button>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table table-striped table-hover">
        <thead style="color: #252f3b">
          <th>Họ tên</th>
          <th>Tên đăng nhập</th>
          <th>Vai trò</th>
          <th>Trạng thái</th>
          <th>Ngày tạo</th>
          <th>Cập nhật lần cuối</th>
          <th>Thao tác</th>
        </thead>
        <tbody>
          <tr v-for="item in userList?.data" :key="item.id">
            <td>{{ item?.fullname }}</td>
            <td>{{ item?.username }}</td>
            <td>{{ item?.role.name }}</td>
            <td>{{ item?.active ? 'Kích hoạt' : 'Khóa' }}</td>
            <td>{{ formatDate(item?.created_at) }}</td>
            <td>{{ formatDate(item?.updated_at) }}</td>
            <td>
              <span v-if="userRoleLogin < Number(item?.role.level)">
                <b class="text-info mr-2"
                  style="cursor: pointer"
                  @click="handleSelectUser(item)"
                  data-toggle="modal"
                  data-target="#add-update-user-id">Sửa</b>

                <b class="text-danger mr-2"
                  style="cursor: pointer"
                  @click="handleSelectUser(item)"
                  data-toggle="modal"
                  data-target="#delete-user-id">Xóa</b>
                </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagination :dataProp="userList.meta"  :nameRoute="'User'"/>
  </div>
  <AddUpdateUser :userSelect="userSelect" />
  <DeleteBook :userSelect="userSelect" />
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