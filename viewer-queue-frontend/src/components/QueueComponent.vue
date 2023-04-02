<template>
  <div class="queue">
    <p v-if="queue.length === 0">No names in the queue</p>
    <li v-else v-for="(item, index) in queue" :key="index">
      {{ index + 1 }} - {{ item }}
    </li>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// import axios from "axios";
import { state } from "@/socket";

export default defineComponent({
  name: "QueueComponent",

  async mounted() {
    // const response = await axios.get(this.hostname + "/queue");
    // this.queue = state.queuedNames;
  },

  computed: {
    queue() {
      return state.queuedNames;
    },
  },
  data() {
    return {
      // queue: [] as string[],
      // hostname: this.$hostname,
    };
  },
});
</script>

<style scoped>
li,
p {
  list-style-type: none;
  font-size: 1.5em;
  padding: 0.5em;
}
</style>
