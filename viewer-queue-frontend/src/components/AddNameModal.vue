<template>
  <div class="addNameModal">
    <div class="background" v-on:click="closeModal" />
    <input
      type="text"
      v-model="name"
      placeholder="Enter a name"
      v-on:keypress.enter="tryAddName"
    />
    <button v-on:click="tryAddName">Add</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "@/store";
import axios from "axios";

export default defineComponent({
  name: "AddNameModal",
  inject: ["apiUrl"],

  mounted() {
    this.closeHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        this.closeModal();
      }
    };
    document.addEventListener("keydown", this.closeHandler);
  },

  beforeUnmount() {
    document.removeEventListener("keydown", this.closeHandler);
  },

  data() {
    return {
      name: "",
      // eslint-disable-next-line
      closeHandler: null as any,
    };
  },

  methods: {
    async tryAddName() {
      try {
        const response = await axios.post(
          `${this.apiUrl}/add`,
          {
            name: this.name,
          },
          {
            headers: {
              API_AUTH: `${store.state.accessKey}`,
            },
          }
        );
        if (response.status === 200) {
          this.$emit("close");
        }
      } catch (error) {
        console.log(error);
        this.$emit("close");
      }
    },
    closeModal() {
      this.$emit("close");
    },
  },
});
</script>
<style scoped>
.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-color: rgba(0, 0, 0, 0.4);
}
</style>
