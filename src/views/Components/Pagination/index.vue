<script lang="ts">
import { defineComponent, inject, PropType, ref, watch } from 'vue'

type PageType = {
  current_page: null,
  data: null,
  first_page_url: null,
  from: null,
  last_page: null,
  last_page_url: null,
  links: [],
  next_page_url: null,
  path: null,
  per_page: null,
  prev_page_url: null,
  to: null,
  total: null
}

export default defineComponent({
  props: {
    dataProp: {
      type: Object as PropType<PageType>,
      required: true
    }
  },
  setup(props) {
    const data = ref();

    watch(props, () => {
      data.value = props.dataProp
    })

    const handleChangePage = inject("handleChangePage");
    return {
      data,
      handleChangePage
    }
  },
})
</script>


<template>
  <ul class="pagination justify-content-end pagination-sm">
    <li class="page-item" :class="data?.current_page == 1 ? 'prevent-click' : ''">
      <a class="page-link" href="#">Pre</a>
    </li>
    <li class="page-item"
      v-for="page in data?.last_page" :key="page"
      @click="handleChangePage(page)"
      :class="data?.current_page == page ? 'active' : ''">
      <a class="page-link" href="#">{{page}}</a>
    </li>
    <li class="page-item" :class="data?.current_page == data?.last_page ? 'prevent-click' : ''">
      <a class="page-link" href="#">Next</a>
    </li>
  </ul> 
</template>