import { Paginator } from "../types";
import { AxiosResponse } from "axios";
import API from "..";

export interface APIPlugin {
  id: number;
  name: string;
  description: string;
  icon: string;
  month_price: number;
}

export enum PluginsAPIURLS {
  LIST = "plugins/",
  DETAILS = "plugins/",
}

type ListPluginParams = {
  schools: number;
};

const pluginNames = {
  timetable: "Расписание",
  presidents: "Старосты",
  notes: "Конспекты",
  homework: "Домашние задания",
};

export const listPlugins = (
  params?: ListPluginParams
): Promise<AxiosResponse<Paginator<APIPlugin>>> => {
  return API.axios.get<Paginator<APIPlugin>>(PluginsAPIURLS.LIST, { params });
};

export const getPlugin = (id: number): Promise<AxiosResponse<APIPlugin>> => {
  return API.axios.get<APIPlugin>(PluginsAPIURLS.DETAILS + id + "/");
};

export const getPluginName = (plugin: APIPlugin): string => {
  return pluginNames[plugin.name as keyof typeof pluginNames];
};
