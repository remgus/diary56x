import { APINotification } from "@/api/services/notifications";
import { APIUser } from "@/api/services/auth";
import {
  ActionContext,
  CommitOptions,
  Store as VuexStore,
  DispatchOptions,
} from "vuex";
import { RootState } from "@/store";

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: APIUser | null;
  messages: Message[];
  unread_notifications: APINotification[];
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface Message {
  text: string;
  tag?: string;
}

export enum AuthActionTypes {
  LOGIN = "LOGIN",
  CURRENT_USER = "ME",
  ADD_MESSAGE = "ADD_MESSAGE",
  LOGOUT = "LOGOUT",
  FETCH_NOTIFICATIONS = "FETCH_NOTIFICATIONS",
}

export enum AuthMutationTypes {
  SET_TOKENS = "SET_TOKENS",
  SET_USER = "SET_USER",
  CLEAR_TOKENS = "CLEAR_TOKENS",
  CLEAR_USER = "CLEAR_USER",
  ADD_MESSAGE = "ADD_MESSAGE",
  SET_NOTIFICATIONS = "SET_NOTIFICATIONS",
}

export type Mutations<S = AuthState> = {
  [AuthMutationTypes.SET_USER](state: S, user: APIUser): void;
  [AuthMutationTypes.SET_TOKENS](
    state: S,
    tokens: { accessToken: string; refreshToken: string }
  ): void;
  [AuthMutationTypes.SET_NOTIFICATIONS](
    state: S,
    notifications: APINotification[]
  ): void;
  [AuthMutationTypes.CLEAR_USER](state: S): void;
  [AuthMutationTypes.CLEAR_TOKENS](state: S): void;
  [AuthMutationTypes.ADD_MESSAGE](state: S, message: Message): void;
};

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<AuthState, RootState>, "commit">;

export interface Actions {
  [AuthActionTypes.ADD_MESSAGE](
    { commit }: AugmentedActionContext,
    message: Message
  ): Promise<void>;

  [AuthActionTypes.FETCH_NOTIFICATIONS]({
    commit,
  }: AugmentedActionContext): Promise<void>;

  [AuthActionTypes.LOGIN](
    { commit }: AugmentedActionContext,
    credentials: UserCredentials
  ): Promise<void>;

  [AuthActionTypes.LOGOUT]({ commit }: AugmentedActionContext): Promise<void>;

  [AuthActionTypes.CURRENT_USER]({
    commit,
  }: AugmentedActionContext): Promise<void>;
}

export type Getters = {
  isAuthenticated: (state: AuthState) => boolean;
  messagesLength: (state: AuthState) => number;
  unreadNotificationsCount: (state: AuthState) => number;
};

export type AuthStore<S = AuthState> = Omit<
  VuexStore<S>,
  "getters" | "commit" | "dispatch"
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload?: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>;
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>;
  };
};
