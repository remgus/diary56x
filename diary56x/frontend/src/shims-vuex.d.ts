import { instance } from "./api";
import store from "./store";

declare module "@vue/runtime-core" {
  // Provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: typeof store;
    $api: typeof instance;
  }
}

declare module "vuex" {
  export function useStore(key?: string): typeof store;
}
