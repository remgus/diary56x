import { store } from "@/store";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/auth/Login.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Profile.vue"),
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (
    to.matched.some(
      (record) =>
        record.meta.requiresAuth !== undefined && !record.meta.requiresAuth
    )
  ) {
    if (store.getters["isAuthenticated"]) {
      next("/");
    } else {
      next();
    }
  } else if (
    to.matched.some(
      (record) =>
        record.meta.requiresAuth !== undefined && record.meta.requiresAuth
    )
  ) {
    if (!store.getters["isAuthenticated"]) {
      next("/login");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
