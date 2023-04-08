<template>
  <div class="notfound">
    <font-awesome-icon :icon="['fas', 'dumpster-fire']" size="2xl" />
    <h1>404</h1>
    <h2>Page not found</h2>
    <p>
      The page you are looking for might have been removed, had its name
      changed, or is temporarily unavailable.
    </p>
    <router-link to="/">Go to home</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LoginVue",
});
</script>

<style scoped>
a {
  font-weight: bold;
  color: #ff4365;
  text-decoration: none;
  cursor: pointer;
}
</style>
