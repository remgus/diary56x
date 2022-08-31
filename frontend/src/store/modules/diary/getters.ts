import { RootState } from "@/store";
import { GetterTree } from "vuex";
import { DiaryState, Getters } from "./types";

export const getters: GetterTree<DiaryState, RootState> & Getters = {
  messagesLength: (state) => state.messages.length,
  unreadNotificationsCount: (state) => state.unread_notifications.length,
  pluginEnabled: (state, name) => {
    return state.config && state.config.plugins.length
      ? state.config.plugins.includes(name) || state.config.plugins[0] == "__all__"
      : false;
  },
};
