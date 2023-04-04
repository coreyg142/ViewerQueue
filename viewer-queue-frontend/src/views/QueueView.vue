<template>
  <div class="home">
    <img
      rel="prefetch"
      class="rudeimg"
      alt="Multilocke Name Queue"
      src="../assets/multilockeheader-transparent.png"
    />
    <br />
    <div class="queueContainer">
      <div class="mostRecentName" :style="{ width: textWidth }">
        <span>{{ mostRecentNameMsg }}</span>
        <Transition name="slideY">
          <QueueItemComponent :name="mostRecentName" v-if="animToggle" />
          <QueueItemComponent :name="mostRecentName" v-else />
        </Transition>
      </div>
      <span
        role="button"
        tabindex="0"
        class="queueBtn btn"
        v-on:click="toggleQueue"
        v-on:keypress.enter="toggleQueue"
        :class="{ btnActive: queuedOrPrev }"
      >
        <span>Queued</span>
      </span>
      <span> | </span>
      <span
        role="button"
        tabindex="0"
        class="prevBtn btn"
        v-on:click="togglePrev"
        v-on:keypress.enter="togglePrev"
        :class="{ btnActive: !queuedOrPrev }"
      >
        <span>Previous</span>
      </span>
      <!-- <div class="recentPop">
      <h2>Most Recent Pop</h2>
      <p>{{ store.state.recentPop }}</p>
    </div> -->
      <!-- <div class="listContainer">
        <Transition
          name="customclasses"
          :enter-active-class="listAnimationEnterClass"
          :leave-active-class="listAnimationLeaveClass"
          mode="out-in"
          class="faster"
        >
          <QueueComponent v-if="queuedOrPrev" />
          <PoppedComponent v-else />
        </Transition>
      </div> -->
      <div class="listContainer">
        <Transition :name="listAnimationDirection">
          <QueueComponent v-if="queuedOrPrev" />
          <PoppedComponent v-else />
        </Transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions } from "vuex";
import QueueComponent from "@/components/QueueComponent.vue";
import PoppedComponent from "@/components/PoppedComponent.vue";
import QueueItemComponent from "@/components/QueueItemComponent.vue";
import store from "@/store";
import { state as socketState } from "@/socket";

const canvas = document.createElement("canvas");

export default defineComponent({
  name: "QueueView",
  components: {
    QueueComponent,
    PoppedComponent,
    QueueItemComponent,
  },
  data() {
    return {
      animToggle: false,
    };
  },
  watch: {
    mostRecentName() {
      this.animToggle = !this.animToggle;
    },
  },
  computed: {
    queuedOrPrev() {
      return store.state.queuedOrPrev;
    },
    listAnimationDirection() {
      if (store.state.queuedOrPrev) return "slideXR";
      return "slideXL";
    },
    listAnimationEnterClass() {
      if (store.state.queuedOrPrev) {
        return "animate__animated animate__fadeInLeft";
      }
      return "animate__animated animate__fadeInRight";
    },
    listAnimationLeaveClass() {
      if (store.state.queuedOrPrev) {
        return "animate__animated animate__fadeOutRight";
      }
      return "animate__animated animate__fadeOutLeft";
    },
    mostRecentNameMsg() {
      return socketState.poppedNames.length
        ? `The most recently chosen name is `
        : "No names have been chosen yet!";
    },
    mostRecentName() {
      return socketState.poppedNames[0] ? socketState.poppedNames[0] + "!" : "";
    },
    textWidth() {
      const text: string = this.mostRecentNameMsg + this.mostRecentName;
      const context = canvas.getContext("2d");
      if (!context) return 0;
      context.font = "1.5rem Fredoka";
      return context.measureText(text).width + "px";
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
.rudeimg {
  width: 30rem;
  height: auto;
  object-fit: contain;
  padding-bottom: 0.5%;
  pointer-events: none;
}
.mostRecentName {
  text-align: left;
  font-size: 1.5rem;
  padding: 0.5rem;
  /* width: fit-content; */
  margin: 0 auto;
  transition: width 1s ease;
  overflow: visible;
  white-space: nowrap;
}

.faster {
  --animate-duration: 0.5s;
}

.listContainer {
  width: fit-content;
  margin: 0 auto;
  padding: 0.5rem;
}

.slideXR-move,
.slideXL-move,
.slideXR-enter-active,
.slideXL-enter-active,
.slideXR-leave-active,
.slideXL-leave-active {
  transition: all 0.6s ease;
}

.slideXR-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.slideXL-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slideXR-leave-active,
.slideXL-leave-active {
  position: absolute;
  transition: none;
  opacity: 0;
}

.slideY-move,
.slideY-enter-active,
.slideY-leave-active {
  transition: all 0.6s ease;
}

.slideY-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slideY-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
.slideY-leave-active {
  position: absolute;
}
</style>
