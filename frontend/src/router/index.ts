import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../components/homepage/Home.vue";
import { handleMetaViews } from "./utils";
import adminRoutes from "./admin";
import { store } from "@/store";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      navbar: {
        transparent: true,
      },
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../components/auth/Login.vue"),
    meta: {
      requiresAuth: false,
      navbar: {
        expand: true,
      },
    },
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../components/auth/Register.vue"),
    meta: {
      requiresAuth: false,
      navbar: {
        expand: true,
      },
    },
  },
  {
    path: "/blog",
    name: "blog",
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
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/notifications",
    name: "Notifications",
    component: () => import("../components/Notifications.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/account",
    name: "account",
    component: () => import("../components/auth/Account.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/settings",
    name: "settings",
    component: () => import("../components/settings/Settings.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/timetable-edit",
    name: "timetable-edit",
    component: () => import("../components/timetable/TimetableClassEdit.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: [...routes, ...adminRoutes],
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  document.body.setAttribute("tabindex", "-1");
  document.body.focus();
  document.body.removeAttribute("tabindex");

  const btn = document.getElementById("mainNavbarToggler");
  if (btn && !btn.classList.contains("collapsed")) {
    const content = document.getElementById("mainNavbarContent");
    content!.classList.remove("show");
    btn.classList.add("collapsed");
    console.log("collapsed");
  }

  const res = handleMetaViews(to, next);
  if (res) return;
  next();
});

export default router;
