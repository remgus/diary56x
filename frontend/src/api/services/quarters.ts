import API from "..";
import { AxiosResponse } from "axios";

export interface APIQuarter {
  id: number;
  number: number;
  begin: string;
  end: string;
}

export const listQuarters = (): Promise<AxiosResponse<APIQuarter[]>> => {
  return API.axios.get("quarters");
};
