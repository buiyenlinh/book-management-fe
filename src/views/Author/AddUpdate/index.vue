<script lang="ts">
import { AuthorInterface } from '@/views/Type/index'
import { defineComponent, inject, PropType, ref, watch } from 'vue'
import UseAuthor from "../UseAuthor";
import { notify } from "@kyvg/vue3-notification";

export default defineComponent({
  props: {
    authorSelected: {
      type: Object as PropType<AuthorInterface>
    }
  },
  setup(props) {
    const { addUpdateAuthorLoading, addAuthor, updateAuthor } = UseAuthor();
    const resetAuthorSelected = inject<() => void>("resetAuthorSelected");
    const handleGetAuthorList = inject<() => void>("handleGetAuthorList");
    const handleSearch = inject<() => void>("handleSearch");
    const currentPage = inject("currentPage") as any;
    const author = ref();
    const fullname = ref();
    const introduce = ref();
    const fullname_error = ref();
    const checkFullname = () => {
      if (fullname.value == null || fullname.value == "" || fullname.value == undefined) {
        fullname_error.value = "Họ tên tác giả là bắt buộc";
      } else {
        fullname_error.value = "";
      }
    }

    const closeModal = () => {
      fullname_error.value = "";
      fullname.value = "";
      introduce.value = "";
      if (resetAuthorSelected) {
        resetAuthorSelected();
      }
    }

    watch(() => props?.authorSelected, (authorNew, authorOld) => {
      author.value = authorNew;
      fullname.value = author.value?.fullname;
      introduce.value = author.value?.introduce;
    })

    const onSubmit = () => {
      const params = {
        'fullname' : fullname.value,
        'introduce': introduce.value
      }
      if (fullname.value == null || fullname.value == undefined || fullname.value == "") {
        fullname_error.value = "Họ tên tác giả là bắt buộc";
      } else {
        if (author.value?.id) {
          updateAuthor(params, author.value?.id).then(function(response) {
            addUpdateAuthorLoading.value = true;
            notify({
              title: response?.data?.message,
              type: "success"
            });
            document.getElementById("close-modal-add-update-author")?.click();
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
            addUpdateAuthorLoading.value = false;
            notify({
              title: error?.response?.data?.errors?.fullname[0],
              type: "warn"
            });
          }).finally (function() {
            addUpdateAuthorLoading.value = false;
          })
        } else {
          addAuthor(params).then(function(response) {
            addUpdateAuthorLoading.value = true;
            notify({
              title: response?.data?.message,
              type: "success"
            });
            document.getElementById("close-modal-add-update-author")?.click();
            if (handleGetAuthorList) {
              handleGetAuthorList();
            }
          }).catch(function(error) {
            addUpdateAuthorLoading.value = false;
            notify({
              title: error?.response?.data?.errors?.fullname[0],
              type: "warn"
            });
          }).finally (function() {
            addUpdateAuthorLoading.value = false;
          })
        }
      }
      
    }

    return {
      author,
      checkFullname,
      closeModal,
      onSubmit,
      fullname,
      introduce,
      fullname_error,
      addUpdateAuthorLoading
    }
  },
})
</script>


<template>
  <div class="modal fade" id="add-update-author-id">
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Tác giả</h4>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <label for=""><b>Họ tên </b><span class="text-danger">*</span></label>
                <input type="text" class="form-control" v-model="fullname" @keyup="checkFullname">
                <div class="pt-2">
                  <i class="text-danger error" v-if="fullname_error">{{ fullname_error }}</i>
                </div>
              </div>
            </div>

            <div class="col-md-12">
              <div class="form-group">
                <label for=""><b>Giới thiệu </b></label>
                <textarea v-model="introduce" id="" cols="30" rows="6" class="form-control"></textarea>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button"
            class="btn btn-info btn-sm"
            @click="onSubmit">
            <span v-if="addUpdateAuthorLoading" class="spinner-border spinner-border-sm"/>
            {{ author?.id ? 'Cập nhật' : 'Thêm' }}
          </button>
          <button type="button"
            class="btn btn-secondary btn-sm"
            data-dismiss="modal"
            id="close-modal-add-update-author"
            @click="closeModal">Đóng</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.error {
  font-size: 12px;
}
</style>