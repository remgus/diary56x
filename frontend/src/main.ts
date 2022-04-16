import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store, key } from "./store";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./assets/styles/base.css";

const app = createApp(App);
app.use(store, key).use(router).mount("#app");
