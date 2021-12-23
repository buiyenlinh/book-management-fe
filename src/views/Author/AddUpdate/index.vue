<script lang="ts">
import { AuthorInterface } from '@/views/Type/index'
import { defineComponent, inject, PropType, ref, watch } from 'vue'
import UseAuthor from "../UseAuthor";
import { notify } from "@kyvg/vue3-notification";
import useFunction from "../../Type/Function"

export default defineComponent({
  props: {
    authorSelected: {
      type: Object as PropType<AuthorInterface>
    }
  },
  setup(props) {
    const { addUpdateAuthorLoading, addAuthor, updateAuthor } = UseAuthor();
    const { createAlias } = useFunction();
    const resetAuthorSelected = inject<() => void>("resetAuthorSelected");
    const handleGetAuthorList = inject<() => void>("handleGetAuthorList");
    const handleSearch = inject<() => void>("handleSearch");
    const currentPage = inject("currentPage") as any;
    const author = ref();
    const alias = ref();
    const fullname = ref();
    const introduce = ref();
    const fullname_error = ref();
    const alias_error = ref();
    const checkFullname = () => {
      if (fullname.value == null || fullname.value == "" || fullname.value == undefined) {
        fullname_error.value = "Họ tên tác giả là bắt buộc";
      } else {
        fullname_error.value = "";
      }
    }

    const checkAlias = () => {
      if (alias.value == null || alias.value == "" || alias.value == undefined) {
        alias_error.value = "Đường dẫn là bắt buộc";
      } else {
        alias_error.value = "";
      }
    }

    const closeModal = () => {
      fullname_error.value = "";
      fullname.value = "";
      introduce.value = "";
      alias.value = "";
      if (resetAuthorSelected) {
        resetAuthorSelected();
      }
    }

    watch(() => props?.authorSelected, (authorNew, authorOld) => {
      author.value = authorNew;
      fullname.value = author.value?.fullname;
      introduce.value = author.value?.introduce;
      alias.value = author.value?.alias;
    })

    const onSubmit = () => {
      const params = {
        'fullname' : fullname.value,
        'introduce': introduce.value,
        'alias' : alias.value
      }

      checkFullname();
      checkAlias();

      if (fullname_error.value == "" && alias_error.value == "") {
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
      alias, alias_error, checkAlias,
      addUpdateAuthorLoading,
      createAlias
    }
  },
  methods: {
    handleCreateAlias() {
      this.alias = this.createAlias(this.fullname);
    }
  }
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
                <input type="text" class="form-control" v-model="fullname" @keyup="checkFullname" @blur="handleCreateAlias">
                <div class="pt-2">
                  <i class="text-danger error" v-if="fullname_error">{{ fullname_error }}</i>
                </div>
              </div>
            </div>

            <div class="col-md-12">
              <div class="form-group">
                <label for=""><b>Đường dẫn </b><span class="text-danger">*</span></label>
                <input type="text" class="form-control" v-model="alias" @keyup="checkAlias">
                <div class="pt-2">
                  <i class="text-danger error" v-if="alias_error">{{ alias_error }}</i>
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