import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../components/homepage/Home.vue";
import { handleMetaViews } from "./utils";
import adminRoutes from "./admin";
import { ViewPermissions } from "./permissions";
import blogRoutes from "@/components/blog/routes";

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
    meta: {
      requiresAuth: true,
      permissions: ViewPermissions.MONITOR | ViewPermissions.ADMIN,
    },
  },
  {
    path: "/minimum",
    name: "minimum",
    component: () => import("../components/minimum/MinimumList.vue"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../components/About.vue"),
  },
  {
    path: "/denied",
    name: "denied",
    component: () => import("../components/PermissionMissing.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: [...routes, ...adminRoutes, ...blogRoutes],
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
