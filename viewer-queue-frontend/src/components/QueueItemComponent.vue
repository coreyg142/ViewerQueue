<template>
  <div style="display: inline-block">
    <span class="text">{{ name }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "QueueItemComponent",

  props: ["name"],
});
</script>
