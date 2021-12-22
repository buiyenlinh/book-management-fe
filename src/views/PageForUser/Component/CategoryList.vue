<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import UsePageForUser from "../UsePageForUser"
import { Icon } from "@iconify/vue";

export default defineComponent({
  name: "CategoryListComponent",
  components: {
    Icon
  },
  setup() {
    const { getCategory } = UsePageForUser();
    const categoryList = ref();
    const category_id = ref();
   
    onMounted(() => {
      getCategory().then(response => {
        categoryList.value = response?.data?.data;
      })
    })

    return {
      categoryList,
      category_id
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
  <ul>
    <li v-for="(item, index) in categoryList?.data" :key="index">
      <router-link :to="{name: 'UserCategory', params: { name: createString(item.name), page: 1, id: item.id }}" class="nav-link">
        <Icon width="13" icon="akar-icons:circle-check" /> <span>&nbsp; {{ item.name }}</span>
      </router-link>
    </li>
  </ul>
</template>