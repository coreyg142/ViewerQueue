<template>
  {{ name }}
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "QueueItemComponent",

  props: ["name"],
});
</script>
