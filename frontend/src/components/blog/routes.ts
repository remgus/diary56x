import { ViewPermissions } from "@/router/permissions";
import { RouteRecordRaw } from "vue-router";

export const blogRoutes: Array<RouteRecordRaw> = [
  // {
  //   path: "/blog",
  //   name: "blog",
  //   component: () => import("./List.vue"),
  // },
  // {
  //   path: "/blog/:slug",
  //   name: "BlogPost",
  //   component: () => import("./Details.vue"),
  // },
  // {
  //   path: "/blog/new-post/",
  //   name: "CreatePost",
  //   component: () => import("./Create.vue"),
  //   meta: {
  //     requiresAuth: true,
  //     permissions: ViewPermissions.ADMIN,
  //   },
  // },
];

export default blogRoutes;
