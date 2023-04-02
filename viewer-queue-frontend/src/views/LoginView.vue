<template>
  <div class="login">
    <LoginComponent />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "@/store";
import LoginComponent from "@/components/LoginComponent.vue";

export default defineComponent({
  name: "LoginVue",
  beforeRouteEnter(to, from, next) {
    console.log(to);
    console.log(from);
    console.log(store.state.loggedIn);
    if (store.state.loggedIn) {
      next(false);
    } else {
      next();
    }
  },
  components: {
    LoginComponent,
  },
});
</script>

<style scoped>
input {
}

button {
}
</style>
