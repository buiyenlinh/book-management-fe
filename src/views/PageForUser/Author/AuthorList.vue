<script lang="ts">
import { defineComponent, onMounted, ref, provide } from 'vue'
import UsePageForUser from "../UsePageForUser"
import { Icon } from '@iconify/vue';
import Pagination from "../../Components/Pagination/index.vue"
export default defineComponent({
  components: {
    Icon,
    // Pagination
  },
  setup() {
    const { getAuthor } = UsePageForUser();
    const authorList = ref();
    const currentPage = ref(1);
    onMounted(() => {
      handleGetAuthor();
    })

    const handleGetAuthor = () => {
      getAuthor(currentPage.value).then(response => {
        authorList.value = response.data?.data
      })
    }

    const handleChangePage = (page : number) => {
      currentPage.value = page;
      handleGetAuthor();
    }

    provide("handleChangePage", handleChangePage);

    return {
      authorList
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
  <div class="hu-author-list pt-5 pb-5">
    <div class="container">
      <h3>Danh sách tác giả</h3>
      <ul class="row">
        <li class="col-md-3 col-sm-4 col-6" v-for="(item, index) in authorList?.data" :key="index">
          <router-link :to="{name: 'UserBookAuthor', params: { name: createString(item.fullname), page: 1, id: item.id }}" class="nav-link">
            <Icon icon="akar-icons:circle-chevron-right" />
            {{ item?.fullname }}
          </router-link>
        </li>
      </ul>
      <!-- <Pagination :dataProp="authorList?.meta" :nameRoute="'UserBookAuthor'"/> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
ul li {
  padding-bottom: 20px;
  padding-top: 5px;
  a {
    color: #333;
  }
}
</style>