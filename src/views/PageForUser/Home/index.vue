<script lang="ts">
import { defineComponent, onMounted, provide, ref } from 'vue'
import UsePageForUser from '../UsePageForUser';


import { Icon } from "@iconify/vue";
export default defineComponent({
  name: 'Home',
  components: {
    Icon
  },
  setup() {
    const { getCategory, getNewBookList } = UsePageForUser();
    const categoryList = ref();
    const newBookList = ref();
    onMounted(() => {
      getCategory().then(response => {
        categoryList.value = response?.data?.data;
      })

      getNewBookList(8).then(response => {
        newBookList.value = response?.data?.data;
        console.log(newBookList.value);
      })
    });

    return {
      categoryList,
      newBookList
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
      <div class="home-category pt-3 pb-3">
        <div class="container">
          <h3 class="title-block">Danh mục sách</h3>
          <div class="list">  
            <ul class="row">
              <li v-for="(item, index) in categoryList?.data"
                :key="index"
                class="col-md-3 col-sm-4 col-6">
                <router-link :to="{name: 'UserCategory', params: { name: createString(item.name), page: 1, id: item.id }}" class="nav-link">
                  <Icon width="13" icon="akar-icons:circle-check" /> <span>&nbsp; {{ item.name }}</span>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="home-book-new">
        <div class="container">
          <h3 class="title-block">Sách mới</h3>
          <div class="text-center">
            <button class="btn btn-primary btn-sm">Xem thêm</button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>


<style lang="scss" scoped>
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>