import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store, key } from "./store";

import "./assets/styles/base.css";

const app = createApp(App);
app.use(store, key).use(router).mount("#app");
