<script lang="ts">
import { defineComponent, inject, PropType, ref, watch } from 'vue';
import UseCategory from "../UseCategory";
import { notify } from "@kyvg/vue3-notification";
import { CategoryInterface } from "../../Type/index"

export default defineComponent({
  name: "DeleteCategory",
  props: {
    itemCategory: {
      type: Object as PropType<CategoryInterface>
    }
  },
  setup(props) {
    const { deleteCategory, deleteCategoryLoading } = UseCategory();
    const handleGetCategoryList = inject<() => void>("handleGetCategoryList");
    const resetItemCategory = inject<()=> void>("resetItemCategory");

    const category = ref();

    watch(() => props.itemCategory, (item, preItem) => {
      category.value = item;
    })

    const onSubmit = () => {
        if (category.value?.id) {
          deleteCategory(category.value?.id).then(function(response) {
            deleteCategoryLoading.value = true;
            notify({
              title: response?.data?.message,
              type: "success"
            });
            if(handleGetCategoryList) {
              handleGetCategoryList();
            }
            document.getElementById("close-modal-delete-category")?.click();
          }).catch(function(error) {
            deleteCategoryLoading.value = false;
            notify({
              title: error?.response?.data?.errors?.name,
              type: "warn"
            });
          }).finally(function() {
            deleteCategoryLoading.value = false;
          })
        }
    }
    
    const closeModal = () => {
      resetItemCategory
    }

    return {
      deleteCategoryLoading,
      closeModal,
      onSubmit,
      category
    }
  },
})
</script>


<template>
  <div class="modal fade" id="delete-category-id">
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Loại sách</h4>
        </div>
        <div class="modal-body">
          <div>Bạn có muốn xóa <b>{{ category?.name }}</b> không?</div>
        </div>
        <div class="modal-footer">
          <button type="button"
            class="btn btn-danger btn-sm rounded-0"
            @click="onSubmit">
            <span v-if="deleteCategoryLoading" class="spinner-border spinner-border-sm"/>
            Xóa
          </button>
          <button type="button"
            class="btn btn-secondary btn-sm rounded-0"
            data-dismiss="modal"
            id="close-modal-delete-category"
            @click="closeModal">Đóng</button>
        </div>
      </div>
    </div>
  </div>
</template>