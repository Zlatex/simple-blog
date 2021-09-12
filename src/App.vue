<template>
  <router-view />
</template>
<script>
import { defineComponent, computed, watch } from "vue";
import { useMeta } from "quasar";
import { useStore } from "vuex";

export default defineComponent({
  name: "App",
  async preFetch({ store }) {
    await store.dispatch("global/fetchGlobalInfo");
    return store.dispatch("global/fetchMenus");
  },
  setup() {
    const $store = useStore();

    const title = computed(() => $store.getters["global/metaTitle"]);
    const description = computed(
      () => $store.getters["global/metaDescription"]
    );
    const favicon = computed(()=> $store.getters['global/getFavicon'])
    useMeta(() => {
      return {
        title: title.value,
        meta: {
          description: { name: "description", content: description.value },
        },
        link: {
          favicon: {
            rel: 'icon',
            href: favicon.value 
          }
        }
      };
    });
  },
});
</script>
