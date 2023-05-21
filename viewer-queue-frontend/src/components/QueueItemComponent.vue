<template>
  <div style="display: inline-block">
    <span class="text" :class="killedClass">{{ name }}</span>
    <!-- <font-awesome-icon v-if="showModTools" icon="fa-solid fa-user-secret" /> -->
    <span v-if="showModTools" class="modButton">
      <font-awesome-icon
        v-if="showPop"
        class="modButton green"
        :icon="['fas', 'circle-up']"
        @click="popName"
      />
      <font-awesome-icon
        v-if="showKill"
        class="modButton"
        :class="killedButtonClass"
        :icon="['fas', 'skull']"
        @click="killName"
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
  props: ["name", "showModTools", "buttonsToShow", "killed"],

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
    showKill() {
      return this.buttonsToShow.includes("kill");
    },
    killedClass() {
      return this.killed ? "killed" : "";
    },
    killedButtonClass() {
      return this.killed ? "green" : "red";
    },
  },
  methods: {
    async popName() {
      try {
        await axios.patch(
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
        await axios.delete(`${this.apiUrl}/remove`, {
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
    async killName() {
      try {
        await axios.patch(
          `${this.apiUrl}/kill?name=${this.name}`,
          {},
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
  },
});
</script>
<style scoped>
.modButton {
  cursor: pointer;
  margin-left: 0.1em;
}

.killed {
  text-decoration: line-through;
  font-style: italic;
  color: #ff0000;
}

.green {
  color: #00ff00;
}

.red {
  color: #ff0000;
}
</style>
