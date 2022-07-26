import { AxiosResponse } from "axios";
import API from "..";

export interface DiaryxConfig {
  school_name: string;
  school_n: string;
  school_full_name: string;
  plugins: string[];
}

export const fetchConfig = (): Promise<AxiosResponse<DiaryxConfig>> => {
  return API.axios.get("config");
};
