<template>
  <div style="display: inline-block">
    <span class="text">{{ name }}</span>
    <!-- <font-awesome-icon v-if="showModTools" icon="fa-solid fa-user-secret" /> -->
    <span v-if="showModTools" class="modButton">
      <font-awesome-icon
        v-if="showPop"
        class="modButton green"
        :icon="['fas', 'circle-up']"
        @click="popName"
      />
      <font-awesome-icon
        v-if="showDel"
        class="modButton red"
        :icon="['fas', 'circle-xmark']"
        @click="removeName"
      />
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "@/store";
import axios from "axios";

export default defineComponent({
  name: "QueueItemComponent",
  inject: ["apiUrl"],
  props: ["name", "showModTools", "buttonsToShow"],

  computed: {
    loggedIn() {
      return store.state.loggedIn;
    },
    showPop() {
      return this.buttonsToShow.includes("pop");
    },
    showDel() {
      return this.buttonsToShow.includes("del");
    },
  },
  methods: {
    async popName() {
      try {
        const response = await axios.patch(
          `${this.apiUrl}/pop`,
          {
            name: this.name,
          },
          {
            headers: {
              API_AUTH: `${store.state.accessKey}`,
            },
          }
        );
      } catch (error) {
        console.log(error);
      }
    },
    async removeName() {
      try {
        const response = await axios.delete(`${this.apiUrl}/remove`, {
          headers: {
            API_AUTH: `${store.state.accessKey}`,
          },
          data: {
            name: this.name,
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
});
</script>
<style scoped>
.modButton {
  cursor: pointer;
  margin-left: 0.1em;
}

.green {
  color: #00ff00;
}

.red {
  color: #ff0000;
}
</style>
