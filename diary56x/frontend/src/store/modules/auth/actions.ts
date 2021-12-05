import { User } from "@/api/models";
import { Mutations } from "vuex-smart-module";
import { Message, RootState } from "./types";

export class RootMutations extends Mutations<RootState> {
  setTokens(tokens: { accessToken: string; refreshToken: string }): void {
    this.state.accessToken = tokens.accessToken;
    this.state.refreshToken = tokens.refreshToken;
  }

  setUser(user: User): void {
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
}
