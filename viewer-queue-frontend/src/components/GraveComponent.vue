<template>
  <div class="queuebox">
    <h2>Murdered Pokemons</h2>
    <div class="queue">
      <TransitionGroup name="list" tag="ol" reversed>
        <li v-for="(key, val) in queue" :key="key" class="list-item">
          <QueueItemComponent
            :name="val"
            :showModTools="loggedIn"
            :buttonsToShow="['del']"
          />
        </li>
      </TransitionGroup>
      <Transition name="emptyMsg"
        ><p v-if="Object.keys(queue).length === 0" class="empty">
          The graveyard is empty.
        </p>
      </Transition>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { state } from "@/socket";
import store from "@/store";
import QueueItemComponent from "./QueueItemComponent.vue";

export default defineComponent({
  name: "GraveComponent",

  components: {
    QueueItemComponent,
  },
  computed: {
    queue() {
      return state.graveyard;
    },
    loggedIn() {
      return store.state.loggedIn;
    },
  },
});
</script>

<style scoped>
.queue {
  text-align: left;
  list-style: decimal;
  position: relative;
  width: fit-content;
  max-width: 60vw;
  overflow-wrap: break-word;
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
  opacity: 0;
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
