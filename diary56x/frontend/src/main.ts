import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store, key } from "./store";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./assets/styles/base.css";

import API from "./api";
import utils from "./utils";

const app = createApp(App);
app.config.globalProperties.$api = API;
app.use(store, key).use(router).use(utils).mount("#app");
