import { ActionTree } from "vuex";
import { RootState } from "@/store";
import { clearLocalData, LocalData, setLocalData } from "@/api/local";
import { listNotifications } from "@/api/services/notifications";
import { getCurrentUser, login, logout } from "@/api/services/auth";
import {
  Actions,
  AuthActionTypes,
  AuthMutationTypes,
  AuthState,
} from "./types";

export const actions: ActionTree<AuthState, RootState> & Actions = {
  [AuthActionTypes.LOGIN]({ commit }, credentials) {
    return new Promise((resolve, reject) => {
      login(credentials)
        .then((response) => {
          const { access, refresh } = response.data;
          setLocalData(LocalData.ACCESS_TOKEN, access);
          setLocalData(LocalData.REFRESH_TOKEN, refresh);
          commit(AuthMutationTypes.SET_TOKENS, {
            accessToken: access,
            refreshToken: refresh,
          });
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  [AuthActionTypes.CURRENT_USER]({ commit }) {
    return new Promise((resolve, reject) => {
      getCurrentUser()
        .then((response) => {
          commit(AuthMutationTypes.SET_USER, response.data);
          setLocalData(LocalData.USER, JSON.stringify(response.data));
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  [AuthActionTypes.ADD_MESSAGE]({ commit }, message) {
    commit(AuthMutationTypes.ADD_MESSAGE, message);
    return Promise.resolve();
  },

  [AuthActionTypes.LOGOUT]({ commit, state }) {
    return new Promise(() => {
      if (!state.refreshToken) {
        return Promise.reject("Refresh token is null.");
      }
      logout(state.refreshToken).finally(() => {
        commit(AuthMutationTypes.CLEAR_USER, undefined);
        commit(AuthMutationTypes.CLEAR_TOKENS, undefined);
        clearLocalData();
      });
    });
  },

  [AuthActionTypes.FETCH_NOTIFICATIONS]({ commit, state }) {
    return new Promise((resolve, reject) => {
      if (state.user == null) return;

      listNotifications({ read: false, user: state.user.id })
        .then((response) => {
          commit(AuthMutationTypes.SET_NOTIFICATIONS, response.data.results);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
