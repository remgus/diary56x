import { Getters } from "vuex-smart-module";
import { RootState } from "./types";

export class RootGetters extends Getters<RootState> {
  get isAuthenticated(): boolean {
    return Boolean(
      this.state.accessToken && this.state.refreshToken && this.state.user
    );
  }

  get messagesLength(): number {
    return this.state.messages.length;
  }

  get unreadNotificationsCount(): number {
    return this.state.unread_notifications.length;
  }
}
