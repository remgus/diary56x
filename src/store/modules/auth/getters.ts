import { Getters } from "vuex-smart-module";
import { RootState } from "./types";

export class RootGetters extends Getters<RootState> {
  get isAuthenticated(): boolean {
    return this.state.accessToken !== null;
  }

  get messagesLength(): number {
    return this.state.messages.length;
  }
}
