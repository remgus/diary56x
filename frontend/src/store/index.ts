import { createLogger, createStore } from "vuex";
import { auth } from "./modules/auth";
import { AuthState, AuthStore } from "./modules/auth/types";

export type Store = AuthStore<Pick<RootState, "auth">>;

export type RootState = {
  auth: AuthState;
};

const debug = process.env.NODE_ENV !== "production";
const plugins = debug ? [createLogger({})] : [];

export const store = createStore({
  plugins,
  modules: {
    auth,
  },
});

export function useStore(): Store {
  return store as Store;
}
