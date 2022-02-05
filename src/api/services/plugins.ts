import { Paginator } from "../types";
import { AxiosResponse } from "axios";
import API from "..";

export interface APIPlugin {
  id: number;
  name: string;
  description: string;
  icon: string;
}

export enum PluginsAPIURLS {
  LIST = "plugins/",
  DETAILS = "plugins/",
}

export const listPlugins = (): Promise<AxiosResponse<Paginator<APIPlugin>>> => {
  return API.axios.get<Paginator<APIPlugin>>(PluginsAPIURLS.LIST);
};

export const getPlugin = (id: number): Promise<AxiosResponse<APIPlugin>> => {
  return API.axios.get<APIPlugin>(PluginsAPIURLS.DETAILS + id + "/");
};
