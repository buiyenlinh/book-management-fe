<script lang="ts">
import { defineComponent, ref, provide } from "vue";
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

export default defineComponent({
  components: {
    AddUpdateUser,
    Pagination,
    DeleteBook
  },
  setup() {
    const store = useStore();
    const { getUserList } = UseUser();
    const currentPage = ref(Number(router.currentRoute.value.params.page));
    const userList = ref(1);
    const userSelect = ref();
    const { URL_IMAGE } = base();

    const userRoleLogin = ref();

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
      handleGetUserList();
    }

    const handleSelectUser = (item: BookInterface) => {
      userSelect.value = item;
    }

    const resetUserSelect = () => {
      userSelect.value = null;
    }
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
      userRoleLogin
    }
  },
  methods: {
    formatDate(date: Date) {
      return moment(date).format("HH:mm, DD-MM-YYYY");
    }
  }
})
</script>


<template>
  <div class="user">
    <h4>Danh sách người dùng</h4>
     <div class="d-flex justify-content-between">
      <div class="search-Book" style="width: 30%">
        <div class="input-group mb-3">
          <input type="text" class="form-control-sm form-control rounded-0" placeholder="Nhập tên...">
          <div class="input-group-append">
            <button class="btn btn-info rounded-0 btn-sm">Tìm</button>
          </div>
        </div>
      </div>
      <div class="add-Book">
        <button class="btn btn-info btn-sm rounded-0" data-toggle="modal" data-target="#add-update-user-id">Thêm</button>
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