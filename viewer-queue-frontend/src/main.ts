import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

const app = createApp(App);
export const apiUrl = process.env.VUE_APP_API_URL || "";
console.log(apiUrl);
app.provide("apiUrl", apiUrl);
app.use(store).use(router).mount("#app");
