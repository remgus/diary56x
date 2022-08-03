import { Module } from "vuex";
import { settingsState } from "./state";
import { getters } from "./getters";
import { mutations } from "./mutations";
import { actions } from "./actions";
import { SettingsState } from "./types";
import { RootState } from "@/store";

export const settings: Module<SettingsState, RootState> = {
  state: settingsState,
  getters,
  mutations,
  actions,
};
