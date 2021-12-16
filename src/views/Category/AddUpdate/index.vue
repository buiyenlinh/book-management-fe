<script lang="ts">
import { defineComponent, inject, PropType, ref, watch } from 'vue';
import UseCategory from "../UseCategory";
import { notify } from "@kyvg/vue3-notification";
import { CategoryInterface } from "../../Type/index"

export default defineComponent({
  props: {
    itemCategory: {
      type: Object as PropType<CategoryInterface>
    }
  },
  setup(props) {
    const { addCategory, addUpdateCategoryLoading, updateCategory } = UseCategory();
    const handleGetCategoryList = inject<() => void>("handleGetCategoryList");
    const resetItemCategory = inject<()=> void>("resetItemCategory");
    const handleSearch = inject<() => void>("handleSearch");
    const textSearch = inject("textSearch") as any;

    const name = ref();
    const error_name = ref("");
    const category = ref();

    watch(() => props.itemCategory, (item, preItem) => {
      category.value = item;
      name.value = category.value?.name;
    })

    const onSubmit = () => {
      if (!name.value) {
        error_name.value = "Tên loại sách là bắt buộc";
      } else {
        const params = { 'name' : name.value }
        if (category.value?.id) {
          updateCategory(category.value?.id, params).then(function(response) {
            addUpdateCategoryLoading.value = true;
            notify({
              title: response?.data?.message,
              type: "success"
            });

            if (textSearch.value == "") {
              if(handleGetCategoryList) {
                handleGetCategoryList();
              }
            } else {
              if (handleSearch) {
                handleSearch();
              }
            }

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
        } else {
          addCategory(params).then(function(response) {
            addUpdateCategoryLoading.value = true;
            notify({
              title: response?.data?.message,
              type: "success"
            });
            if (textSearch.value == "") {
              if(handleGetCategoryList) {
                handleGetCategoryList();
              }
            } else {
              if (handleSearch) {
                handleSearch();
              }
            }
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
    }

    const checkName = () => {
      if (!name.value) {
        error_name.value = "Tên loại sách là bắt buộc";
      } else {
        error_name.value = "";
      }
    }

    const closeModal = () => {
      name.value = "";
      error_name.value = "";
      category.value = null;
      if (resetItemCategory) {
        resetItemCategory();
      }
    }

    return {
      name,
      error_name,
      onSubmit,
      checkName,
      addUpdateCategoryLoading,
      closeModal,
      category
    }
  },
})
</script>


<template>
  <div class="modal fade" id="add-update-category-id">
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Loại sách</h4>
        </div>
        <div class="modal-body">
          <form action="">
            <div class="form-group">
              <label for="">Tên loại sách <span class="text-danger">*</span></label>
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
            {{ category?.id ? 'Cập nhật' : 'Thêm' }}
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