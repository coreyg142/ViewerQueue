<template>
  <div class="container">
    <nav>
      <router-link tabindex="0" to="/viewerqueue">Queue</router-link> |
      <router-link v-if="!loggedIn" to="/login">
        Access moderator controls
      </router-link>
      <div
        role="button"
        style="display: inline"
        tabindex="1"
        class="logout"
        v-on:click="logout"
        v-if="loggedIn"
      >
        Log out
      </div>
    </nav>

    <Transition>
      <router-view />
    </Transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions } from "vuex";
import store from "./store";

// route to home on mount
export default defineComponent({
  name: "App",

  data() {
    return {
      bar: " | ",
    };
  },
  methods: {
    ...mapActions(["clearAccessKey"]),

    logout() {
      this.clearAccessKey();
    },
  },
  computed: {
    loggedIn() {
      return store.state.loggedIn;
    },
  },
  watch: {
    $route: {
      handler(to) {
        document.title = to.name;
      },
    },
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

nav a,
.logout {
  font-weight: bold;
  color: #ff4365;
  text-decoration: none;
  cursor: pointer;
}

nav a.router-link-exact-active {
  color: #ffd300;
  text-decoration: underline;
}

body {
  background-color: #33135c;
  color: #fff;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
