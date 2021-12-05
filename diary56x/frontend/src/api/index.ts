import { UserCredentials } from "@/store/modules/auth/types";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import {
  clearLocalDataAfterLogout,
  getLocalData,
  LocalData,
  setLocalData,
} from "./local";
import router from "@/router";
import BlogService from "./services/blog";
import { APITokens, APIUser } from "./types";
import createAuthRefreshInterceptor from "axios-auth-refresh";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";

enum APIURLS {
  GET_TOKEN = "auth/token",
  REFRESH_TOKEN = "auth/token/refresh",
  CURRENT_USER = "auth/users/current",
  REMOVE_TOKEN = "auth/logout",
  BASE_URL = "/api/private/",
}

export const instance = axios.create({
  baseURL: "/api/private/",
  headers: {
    "Content-Type": "application/json",
    "Accept-Language": "ru-RU",
  },
});

// Add a request interceptor to set authetication token
// before sending request
instance.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    if (!config?.headers) {
      throw new Error(
        `Expected 'config' and 'config.headers' not to be undefined`
      );
    }
    const token = getLocalData(LocalData.ACCESS_TOKEN);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const refreshAuthLogic = (failedRequest: AxiosError) =>
  axios
    .post(APIURLS.BASE_URL + APIURLS.REFRESH_TOKEN, {
      refresh: getLocalData(LocalData.REFRESH_TOKEN),
    })
    .then((response) => {
      setLocalData(LocalData.ACCESS_TOKEN, response.data.access);
      if (failedRequest.response?.config.headers) {
        failedRequest.response.config.headers["Authorization"] =
          "Bearer " + response.data.access;
      }
      return Promise.resolve();
    })
    .catch((error) => {
      clearLocalDataAfterLogout();
      router.push("/login");
      return Promise.reject(error);
    });

createAuthRefreshInterceptor(instance, refreshAuthLogic);

export type APIServiceType = APIService;

export class APIService {
  public readonly axios: AxiosInstance;
  public readonly URLS = APIURLS;
  public readonly blog = new BlogService(this);

  constructor(a: AxiosInstance) {
    this.axios = a;
  }

  public getCurrentUser(): Promise<AxiosResponse<APIUser>> {
    return this.axios.get<APIUser>(APIURLS.CURRENT_USER);
  }

  public logout(refreshToken: string): Promise<AxiosResponse> {
    return this.axios.post(APIURLS.REMOVE_TOKEN, {
      refresh: refreshToken,
    });
  }

  public login(credentials: UserCredentials): Promise<AxiosResponse> {
    return this.axios.post<APITokens>(API.URLS.GET_TOKEN, {
      email: credentials.email,
      password: credentials.password,
    });
  }
}

const API = new APIService(instance);
export default API;
