import API from "@/api";
import { AxiosResponse } from "axios";
import { APIPlugin } from "./plugins";

export enum SchoolsAPIURLS {
  LIST = "schools/",
  DETAILS = "schools/",
}

export interface APISchoolCompact {
  id: number;
  name: string;
}

export interface APISchool extends APISchoolCompact {
  plugins: APIPlugin[];
}

export const listSchools = (
  compact = false
): Promise<AxiosResponse<APISchool[]>> => {
  const params = { compact };
  return API.axios.get<APISchool[]>(SchoolsAPIURLS.LIST, { params });
};

export const getSchool = (id: number): Promise<AxiosResponse<APISchool>> => {
  return API.axios.get<APISchool>(SchoolsAPIURLS.DETAILS + id + "/");
};
