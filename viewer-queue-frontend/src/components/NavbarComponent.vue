<template>
  <div class="container">
    <nav>
      <router-link to="/" tabindex="0">Name Pool</router-link> |
      <router-link v-if="!loggedIn" to="/login" tabindex="0">
        Access moderator controls
      </router-link>
      <span
        role="button"
        tabindex="0"
        style="display: inline"
        class="btn"
        v-on:click="logout"
        v-else
      >
        Log out
      </span>
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions } from "vuex";
import store from "@/store";
export default defineComponent({
  name: "NavbarComponent",

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
});
</script>
