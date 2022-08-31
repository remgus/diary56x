import { ActionTree } from "vuex";
import { RootState } from "@/store";
import { listNotifications } from "@/api/services/notifications";
import { Actions, SettingsActionTypes, SettingsMutationTypes, SettingsState } from "./types";

export const actions: ActionTree<SettingsState, RootState> & Actions = {
  [SettingsActionTypes.SET_SETTING]({ commit }, { option, value }) {
    commit(SettingsMutationTypes.SET_SETTING, { option, value });
    return Promise.resolve();
  },
};
