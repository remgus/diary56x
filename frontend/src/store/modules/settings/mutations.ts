import { MutationTree } from "vuex";
import { SettingsMutationTypes, SettingsState, Mutations } from "./types";

export const mutations: MutationTree<SettingsState> & Mutations = {
  [SettingsMutationTypes.SET_SETTING](state, {option, value}) {
    state[option] = value;
  },
};
