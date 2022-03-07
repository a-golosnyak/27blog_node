import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import config from "./config";

window.axios = axios.create({ baseURL: config.APP_BASE_URL });

window.axios.defaults.headers.common = {
  "X-Requested-With": "XMLHttpRequest",
  "Content-Type": "application/json",
};

createApp(App).use(store).use(router).mount("#app");
