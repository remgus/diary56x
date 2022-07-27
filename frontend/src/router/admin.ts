import { RouteRecordRaw } from "vue-router";

const adminRoutes: RouteRecordRaw[] = [
  {
    path: "/admin",
    name: "Admin dashboard",
    component: () => import("../views/admin/main/Dashboard.vue"),
  },
  {
    path: "/admin/timetable",
    name: "Admin timetable",
    component: () => import("../views/admin/timetable/List.vue"),
  },
];

export default adminRoutes;
