import { InjectionKey } from "vue";
import { Store } from "vuex";
import { createStore } from "vuex-smart-module";
import root from "./modules/auth";
import { RootState } from "./modules/auth/types";

export const key: InjectionKey<Store<RootState>> = Symbol();

export const store = createStore(root);

export default store;
