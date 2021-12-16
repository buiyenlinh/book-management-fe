<script lang="ts">
import { defineComponent, inject, PropType, ref, watch } from "vue";
import { BookInterface } from "../../Type/index";
import UseBook from "../UseBook";
import { notify } from "@kyvg/vue3-notification";
export default defineComponent({
  props: {
    itemBook: {
      type: Object as PropType<BookInterface>
    }
  },
  setup(props) {
    const { deleteBook, deleteBookLoading } = UseBook();
    const book = ref();
    const handleGetBookList = inject<() => void>("handleGetBookList");
    watch(() => props.itemBook, (newProp, oldProps) => {
      book.value = props.itemBook;
    })

    const onSubmit = () => {
      if(book.value?.id) {
        deleteBook(book.value?.id).then(function(response) {
          deleteBookLoading.value = true;
          notify({
            title: response?.data?.message,
            type: "success"
          });
          document.getElementById("close-modal-book-delete")?.click();
          if(handleGetBookList) {
            handleGetBookList();
          }
        }).catch(function(error) {
          deleteBookLoading.value = false;
          if (error?.response?.data?.errors) {
              notify({
                title: error?.response?.data?.errors,
                type: "warn"
              });
            } else {
              notify({
                title: error?.response?.data?.errors?.title[0],
                type: "warn"
              });
            }
        }).finally(function () {
          deleteBookLoading.value = false;
        })
      }
    }

    const closeModal = () => {
      console.log("Close");
    }
    return {
      deleteBookLoading,
      book,
      onSubmit,
      closeModal
    }
  },
})
</script>


<template>
<div class="modal fade" id="delete-book-id">
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Sách</h4>
        </div>
        <div class="modal-body">
          <div>Bạn có muốn xóa sách <b>{{ book?.title }}</b> không?</div>
        </div>
        <div class="modal-footer">
          <button type="button"
            class="btn btn-danger btn-sm"
            @click="onSubmit">
            <span v-if="deleteBookLoading" class="spinner-border spinner-border-sm"/>
            Xóa
          </button>
          <button type="button"
            class="btn btn-secondary btn-sm"
            data-dismiss="modal"
            id="close-modal-book-delete"
            @click="closeModal">Đóng</button>
        </div>
      </div>
  </div>
</div>
</template>