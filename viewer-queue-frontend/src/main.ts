import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

const app = createApp(App);
export const apiUrl = "http://localhost:3000";
app.config.globalProperties.$apiUrl = apiUrl;
app.use(store).use(router).mount("#app");
