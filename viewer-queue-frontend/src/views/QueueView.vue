<template>
  <div class="home">
    <img
      class="rudeimg"
      alt="Rudeism"
      src="../assets/multilockeheader-transparent.png"
    />
    <QueueComponent />
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import { defineComponent } from "vue";
import QueueComponent from "@/components/QueueComponent.vue";

export default defineComponent({
  name: "QueueView",
  components: {
    QueueComponent,
  },
});
</script>

<style scoped>
.rudeimg {
  width: 25%;
  height: 25%;
  object-fit: contain;
  padding-bottom: 2%;
}
</style>
