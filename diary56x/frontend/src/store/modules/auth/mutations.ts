import API, {
  AccessTokens,
  setLocalAccessToken,
  setLocalRefreshToken,
} from "@/api";
import { User } from "@/api/types";
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
      API.axios
        .post<AccessTokens>(API.URLS.GET_TOKEN, {
          email: credentials.email,
          password: credentials.password,
        })
        .then((response) => {
          const { access, refresh } = response.data;
          setLocalAccessToken(access);
          setLocalRefreshToken(refresh);
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
          this.commit("setUser", new User(response.data));
          localStorage.setItem("user", JSON.stringify(response.data));
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
}
