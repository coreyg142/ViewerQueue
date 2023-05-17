<template>
  <div class="login">
    <h1>Enter access code below</h1>
    <input
      type="password"
      id="password"
      autocomplete="off"
      v-model="password"
      placeholder="Access code"
      v-on:keypress.enter="submit"
    />
    <button v-on:click="submit">Submit</button>
    <Transition name="fade">
      <p class="errortext" v-if="invalidCode">Invalid access code</p>
    </Transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions } from "vuex";
import axios from "axios";

export default defineComponent({
  name: "LoginComponent",
  inject: ["apiUrl"],
  data() {
    return {
      password: "",
      invalidCode: false,
    };
  },
  methods: {
    ...mapActions(["setAccessKey"]),
    async submit() {
      try {
        const response = await axios.post(`${this.apiUrl}/authenticate`, {
          password: this.password,
        });
        if (response.status === 200) {
          this.invalidCode = false;
          this.setAccessKey({
            authKey: response.data.authKey,
            time: response.data.time,
          });
          this.$router.push("/");
        }
      } catch (error) {
        this.invalidCode = true;
        setTimeout(() => {
          this.invalidCode = false;
        }, 5000);
        this.password = "";
      }
    },
  },
});
</script>

<style scoped>
.errortext {
  color: red;
}
.fade-enter-active {
  transition: opacity 0.2s ease;
}
.fade-leave-active {
  transition: opacity 0.8s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
