<script lang="ts">
import { defineComponent, inject, watch, ref } from 'vue'
import { Icon } from '@iconify/vue';
export default defineComponent({
  name: "Carousel",
  components: {
    Icon
  },
  props: {  
    set_page: {
      type: Number,
      default: null
    },
    list: {
      type: Object,
      default: null
    },
    currentPage: {
      type: Number,
      default: null
    }
  },
  setup(props) {
    const handleChangeCurrentPage = inject<(page: number) => void>("handleChangeCurrentPage");
    const page = ref(1);
    
    setTimeout(() => {
        if (handleChangeCurrentPage) {
          handleChangeCurrentPage(page.value + 1);
        }
      }, 4000);

    watch(() => props.currentPage, (newPage, oldPage) => {
      page.value = newPage;
      setTimeout(() => {
        if (handleChangeCurrentPage) {
          if (page.value == props.list?.meta?.last_page) {
            page.value = 0;
          }
          handleChangeCurrentPage(page.value + 1);
        }
      }, 4000);
    })

    return {
      handleChangeCurrentPage,
      page
    }
  },
  methods: {
    handlePrePage () {
      if(this.handleChangeCurrentPage) {
        this.handleChangeCurrentPage(this.page - 1);
      }
    },
    handleNextPage () {
      if(this.handleChangeCurrentPage) {
        this.handleChangeCurrentPage(this.page + 1);
      }
    }
  }
})
</script>


<template>
<div class="el-carousel">
  <ul class="row">
    <li class="col-md-3 col-sm-3 col-6" v-for="(item, index) in list?.data" :key="index">
      <div class="item text-center">
        <div class="img">
          <img src="" alt="">
        </div>
        <div class="text">
          <div class="name">{{ item?.name }}</div>
          <Icon icon="akar-icons:circle-chevron-right" />
        </div>
      </div>
    </li>
  </ul>
  <div class="redirect">
    <div class="left">
      <Icon icon="akar-icons:chevron-left" v-if="currentPage > 1" @click="handlePrePage" />
    </div>
    <div class="right">
      <Icon icon="akar-icons:chevron-right" @click="handleNextPage" v-if="currentPage < list?.meta?.last_page" />
    </div>
  </div>
</div>
  
</template>


<style lang="scss" scoped>
.el-carousel {
  position: relative;
  ul li {
    padding-bottom: 30px;
  }

  .left, .right {
    opacity: 0;
    position: absolute;
    z-index: 10;
    top: 45%;
    transition: all ease-in-out 0.3s;
    cursor: pointer;
    svg {
      font-size: 30px;
    }
  }

  .left:hover, .right:hover {
   svg {
     color: #369;
   }
  }

  .left {
    left: 0;
  }

  .right {
    right: 0;
  }
}

.el-carousel:hover {
  .left, .right {
    opacity: 1;
  }
}

</style>