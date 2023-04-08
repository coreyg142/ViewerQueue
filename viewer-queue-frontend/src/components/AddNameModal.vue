<template>
  <div class="addNameModal">
    <div class="background" v-on:click="closeModal" />
    <input
      type="text"
      v-model="name"
      placeholder="Enter a name"
      v-on:keypress.enter="tryAddName"
      ref="nameInput"
    />
    <button class="button-56" role="button" v-on:click="tryAddName">Add</button>
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
    this.$nextTick(() => {
      const input = this.$refs.nameInput as HTMLInputElement;
      input.focus();
    });
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
<style scoped lang="scss">
.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-color: rgba(0, 0, 0, 0.4);
}

input[type="text"] {
  width: 24rem;
  height: 3rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  padding: 0.25rem;
  margin-right: 0.5rem;
  font-size: 30px;
  font-family: inherit;
}

button {
  background: #ff4365;
  color: #fff;
  border: none;
  position: relative;
  height: 3.5rem;
  font-size: 1.2em;
  padding: 0 1em;
  cursor: pointer;
  transition: 800ms ease all;
  outline: none;
  border-radius: 5%;
  font-family: inherit;
}
button:hover {
  background: #ffb2c0;
  color: #ff4365;
}
button:before,
button:after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  height: 2px;
  width: 0;
  background: #ff4365;
  transition: 400ms ease all;
}
button:after {
  right: inherit;
  top: inherit;
  left: 0;
  bottom: 0;
}
button:hover:before,
button:hover:after {
  width: 100%;
  transition: 800ms ease all;
}
</style>
