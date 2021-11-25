import { RouteLocationNormalized } from "vue-router";

onlyAuthrized = (to: RouteLocationNormalized) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters.isAuthenticated) {
      router.push({ name: "login" });
    }
  }
}