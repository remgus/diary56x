import { Module } from "vuex-smart-module";
import { RootMutations } from "./mutations";
import { RootGetters } from "./getters";
import { RootActions } from "./actions";
import { RootState } from "./types";

export const root = new Module({
  actions: RootActions,
  getters: RootGetters,
  mutations: RootMutations,
  state: RootState,
});

export default root;
