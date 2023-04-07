import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas);

const app = createApp(App);
// TODO Update this:
export const apiUrl = process.env.NODE_ENV === "production" ? "https://api.thatonelegion.xyz" : "http://localhost:3000";
app.provide("apiUrl", apiUrl);
app.use(store).use(router).component("font-awesome-icon", FontAwesomeIcon).mount("#app");
