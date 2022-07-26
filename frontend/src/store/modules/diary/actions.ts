import { ActionTree } from "vuex";
import { RootState } from "@/store";
import { listNotifications } from "@/api/services/notifications";
import {
  Actions,
  DiaryActionTypes,
  DiaryMutationTypes,
  DiaryState,
} from "./types";
import { fetchConfig } from "@/api/services/config";

export const actions: ActionTree<DiaryState, RootState> & Actions = {
  [DiaryActionTypes.ADD_MESSAGE]({ commit }, message) {
    commit(DiaryMutationTypes.ADD_MESSAGE, message);
    return Promise.resolve();
  },

  [DiaryActionTypes.FETCH_NOTIFICATIONS]({ commit, rootState }) {
    return new Promise((resolve, reject) => {
      if (rootState.auth.user == null) return;

      listNotifications({ read: false, user: rootState.auth.user.id })
        .then((response) => {
          commit(DiaryMutationTypes.SET_NOTIFICATIONS, response.data.results);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  async [DiaryActionTypes.FETCH_CONFIG]({ commit }) {
    const config = (await fetchConfig()).data;
    commit(DiaryMutationTypes.SET_CONFIG, config);
  },
};
