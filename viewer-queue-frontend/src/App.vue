<template>
  <div class="container">
    <nav>
      <router-link to="/viewerqueue">Queue</router-link> |
      <router-link to="/login">Moderator controls</router-link>
    </nav>
    <!-- <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view> -->
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// route to home on mount
export default defineComponent({
  name: "App",

  watch: {
    $route: {
      handler(to) {
        document.title = to.name;
      },
    },
  },
  beforeCreate() {
    this.$router.push("/viewerqueue");
  },
});
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@300;400;700&display=swap");
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  font-family: "Fredoka", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50; */
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #ff4365;
  text-decoration: none;
}

nav a.router-link-exact-active {
  color: #ffd300;
}

body {
  background-color: #33135c;
  color: #fff;
}
</style>
