import { APINotification } from "@/api/services/notifications";
import {
  ActionContext,
  CommitOptions,
  Store as VuexStore,
  DispatchOptions,
} from "vuex";
import { RootState } from "@/store";
import { DiaryxConfig } from "@/api/services/config";

export interface DiaryState {
  messages: Message[];
  unread_notifications: APINotification[];
  config: null | DiaryxConfig;
}

export interface Message {
  text: string;
  tag?: string;
}

export enum DiaryActionTypes {
  ADD_MESSAGE = "DIARY/ADD_MESSAGE",
  FETCH_NOTIFICATIONS = "DIARY/FETCH_NOTIFICATIONS",
  FETCH_CONFIG = "DIARY/FETCH_CONFIG",
}

export enum DiaryMutationTypes {
  ADD_MESSAGE = "DIARY/ADD_MESSAGE",
  SET_CONFIG = "DIARY/SET_CONFIG",
  SET_NOTIFICATIONS = "DIARY/SET_NOTIFICATIONS",
}

export type Mutations<S = DiaryState> = {
  [DiaryMutationTypes.SET_NOTIFICATIONS](
    state: S,
    notifications: APINotification[]
  ): void;
  [DiaryMutationTypes.ADD_MESSAGE](state: S, message: Message): void;
  [DiaryMutationTypes.SET_CONFIG](state: S, config: DiaryxConfig): void;
};

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<DiaryState, RootState>, "commit">;

export interface Actions {
  [DiaryActionTypes.ADD_MESSAGE](
    { commit }: AugmentedActionContext,
    message: Message
  ): Promise<void>;

  [DiaryActionTypes.FETCH_NOTIFICATIONS]({
    commit,
  }: AugmentedActionContext): Promise<void>;

  [DiaryActionTypes.FETCH_CONFIG]({
    commit,
  }: AugmentedActionContext): Promise<void>;
}

export type Getters = {
  messagesLength: (state: DiaryState) => number;
  unreadNotificationsCount: (state: DiaryState) => number;
  pluginEnabled: (state: DiaryState, name: string) => boolean;
};

export type DiaryStore<S = DiaryState> = Omit<
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
