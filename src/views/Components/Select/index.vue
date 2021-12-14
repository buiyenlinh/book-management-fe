<script>
import API from "@/services";
import { Icon } from '@iconify/vue';
export default {
  name: "Select-Component",
  components: {
    Icon
  },
  props: {
    url: {
      type: String,
      default: null
    },
    text: {
      type: String,
      default: null
    },
  },
  data() {
    return {
      val: this.text,
      textSearch: '',
      list: {},
      show: false,
      loading: false
    }
  },
  
  methods: {
    search() {  
      API.get(this.url + this.textSearch).then(response => {
        this.list = response.data?.data?.data;
        this.loading = true;
      }).catch(() => {
        this.loading = false;
      }).finally(() => {
        this.loading = false;
      })
    },
    setValue(item) {
      this.val = item.fullname;
      this.$emit('changeValue', item.id);
      this.show = false;
    },
    showDropdown() {
      this.show = !this.show;
    }
  }
}
</script>


<template>
  <div class="select-component">
    <div class="form-control form-control-sm" @click="showDropdown">
      <span>{{ val }}</span>
      <Icon :class="[this.show ? 'select-icon-transition' : '' , 'select-icon-bottom']" icon="ep:caret-bottom" />
    </div>
    <div class="select-dropdown" v-if="show">
      <input type="text" class="form-control form-control-sm" v-model="textSearch" @input="search()">
      <div v-if="loading" class="loading spinner-border spinner-border-sm"></div>
      <ul class="mt-2">
        <li v-for="(item, i) in list" :key="i">
          <a @click="setValue(item)">{{ item.fullname }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.select-component {
  position: relative;
  .select-icon-bottom {
    position: absolute;
    z-index: 10;
    right: 8px;
    top: 9px;
    transition: all ease-in-out 0.4s;
  }
  .select-icon-transition {
    transform: rotate(180deg);
    transition: all ease-in-out 0.4s;
  }
}


.select-dropdown {
  border: 1px solid #ddd;
  border-top: none;
  padding: 10px;
  position: absolute;
  width: 100%;
  top: 31px;
  left: 0px;
  z-index: 10;
  background: #fff;
  box-shadow: 0px 3px 10px 0px #ddd;

  .loading {
    position: absolute;
    z-index: 10;
    right: 15px;
    top: 17px;
  }

  ul {
    overflow-y: auto;
    max-height: 230px;
    list-style-type: none;
    padding: 0px;
    margin: 0;
    li {
      a {
        padding: 5px 10px;
        display: inline-block;
        width: 100%;
      }
      cursor: pointer;
    }

    li:hover {
      background: #252f3b;
      a {
        color: #fff;
      }
    }
  }
}


</style>