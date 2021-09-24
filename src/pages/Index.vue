<template>
  <q-page padding class="flex flex-center column">
    <h1 class="text-h3" ref="scrollTo">{{ pageTitle }}</h1>
    <div class="posts-wrapper">
      <div class="posts row wrap items-stretch">
        <post-element
          v-for="post in posts"
          :key="`post-${post.id}`"
          :post="post"
        />
      </div>
      <div class="q-pa-lg flex flex-center">
        <q-pagination
          v-model="page"
          :max="pagesCount"
          :max-pages="6"
          boundary-numbers
          @update:model-value="updatePosts"
          direction-links
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { scroll } from 'quasar'
const { getScrollTarget, setVerticalScrollPosition } = scroll
import { api } from "boot/axios";
import PostElement from "src/components/PostElement.vue";
import { defineComponent, computed, ref } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  components: { PostElement },
  name: "PageIndex",
  async preFetch({ store }) {
    const pageInfo =( await api.get("/pages/home")).data;
    store.commit("global/setSeo", pageInfo.SeoForPages.seo);
    store.commit("global/setPageInfo", pageInfo);

    return store.dispatch('posts/fetchPosts',{page: 1})
  },
  setup() {
    const $store = useStore();
    const pageTitle = computed(() => $store.state.global.pageInfo.Title);

    const posts = computed(() => $store.state.posts.posts);

    const backendUrl = process.env.API_URL;

    const scrollTo = ref(null)
    const page = ref(1)
    const pagesCount = computed(()=> $store.state.posts.pagesCount)
    const updatePosts = (page) => {
      $store.dispatch('posts/fetchPosts',{page})
      const target = getScrollTarget(scrollTo.value)
      const offset = scrollTo.value.offsetTop
      setVerticalScrollPosition(target, offset, 300)
    }
    return { pageTitle, posts, backendUrl, page, pagesCount, updatePosts, scrollTo };
  },
});
</script>

<style lang="scss" scoped>
.posts-wrapper {
  max-width: 1200px;
  width: 100%;
  .posts {
    margin-top: 20px;
  }
}
</style>
