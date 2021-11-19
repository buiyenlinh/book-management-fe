<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup() {
    const menu = reactive([
      {
        label: 'Thống kê',
        link: "DashBoard",
        icon: "",
      }
    ]);

    return {
      menu
    }
  },
})
</script>


<template>
  <div id="admin">
    <div class="admin d-flex">
      <div class="side-bar">
        <ul class="nav nav-pills" role="tablist">
          <li v-for="item in menu"
            :key="item"
            class="nav-item">
            <span>{{ item.label }}</span>
          </li>
        </ul>
      </div>
      <div class="content">
        this is content
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.side-bar {
  width: 200px;
}

.content {
  width: calc(100% - 200px);
}
</style>