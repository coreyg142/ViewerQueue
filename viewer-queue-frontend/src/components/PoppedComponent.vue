<template>
  <div class="queuebox">
    <h2>Previous names</h2>
    <div class="queue">
      <transition-group name="list" tag="ol" class="nameUL" reversed>
        <li v-for="item in queue" :key="item" class="list-item">
          <QueueItemComponent :name="item" />
        </li>
      </transition-group>
      <transition name="emptyMsg"
        ><p v-if="queue.length === 0" class="empty">The list is empty.</p>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { state } from "@/socket";
import QueueItemComponent from "./QueueItemComponent.vue";

export default defineComponent({
  name: "QueueComponent",

  components: {
    QueueItemComponent,
  },
  computed: {
    queue() {
      return state.poppedNames;
    },
  },
});
</script>

<style scoped>
ul.nameUL,
.queue {
  text-align: left;
  list-style: decimal;
  position: relative;
  width: fit-content;
  margin: 0 auto;
}

.list-item {
  text-align: left;
  font-size: 1.5em;
  padding: 0.5em;
  transition: all 0.5s ease;
}

.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}

.emptyMsg-enter-active,
.emptyMsg-leave-active {
  transition: opacity 0.5s ease;
}

.emptyMsg-enter-from,
.emptyMsg-leave-to {
  opacity: 0;
}

.empty {
  color: gray;
  font-style: italic;
  text-align: center;
  margin-top: 1em;
}
</style>