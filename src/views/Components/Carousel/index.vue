<script lang="ts">
import { defineComponent, inject, watch, ref } from 'vue'
import { Icon } from '@iconify/vue';
import { base } from "@/services/base"
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
    },
    varible: {
      type: String,
      default: null
    },
    imgText: {
      type: String,
      default: null
    }
  },
  setup(props) {
    const { URL_IMAGE } = base();
    return {
      URL_IMAGE
    }
  },
  methods: {
    handlePrePage () {
      console.log("previous");
    },
    handleNextPage () {
      console.log("next");
    }
  }
})
</script>


<template>
  <div class="el-carousel">
    <ul class="row">
      <li class="col-md-3 col-sm-3 col-6" v-for="(item, index) in list" :key="index">
        <div class="item text-center">
          <div class="img" v-if="imgText">
            <img :src="URL_IMAGE + item[imgText]" alt="">
          </div>
          <div class="text p-2">
            <div class="name">{{ item[varible] }}</div>
          </div>
        </div>
      </li>
    </ul>
    <div class="redirect">
      <div class="left">
        <Icon icon="akar-icons:chevron-left" @click="handlePrePage" />
      </div>
      <div class="right">
        <Icon icon="akar-icons:chevron-right" @click="handleNextPage" />
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>

.el-carousel {
  position: relative;
  .row {
   flex-wrap: nowrap;
   overflow-x: hidden;
  }
  ul li {
    padding-bottom: 30px;
    .item img {
      width: 100%;
      height: 180px;
      object-fit: cover;
      border: 1px solid #ddd;
    }
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