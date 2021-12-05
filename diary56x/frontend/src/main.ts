import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./assets/styles/base.css";

import API from "./api";

const app = createApp(App);
app.config.globalProperties.$api = API;
app.use(store).use(router).mount("#app");
