import API from "..";
import { AxiosResponse } from "axios";

export interface APIKlassCompact {
  id: number;
  name: string;
  description: string;
  head_teacher: number | null;
  school: number;
}

export interface APIKlass extends APIKlassCompact {
  students: number[];
  teachers: number[];
  subjects: number[];
}

export const KlassAPIEndpoint = "klasses/";

export const listClassesCompact = (
  school: number
): Promise<AxiosResponse<APIKlassCompact[]>> => {
  const params = {
    school,
    compact: true,
  };
  return API.axios.get(KlassAPIEndpoint, { params });
};

export const listClasses = (
  school: number
): Promise<AxiosResponse<APIKlass[]>> => {
  return API.axios.get(KlassAPIEndpoint, { params: { school } });
};

export const getClass = (id: number): Promise<AxiosResponse<APIKlass>> => {
  return API.axios.get(KlassAPIEndpoint + id);
};
