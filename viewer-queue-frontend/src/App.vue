<template>
  <div class="container">
    <Transition name="fade">
      <NavbarComponent v-if="mounted" />
    </Transition>
    <RouterView v-slot="{ Component }">
      <Transition name="fade">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions } from "vuex";
import store from "./store";
import NavbarComponent from "@/components/NavbarComponent.vue";

// route to home on mount
export default defineComponent({
  name: "App",

  components: {
    NavbarComponent,
  },
  mounted() {
    this.mounted = true;
  },
  data() {
    return {
      mounted: false,
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
  /* display: flex;
  flex-direction: row;
  justify-content: center; */
  /* color: #2c3e50; */
}

nav {
  padding: 30px;
}

nav a,
.btn {
  font-weight: bold;
  color: #ff4365;
  text-decoration: none;
  cursor: pointer;
}

nav a.router-link-exact-active,
.btnActive {
  color: #ffd300;
  text-decoration: underline;
}

body,
html {
  padding: 0;
  margin: 0;
  width: 100%;
  min-height: 100vh;
}

body {
  background-color: #33135c;
  color: #fff;
}
.fade-enter-active {
  transition: opacity 0.6s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
