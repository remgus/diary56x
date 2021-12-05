import { getLocalData, LocalData } from "@/api/local";
import { User } from "@/api/models";
import { APIUser } from "@/api/types";

const getUser = (): User | null => {
  const v = getLocalData(LocalData.USER);
  if (!v) return null;
  const vParsed: APIUser = JSON.parse(v);
  if (!vParsed) return null;
  return new User(vParsed);
};

export class RootState {
  accessToken: string | null = getLocalData(LocalData.ACCESS_TOKEN) as
    | string
    | null;
  refreshToken: string | null = getLocalData(LocalData.REFRESH_TOKEN) as
    | string
    | null;
  user: User | null = getUser();
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
