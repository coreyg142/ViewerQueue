<template>
  <div class="queue">
    <div v-if="queue.length === 0">No names in the queue</div>
    <li v-else v-for="(item, index) in queue" :key="index">
      {{ index + 1 }} - {{ item }}
    </li>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "QueueComponent",

  async mounted() {
    console.log(this.hostname);
    const response = await axios.get(this.hostname + "/queue");
    console.log(response.data.lists);
    this.queue = response.data.lists.queued;
  },
  data() {
    return {
      queue: [],
      hostname: this.$hostname,
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
