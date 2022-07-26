import { createLogger, createStore } from "vuex";
import { auth } from "./modules/auth";
import { diary } from "./modules/diary";

import { AuthState, AuthStore } from "./modules/auth/types";
import { DiaryState, DiaryStore } from "./modules/diary/types";

export type Store = AuthStore<Pick<RootState, "auth">> &
  DiaryStore<Pick<RootState, "diary">>;

export type RootState = {
  auth: AuthState;
  diary: DiaryState;
};

const debug = process.env.NODE_ENV !== "production";
const plugins = debug ? [createLogger({})] : [];

export const store = createStore({
  plugins,
  modules: {
    auth,
    diary,
  },
});

export function useStore(): Store {
  return store as Store;
}
