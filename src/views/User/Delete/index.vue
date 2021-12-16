<script lang="ts">
import { defineComponent, inject, PropType, ref, watch } from "vue";
import { UserInterface } from "../../Type/index";
import UseUser from "../UseUser";
import { notify } from "@kyvg/vue3-notification";
export default defineComponent({
  props: {
    userSelect: {
      type: Object as PropType<UserInterface>
    }
  },
  setup(props) {
    const { deleteUser, deleteUserLoading } = UseUser();
    const user = ref();
    const handleGetUserList = inject<() => void>("handleGetUserList");
    const handleSearch  = inject<() => void>("handleSearch");
    const textSearch = inject("textSearch") as any;
    watch(() => props.userSelect, (newProp, oldProps) => {
      user.value = props.userSelect;
    })

    const onSubmit = () => {
      if(user.value?.id) {
        deleteUser(user.value?.id).then(function(response) {
          deleteUserLoading.value = true;
          notify({
            title: response?.data?.message,
            type: "success"
          });
          document.getElementById("close-modal-user-delete")?.click();
          if (textSearch.value == "") {
            if(handleGetUserList) {
              handleGetUserList();
            }
          } else {
            if (handleSearch) {
              handleSearch();
            }
          }
        }).catch(function(error) {
          deleteUserLoading.value = false;
          if (error?.response?.data?.errors?.user) {
              notify({
                title: error?.response?.data?.errors?.user,
                type: "warn"
              });
            }
        }).finally(function () {
          deleteUserLoading.value = false;
        })
      }
    }

    const closeModal = () => {
      console.log("Close");
    }
    return {
      deleteUserLoading,
      user,
      onSubmit,
      closeModal
    }
  },
})
</script>


<template>
<div class="modal fade" id="delete-user-id">
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Người dùng</h4>
        </div>
        <div class="modal-body">
          <div>Bạn có muốn xóa người dùng <b>{{ user?.fullname || user?.username }}</b> không?</div>
        </div>
        <div class="modal-footer">
          <button type="button"
            class="btn btn-danger btn-sm"
            @click="onSubmit">
            <span v-if="deleteUserLoading" class="spinner-border spinner-border-sm"/>
            Xóa
          </button>
          <button type="button"
            class="btn btn-secondary btn-sm"
            data-dismiss="modal"
            id="close-modal-user-delete"
            @click="closeModal">Hủy</button>
        </div>
      </div>
  </div>
</div>
</template>