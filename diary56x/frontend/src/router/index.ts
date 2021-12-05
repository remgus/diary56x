import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import { handleMetaViews } from "./utils";

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
  {
    path: "/blog",
    name: "Blog",
    component: () => import("../views/blog/NewsList.vue"),
  },
  {
    path: "/blog/create/",
    name: "CreatePost",
    component: () => import("../views/blog/CreatePost.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const res = handleMetaViews(to, next);
  if (res) return;
  next();
});

export default router;
