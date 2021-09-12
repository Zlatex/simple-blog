<template>
  <q-page class="flex flex-center column">
    <h1 class="text-h3">{{ post.title }}</h1>
    <div class="container text-center">
      <q-img
        :src="backendUrl + post.image.formats.large.url"
        :alt="post.image.alternativeText || ''"
        :title="post.image.caption || ''"
      />
      <div class="page-content flex flex-center column" v-html="post.content" />
      <q-separator />
      <div class="post-info flex flex-center justify-between">
        <div>Author: {{ post.author.name }}</div>
        <div>Published at: {{ publishedDate }}</div>
        <div>Category: {{ post.category.name }}</div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { api } from "boot/axios";
import { computed } from "vue";
import { useStore } from "vuex";
import { date } from "quasar";
export default {
  async preFetch({ store, currentRoute }) {
    await store.dispatch("posts/setCurrentPost", currentRoute.params.slug);
    const seo = {
      metaTitle: store.state.posts.post.title,
      metaDescription: store.state.posts.post.description,
    };
    store.commit("global/setSeo", seo);
  },
  setup() {
    const $store = useStore();

    const post = computed(() => $store.state.posts.post);

    const publishedDate = computed(() => {
      return date.formatDate(
        new Date(post.value.published_at),
        "DD.MM.YYYY HH:mm"
      );
    });

    const backendUrl = process.env.API_URL;
    return { post, backendUrl, publishedDate };
  },
};
</script>

<style lang="scss" scoped>
.container {
  .q-img {
    border-radius: 5px;
  }
  .page-content {
    padding: 20px 0;
  }
  .post-info {
    padding: 10px 0;
  }
}
</style>
