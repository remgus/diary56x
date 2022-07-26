import { MutationTree } from "vuex";
import { DiaryMutationTypes, DiaryState, Mutations } from "./types";

export const mutations: MutationTree<DiaryState> & Mutations = {
  [DiaryMutationTypes.ADD_MESSAGE](state, message) {
    state.messages.push(message);
  },

  [DiaryMutationTypes.SET_NOTIFICATIONS](state, notifications) {
    state.unread_notifications = notifications;
  },

  [DiaryMutationTypes.SET_CONFIG](state, config) {
    state.config = config;
  },
};
