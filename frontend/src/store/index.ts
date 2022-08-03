import { createLogger, createStore, Plugin } from "vuex";
import VuexPersistence from "vuex-persist";
import { auth } from "./modules/auth";
import { diary } from "./modules/diary";
import { settings } from "./modules/settings";

import { AuthState, AuthStore } from "./modules/auth/types";
import { DiaryState, DiaryStore } from "./modules/diary/types";
import { SettingsState, SettingsStore } from "./modules/settings/types";

export type Store = AuthStore<Pick<RootState, "auth">> &
  DiaryStore<Pick<RootState, "diary">> &
  SettingsStore<Pick<RootState, "settings">>;

export type RootState = {
  auth: AuthState;
  diary: DiaryState;
  settings: SettingsState;
};

const vuexLocal = new VuexPersistence<RootState>({
  storage: window.localStorage,
  modules: ["settings"],
});

const debug = process.env.NODE_ENV !== "production";
const plugins: Plugin<RootState>[] = debug ? [createLogger<RootState>({})] : [];

plugins.push(vuexLocal.plugin);

export const store = createStore({
  modules: {
    auth,
    diary,
    settings,
  },
  plugins,
  strict: false,
});

export function useStore(): Store {
  return store as Store;
}
