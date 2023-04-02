import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

const app = createApp(App);
export const hostname = "http://localhost:3000";
app.config.globalProperties.$hostname = hostname;
app.use(store).use(router).mount("#app");
