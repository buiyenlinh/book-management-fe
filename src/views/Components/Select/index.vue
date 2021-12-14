<script>
import API from "@/services"
export default {
  props: {
    url: {
      type: String,
      default: null
    },
    value: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      val: null,
      textSearch: '',
      list: {}
    }
  },
  
  methods: {
    search() {  
      API.get(this.url).then(response => this.list = response.data?.data?.data);
    },
    setValue(item) {
      this.val = item.fullname;
      this.$emit('changeValue', item.id);
    }
  }
}
</script>


<template>
  <div class="width: 100%">
    <div v-if="val">{{ val }}</div>
    <input type="text" class="form-control form-control-sm" v-model="textSearch" @input="search()">
    <ul>
      <li v-for="(item, i) in list" :key="i">
        <a @click="setValue(item)">{{ item.fullname }}</a>
      </li>
    </ul>
  </div>
</template>