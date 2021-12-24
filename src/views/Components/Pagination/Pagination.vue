<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import { ItemInterface } from "../../Type/index";
import { Icon } from "@iconify/vue"
import router from "@/router"
export default defineComponent({
  name: 'Pagination 2',
  components: {
    Icon
  },
  props: {
    last_page: {
      type: Number,
      default: 1,
      required: true
    },
    current_page: {
      type: Number,
      default: 1,
      required: true
    }
  },
  setup(props) {
    const data = ref();
    const currentPage = ref(1);
    const pageList = ref<ItemInterface[]>([]);
    const lastPage = ref(1);
    const params = ref();

    watch(props, () => {
      lastPage.value = props?.last_page; 
      currentPage.value = props?.current_page;
      createPageList();
    })

    watch(router.currentRoute, () => {
        currentPage.value = Number(router.currentRoute.value.params?.page);
        params.value = router.currentRoute.value.params;
    });

    onMounted(() => {
      createPageList();
    })

    const createPageList = () => {
      pageList.value = [];
      if (lastPage.value <= 5) {
        for(let i = 1; i <= lastPage.value; i++) {
          pageList.value.push({
            number: i, 
            label: `${i}`
          });
        }
      } else {
        for(let i = 1; i <= lastPage.value; i++) {
          if(i == 1|| i == currentPage.value -1 || i == currentPage.value || i == currentPage.value + 1 || i == lastPage.value) {
            pageList.value.push({
              number: i, 
              label: `${i}`
            });
          }

          if ((i == currentPage.value - 2 && i > 1 ) || (i == currentPage.value + 2) && i < lastPage.value) {
            pageList.value.push({
              number: null, 
              label: "..."
            });
          } 
        }
      }
    }

    return {
      data,
      currentPage,
      pageList,
      lastPage,
      createPageList,
      params
    }
  },
  methods: {
    handleChangePage(_page: number) {
      this.currentPage = _page;
      this.$emit('change', _page);
      this.params = this.$route.params;
      if (this.$route?.name) {
        this.params['page'] = _page;
        this.$router.push({ name: this?.$route?.name , params: this.params});
      }
      this.createPageList();
    }
  },
  watch: {
    params(newParams) {
      this.handleChangePage(newParams?.page);
    }
  }
})
</script>

<template>
  <ul class="pagination justify-content-end pagination-sm">
    <li class="page-item prevent-click" v-if="currentPage==1">
      <span class="page-link"><Icon icon="akar-icons:chevron-left" /></span>
    </li>

    <li class="page-item" v-else @click="handleChangePage(currentPage - 1)">
      <span class="page-link"><Icon icon="akar-icons:chevron-left" /></span>
    </li>

    <template v-for="page in pageList" :key="page">
      <li class="page-item"
        v-if="page.number != null"
        @click="handleChangePage(page.number)"
        :class="currentPage == page.number ? 'active' : ''">
        <span class="page-link" >{{ page.label }}</span>
      </li>
      <li class="page-item" v-else>
        <span class="page-link" >{{ page.label }}</span>
      </li>
    </template>

    <li class="page-item prevent-click" v-if="currentPage == lastPage" >
      <span class="page-link"><Icon icon="akar-icons:chevron-right" /></span>
    </li>
    <li class="page-item" v-else @click="handleChangePage(currentPage + 1)">
      <span class="page-link"><Icon icon="akar-icons:chevron-right" /></span>
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

ul li {
  cursor: pointer;
}

.page-item.active .page-link {
  background-color: #007bff !important;
}
</style>