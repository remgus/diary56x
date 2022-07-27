import { RootState } from "@/store";
import { GetterTree } from "vuex";
import { AuthState, Getters } from "./types";

export const getters: GetterTree<AuthState, RootState> & Getters = {
  isAuthenticated: (state) =>
    Boolean(state.accessToken && state.refreshToken && state.user),
  isStudent: (state) => Boolean(state.user && state.user.account_type === 3),
  inKlass: (state) =>
    Boolean(
      state.user &&
        state.user.account_type === 3 &&
        state.user.options_student?.klass !== null
    ),
  klass: (state) => {
    if (state.user && state.user.options_student)
      return state.user.options_student.klass;
    return null;
  },
};
