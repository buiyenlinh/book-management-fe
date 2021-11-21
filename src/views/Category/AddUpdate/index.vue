<script>
import { defineComponent, inject, ref } from 'vue';
import UseCategory from "../UseCategory";
import { notify } from "@kyvg/vue3-notification";

export default defineComponent({
  setup() {
    const { addCategory, addUpdateCategoryLoading } = UseCategory();
    const handleGetCategoryList = inject("handleGetCategoryList");
    const currentPage = inject("currentPage");
    
    const name = ref();
    const error_name = ref("");
    const onSubmit = () => {
      if (!name.value) {
        error_name.value = "Tên loại truyện là bắt buộc";
      } else {
        const params = { 'name' : name.value }
        addCategory(params).then(function(response) {
          addUpdateCategoryLoading.value = true;
          notify({
            title: response?.data?.message,
            type: "success"
          });
          handleGetCategoryList(currentPage.value);
          document.getElementById("close-modal-category")?.click();
        }).catch(function(error) {
          addUpdateCategoryLoading.value = false;
          notify({
            title: error?.response?.data?.errors?.name,
            type: "warn"
          });
        }).finally(function() {
          addUpdateCategoryLoading.value = false;
        })
      }
    }

    const checkName = () => {
      if (!name.value) {
        error_name.value = "Tên loại truyện là bắt buộc";
      } else {
        error_name.value = "";
      }
    }

    const closeModal = () => {
      name.value = "";
      error_name.value = "";
    }

    return {
      name,
      error_name,
      onSubmit,
      checkName,
      addUpdateCategoryLoading,
      closeModal
    }
  },
})
</script>


<template>
  <div class="modal fade" id="add-update-category-id">
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Loại truyện</h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        <div class="modal-body">
          <form action="">
            <div class="form-group">
              <label for="">Tên loại truyện <span class="text-danger">*</span></label>
              <input type="text" class="form-control rounded-0" v-model="name" @keyup="checkName">
              <div class="pt-2">
                <i class="text-danger">{{ error_name }}</i>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button"
            class="btn btn-info btn-sm rounded-0"
            @click="onSubmit">
            <span v-if="addUpdateCategoryLoading" class="spinner-border spinner-border-sm"/>
            Thêm
          </button>
          <button type="button"
            class="btn btn-secondary btn-sm rounded-0"
            data-dismiss="modal"
            id="close-modal-category"
            @click="closeModal">Đóng</button>
        </div>
      </div>
    </div>
  </div>
</template>