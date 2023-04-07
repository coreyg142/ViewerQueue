import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

const app = createApp(App);
// TODO Update this:
export const apiUrl = process.env.NODE_ENV === "production" ? "http://localhost:3000" : "http://localhost:3000";
console.log(apiUrl);
app.provide("apiUrl", apiUrl);
app.use(store).use(router).mount("#app");
