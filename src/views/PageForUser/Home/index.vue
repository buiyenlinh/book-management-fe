<script lang="ts">
import { defineComponent, onMounted, provide, ref } from 'vue'
import UsePageForUser from '../UsePageForUser';
import { base }  from "@/services/base"

import { Icon } from "@iconify/vue";
export default defineComponent({
  name: 'Home',
  components: {
    Icon
  },
  setup() {
    const { getCategory, getNewBookList } = UsePageForUser();
    const { URL_IMAGE } = base();
    const categoryList = ref();
    const newBookList = ref();
    onMounted( async () => {
      getCategory().then(response => {
        categoryList.value = response?.data?.data;
      })

      await getNewBookList(8).then(response => {
        newBookList.value = response.data.data?.data
      })
    });

    return {
      categoryList,
      newBookList,
      URL_IMAGE
    }
  },
  methods: {
    createString(str: string | '') {
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
  <div id="home">
    <div class="home">
      <div class="home-bg">
        <div class="img">
          <img src="@/assets/images/background-header-01.jpg" alt="">
        </div>
        <div class="text">
          <h2><b style="font-size: 200%;">Sách</b><br> là phép màu di động duy nhất. Đọc sách chính là hộ chiếu cho vô số cuộc phiêu lưu.</h2>
        </div>
      </div>
      <div class="home-category pt-5 pb-5">
        <div class="container">
          <h3 class="title-block">Thể loại sách</h3>
          <div class="list">  
            <ul class="row">
              <li v-for="(item, index) in categoryList?.data"
                :key="index"
                class="col-md-3 col-sm-4 col-6">
                <router-link :to="{name: 'UserCategory', params: { name: createString(item?.name), page: 1, id: item.id }}" class="nav-link">
                  <Icon width="13" icon="akar-icons:circle-check" /> <span>&nbsp; {{ item.name }}</span>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="home-book-new pt-5 pb-5">
        <div class="container">
          <h3 class="title-block">Sách mới</h3>
          <ul class="row">
            <li class="col-md-3 col-sm-4 col-6" v-for="(item, index) in newBookList" :key="index">
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
          <div class="text-center">
            <button class="btn btn-primary btn-sm">
              <router-link :to="{name: 'UserBook', params: { page: 1}}" style="color: #fff">
                Xem thêm
              </router-link>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<style lang="scss" scoped>
.home-category {
  border-bottom: 1px solid #ddd;
}

.item {
  margin-bottom: 25px;
  img {
    width: 100%;
    height: 300px;
    object-fit: cover;
    border: 1px solid #ddd;
  }
}
</style>