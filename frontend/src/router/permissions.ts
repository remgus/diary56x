import { AccountTypes } from "@/api/services/auth";
import { store } from "@/store";

export enum ViewPermissions {
  ADMIN = 1,
  STUDENT = 2,
  MONITOR = 4,
  TEACHER = 8,
}

export const checkViewPermissions = (permissions: number | undefined) => {
  if (!permissions) return true; // Permissions aren't specified

  // If user isn't authenticated, there's no need for checks
  if (!store.state.auth.user) return false;

  if (permissions & ViewPermissions.ADMIN) {
    if (store.getters.isAdmin) return true;
  }

  if (permissions & ViewPermissions.STUDENT) {
    if (store.getters.isStudent) return true;
  }

  if (permissions & ViewPermissions.MONITOR) {
    if (store.getters.isStudent && store.state.auth.user.options_student?.is_monitor) return true;
  }

  if (permissions & ViewPermissions.TEACHER) {
    if (store.state.auth.user.account_type === AccountTypes.TEACHER) return true;
  }

  return false;
};
