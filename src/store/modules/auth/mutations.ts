import {
  clearLocalDataAfterLogout,
  LocalData,
  setLocalData,
} from "@/api/local";
import { listNotifications } from "@/api/services/notifications";
import { Actions } from "vuex-smart-module";
import { RootMutations } from "./actions";
import { RootGetters } from "./getters";
import { Message, RootState, UserCredentials } from "./types";
import { getCurrentUser, login, logout } from "@/api/services/auth";

export class RootActions extends Actions<
  RootState,
  RootGetters,
  RootMutations,
  RootActions
> {
  login(credentials: UserCredentials): Promise<void> {
    return new Promise((resolve, reject) => {
      login(credentials)
        .then((response) => {
          const { access, refresh } = response.data;
          setLocalData(LocalData.ACCESS_TOKEN, access);
          setLocalData(LocalData.REFRESH_TOKEN, refresh);
          this.commit("setTokens", {
            accessToken: access,
            refreshToken: refresh,
          });
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  me(): Promise<void> {
    return new Promise((resolve, reject) => {
      getCurrentUser()
        .then((response) => {
          this.commit("setUser", response.data);
          setLocalData(LocalData.USER, JSON.stringify(response.data));
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  addMessage(payload: Message): Promise<void> {
    this.dispatch("addMessage", payload);
    return Promise.resolve();
  }

  logout(): Promise<void> {
    return new Promise(() => {
      if (!this.state.refreshToken) {
        return Promise.reject("Refresh token is null.");
      }
      logout(this.state.refreshToken).finally(() => {
        this.commit("clearUser");
        this.commit("clearTokens");
        clearLocalDataAfterLogout();
      });
    });
  }

  fetchNotifications(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.state.user == null) return;

      listNotifications({ read: false, user: this.state.user.id })
        .then((response) => {
          this.commit("setNotifications", response.data.results);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
