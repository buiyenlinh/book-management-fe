<script lang="ts">
import { defineComponent, inject, PropType, ref, watch } from 'vue';
import { Icon } from "@iconify/vue";
import {ItemInterface, PageInterface} from "../../Type/index";

export default defineComponent({
  components: {
    Icon
  },
  props: {
    dataProp: {
      type: Object as PropType<PageInterface>,
      required: true,
      default: null
    }
  },
  setup(props) {
    const data = ref();
    const currentPage = ref(1);
    const pageList = ref<ItemInterface[]>([]);
    
    watch(props, () => {
      pageList.value = [];
      data.value = props.dataProp
      currentPage.value = data.value?.current_page;

      createPageList(data.value?.last_page);
    })

    const createPageList = (lastPage: number) => {
      if (lastPage <= 5) {
        for(let i = 1; i <= lastPage; i++) {
          pageList.value.push({
            number: i, 
            label: `${i}`
          });
        }
      } else {
        for(let i = 1; i <= lastPage; i++) {
          if(i == 1|| i == currentPage.value -1 || i == currentPage.value || i == currentPage.value + 1 || i == lastPage) {
            pageList.value.push({
              number: i, 
              label: `${i}`
            });
          }

          if ((i == currentPage.value - 2 && i > 1 ) || (i == currentPage.value + 2) && i < lastPage) {
            pageList.value.push({
              number: null, 
              label: "..."
            });
          } 
        }
      }
      
    }

    const handleChangePage = inject("handleChangePage");
    return {
      data,
      handleChangePage,
      currentPage,
      pageList
    }
  },
})
</script>


<template>
  <ul class="pagination justify-content-end pagination-sm">
    <li class="page-item"
      :class="currentPage == 1 ? 'prevent-click' : ''"
      >
      <a class="page-link" href="#" v-if="currentPage <= 1">
        <Icon icon="bx:bx-chevron-left" />
      </a>
      <router-link v-else
        class="page-link"
        :to="{name: 'Category', params: { page: currentPage - 1 } }" @click="handleChangePage(currentPage - 1)"
      >
        <Icon icon="bx:bx-chevron-left" />
      </router-link>
    </li>

    <template v-for="page in pageList" :key="page">
      <li class="page-item"
        v-if="page.number != null"
        @click="handleChangePage(page.number)"
        :class="currentPage == page.number ? 'active' : ''">
        <router-link class="page-link" :to="{name: 'Category', params: { page: page.number } }" >{{ page.label }}</router-link>
      </li>
      <li class="page-item"
        v-else>
        <span class="page-link" >{{ page.label }}</span>
      </li>
    </template>

    <li class="page-item"
      :class="currentPage == data?.last_page ? 'prevent-click' : ''"
      >
      <a class="page-link" href="#" v-if="currentPage >= data?.last_page">
        <Icon icon="bx:bx-chevron-right" />
      </a>
      <router-link v-else
        class="page-link"
        :to="{name: 'Category', params: { page: currentPage + 1 } }" @click="handleChangePage(currentPage + 1)"
      >
        <Icon icon="bx:bx-chevron-right" />
      </router-link>
    </li>
  </ul> 
</template>


<style lang="scss" scoped>
.prevent-click {
  pointer-events: none;
  a {
    background: #d3d0d0;
  }
}
</style>