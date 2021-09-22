<template>
  <q-page class="flex flex-center column">
    <h1 class="text-h3">Contact Us</h1>
    <div class="container">
      <q-form @submit="onSubmit" @reset="onReset">
        <div class="form-element form-group">
          <q-input
            filled
            v-model="name"
            label="Your name *"
            hint="Name and surname"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />
          <q-input
            filled
            v-model="email"
            label="Your email *"
            hint="Email"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
              isValidEmail,
            ]"
          />
        </div>
        <div class="form-element">
          <q-field
            v-model="content"
            label="Content"
            outlined
            stack-label
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          >
            <template v-slot:control>
              <q-editor v-model="content" min-height="300px" />
            </template>
          </q-field>
        </div>
        <div class="form-element">
          <div>
            <q-btn label="Submit" type="submit" color="primary" />
            <q-btn
              label="Reset"
              type="reset"
              color="primary"
              flat
              class="q-ml-sm"
            />
          </div>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { useQuasar } from "quasar";
import { ref } from "vue";
import { api } from "boot/axios";

export default {
  async preFetch({ store }) {
    const pageInfo =( await api.get("/pages/contact-us")).data;
    store.commit("global/setSeo", pageInfo.SeoForPages.seo);
    return store.commit("global/setPageInfo", pageInfo);
  },
  setup() {
    const $q = useQuasar();

    const name = ref(null);
    const email = ref(null);
    const content = ref("");

    return {
      name,
      email,
      content,

      async onSubmit() {
        const response = await api.post("/form-submissions", {
          name: name.value,
          email: email.value,
          text: content.value,
        });
        if(response.status !== 200){
          return $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "error",
            message: response?.data?.message || err,
          });
        }
        $q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "Submitted",
        });
        name.value = null;
        email.value = null;
        content.value = "";
      },

      onReset() {
        name.value = null;
        email.value = null;
        content.value = "";
      },

      isValidEmail() {
        const emailPattern =
          /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
        return emailPattern.test(email.value) || "Invalid email";
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 600px;
  .form-group {
    display: flex;
    justify-content: space-between;
    .q-field {
      width: 48%;
    }
  }
  .form-element {
    .q-editor {
      width: 100%;
    }
    margin: 30px 0;
  }
}
</style>
