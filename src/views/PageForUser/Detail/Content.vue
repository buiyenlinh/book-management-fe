<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import UsePageForUser from "../UsePageForUser";
import router from "@/router"
import { Icon } from "@iconify/vue"
import { useStore } from "vuex";
export default defineComponent({
  components: {
    Icon
  },
  setup() {
    const { getContentChapter } = UsePageForUser();
    const store = useStore();
    const data = ref();
    const params = ref(router.currentRoute.value?.params);

    watch(() => router.currentRoute.value?.params, (newRoute, oldRoute) => {
      params.value = newRoute;
      handleGetContentChapter();
    })

    onMounted(() => {
      handleGetContentChapter();
    })

    const handleGetContentChapter = () => {
      getContentChapter('' + params.value?.name, '' + params.value?.content).then(response => {
        data.value = response?.data?.data;
      })
    }
    return {
      data,
      params
    }
  },
})
</script>


<template>
  <div class="detail-content">
    <div class="container">
      <div class="row">
        <div class="col-md-9 col-sm-9 col-12">
          <h2 class="text-center">
            <router-link v-if="params?.name" :to="{ name: 'UserDetailBook', params: { name: params?.name }}">{{ data?.book?.title }}</router-link>
          </h2>
          <div class="text-center mb-4"><b>{{ data?.content?.title }}</b></div>
          <p style="text-align: justify" v-if="data?.book?.free == 1 || $root.user">
            {{ data?.content?.content }}
          </p>
          <div class="text-center" v-else>
            <h3>Vui lòng đăng nhập để đọc sách này</h3>
            <router-link class="btn btn-primary" :to="{name: 'UserLogin'}" style="display: inline-block">Đăng nhập</router-link>
          </div>
        </div>
        <div class="col-md-3 col-sm-3 col-12">
          <div class="chapter-list">
            <h3>Chương / phần</h3>
            <ul>
              <li v-for="(item, index) in data?.chapter_list" :key="index">
                <router-link v-if="item?.alias" :to="{name: 'UserDetailBookContent', params: { content: item?.alias }}" class="nav-link">
                  <Icon width="13" icon="akar-icons:circle-check" /> <span>&nbsp; {{ item.title }}</span>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
h2 {
  font-weight: bold;
}

.chapter-list{
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
    border-top: 1px dotted #ddd;
    a {
      color: #333;
    }
  }
}


</style>