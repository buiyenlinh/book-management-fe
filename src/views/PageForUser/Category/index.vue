<script lang="ts">
import { defineComponent, onMounted, provide, ref, watch } from 'vue'
import UsePageForUser from "../UsePageForUser"
import { base } from "@/services/base";
import Pagination from "../../Components/Pagination/index.vue"
import router from "@/router"
import CategoryListComponent from "../Component/CategoryList.vue"

export default defineComponent({
  components: {
    Pagination,
    CategoryListComponent
  },
  setup() {
    const { getBookByCategory } = UsePageForUser();
    const { URL_IMAGE } = base();
    const bookList = ref();
    const category_id = ref(Number(router.currentRoute.value.params.id));
    const currentPage = ref(Number(router.currentRoute.value.params.page));

    watch(router.currentRoute, () => {
      currentPage.value = Number(router.currentRoute.value.params?.page);
      category_id.value = Number(router.currentRoute.value.params?.id);
      handleGetBookInCategory();
    })

    onMounted(() => {
      handleGetBookInCategory();
    })

    const handleGetBookInCategory = () => {
      getBookByCategory(category_id.value , currentPage.value).then(response => {
        bookList.value = response?.data?.data;
      })
    }

    const handleChangePage = (page : number) => {
      currentPage.value = page;
    }

    provide("handleChangePage", handleChangePage);

    return {
      bookList,
      category_id,
      getBookByCategory,
      currentPage,
      URL_IMAGE
    }
  },
  methods: {
    createString(str: string) {
      var AccentsMap = [
        "aàảãáạăằẳẵắặâầẩẫấậ",
        "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
        "dđ", "DĐ",
        "eèẻẽéẹêềểễếệ",
        "EÈẺẼÉẸÊỀỂỄẾỆ",
        "iìỉĩíị",
        "IÌỈĨÍỊ",
        "oòỏõóọôồổỗốộơờởỡớợ",
        "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
        "uùủũúụưừửữứự",
        "UÙỦŨÚỤƯỪỬỮỨỰ",
        "yỳỷỹýỵ",
        "YỲỶỸÝỴ"    
      ];
      for (let i=0; i<AccentsMap.length; i++) {
        let re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
        let char = AccentsMap[i][0];
        str = str.replace(re, char);
      }
      str = str.trim();
      str = str.replace(/\s+/g, '-').toLowerCase();
      str = str.replace(/[[]&#,+()$~%.'":*?<>{}]/g, '');
      return str;
    }
  }
})
</script>


<template>
  <div class="hu-book pt-5">
    <div class="container">
      <div class="row">
        <div class="col-md-3 col-sm-4 col-12">
          <h3>Thể loại sách</h3>
          <CategoryListComponent />
        </div>
        <div class="col-md-9 col-sm-8 col-12">
          <ul class="row">
            <li class="col-md-3 col-sm-4 col-6 mb-2" v-for="(item, index) in bookList?.data" :key="index">
              <router-link :to="{name: 'UserDetailBook', params: { name: createString(item?.title), id: item?.id }}">
                <div class="item text-center">
                  <img :src="URL_IMAGE + item?.cover_image" alt="">
                  <div class="p-3">
                    <span>{{ item?.title }}</span>
                  </div>
                </div>
              </router-link>
            </li>
          </ul>
          <Pagination :dataProp="bookList?.meta" :nameRoute="'UserCategory'"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.item {
  img {
    width: 100%;
    height: 250px;
    object-fit: cover;
    border: 1px solid #ddd;
  }
}
</style>