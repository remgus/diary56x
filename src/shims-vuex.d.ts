import store from "./store";
import { APIServiceType } from "./api";
import { SharedUtils } from "./utils";
import "vue-router";

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

declare module "vue-router" {
  interface RouteMeta {
    requiresAuth?: boolean;
    navbar?: {
      transparent?: boolean;
    };
  }
}
