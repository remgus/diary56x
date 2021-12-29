import { getLocalData, LocalData } from "@/api/local";
import { APIUser } from "@/api/types";

const getUser = (): APIUser | null => {
  const v = getLocalData(LocalData.USER);
  if (!v) return null;
  const vParsed: APIUser = JSON.parse(v);
  if (!vParsed) return null;
  return vParsed;
};

export class RootState {
  accessToken: string | null = getLocalData(LocalData.ACCESS_TOKEN);
  refreshToken: string | null = getLocalData(LocalData.REFRESH_TOKEN);
  user: APIUser | null = getUser();
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
