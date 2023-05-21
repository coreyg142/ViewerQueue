<template>
  <div class="home" v-show="imageLoaded">
    <Transition name="fadewithexit">
      <AddNameModal v-if="showAddModal" @close="closeModal" />
    </Transition>
    <img
      rel="prefetch"
      class="rudeimg"
      alt="Multilocke Name Pool"
      src="../assets/multilockeheader-transparent.png"
      @load="imageLoaded = true"
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
        v-on:click="setActiveList(0)"
        v-on:keypress.enter="setActiveList(0)"
        :class="{ btnActive: activeList === 0 }"
      >
        <span>Pooled</span>
      </span>
      <span> | </span>
      <span
        role="button"
        tabindex="0"
        class="btn"
        v-on:click="setActiveList(1)"
        v-on:keypress.enter="setActiveList(1)"
        :class="{ btnActive: activeList === 1 }"
      >
        <span>Current run</span>
      </span>
      <!-- <span> | </span>
      <span
        role="button"
        tabindex="0"
        class="btn"
        v-on:click="setActiveList(2)"
        v-on:keypress.enter="setActiveList(2)"
        :class="{ btnActive: activeList === 2 }"
      >
        <span>Graveyard</span>
      </span> -->
      <div v-if="loggedIn">
        <br />
        <span
          role="button"
          tabindex="0"
          class="btn"
          v-on:click="showAddModal = true"
          v-on:keypress.enter="showAddModal = true"
        >
          <span>Add a name</span>
        </span>
      </div>
      <div class="listContainer">
        <Transition :name="listAnimationDirection">
          <component :is="dynamicComponent" />
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
import GraveComponent from "@/components/GraveComponent.vue";
import AddNameModal from "@/components/AddNameModal.vue";
import store from "@/store";
import { state as socketState } from "@/socket";

const canvas = document.createElement("canvas");

export default defineComponent({
  name: "QueueView",
  components: {
    QueueComponent,
    PoppedComponent,
    GraveComponent,
    QueueItemComponent,
    AddNameModal,
  },
  data() {
    return {
      animToggle: false,
      showAddModal: false,
      imageLoaded: false,
    };
  },
  watch: {
    mostRecentName() {
      this.animToggle = !this.animToggle;
    },
  },
  computed: {
    loggedIn() {
      return store.state.loggedIn;
    },
    dynamicComponent() {
      // if (this.activeList) return QueueComponent;
      // return PoppedComponent;
      switch (this.activeList) {
        case 0:
          return QueueComponent;
        case 1:
          return PoppedComponent;
        case 2:
          return GraveComponent;
        default:
          return QueueComponent;
      }
    },
    activeList() {
      return store.state.activeList;
    },
    listAnimationDirection() {
      if (store.state.activeList === 0) return "slideXR";
      else if (store.state.activeList === 1) return "slideXL";
      // else if (store.state.activeList === 2) return "slideXL";
      else return "slideXR";
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
    ...mapActions(["setActiveList"]),
    closeModal() {
      this.showAddModal = false;
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
  /* display: inline-block; */
}

.addNameModal {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
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
.slideXL-leave-active,
.slideY-move,
.slideY-enter-active,
.slideY-leave-active,
.slideYImm-move,
.slideYImm-enter-active,
.slideYImm-leave-active {
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
.slideXL-leave-active,
.slideYImm-leave-active {
  position: absolute;
  transition: none;
  opacity: 0;
}

.slideYImm-enter-from,
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
