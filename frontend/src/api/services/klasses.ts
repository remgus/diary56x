import API from "..";
import { AxiosResponse } from "axios";

export interface APIKlassCompact {
  id: number;
  name: string;
  description: string;
  head_teacher: number | null;
}

export interface APIKlass extends APIKlassCompact {
  students: number[];
  teachers: number[];
  subjects: number[];
}

interface ListClassesParams {
  compact?: boolean;
}

const defaultListClassesParams: ListClassesParams = {
  compact: false,
};

export const listClasses = (
  params = defaultListClassesParams
): Promise<AxiosResponse<APIKlass[]>> => {
  return API.axios.get("klasses/", { params });
};

export const getClass = (id: number): Promise<AxiosResponse<APIKlass>> => {
  return API.axios.get(`klasses/${id}`);
};
