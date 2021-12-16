<script lang="ts">
import { defineComponent, inject, PropType, ref, watch } from "vue";
import { AuthorInterface } from "../../Type/index";
import UseAuthor from "../UseAuthor";
import { notify } from "@kyvg/vue3-notification";
export default defineComponent({
  props: {
    authorSelected: {
      type: Object as PropType<AuthorInterface>
    }
  },
  setup(props) {
    const { deleteAuthor, deleteAuthorLoading } = UseAuthor();
    const author = ref();
    const handleGetAuthorList = inject<() => void>("handleGetAuthorList");
    const handleSearch = inject<() => void>("handleSearch");
    const currentPage = inject("currentPage") as any;
    watch(() => props.authorSelected, (newProp, oldProps) => {
      author.value = props.authorSelected;
    })

    const onSubmit = () => {
      if(author.value?.id) {
        deleteAuthor(author.value?.id).then(function(response) {
          deleteAuthorLoading.value = true;
          notify({
            title: response?.data?.message,
            type: "success"
          });
          document.getElementById("close-modal-author-delete")?.click();
          if (currentPage.value == "") {
            if (handleGetAuthorList) {
                handleGetAuthorList();
            }
          } else {
            if (handleSearch) {
              handleSearch();
            }
          }
        }).catch(function(error) {
          deleteAuthorLoading.value = false;
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
          deleteAuthorLoading.value = false;
        })
      }
    }

    const closeModal = () => {
      console.log("Close");
      author.value = "";
    }
    return {
      deleteAuthorLoading,
      author,
      onSubmit,
      closeModal
    }
  },
})
</script>


<template>
<div class="modal fade" id="delete-author-id">
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Tác giả</h4>
        </div>
        <div class="modal-body">
          <div>Bạn có muốn xóa tác giả <b>{{ author?.fullname }}</b> không?</div>
        </div>
        <div class="modal-footer">
          <button type="button"
            class="btn btn-danger btn-sm rounded-0"
            @click="onSubmit">
            <span v-if="deleteAuthorLoading" class="spinner-border spinner-border-sm"/>
            Xóa
          </button>
          <button type="button"
            class="btn btn-secondary btn-sm rounded-0"
            data-dismiss="modal"
            id="close-modal-author-delete"
            @click="closeModal">Đóng</button>
        </div>
      </div>
  </div>
</div>
</template>