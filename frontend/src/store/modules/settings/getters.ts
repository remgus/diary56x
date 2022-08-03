import { RootState } from "@/store";
import { GetterTree } from "vuex";
import { SettingsState, Getters } from "./types";

export const getters: GetterTree<SettingsState, RootState> & Getters = {};
