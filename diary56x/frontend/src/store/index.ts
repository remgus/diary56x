import { createStore } from "vuex-smart-module";
import root from "./modules/auth";

export const store = createStore(root);

export default store;
