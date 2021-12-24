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
  }
})
</script>

<template>
<div class="category-list">
  <h3>Thể loại sách</h3>
  <ul>
    <li v-for="(item, index) in categoryList?.data" :key="index">
      <router-link :to="{name: 'UserCategory', params: { name: item?.alias, page: 1 }}" class="nav-link">
        <Icon width="13" icon="akar-icons:circle-check" /> <span>&nbsp; {{ item.name }}</span>
      </router-link>
    </li>
  </ul>
</div>
  
</template>

<style lang="scss" scoped>
.category-list {
  min-height: 100vh;
  border: 1px dotted #ddd;
  padding: 20px 10px;
  height: 100%;
  h3 {
    padding: 0px 10px 10px;
    font-size: 20px;
    font-weight: bold;
    text-transform: uppercase;
  }
  li {
    border-top: 1px solid #ddd;
    a {
      color: #333;
    }
  }
}
</style>