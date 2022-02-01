import { APINotification } from "@/api/services/notifications";
import { APIUser } from "@/api/types";
import { Mutations } from "vuex-smart-module";
import { Message, RootState } from "./types";

export class RootMutations extends Mutations<RootState> {
  setTokens(tokens: { accessToken: string; refreshToken: string }): void {
    this.state.accessToken = tokens.accessToken;
    this.state.refreshToken = tokens.refreshToken;
  }

  setUser(user: APIUser): void {
    this.state.user = user;
  }

  clearTokens(): void {
    this.state.accessToken = null;
    this.state.refreshToken = null;
  }

  clearUser(): void {
    this.state.user = null;
  }

  addMessage(payload: Message): void {
    this.state.messages.push(payload);
  }

  setNotifications(notifications: APINotification[]): void {
    this.state.unread_notifications = notifications;
  }
}
