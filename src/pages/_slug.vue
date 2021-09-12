<template>
  <q-page class="flex flex-center column">
    <h1 class="text-h3">{{ pageTitle }}</h1>
    <div class="page-content container" v-html="pageContent"></div>
  </q-page>
</template>

<script>
import { api } from "boot/axios";
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  async preFetch({ store, currentRoute }) {
    const pageInfo = (await api.get(`/pages/${currentRoute.params.slug}`)).data;
    store.commit("global/setSeo", pageInfo.SeoForPages.seo);
    return store.commit("global/setPageInfo", pageInfo);
  },
  setup() {
    const $store = useStore();
    const pageTitle = computed(() => $store.state.global.pageInfo.Title);
    const pageContent = computed(() => $store.state.global.pageInfo.content);

    return { pageTitle, pageContent };
  },
};
</script>

<style></style>
