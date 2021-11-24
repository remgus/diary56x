import { getLocalAccessToken, getLocalRefreshToken } from "@/api";
import { User } from "@/api/types";
import { getUserFromLocalStorage } from "./utils";

export class RootState {
  accessToken: string | null = getLocalAccessToken();
  refreshToken: string | null = getLocalRefreshToken();
  user: User | null = getUserFromLocalStorage();
  messages: Message[] = [];
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface Message {
  text: string;
  tag?: string;
}
