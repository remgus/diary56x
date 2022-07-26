import { DiaryxConfig, fetchConfig } from "@/api/services/config";
import { GetterTree } from "vuex";
import { RootState } from "./auth/types";

export interface ConfigState {
  config: DiaryxConfig | null;
}

export const configState: ConfigState = {
  config: null,
};

export type Getters = {
  pluginEnabled(name: string): boolean;
};

// export class ConfigMutations extends Mutations<ConfigState> {
//   setConfig(config: DiaryxConfig | null) {
//     this.state.config = config;
//   }
// }

const getters: GetterTree<ConfigState, RootState> & Getters = {
  pluginEnabled(name: string): boolean {
    return this.state.config ? this.state.config.plugins.includes(name) : false;
  },
};

// export class ConfigActions extends Actions<
//   ConfigState,
//   ConfigGetters,
//   ConfigMutations,
//   ConfigActions
// > {
//   async fetch() {
//     const config = (await fetchConfig()).data;
//     this.commit("setConfig", config);
//   }
// }

// export const config = new Module({
//   state: ConfigState,
//   getters: ConfigGetters,
//   actions: ConfigActions,
//   mutations: ConfigMutations,
//   namespaced: true,
// });

// export const useConfig = createComposable(config);
