import API from "@/api";
import { AxiosResponse } from "axios";

export enum AuthAPIURLS {
  CREATE_STUDENT = "auth/users/create-student",
}

export interface CreateStudentData {
  first_name: string;
  surname: string;
  second_name?: string;
  email: string;
  password: string;
  school: number;
}

export const createStudent = (
  data: CreateStudentData
): Promise<AxiosResponse> => {
  return API.noAuthAxios.post(AuthAPIURLS.CREATE_STUDENT, data);
};
