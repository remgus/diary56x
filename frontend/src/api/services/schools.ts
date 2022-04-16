import API from "@/api";
import { AxiosResponse } from "axios";
import { APIPlugin } from "./plugins";

export enum SchoolsAPIURLS {
  LIST = "schools/",
  DETAIL = "schools/",
}

export interface APISchoolCompact {
  id: number;
  name: string;
}

export interface APISchool extends APISchoolCompact {
  plugins: APIPlugin[];
}

export interface UpdateSchool {
  name?: string;
  plugins?: APIPlugin[];
}

export const listSchools = (
  compact = false
): Promise<AxiosResponse<APISchool[]>> => {
  const params = { compact };
  return API.axios.get(SchoolsAPIURLS.LIST, { params });
};

export const getSchool = (id: number): Promise<AxiosResponse<APISchool>> => {
  return API.axios.get(SchoolsAPIURLS.DETAIL + id + "/");
};

export const updateSchool = (
  id: number,
  data: UpdateSchool
): Promise<AxiosResponse<APISchool>> => {
  return API.axios.patch(SchoolsAPIURLS.DETAIL + id + "/", data);
};
