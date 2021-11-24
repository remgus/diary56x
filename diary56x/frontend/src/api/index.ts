import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";

export enum AccountTypes {
  ROOT,
  ADMIN,
  TEACHER,
  STUDENT,
}

export interface APIUser {
  id: number;
  email: string;
  first_name: string;
  surname: string;
  second_name: string;
  account_type: AccountTypes;
  last_login: string;
  registration_date: string;
  is_superuser: boolean;
  is_staff: boolean;
  is_active: boolean;
}

export interface AccessTokens {
  access: string;
  refresh: string;
}

export function getLocalAccessToken(): string | null {
  return localStorage.getItem("diary56x-access-token");
}

export function getLocalRefreshToken(): string | null {
  return localStorage.getItem("diary56x-refresh-token");
}

export function setLocalAccessToken(token: string): void {
  localStorage.setItem("diary56x-access-token", token);
}

export function setLocalRefreshToken(token: string): void {
  localStorage.setItem("diary56x-refresh-token", token);
}

enum APIURLS {
  GET_TOKEN = "auth/token/",
  REFRESH_TOKEN = "auth/token/refresh/",
  CURRENT_USER = "auth/users/current",
}

const instance = axios.create({
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
    const token = localStorage.getItem("diary56x-access-token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle expired authetication token
instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        instance
          .post(APIURLS.REFRESH_TOKEN, {
            refreshToken: getLocalRefreshToken(),
          })
          .then((res) => {
            setLocalAccessToken(res.data.accessToken);
            originalConfig.headers[
              "Authorization"
            ] = `Bearer ${res.data.accessToken}`;
            return instance(originalConfig);
          })
          .catch((e) => {
            if (e.response && e.response.data) {
              return Promise.reject(e.response.data);
            }

            return Promise.reject(e);
          });
      }

      if (err.response.status === 403 && err.response.data) {
        return Promise.reject(err.response.data);
      }
    }

    return Promise.reject(err);
  }
);

export default class API {
  static readonly URLS = APIURLS;

  static readonly axios = instance;

  static getCurrentUser(): Promise<AxiosResponse<APIUser>> {
    return instance.get<APIUser>(APIURLS.CURRENT_USER);
  }
}
