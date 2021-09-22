<template>
  <q-page padding class="flex flex-center column">
    <h1 class="text-h3">{{ pageTitle }}</h1>
    <div class="posts-wrapper">
      <div class="posts row wrap items-stretch">
        <post-element
          v-for="post in posts"
          :key="`post-${post.id}`"
          :post="post"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { api } from "boot/axios";
import PostElement from "src/components/PostElement.vue";
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  components: { PostElement },
  name: "PageIndex",
  async preFetch({ store }) {
    const pageInfo =( await api.get("/pages/home")).data;
    store.commit("global/setSeo", pageInfo.SeoForPages.seo);
    store.commit("global/setPageInfo", pageInfo);

    const posts = (await api.get("/articles")).data;
    return store.commit("posts/setPosts", posts);
  },
  setup() {
    const $store = useStore();
    const pageTitle = computed(() => $store.state.global.pageInfo.Title);

    const posts = computed(() => $store.state.posts.posts);

    const backendUrl = process.env.API_URL;
    return { pageTitle, posts, backendUrl };
  },
});
</script>

<style lang="scss" scoped>
.posts-wrapper {
  max-width: 1200px;
  .posts {
    margin-top: 20px;
  }
}
</style>
