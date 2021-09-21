<template>
  <q-layout view="hHh lpR fff">
    <q-header
      reveal
      elevated
      class="text-white"
      :style="`background-image:url(${siteLogo})`"
      height-hint="98"
    >
      <q-toolbar>
        <q-toolbar-title align="center">
          {{ siteName }}
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs align="center">
        <q-route-tab
          v-for="menu in menus"
          :key="menu.id"
          :to="menu.url ? menu.url : `/${menu.page.slug}`"
          :label="menu.text"
        />
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white text-center">
      <q-toolbar>
        <q-toolbar-title>
          <div>{{ footerCopyright }}</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "MainLayout",
  setup() {
    const $store = useStore();

    const siteName = computed(() => $store.getters["global/siteName"]);
    const siteLogo = computed(() => $store.getters["global/siteLogo"]);
    const footerCopyright = computed(() => $store.getters["global/footerCopyright"]);

    const menus = computed(() => $store.state.global.menus);

    return { siteName, siteLogo, menus, footerCopyright };
  },
});
</script>

<style lang="scss">
.q-tab {
  border-radius: 5px 5px 0 0;
}
.q-header {
  background-repeat: no-repeat;
  object-fit: cover;
  background-size: 100%;
}
</style>
