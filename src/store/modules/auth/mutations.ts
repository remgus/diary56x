import API from "@/api";
import {
  clearLocalDataAfterLogout,
  LocalData,
  setLocalData,
} from "@/api/local";
import { Actions } from "vuex-smart-module";
import { RootMutations } from "./actions";
import { RootGetters } from "./getters";
import { Message, RootState, UserCredentials } from "./types";

export class RootActions extends Actions<
  RootState,
  RootGetters,
  RootMutations,
  RootActions
> {
  login(credentials: UserCredentials): Promise<void> {
    return new Promise((resolve, reject) => {
      API.login(credentials)
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
      API.getCurrentUser()
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
    return new Promise((resolve, reject) => {
      if (!this.state.refreshToken) {
        return Promise.reject("Refresh token is null.");
      }
      API.logout(this.state.refreshToken)
        .then(() => {
          this.commit("clearUser");
          this.commit("clearTokens");
          clearLocalDataAfterLogout();
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
