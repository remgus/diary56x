import API from "@/api";
import { AxiosResponse } from "axios";

export enum SchoolsAPIURLS {
  LIST = "schools/",
}

export interface APISchool {
  id: number;
  name: string;
}

export const listSchools = (): Promise<AxiosResponse<APISchool[]>> => {
  return API.axios.get<APISchool[]>(SchoolsAPIURLS.LIST);
};
