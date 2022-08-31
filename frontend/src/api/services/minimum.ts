import API from "..";
import { AxiosResponse } from "axios";
import { Paginator } from "../types";

export interface APIMinimum {
  id: number;
  grade: number;
  subject: number;
  quarter: number;
  file: string;
}

interface ListMinimumsParams {
  grade?: number;
  subject?: string;
  quarter__number?: number;
  page?: number;
}

export const listMinimums = (
  params?: ListMinimumsParams
): Promise<AxiosResponse<Paginator<APIMinimum>>> => {
  return API.axios.get("minimums", { params });
};
