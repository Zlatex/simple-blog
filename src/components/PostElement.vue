<template>
  <div class="post-element col-12 col-md-4 col-sm-6">
    <q-card class="card flex column">
      <q-img v-if="post.image" :src="backendUrl + post.image.formats.small.url">
      </q-img>

      <q-card-section>
        <router-link
          :to="`/posts/${post.slug}`"
          class="text-h6"
          v-html="post.title"
        ></router-link>
        <div class="text-subtitle2" v-if="post.author">by {{ post.author.name }}</div>
      </q-card-section>

      <q-card-section
        class="q-pt-none"
        v-html="post.description"
      ></q-card-section>
      <q-card-actions align="center">
        <router-link :to="`/posts/${post.slug}`">
          <q-btn flat> View </q-btn></router-link
        >
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  name: "PostElement",
  setup() {
    const backendUrl = process.env.API_URL;

    return { backendUrl };
  },
};
</script>

<style lang="scss" scoped>
.post-element {
  padding: 0 20px;
  flex-direction: column;
  margin-bottom: 15px;
  display: flex;
  .card{
    height: 100%;
    .q-img {
      max-height: 250px;
      width: 100%;
    }
    .q-card__actions {
      margin-top: auto;
      padding: 0;
      a {
        flex-grow: 1;
        button {
          padding: 0;
          width: 100%;
        }
      }
    }
  }
}
</style>
