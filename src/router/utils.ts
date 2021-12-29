import store from "@/store";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export const handleMetaViews = (
  to: RouteLocationNormalized,
  next: NavigationGuardNext
): boolean => {
  if (to.matched.some((record) => record.meta.requiresAuth !== undefined)) {
    if (to.meta.requiresAuth) {
      if (!store.getters["isAuthenticated"]) {
        next({ name: "Login" });
        return true;
      }
    } else {
      if (store.getters["isAuthenticated"]) {
        next({ name: "Home" });
        return true;
      }
    }
  }
  return false;
};
