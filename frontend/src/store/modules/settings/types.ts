import {
  ActionContext,
  CommitOptions,
  Store as VuexStore,
  DispatchOptions,
} from "vuex";
import { RootState } from "@/store";

export interface SettingsState {
  homework_monitor_mode_default: "view" | "edit";
  homework_limit_tasks: boolean;
  homework_hide_subject_icons: boolean;
  homework_dates_preview: boolean;
  timetable_show_today_tomorrow: boolean;
  timetable_group_pairs: boolean;
  timetable_compact_mode: boolean;
}

export enum SettingsActionTypes {
  SET_SETTING = "SETTINGS/SET_SETTING",
}

export enum SettingsMutationTypes {
  SET_SETTING = "SETTINGS/SET_SETTING",
}

export type Mutations<S = SettingsState> = {
  [SettingsMutationTypes.SET_SETTING]<K extends keyof S>(
    state: S,
    payload: { option: K; value: S[K] }
  ): void;
};

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<SettingsState, RootState>, "commit">;

export interface Actions {
  [SettingsActionTypes.SET_SETTING]<K extends keyof SettingsState>(
    { commit }: AugmentedActionContext,
    payload: { option: K; value: SettingsState[K] }
  ): Promise<void>;
}

export type Getters = {};

export type SettingsStore<S = SettingsState> = Omit<
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
