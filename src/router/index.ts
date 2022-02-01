import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/home/Home.vue";
import { handleMetaViews } from "./utils";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      navbar: {
        transparent: true,
      },
    },
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
    meta: {},
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
    component: () => import("../views/auth/Profile.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/blog",
    name: "Blog",
    component: () => import("../views/blog/List.vue"),
  },
  {
    path: "/blog/:slug",
    name: "BlogPost",
    component: () => import("../views/blog/Details.vue"),
  },
  {
    path: "/blog/create/",
    name: "CreatePost",
    component: () => import("../views/blog/Create.vue"),
  },
  {
    path: "/notifications",
    name: "Notifications",
    component: () => import("../views/Notifications.vue"),
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  const res = handleMetaViews(to, next);
  if (res) return;
  next();
});

export default router;
