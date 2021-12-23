import store from "./store";
import { APIServiceType } from "./api";
import { SharedUtils } from "./utils";

declare module "@vue/runtime-core" {
  // Provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: typeof store;
    $api: APIServiceType;
    $utils: SharedUtils;
  }
}

declare module "vuex" {
  export function useStore(key?: string): typeof store;
}
