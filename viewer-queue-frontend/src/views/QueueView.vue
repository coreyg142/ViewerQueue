<template>
  <div class="home">
    <img
      class="rudeimg"
      alt="Multilocke Name Queue"
      src="../assets/multilockeheader-transparent.png"
    />
    <br />
    <div
      role="button"
      style="display: inline"
      class="queueBtn btn"
      v-on:click="toggleQueue"
      :class="{ btnInactive: !queuedOrPrev, btnActive: queuedOrPrev }"
    >
      <span>Queued</span>
    </div>
    <span> | </span>
    <div
      role="button"
      style="display: inline"
      class="prevBtn btn"
      v-on:click="togglePrev"
      :class="{ btnInactive: queuedOrPrev, btnActive: !queuedOrPrev }"
    >
      <span>Previous</span>
    </div>
    <div class="queueBox">
      <Transition>
        <QueueComponent v-if="queuedOrPrev" />
        <PoppedComponent v-else />
      </Transition>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions } from "vuex";
import QueueComponent from "@/components/QueueComponent.vue";
import PoppedComponent from "@/components/PoppedComponent.vue";
import store from "@/store";

export default defineComponent({
  name: "QueueView",
  components: {
    QueueComponent,
    PoppedComponent,
  },
  computed: {
    queuedOrPrev() {
      return store.state.queuedOrPrev;
    },
  },
  methods: {
    ...mapActions(["setQueuedOrPrev"]),
    toggleQueue() {
      this.setQueuedOrPrev(true);
    },
    togglePrev() {
      this.setQueuedOrPrev(false);
    },
  },
});
</script>

<style scoped>
.queueBox {
  text-align: center;
  list-style: decimal;
  position: relative;
  width: fit-content;
  margin: 0 auto;
}
.rudeimg {
  width: 25%;
  height: 25%;
  object-fit: contain;
  padding-bottom: 2%;
  pointer-events: none;
}

.btn {
  font-weight: bold;
  color: #ff4365;
  text-decoration: none;
  cursor: pointer;
}
.btnInactive {
  font-weight: bold;
  color: #ff4365;
  text-decoration: none;
  cursor: pointer;
}
.btnActive {
  color: #ffd300;
  text-decoration: underline;
}
.v-enter-active {
  transition: opacity 0.5s ease;
}
.v-leave-active {
  transition: none;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
